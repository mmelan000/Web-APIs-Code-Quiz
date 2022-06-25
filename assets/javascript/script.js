const timerArea = document.querySelector("#timer-area");
const timeRemaining = document.querySelector("#time-remaining");
const gameArea = document.querySelector("#game-area");
const header = document.querySelector("#header");
const introArea = document.querySelector("#intro-area")
const intro = document.querySelector("#intro");
const questionArea = document.querySelector("#question-area");
const question = document.querySelector("#question");
const scoreboardArea = document.querySelector("#scoreboard-area");
const scoreboard = document.querySelector("#scoreboard");
// areas and content of doc
const startBtn = document.querySelector("#start");
const scoreboardBtn = document.querySelector("#high-score");
const resetBtn = document.querySelector("#reset");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
// buttons on doc
let currentAnswer, score, timeLeft, timeInterval;
var answeredQuestions = 0;
var leaderboard = [];
var storedLeaderboard = JSON.parse(localStorage.getItem('highScore'));
// global variables

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
// questions and answers

function populateScoreboard() {
    while (scoreboard.firstChild) {
        scoreboard.removeChild(scoreboard.firstChild);
    }
    scoreboard.innerHTML = "";
    console.log("start of PS")
    for (var i = 0; i < leaderboard.length; i++) {
        var leaderboardA = leaderboard[i].initials;
        var leaderboardB = leaderboard[i].score;
        console.log(leaderboardA);
        var li = document.createElement("li");
        li.textContent = leaderboardA + ": " + leaderboardB;
        li.setAttribute("data-index", i);

        scoreboard.appendChild(li);
        console.log("end og populateScoreboard")
    }
}
// renders HS table

function enterHighScore() {
    introArea.classList.remove("hidden");
    questionArea.classList.add("hidden");
    timerArea.classList.add("hidden");
    startBtn.classList.remove("hidden");
    scoreboardBtn.classList.remove("hidden");
    btn1.classList.add("hidden");
    btn2.classList.add("hidden");
    btn3.classList.add("hidden");
    btn4.classList.add("hidden");

    let initials = prompt("Please enter your initials.", "AAA");

    if (initials === null) {
        alert("Please enter your initials.");
        enterHighScore;
    } else if (initials.length > 3) {
        alert("Initials must be 3 or less characters.")
        enterHighScore;
    } else {
        console.log(leaderboard)
        var highScore = {initials, score};
        leaderboard.push(highScore);
        leaderboard.sort((firstItem, secondItem) => firstItem.score - secondItem.score);
        leaderboard.reverse();
        localStorage.setItem('highScore', JSON.stringify(leaderboard));
        window.location.reload();
    }
}
// logs and store initials and score into localStorage

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
        clearInterval(timeInterval);
        score = timeLeft;
        enterHighScore();
    } else {
        nextQuestion();
    }
}
// runs check on answers and applies penalty if wong

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
// ques next question and pulls already used questions out

function timer() {
    timeLeft = 50;
    // var 
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeRemaining.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timeRemaining.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            alert("Better luck next time. Please try again.");
            clearInterval(timeInterval);
            introArea.classList.remove("hidden");
            questionArea.classList.add("hidden");
            timerArea.classList.add("hidden");
            startBtn.classList.remove("hidden");
            scoreboardBtn.classList.remove("hidden");
            btn1.classList.add("hidden");
            btn2.classList.add("hidden");
            btn3.classList.add("hidden");
            btn4.classList.add("hidden");
            return;
        }
    }, 1000);
}
// timer, also ends game if time runs out

function game() {
    timerArea.classList.remove("hidden");
    introArea.classList.add("hidden");
    questionArea.classList.remove("hidden");
    scoreboardArea.classList.add("hidden");
    startBtn.classList.add("hidden");
    scoreboardBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
    btn1.classList.remove("hidden");
    btn2.classList.remove("hidden");
    btn3.classList.remove("hidden");
    btn4.classList.remove("hidden");

    timer();
    nextQuestion();
}
// initializes game and start timer

function viewHighScores() {
    populateScoreboard();
    introArea.classList.add("hidden");
    scoreboardBtn.classList.add("hidden");
    scoreboardArea.classList.remove("hidden");
    resetBtn.classList.remove("hidden");

}
// displays HS table

function reset() {   
    while (scoreboard.firstChild) {
        scoreboard.removeChild(scoreboard.firstChild);
    }
    localStorage.clear(); 
}
// resets scoreboard and refreshes page

function init() {

    timerArea.classList.add("hidden");
    questionArea.classList.add("hidden");
    scoreboardArea.classList.add("hidden");
    resetBtn.classList.add("hidden");
    btn1.classList.add("hidden");
    btn2.classList.add("hidden");
    btn3.classList.add("hidden");
    btn4.classList.add("hidden");


    console.log(storedLeaderboard);
    if (storedLeaderboard !== null) {
        leaderboard = storedLeaderboard;
        console.log(leaderboard);
    }
    console.log("end of init");
    populateScoreboard();
}
// preloads assignes classes and preloads HS board

startBtn.addEventListener("click", game)
scoreboardBtn.addEventListener("click", viewHighScores);
resetBtn.addEventListener("click", reset);

init();
