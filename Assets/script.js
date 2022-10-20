//elements to navigate through the DOM tree
var startBtn = document.querySelector("#startingScreen");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var timerEl = document.querySelector("#timer");
var feedbackEl = document.querySelector("#feedback")
var endscreenEl = document.querySelector("#endScreen")
var submitBtn = document.querySelector("#submit")
// quiz staring state
var currentQuestionIndex = 0;
var time = 100 ;
//variable to initiate timer
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
    //quiz will automatically finish when time reaches 0
    if (time <= 0){
        endQuiz();
    }
}
//returns current question
function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    // clears previous question choices if there are any
    choicesEl.innerHTML = "";
  
    // loops over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // creates new button for each choice
      var choiceButton = document.createElement("button");
      choiceButton.setAttribute("class", "choice");
      choiceButton.setAttribute("value", choice);
  
      choiceButton.textContent = i  + 1 + "." + choice;
  
      // event listener to each answer choice
      choiceButton.onclick = choiceClick;
  
      // display choice buttons on the page
      choicesEl.appendChild(choiceButton);
    });
  }

  function choiceClick() {
    // confirms if choice selected is correct or not
    if (this.value !== questions[currentQuestionIndex].answer) {
      // time penalty if user selects a wrong answer.
      time -=10;
    

    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong! -10s";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "50px";
    feedbackEl.style.textDecoration = "underline"
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "50px";
    feedbackEl.style.textDecoration = "underline"
  }

  // display "correct" or "wrong"
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedbackHide");
  }, 750);



    //displays next question in the index
    currentQuestionIndex++;

    // quiz will finish when the last question in the index is answered.
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      getQuestion();
    }
  }
  
  // end quiz
  function endQuiz() {
    //ends the countdown
    clearInterval(timerId)
    //hide questions section
    questionsEl.setAttribute("class", "hide")

    //display end screen
    endscreenEl.removeAttribute("class","hide")
    

    //save highscore

    //display previous highscores

  }

  
startBtn.onclick = startQuiz;

