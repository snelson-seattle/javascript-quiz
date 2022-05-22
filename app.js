// Declare global variables
let score;
let timeRemaining;
let questionIndex;

// Pull any saved scores from local storage
let scores = loadScores(); 

// Declare variables for DOM elements



//
function quizInit() {
  // Initialize quiz variables to starting values
  timeRemaining = 90;
  questionIndex = 0;
  score = 0;
}

function startQuiz() {}
function displayQuestion() {}
function endQuiz() {}

function saveScores() {
  // Get user intials from DOM input element
  // Create user object with a name and score property
  // push user object to scores array
  // save scores array to local storage
}

function loadScores() {
  let scores = JSON.parse(localStorage.getItem("scores"));
  if (scores) {
    return scores;
  } else {
    return [];
  }
}
