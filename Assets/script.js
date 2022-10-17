//elements to navigate through the DOM tree
var startBtn = document.querySelector("#startingScreen");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var timerEl = document.querySelector("#timer");


// quiz state variables
var currentQuestionIndex = 0;
var time = 150 ;
var timerId;


function startQuiz() {
    // hide start screen
    var startingScreenEl = document.getElementById("startingScreen");
    startingScreenEl.setAttribute("class", "hide");
    // display questions section
    questionsEl.removeAttribute("class");
    // start timer
    timerId = setInterval(countDown, 1000);
    //display time left
    timerEl.textContent = time;
    // returns current question
    getQuestion();
}
// countdown function
function countDown() {
    time--;
    timerEl.textContent = time 

    }


  
startBtn.onclick = startQuiz;