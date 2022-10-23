function printHighscores() {
    // get scores from localstorage or set as empty array
    var highscores = JSON.parse(window.localStorage.getItem("Scores")) || [];
  
    // sort scores from high to low
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });

    // creates a li tag for each score
    highscores.forEach(function(score) { 
      var liTag = document.createElement("li");
      liTag.textContent = score.name + " : " + score.score;
  
      // display scores on page
      var olEl = document.getElementById("Scores");
      olEl.appendChild(liTag);
    });
  }
  
  // removes saved scores 
  function clearHighscores() {
    window.localStorage.removeItem("Scores");
    window.location.reload();
  }
  
  // calls function
  printHighscores();

  // 'clear highscores' button
  document.getElementById("clear").onclick = clearHighscores;