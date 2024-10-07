let currentQuestion = 0;
let score = 0;
let playerName = '';

const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const questionDiv = document.getElementById('question');
const scoreDiv = document.getElementById('score');
const welcomeDiv = document.getElementById('welcome');
const quizDiv = document.getElementById('quiz');
const playerNameSpan = document.getElementById('playerName');

const problems = [];

function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operation = Math.random() < 0.5 ? '+' : '-';
    const answer = operation === '+' ? num1 + num2 : num1 - num2;
    return { question: `${num1} ${operation} ${num2}`, answer };
}

function startGame() {
    playerName = nameInput.value.trim();
    if (playerName) {
        playerNameSpan.textContent = playerName;
        welcomeDiv.style.display = 'none';
        quizDiv.style.display = 'block';
        for (let i = 0; i < 5; i++) {
            problems.push(generateMathProblem());
        }
        displayQuestion();
    } else {
        alert("Please enter your name!");
    }
}

function displayQuestion() {
    if (currentQuestion < problems.length) {
        questionDiv.textContent = `Question ${currentQuestion + 1}: ${problems[currentQuestion].question}`;
    } else {
        endGame();
    }
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === problems[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    document.getElementById('answer').value = '';
    displayQuestion();
}

function endGame() {
    quizDiv.style.display = 'none';
    scoreDiv.innerHTML = `<h2>Your Score: ${score} out of 5</h2><button onclick="resetGame()">Play Again</button>`;
    scoreDiv.style.display = 'block';
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    problems.length = 0;
    welcomeDiv.style.display = 'block';
    scoreDiv.style.display = 'none';
}

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', submitAnswer);
