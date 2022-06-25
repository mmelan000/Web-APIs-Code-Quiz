const questionArea = document.querySelector("#question");
const scoreboard = document.querySelector("#scoreboard");
const scoreboardBtn = document.querySelector("#high-score");
const resetBtn = document.querySelector("#reset");
const timeRemaining = document.querySelector("#time-remaining");
const timerDoc = document.querySelector("#timer");
const startBtn = document.querySelector("#start");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const intro = document.querySelector("#intro");
const questionDoc = document.querySelector("#question");
const answerBtns = document.querySelector("#answer-buttons")
let currentAnswer, score, timeLeft;

var questions = [
    {
        question: 'test1',
        answers: [
            { text: '1a', correct: false },
            { text: '1b', correct: false },
            { text: '1c', correct: false },
            { text: '1d', correct: true }
        ]
    }, {
        question: 'test2',
        answers: [
            { text: '2a', correct: false },
            { text: '2b', correct: false },
            { text: '2c', correct: true },
            { text: '2d', correct: false }
        ]
    }, {
        question: 'test3',
        answers: [
            { text: '3a', correct: false },
            { text: '3b', correct: true },
            { text: '3c', correct: false },
            { text: '3d', correct: false }
        ]
    }, {
        question: 'test4',
        answers: [
            { text: '4a', correct: true },
            { text: '4b', correct: false },
            { text: '4c', correct: false },
            { text: '4d', correct: false }
        ]
    }, {
        question: 'test5',
        answers: [
            { text: '5a', correct: false },
            { text: '5b', correct: false },
            { text: '5c', correct: false },
            { text: '5d', correct: true }
        ]
    },
]


// ***Start Button***

// What does it do?
// hides the start and high scores buttons
// reveals choices and timer
// begins game


function selectAnswer(event) {
    const selectedAnswer = event.target.textContent;
    console.log("The answer you selected was " + selectedAnswer);

    if (selectedAnswer !== currentAnswer) {
        console.log("You have selected the Wrong Answer")
        console.log(timeLeft = timeLeft - 10);
    } else {
        console.log("You have selected the Correct Answer")
    }

    if (questions.length === 0) {
        score = timeLeft;
        enterHighScore();
    } else {
        nextQuestion();
    }
}

function nextQuestion() {

    var j = Math.floor((Math.random() * questions.length));
    console.log("Question " + j + " is being chosen.")
    var currentQuestion = questions[j];

    console.log("The current question is " + JSON.stringify(currentQuestion));
    questions.splice(j, 1);
    console.log("The number of remaining questions is " + questions.length);

    questionArea.textContent = currentQuestion.question;

    btn1.textContent = currentQuestion.answers[0].text;
    btn2.textContent = currentQuestion.answers[1].text;
    btn3.textContent = currentQuestion.answers[2].text;
    btn4.textContent = currentQuestion.answers[3].text;

    if (currentQuestion.answers[0].correct === true) {
        currentAnswer = currentQuestion.answers[0].text
        console.log("This is the current answer: " + currentAnswer);
    } else if (currentQuestion.answers[1].correct === true) {
        currentAnswer = currentQuestion.answers[1].text
        console.log("This is the current answer: " + currentAnswer);
    } else if (currentQuestion.answers[2].correct === true) {
        currentAnswer = currentQuestion.answers[2].text
        console.log("This is the current answer: " + currentAnswer);
    } else {
        currentAnswer = currentQuestion.answers[3].text
        console.log("This is the current answer: " + currentAnswer);
    }

    btn1.addEventListener("click", selectAnswer);
    btn2.addEventListener("click", selectAnswer);
    btn3.addEventListener("click", selectAnswer);
    btn4.addEventListener("click", selectAnswer);
} 

function game() {
    startBtn.classList.add("hidden");
    scoreboardBtn.classList.add("hidden");
    intro.classList.add("hidden");
    resetBtn.classList.add("hidden");
    questionDoc.classList.remove("hidden")
    answerBtns.classList.remove("hidden")
    timerDoc.classList.remove("hidden");


    // timer
    timeLeft = 50;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeRemaining.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timeRemaining.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            alert("Better luck next time. Please try again.");
            clearInterval(timeInterval);
            startBtn.classList.remove("hidden");
            scoreboardBtn.classList.remove("hidden");
            intro.classList.remove("hidden");
            questionDoc.classList.add("hidden");
            timerDoc.classList.add("hidden");
            answerBtns.classList.add("hidden");
            return;
        }
    }, 1000);
    nextQuestion();
}

// ****** THE GAME ******
// what does it do?
// starts timer
// if timer runs out, game is over    

// loads a random question in to text area, then removes answer from possible next choices
// loads the corresponding answers into buttons
// if question is answered correctly, REPEAT, until questions remaining == 0
// if answers remaining == 0 log time, run enterHighscore
startBtn.addEventListener("click", game)











// ***View Highscores***
// What does is do?
// its a button that
scoreboardBtn.addEventListener("click", viewHighScores);

// replaces .question with </table> containing data from local storage and
// shows reset button, hides .text-area, and show </table> containing data from lS
function viewHighScores() {
    questionArea.classList.add("hidden");
    scoreboardBtn.classList.add("hidden");
    scoreboard.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
}
//   ***Reset Button***
// what does it do?
// clears local storage then rerenders </ol>
function reset() {
    clear();
}
// function to enter high score
function enterHighScore() {
    let initials = prompt("Please enter your initials.", "AAA");

    if (initials === null) {
        alert("Please enter your initials.");
        enterHighScore;
    } else if (initials.length > 3) {
        alert("Initials must be 3 or less characters.")
        enterHighScore;
    } else {
        localStorage.setItem(initials, score);
        populateScoreboard;
    }
}

// populate scoreboard
function populateScoreboard() {

}





