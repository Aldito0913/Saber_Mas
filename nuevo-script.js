// Array de rutas de imágenes
const images = [
    'imagenes/image1.jpg', // Reemplaza con los nombres correctos de tus imágenes
    'imagenes/image2.jpg',
    'imagenes/image3.jpg',
    'imagenes/image4.jpg',
    'imagenes/image5.jpg',
    'imagenes/image6.jpg',
];

const gameBoard = document.getElementById('game-board');
let flippedCards = [];
let matchedCards = 0;
let timeLeft = 60;
let timerInterval;

// Efectos de sonido
const flipSound = new Audio('audio/flip-sound.mp3');
const matchSound = new Audio('audio/match-sound.mp3');
const noMatchSound = new Audio('audio/no-match-sound.mp3');
const victorySound = new Audio('audio/victory-sound.mp3');

// Crear el tablero de juego
function createBoard() {
    const doubledImages = [...images, ...images];
    doubledImages.sort(() => Math.random() - 0.5);

    doubledImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('img');
        back.src = image;
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);
        gameBoard.appendChild(card);

        card.addEventListener('click', flipCard);
    });
}

// Voltear las cartas
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);

        flipSound.play();

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verificar coincidencias
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedCards++;
        flippedCards = [];

        matchSound.play();

        if (matchedCards === images.length) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            flippedCards = [];
            noMatchSound.play();
        }, 1000);
    }
}

// Temporizador
function startTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

// Finalizar el juego
function endGame(isWin) {
    clearInterval(timerInterval);

    const message = document.createElement('div');
    message.id = 'message';
    message.textContent = isWin ? '¡Felicidades, has ganado!' : '¡Se acabó el tiempo!';
    document.body.appendChild(message);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', flipCard));

    if (isWin) {
        victorySound.play();
    }
}

// Reiniciar el juego
function resetGame() {
    matchedCards = 0;
    flippedCards = [];
    timeLeft = 60;

    clearInterval(timerInterval);
    startTimer();

    const message = document.getElementById('message');
    if (message) {
        message.remove();
    }

    gameBoard.innerHTML = '';
    createBoard();
}

// Iniciar el juego
createBoard();
startTimer();

document.getElementById('reset-button').addEventListener('click', resetGame);
