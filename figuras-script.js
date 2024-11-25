const instruction = document.getElementById('instruction');
const shapeContainer = document.getElementById('shape-container');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

let score = 0;
let timeLeft = 60;
let timer;
let correctShape, correctColor;
let roundsPlayed = 0; // Contador de rondas

// Efectos de sonido
const matchSound = new Audio('audio/match.mp3');
const noMatchSound = new Audio('audio/no-match-sound.mp3');
const victorySound = new Audio('audio/victory-sound.mp3'); // Audio de victoria

// Traducción de colores y formas
const colors = ['rojo', 'azul', 'verde', 'amarillo', 'naranja', 'morado'];
const shapes = ['círculo', 'cuadrado', 'triángulo'];

// Mapeo para los estilos de color y forma
const colorMap = {
    rojo: 'red',
    azul: 'blue',
    verde: 'green',
    amarillo: 'yellow',
    naranja: 'orange',
    morado: 'purple'
};

const shapeMap = {
    círculo: 'circle',
    cuadrado: 'square',
    triángulo: 'triangle'
};

// Generar instrucción válida
function generateInstruction(shapesData) {
    const randomIndex = Math.floor(Math.random() * shapesData.length);
    const chosenShape = shapesData[randomIndex];
    correctShape = chosenShape.forma;
    correctColor = chosenShape.color;
    instruction.textContent = `Encuentra el ${correctShape} ${correctColor}`;
}

// Generar formas
function generateShapes() {
    shapeContainer.innerHTML = '';
    const shapesData = [];

    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

        shape.classList.add('shape', shapeMap[randomShape]);
        shape.style.backgroundColor = shapeMap[randomShape] === 'triangle' ? 'transparent' : colorMap[randomColor];
        if (shapeMap[randomShape] === 'triangle') {
            shape.style.borderBottomColor = colorMap[randomColor];
        }

        // Almacenar forma y color
        shapesData.push({ forma: randomShape, color: randomColor });

        shape.addEventListener('click', () => checkAnswer(randomShape, randomColor));
        shapeContainer.appendChild(shape);
    }

    // Generar una instrucción válida basada en las opciones
    generateInstruction(shapesData);
}

// Verificar respuesta
function checkAnswer(shapeType, shapeColor) {
    if (shapeType === correctShape && shapeColor === correctColor) {
        feedback.textContent = '¡Correcto!';
        feedback.className = 'correct';
        feedback.style.color = '#145a32';
        score += 10;
        updateScore();
        matchSound.play();
        roundsPlayed++; // Incrementar rondas jugadas

        if (roundsPlayed === 10) {
            winGame(); // Mostrar mensaje de victoria si se completan las 6 rondas
        } else {
            startRound(); // Continuar con la siguiente ronda
        }
    } else {
        feedback.textContent = '¡Intenta de nuevo!';
        feedback.className = 'incorrect';
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
            feedback.style.color = '#f44336';
            disableShapes();
        }
    }, 1000);
}

// Desactivar formas
function disableShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => shape.style.pointerEvents = 'none');
}

// Ganar el juego
function winGame() {
    clearInterval(timer); // Detener el temporizador
    feedback.textContent = '';
    instruction.textContent = ''; // Limpiar la instrucción
    disableShapes(); // Desactivar formas
    shapeContainer.innerHTML = ''; // Limpiar el contenedor de formas

    const winMessage = document.createElement('div');
    winMessage.textContent = '¡Felicidades, has ganado!';
    winMessage.style.color = '#DE3163';
    winMessage.style.fontSize = '4rem';
    winMessage.style.textAlign = 'center';
    winMessage.style.marginTop = '20px';
    winMessage.style.fontFamily = 'Quicksand, cursive';
    winMessage.style.fontWeight = 'bold';

    shapeContainer.appendChild(winMessage);
    victorySound.play(); // Reproducir sonido de victoria
}

// Iniciar una nueva ronda
function startRound() {
    generateShapes();
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
    startRound();
    startTimer();
}

// Inicializar juego
resetButton.addEventListener('click', resetGame);
resetGame();
