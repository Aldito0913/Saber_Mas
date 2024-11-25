const objectContainer = document.getElementById('object-container');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

let score = 0;
let timeLeft = 60;
let timer;
let correctAnswer;
let roundsPlayed = 0; // Contador de rondas

// Efectos de sonido
const matchSound = new Audio('audio/match.mp3');
const noMatchSound = new Audio('audio/no-match-sound.mp3');
const VictorySound = new Audio('audio/victory-sound.mp3'); // Audio de victoria

// Generar un número aleatorio
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generar objetos para contar
function generateObjects() {
    const objectCount = getRandomNumber(3, 15); // Número aleatorio de objetos
    objectContainer.innerHTML = ''; // Limpiar el contenedor de objetos antes de agregar nuevos
    for (let i = 0; i < objectCount; i++) {
        const div = document.createElement('div');
        div.classList.add('object');
        div.textContent = '🍎'; // Cambiar por emojis u otros objetos
        objectContainer.appendChild(div);
    }
    return objectCount;
}

// Generar opciones
function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 3) {
        const randomOption = getRandomNumber(correctAnswer - 2, correctAnswer + 2);
        if (!options.includes(randomOption) && randomOption > 0) {
            options.push(randomOption);
        }
    }
    options.sort(() => Math.random() - 0.5); // Mezclar opciones
    optionsContainer.innerHTML = ''; // Limpiar las opciones anteriores
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Verificar respuesta
function checkAnswer(selected) {
    if (selected === correctAnswer) {
        feedback.textContent = '¡Correcto!';
        feedback.style.color = '#145a32';
        score += 10;
        updateScore();
        matchSound.play();
        roundsPlayed++; // Incrementar rondas jugadas

        if (roundsPlayed === 6) {
            winGame(); // Mostrar mensaje de victoria si se completan las 6 rondas
        } else {
            startRound(); // Continuar con la siguiente ronda
        }
    } else {
        feedback.textContent = '¡Intenta de nuevo!';
        feedback.style.color = '#f44336';
        noMatchSound.play();
    }
}

// Actualizar puntuación
function updateScore() {
    scoreDisplay.textContent = `Puntos: ${score}`;
}

// Temporizador
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tiempo: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            feedback.textContent = '¡Tiempo terminado!';
            feedback.style.color = '#f44336'; // Mismo color que "Intenta de nuevo"
            disableOptions();
        }
    }, 1000);
}

// Desactivar opciones de respuesta
function disableOptions() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => button.disabled = true); // Desactivar cada botón de opción
}

// Iniciar una nueva ronda
function startRound() {
    correctAnswer = generateObjects(); // Generar objetos y guardar la respuesta correcta
    generateOptions(correctAnswer); // Generar opciones basadas en la respuesta correcta
}

// Reiniciar juego
function resetGame() {
    clearInterval(timer);
    score = 0;
    timeLeft = 60;
    roundsPlayed = 0; // Reiniciar el contador de rondas
    updateScore();
    feedback.textContent = '';
    timerDisplay.textContent = `Tiempo: ${timeLeft}s`;
    objectContainer.innerHTML = ''; // Limpiar objetos
    optionsContainer.innerHTML = ''; // Limpiar opciones
    startRound();
    startTimer();
}

// Ganar el juego
function winGame() {
    clearInterval(timer); // Detener el temporizador
    feedback.textContent = '';
    
    // Desactivar todas las opciones inmediatamente
    disableOptions();
    
    // Limpiar las opciones de respuesta
    optionsContainer.innerHTML = '';

    // Mostrar el mensaje de victoria
    const winMessage = document.createElement('div');
    winMessage.textContent = '¡Felicidades, has ganado!';
    winMessage.style.color = '#21618c';
    winMessage.style.fontSize = '4rem';
    winMessage.style.textAlign = 'center';
    winMessage.style.marginTop = '20px';
    winMessage.style.fontFamily = 'Quicksand, cursive'; // Cambiar la fuente a Quicksand
    winMessage.style.fontWeight = 'bold'; // Negrita
    objectContainer.innerHTML = ''; // Limpiar el contenedor de objetos
    objectContainer.appendChild(winMessage);
    
    // Reproducir sonido de victoria
    VictorySound.play();
}

// Inicializar juego
resetButton.addEventListener('click', resetGame);
resetGame();
