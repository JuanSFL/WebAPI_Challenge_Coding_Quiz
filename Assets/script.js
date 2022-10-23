//elements to navigate through the DOM tree
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var timerEl = document.querySelector("#timer");
var feedbackEl = document.querySelector("#feedback")
var endscreenEl = document.querySelector("#endScreen")
var submitBtn = document.querySelector("#submitButton")
var nameEl = document.querySelector("#name")

// quiz staring state
var currentQuestionIndex = 0;
var time = 100 ;

//variable to initiate timer
var timerId;

//function that begins the quiz
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
    // confirms if the choice selected is correct or not
    if (this.value !== questions[currentQuestionIndex].answer) {
      // time penalty if user selects a wrong answer.
      time -=10;
    

    // displays new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Incorrect! -10s";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "50px";
    feedbackEl.style.textDecoration = "underline"
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "50px";
    feedbackEl.style.textDecoration = "underline"
  }

  // display "correct" or "incorrect -10s"
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
    var finalScoreEl = document.getElementById("finalScore");
    finalScoreEl.textContent = time;
    //display previous highscores
  }

  function saveHighscore() {
    // retrieves name that is put into the textbox
    var name = nameEl.value.trim();
  
    if (name !== "") {
      // get saved scores from localstorage, or if there is none, set to empty array
      var highScores =
        JSON.parse(window.localStorage.getItem("Scores")) || [];
  
      // formats final score for current user
      var finalScore = {
        name: name,
        score: time
      };
  
      // saves score to localstorage
      highScores.push(finalScore);
      window.localStorage.setItem("Scores", JSON.stringify(highScores));
  
      // redirects user to the score page
      window.location.href = "highscores.html";
    }
  }

  

startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;