const flashcards = [
    { text: "Letra A", image: "imagenes/a.png" },
    { text: "Letra B", image: "imagenes/b.png" },
    { text: "Letra C", image: "imagenes/c.png" },
    { text: "Letra D", image: "imagenes/d.png" },
    { text: "Número 1", image: "imagenes/uno.jpg" },
    { text: "Número 2", image: "imagenes/dos.jpg" },
    { text: "Número 3", image: "imagenes/tres.jpg" },
    { text: "Número 4", image: "imagenes/cuatro.jpg" },
    { text: "Sol", image: "imagenes/sol.png" },
    { text: "Casa", image: "imagenes/casa.png" },
    { text: "Árbol", image: "imagenes/arbol.png" },
    { text: "Gato", image: "imagenes/gato.png" },
    { text: "Perro", image: "imagenes/perro.png" },
    { text: "Letra E", image: "imagenes/e.png" },
    { text: "Letra F", image: "imagenes/f.png" },
    { text: "Letra G", image: "imagenes/g.png" },
    { text: "Número 5", image: "imagenes/cinco.jpg" },
    { text: "Número 6", image: "imagenes/seis.jpg" },
    { text: "Luna", image: "imagenes/luna.png" },
    { text: "Mar", image: "imagenes/mar.jpg" }
];

let usedIndices = [];

// Función para mezclar las flashcards aleatoriamente
function shuffleFlashcards() {
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Función para mostrar 4 flashcards aleatorias sin repetirse
function displayFlashcards() {
    const flashcardContainer = document.getElementById('flashcardContainer');
    flashcardContainer.innerHTML = ''; // Limpiar contenedor

    if (usedIndices.length === flashcards.length) {
        alert("Ya has visto todas las tarjetas. Empezando de nuevo.");
        usedIndices = []; // Reiniciar cuando se hayan mostrado todas las flashcards
    }

    // Obtener 4 tarjetas aleatorias sin repetirse
    let flashcardsToShow = [];
    while (flashcardsToShow.length < 4) {
        const randomIndex = Math.floor(Math.random() * flashcards.length);
        if (!usedIndices.includes(randomIndex)) {
            flashcardsToShow.push(flashcards[randomIndex]);
            usedIndices.push(randomIndex);
        }
    }

    // Crear las flashcards visualmente
    flashcardsToShow.forEach(card => {
        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
        flashcardElement.innerHTML = `
            <img src="${card.image}" alt="Flashcard image" class="image">
            <p>${card.text}</p>
            <img src="imagenes/speaker.png" class="speaker-icon" onclick="speakText('${card.text}')">
        `;
        flashcardContainer.appendChild(flashcardElement);
    });
}

// Función para reproducir el texto usando la API de voz
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

// Función para mostrar la siguiente tanda de flashcards (sin repetir)
function showNext() {
    displayFlashcards(); // Mostrar las siguientes 4 flashcards
    // Reproducir un sonido al pasar a la siguiente ronda
    const audio = new Audio('audio/flip-sound.mp3'); // Cambia el path a tu archivo de audio
    audio.play();
}

// Inicializar la página
window.onload = function() {
    displayFlashcards(); // Mostrar las primeras 4 flashcards al cargar la página
};