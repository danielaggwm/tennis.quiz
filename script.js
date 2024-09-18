// questions array
const questions = [
    {
        question: "Who has won the most Grand Slam titles in men's tennis?",
        options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic"],
        correct: 2,
        explanation: "Novak Djokovic currently holds the record for most Grand Slam titles in men's tennis, with 24. He is tied with Margaret Court, who holds the same amount on the women's side."
    },
    {
        question: "The legendary sisters Venus and Serena Williams are twins",
        options: ["True", "False"],
        correct: 1,
        explanation: "The sisters, regarded as two of the best woman tennis players, are one year apart - Venus being the eldest."
    },
    {
        question: "Who is known as the 'King of Clay' in tennis?",
        options: ["Roger Federer", "Rafael Nadal","Novak Djokovic","Andy Murray"],
        correct: 1,
        explanation: "Rafael Nadal holds the most titles in French Open history. He holds 14 titles, more than anyone in tennis history has won at any major tournament."
    },
    {
        question: "Which tennis player has the record for the most consecutive weeks at No. 1?",
        options: ["Roger Federer", "Pete Sampras","Novak Djokovic","Andre Agassi"],
        correct: 2,
        explanation: "Novak Djokovic has spent the most weeks as the world's number one, with 428 weeks. Following him is Roger Federer, with 237 weeks."
    },
    {
        question: "What is the term used for a score of 0 in tennis?",
        options: ["Zero", "Love","Nil","Nothing"],
        correct: 1,
        explanation: "The origins of 'love' as a score lie in the figure zero's resemblance to an egg. The French word for egg is l'oeuf - the pronunciation of which is not far from 'love'."
    },
];

let currentQuestionIndex = 0;
let score = 0;

// main container that holds the current question.
const quizContainer = document.getElementById("quiz-container");

// section that will display the final score after the quiz ends.
const resultContainer = document.getElementById("result-container");

// element where the question text will be displayed.
const questionElement = document.querySelector(".question-container h2");

// container that holds buttons for the answer options
const optionsContainer = document.getElementById("options");

// element where the explanation text will be displayed
const explanationElement = document.querySelector(".explanation");

// The "Next Question" button.
const nextBtn = document.getElementById("next-btn");

// element that displays the user's current score 
const scoreElement = document.querySelector(".score");

// element that will display the user's final score
const finalScoreElement = document.getElementById("final-score");

// visual element representing the user's progress through the quiz
const progressBar = document.querySelector(".progress");


// function to create the quiz questions & buttons
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // update question number and score
    document.getElementById("question-status").textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // clears any previous options 
    optionsContainer.innerHTML = '';

    // dynamically creates buttons for each option in the options array
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button); // adds it dynamically to the HTML
    });

    explanationElement.style.display = 'none';
    nextBtn.style.display = 'none';
}

// function to check if the answer is right or wrong
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option");

    if (selectedIndex === currentQuestion.correct) {
        buttons[selectedIndex].style.borderColor = '#4CAF50'; // dark green
        buttons[selectedIndex].style.backgroundColor = '#aed6af'; // light green
        buttons[selectedIndex].style.color = 'black'
        score++;
        scoreElement.textContent = score;
    } else {
        buttons[selectedIndex].style.borderColor = '#FF0000'; // red
        buttons[selectedIndex].style.backgroundColor = '#f28b82'; // light red
        buttons[currentQuestion.correct].style.borderColor = '#4CAF50'; // dark green
        buttons[currentQuestion.correct].style.backgroundColor = '#aed6af'; // light green
        buttons[currentQuestion.correct].style.color = 'black'
    }

    explanationElement.textContent = currentQuestion.explanation;
    explanationElement.style.display = 'block';
    nextBtn.style.display = 'block';

    buttons.forEach(button => button.disabled = true);
}


// next question button
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    // if there are more questions left, the progress bar is updated
    // and next question is loaded
    if (currentQuestionIndex < questions.length) {
        updateProgressBar();
        loadQuestion();
    } else {
        showResults();
    }
});

// function to update the progress bar
// it calculates the % of the quiz the user has completed
function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// function to show the results
// function to show the results
function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // Calculate the percentage score
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    // Update the score text inside the circle
    document.querySelector('.score-text').textContent = `${score}/${totalQuestions}`;

    // Get the circle element and calculate the stroke-dashoffset
    const circle = document.querySelector('.progress-circle-fg');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    // Animate the stroke-dashoffset to show progress
    const offset = circumference - (percentage / 100) * circumference;
    let currentOffset = circumference;

    // Gradually fill the circle
    const duration = 1000; // animation duration in ms
    const interval = 10;   // update the animation every 10 ms
    const steps = duration / interval;
    const stepOffset = (circumference - offset) / steps;

    const animateCircle = setInterval(() => {
        currentOffset -= stepOffset;
        if (currentOffset <= offset) {
            currentOffset = offset;
            clearInterval(animateCircle);
        }
        circle.style.strokeDashoffset = currentOffset;
    }, interval);
}



// restarting the quiz
document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    updateProgressBar();
    loadQuestion();
});

// initialize the quiz
loadQuestion();
updateProgressBar();
