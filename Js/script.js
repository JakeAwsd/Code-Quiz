var questionIndex = 0;
var timeLeft = 75;
var timeInterval;

var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('startBtn');
var submitBtn = document.getElementById('submit');
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");
var feedbackEl = document.getElementById("feedback");
var highscoreEl = document.getElementById("highscoreLink");
var initialsEl = document.getElementById("initials");


function startQuiz() {

  // hide start menu
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  timerEl.textContent = "Time: 75";
  questionsEl.removeAttribute("class");

  // console.log("retrieveQuestion");
  retrieveQuestion();

  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    console.log("timeLeft: " + timeLeft)

  if(timeInterval === 0 || timeLeft <= 0) {
    setInterval(timeInterval);
    endquiz();
    console.log("timeInterval: " + timeInterval)

    }
    // if(timeLeft < 0) {

    // }
  }, 1000);
}

function retrieveQuestion() {
  var currentQuestion = questions[questionIndex];

  var mainEl = document.getElementById("question-main");
  mainEl.textContent = currentQuestion.title
  answersEl.innerHTML = "";

  //Create buttons
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.addEventListener("click", function() {
      guess(choice);
    });
    
    // display on the page
    answersEl.appendChild(choiceNode);

});

}

function guess(choice) {
  console.log(questions[questionIndex].answer);
  // console.log(this.value);
  if (choice !== questions[questionIndex].answer) {
// Subtracts time for getting an answer wrong
    timeLeft -= 15;

    if (timeLeft <= 0) {
      timeLeft = 0;
    }

    timerEl.textContent = "Time : " + timeLeft;

    feedbackEl.textContent = "wrong!";
    console.log("wrong!");
  } else {
    feedbackEl.textContent = "Correct!";
    console.log("Correct!");
  }

feedbackEl.setAttribute("class", "divider");

setTimeout(function() {

  feedbackEl.setAttribute("class", "hide");

}, 1000);

questionIndex++;
// if (questionIndex >= 5) {
// return 0;
// } 

  if (questionIndex === questions.length) {
    endquiz();
  } else {
    retrieveQuestion();
  }
}

function endquiz() {

  clearInterval(timeInterval);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = timeLeft;

    // hide questions section
    var questionsEl = document.getElementById("questions");
    questionsEl.setAttribute("class", "hide");

    timerEl.textContent = "Quiz Ended";    
}

function saveScore() {
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: timeLeft,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkKey(event) {
  if (event.key === "Enter") {
    saveScore();
  }
}

startBtn.addEventListener("click", function() {
  startQuiz();
});

submitBtn.addEventListener("click", function() {
  saveScore();
});

submitBtn.addEventListener("onkeyup", function() {
  checkKey();
});
