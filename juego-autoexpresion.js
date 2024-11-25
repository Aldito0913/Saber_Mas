const itemsData = [
    { text: 'Risa', feeling: 'feliz' },
    { text: 'Lágrima', feeling: 'triste' },
    { text: 'Puño', feeling: 'enojado' },
    { text: 'Abrazo', feeling: 'feliz' },
    { text: 'Grito', feeling: 'enojado' },
    { text: 'Silencio', feeling: 'triste' }
];

const categories = document.querySelectorAll('.category');
const itemsContainer = document.getElementById('items');
const feedback = document.getElementById('feedback');
const resetButton = document.getElementById('reset-button');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameContainer = document.getElementById('game-container'); // Contenedor para las categorías

let score = 0;
let timeLeft = 60;
let itemsCorrectlyPlaced = 0; // Para contar cuántos items se colocan correctamente
const totalItems = itemsData.length; // Total de items que deben colocarse correctamente

// Efectos de sonido
const matchSound = new Audio('audio/match.mp3');
const noMatchSound = new Audio('audio/no-match-sound.mp3');
const victorySound = new Audio('audio/victory-sound.mp3');

// Crear elementos dinámicamente
function createItems() {
    itemsContainer.innerHTML = '';
    itemsData.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.textContent = item.text;
        div.draggable = true;
        div.dataset.feeling = item.feeling;

        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);
        itemsContainer.appendChild(div);
    });
}

// Drag and drop handlers
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.feeling);
    event.target.classList.add('dragging');
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
}

function handleDragOver(event) {
    event.preventDefault(); // Esto es necesario para permitir el drop
    event.target.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.target.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    const draggedFeeling = event.dataTransfer.getData('text/plain');
    const categoryFeeling = event.target.dataset.feeling;

    if (draggedFeeling === categoryFeeling) {
        event.target.classList.add('correct');
        feedback.textContent = '¡Correcto!';
        feedback.style.color = '#145a32'; // Color verde oscuro para "Correcto"
        matchSound.play();

        const draggingElement = document.querySelector('.dragging');
        draggingElement.remove();
        score += 10;
        itemsCorrectlyPlaced++; // Incrementamos el contador de elementos correctamente colocados
        updateScore();

        // Verificamos si todos los elementos fueron colocados correctamente
        if (itemsCorrectlyPlaced === totalItems) {
            stopTimer(); // Detener el temporizador cuando se ganan todos los items
            playVictorySound(); // Reproducir el sonido de victoria
            displayVictoryMessage(); // Mostrar el mensaje de victoria
        }
    } else {
        event.target.classList.add('incorrect');
        feedback.textContent = '¡Intenta de nuevo!';
        feedback.style.color = '#f44336';
        noMatchSound.play();
    }

    event.target.classList.remove('drag-over');
    setTimeout(() => {
        event.target.classList.remove('correct', 'incorrect');
        feedback.textContent = '';
    }, 1000);
}

function resetGame() {
    createItems();
    feedback.textContent = '';
    score = 0;
    itemsCorrectlyPlaced = 0; // Resetear el contador de elementos colocados correctamente
    timeLeft = 60;
    updateScore();
    updateTimer();
    startTimer(); // Reiniciar el temporizador

    // Asegurarnos de que las categorías y los items se muestran en su lugar original
    gameContainer.style.display = 'flex'; // Mostramos el contenedor sin modificar su estilo original
}


function updateScore() {
    scoreDisplay.textContent = `Puntos: ${score}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedback.textContent = '¡Se acabó el tiempo!';
            feedback.style.color = '#f44336';
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval); // Detener el temporizador
}

function updateTimer() {
    timerDisplay.textContent = `Tiempo: ${timeLeft}s`;
}

function playVictorySound() {
    victorySound.play(); // Reproducir el sonido de victoria
}

function displayVictoryMessage() {
    // Ocultar las categorías al ganar
    gameContainer.style.display = 'none';
    
    // Mostrar el mensaje de victoria
    const victoryMessage = document.createElement('div');
    victoryMessage.classList.add('victory-message');
    victoryMessage.innerHTML = `
        <h2 class="text-center" style="color: #145a32;">¡Felicidades! Has ganado el juego</h2>
    `;
    document.body.appendChild(victoryMessage);
}

// Asociar eventos a categorías
categories.forEach(category => {
    category.addEventListener('dragover', handleDragOver);
    category.addEventListener('dragleave', handleDragLeave);
    category.addEventListener('drop', handleDrop);
});

// Iniciar el juego
createItems();
resetButton.addEventListener('click', resetGame);
startTimer();
