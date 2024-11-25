let points = 0;
let medals = 0;
let currentQuestionIndex = 0; // Índice de la pregunta actual
let correctAnswersCount = 0; // Contador de respuestas correctas
let totalAttempts = 0; // Total de intentos
let questions = [
    { question: "¿Cuánto es 2 + 2?", correctAnswer: "4", topic: "Matemáticas" },
    { question: "¿Qué color es el sol?", correctAnswer: "Amarillo", topic: "Colores" },
    { question: "¿Cómo se llama el animal que dice 'miau'?", correctAnswer: "Gato", topic: "Animales" },
    { question: "¿Cuánto es 5 + 3?", correctAnswer: "8", topic: "Matemáticas" },
    { question: "¿Cuánto es 12 - 8?", correctAnswer: "4", topic: "Matemáticas" },
    { question: "¿Cómo se llama el continente donde vivimos?", correctAnswer: "América", topic: "Geografía" },
    { question: "¿Cuántos días tiene la semana?", correctAnswer: "7", topic: "Lectura" }
];

function narrateText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'latam-LATAM';
        speechSynthesis.speak(utterance);
    } else {
        alert("Tu navegador no soporta narración de voz.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Función para narrar un texto
    const narrarTexto = (texto) => {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'latam-LATAM'; // Establece el idioma a español
        utterance.rate = 1; // Velocidad de la narración
        utterance.pitch = 1; // Tono de la narración
        speechSynthesis.speak(utterance);
    };

    // Asignar narración a cada card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent; // Título de la card
            const description = card.querySelector('p').textContent; // Descripción de la card
            const texto = `${title}: ${description}`;
            narrarTexto(texto); // Llama a la función para narrar
        });
    });
});


function updateProgress(increment) {
    const progressBar = document.getElementById('progress');
    let width = parseInt(progressBar.style.width) || 0;
    width = Math.min(100, width + increment);
    progressBar.style.width = width + '%';

    if (width >= 100) {
        narrateText("¡Felicitaciones, has completado esta lección!");
        resetProgress();
        medals += 1;
        document.getElementById("medals").innerText = medals;
    }
}

function resetProgress() {
    document.getElementById('progress').style.width = '0%';
}

function setNextQuestion() {
    if (currentQuestionIndex < questions.length && correctAnswersCount < 3) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.question;
        document.getElementById('answer').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('answer').disabled = false; // Habilitar el campo de respuesta
    } else {
        narrateText("¡Has respondido tres preguntas correctamente!");
        alert("¡Has completado el máximo de respuestas correctas! El juego se ha deshabilitado.");
        disableAnswering(); // Deshabilitar el campo de respuesta
    }
}

function disableAnswering() {
    document.getElementById('answer').disabled = true; // Deshabilitar el campo de respuesta
    document.getElementById('answerButton').disabled = true; // Deshabilitar el botón de respuesta
}

function checkAnswer() {
    const answer = document.getElementById('answer').value;
    const feedback = document.getElementById('feedback');

    // Solo permitir 1 intento por pregunta
    if (totalAttempts < 1) {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correctAnswer) {
            feedback.textContent = "¡Correcto! Sumas 10 puntos.";
            feedback.style.color = "green";
            narrateText("¡Correcto! Sumas 10 puntos.");
            points += 10;
            document.getElementById("points").innerText = points;

            // Actualizar la barra de progreso
            updateProgress(33.80); // Aumentar el progreso por cada respuesta correcta

            correctAnswersCount++; // Incrementar el contador de respuestas correctas
        } else {
            feedback.textContent = "Incorrecto, intenta de nuevo.";
            feedback.style.color = "red";
            narrateText("Incorrecto, intenta de nuevo.");
            points = Math.max(0, points - 10); // Restar puntos si la respuesta es incorrecta, sin bajar de 0
            document.getElementById("points").innerText = points;
        }

        // Deshabilitar el campo de respuesta para evitar múltiples intentos
        document.getElementById('answer').disabled = true;
        totalAttempts++; // Contabilizar el intento

        // Avanzar a la siguiente pregunta
        setTimeout(() => {
            currentQuestionIndex++;
            totalAttempts = 0; // Resetear los intentos para la siguiente pregunta
            setNextQuestion(); // Configurar la siguiente pregunta
        }, 2000); // Cambiar pregunta después de 2 segundos
    }
}

function resetQuestionnaire() {
    // Reiniciar el cuestionario al reiniciar el juego
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    totalAttempts = 0;
    points = 0;
    document.getElementById('points').innerText = points;
    document.getElementById('feedback').textContent = '';
    setNextQuestion(); // Reiniciar el juego
}

// Redirigir a una nueva página al hacer clic en "¿Qué es Saber+?"
document.getElementById('about-us').addEventListener('click', function () {
    window.location.href = 'about.html'; // Ruta del archivo de la nueva página
});

// Detectar si estamos en 'about.html' para evitar conflictos
if (window.location.pathname.includes('about.html')) {
    console.log("Página de información cargada.");
    // No inicializamos las funciones del cuestionario aquí
} else {
    // Inicializamos el cuestionario como en index.html
    initializeQuiz();
}

// Redirigir a una nueva página al hacer clic en "Juego de memoria"
document.getElementById('memoria').addEventListener('click', function () {
    window.location.href = 'memory.html'; // Ruta del archivo de la nueva página
});

// Detectar si estamos en 'memory.html' para evitar conflictos
if (window.location.pathname.includes('memory.html')) {
    console.log("Página de información cargada.");
    // No inicializamos las funciones del cuestionario aquí
} else {
    // Inicializamos el cuestionario como en index.html
    initializeQuiz();
}

// Redirigir a una nueva página al hacer clic en "Autoexpresión"
document.getElementById('autoexpresion').addEventListener('click', function () {
    window.location.href = 'juego-expresión.html'; // Ruta del archivo de la nueva página
});

// Detectar si estamos en 'juego-expresión.html' para evitar conflictos
if (window.location.pathname.includes('juego-expresión.html')) {
    console.log("Página de información cargada.");
    // No inicializamos las funciones del cuestionario aquí
} else {
    // Inicializamos el cuestionario como en index.html
    initializeQuiz();
}

// Redirigir a una nueva página al hacer clic en "Juego de Contar y Sumar"
document.getElementById('contar').addEventListener('click', function () {
    window.location.href = 'contar.html'; // Ruta del archivo de la nueva página
});

// Detectar si estamos en 'contar.html' para evitar conflictos
if (window.location.pathname.includes('contar.html')) {
    console.log("Página de información cargada.");
    // No inicializamos las funciones del cuestionario aquí
} else {
    // Inicializamos el cuestionario como en index.html
    initializeQuiz();
}

// Redirigir a una nueva página al hacer clic en "Juego de Colores y Figuras"
document.getElementById('formas').addEventListener('click', function () {
    window.location.href = 'figuras.html'; // Ruta del archivo de la nueva página
});

// Detectar si estamos en 'figuras.html' para evitar conflictos
if (window.location.pathname.includes('figuras.html')) {
    console.log("Página de información cargada.");
    // No inicializamos las funciones del cuestionario aquí
} else {
    // Inicializamos el cuestionario como en index.html
    initializeQuiz();
}

// Redirigir a una nueva página al hacer clic en "Flashcards Interactivas"
document.getElementById('flashcards').addEventListener('click', function () {
    window.location.href = 'flashcards.html'; // Ruta del archivo de la nueva página
});

// Detectar si estamos en 'flashcards.html' para evitar conflictos
if (window.location.pathname.includes('flashcards.html')) {
    console.log("Página de información cargada.");
    // No inicializamos las funciones del cuestionario aquí
} else {
    // Inicializamos el cuestionario como en index.html
    initializeQuiz();
}

// Animación de Fade In cuando se cargue la página
document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('fade-in');
        }, index * 500); // Animación secuencial
    });
});

initializeQuiz(); // Inicializamos el cuestionario al cargar la página

function initializeQuiz() {
    setNextQuestion(); // Configurar la primera pregunta al cargar
    document.getElementById("answerButton").addEventListener("click", checkAnswer); // Hacer clic para responder
}
