let questions = [
  {
    q: "Given the array animals = ['cow', 'pig', 'chicken', 'duck'], how would you print 'chicken' to the console?",
    a: [
      { option: "A: console.log(animals.chicken)", isCorrect: false },
      { option: "B: console.log(animals['chicken'])", isCorrect: false },
      { option: "C: console.log(animals[3]", isCorrect: false },
      { option: "D: console.log(animals[2])", isCorrect: true },
    ],
  },
  {
    q: "Given the object person = {name: Tom, age: 32}, how would you print the age of 32 to the console?",
    a: [
      { option: "A: console.log(person.age)", isCorrect: false },
      { option: "B: console.log(person['age'])", isCorrect: false },
      { option: "C: Both A and B", isCorrect: true },
      { option: "D: None of the above", isCorrect: false },
    ],
  },
  {
    q: "How do you declare a variable in JavaScript?",
    a: [
      { option: "A: With the var keyword", isCorrect: false },
      { option: "B: With the let keyword", isCorrect: false },
      { option: "C: Both A and B", isCorrect: true },
      { option: "D: None of the above", isCorrect: false },
    ],
  },
  {
    q: "Which JavaScript statment can be used to create an array containing each individual word of a string?",
    a: [
      { option: "A: let words = string.split(' ')", isCorrect: true },
      { option: "B: const words = string.split(',')", isCorrect: false },
      { option: "C: let words = string.join(' ')", isCorrect: false },
      { option: "D: None of the above", isCorrect: false },
    ],
  },
  {
    q: "Which method(s) can be used to iterate over an array?",
    a: [
      { option: "A: array.each", isCorrect: false },
      { option: "B: array.for", isCorrect: false },
      { option: "C: array.iterate", isCorrect: false },
      { option: "D: None of the above", isCorrect: true },
    ],
  },
  {
    q: "Given array = ['cat', 'dog', 'bird', mouse']. What will the be returned by the statement array.length > 4?",
    a: [
      { option: "A: True", isCorrect: false },
      { option: "B: False", isCorrect: true },
      { option: "C: undefined", isCorrect: false },
      { option: "D: None of the above", isCorrect: false },
    ],
  },
  {
    q: "Can new object properties be added to an object after it has been created?",
    a: [
      { option: "A: Yes, if the object was created using the let keyword", isCorrect: false },
      { option: "B: Yes, if the object was created using the const keyword", isCorrect: false },
      { option: "C: Both A and B", isCorrect: true },
      { option: "D: None of the above.", isCorrect: false },
    ],
  },
  {
    q: "Given the objects objA = {name: Tom}, and objB = {name: Tom}. What will be returned by the statment objA === objB?",
    a: [
      { option: "A: False ", isCorrect: true },
      { option: "B: True", isCorrect: false },
      { option: "C: An exception will be thrown", isCorrect: false },
      { option: "D: None of the above", isCorrect: false },
    ],
  },
  {
    q: "Will variables declared using the const and let keywords will be hoisted?",
    a: [
      { option: "A: No", isCorrect: true },
      { option: "B: Yes", isCorrect: false },
      { option: "C: Sometimes", isCorrect: false },
      { option: "D: Yes, if they were declared inside of a function", isCorrect: false },
    ],
  },
  {
    q: "Can JavaScript prototypes be modified?",
    a: [
      { option: "A: Yes", isCorrect: true },
      { option: "B: No", isCorrect: false },
      { option: "C: It depends", isCorrect: false },
      { option: "D: A request must be made to Google if you wish to modify the prototypes", isCorrect: false },
    ],
  },
];

// Wait for DOM to render, then run JavaScript
$(document).ready(() => {
  // Declare global variables
  let score;
  let timeRemaining;
  let questionIndex;
  let interval;
  let scores = loadScores();

  // Declare variables for DOM elements
  // Display Elements
  let actionsArea = $("#actions");
  let homeScreen = $("#home-screen");
  let quizScreen = $("#quiz-screen");
  let scoreInputScreen = $("#score-input-screen");
  let scoreboardScreen = $("#scoreboard-screen");
  let questionEl = $("#question");
  let answerListEl = $("#answer-list");
  let scoreEl = $("#score");
  let timerEl = $("#timer");
  let pointTotalEl = $("#point-total");
  let scoresListEl = $("#scores-list");
  let initialsListEl = $("#initials-list");

  // Interactive Elements
  let startBtn = $("#start-btn");
  let scoreboardBtn = $("#scoreboard-btn");
  let submitInitialsBtn = $("#submit-initials-btn");
  let initialsInputEl = $("#initials-input");
  let clearScoresBtn = $("#clear-scores-btn");
  let returnBtn = $("#return-btn");

  // Add Event Listeners
  scoreboardBtn.click(() => {
    hideHomeScreen();
    showScoreboardScreen();
  });

  startBtn.click(startQuiz);

  answerListEl.on("click", ".btn", checkAnswer);

  submitInitialsBtn.click(() => {
    saveScore();
    hideScoreInputScreen();
    showScoreboardScreen();
  });

  returnBtn.click(returnHome);

  clearScoresBtn.click(clearScores);

  // Game Functions
  function quizInit() {
    // Initialize quiz variables to starting values
    timeRemaining = 90;
    questionIndex = 0;
    score = 0;
  }

  function startQuiz() {
    quizInit();
    startTimer();
    hideActionArea();
    hideHomeScreen();
    showQuizScreen();
    displayQuestion();
  }

  function endQuiz() {
    hideQuizScreen();
    pointTotalEl.text(score);
    showScoreInputScreen();
  }

  function checkAnswer(e) {
    if(e.target.dataset.answer === "true") {
      score += 10;      
    }else {
      timeRemaining -= 10;
    }

    if(questionIndex < questions.length - 1) {
      questionIndex++;
      answerListEl.html("");
      displayQuestion();
    }else {
      endQuiz();
    }

  }

  function startTimer() {
    interval = setInterval(() => {
      if (timeRemaining > 0) {
        timerEl.text(timeRemaining);
        scoreEl.text(score);
      } else {
        clearInterval(interval);
        endQuiz();
      }
      timeRemaining--;
    }, 1000);
  }

  // Local Storage Functions
  function saveScore() {
    // Get user intials from DOM input element and
    // create a new user object
    let user = {
      initials: initialsInputEl.val(),
      score: score,
    };

    // Push user object to scores array
    scores.push(user);

    // Save scores array to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  function loadScores() {
    let scores = JSON.parse(localStorage.getItem("scores"));
    if (scores) {
      return scores;
    } else {
      return [];
    }
  }

  function clearScores() {
    // Clear scores from local storage
    localStorage.removeItem("scores");
    scoresListEl.html("");
    displayScores();
  }

  // UI Functions
  function displayQuestion() {
    questionEl.text(questions[questionIndex].q);
    questions[questionIndex].a.forEach((answer) => {
      answerListEl.append(
        `<li><button class="btn btn-danger w-100" data-answer="${answer.isCorrect}">${answer.option}</button></li>`
      );
    });
  }

  function displayScores() {
    scoresListEl.html("");
    initialsListEl.html("");

    scores = loadScores();

    if (scores.length != 0) {
      scores.forEach((item) => {
        initialsListEl.append(`<li>${item.initials}</li>`);
        scoresListEl.append(`<li>${item.score}</li>`);
      });
    }
  }

  function returnHome() {
    hideScoreboardScreen();
    showActionArea();
    showHomeScreen();
  }

  function showActionArea() {
    actionsArea.removeClass("hide");
  }

  function hideActionArea() {
    actionsArea.addClass("hide");
  }

  function showHomeScreen() {
    homeScreen.removeClass("hide");
  }

  function hideHomeScreen() {
    homeScreen.addClass("hide");
  }

  function showQuizScreen() {
    quizScreen.removeClass("hide");
  }

  function hideQuizScreen() {
    quizScreen.addClass("hide");
  }

  function showScoreInputScreen() {
    scoreInputScreen.removeClass("hide");
  }

  function hideScoreInputScreen() {
    scoreInputScreen.addClass("hide");
  }

  function showScoreboardScreen() {
    scoreboardScreen.removeClass("hide");
    displayScores();
  }

  function hideScoreboardScreen() {
    scoreboardScreen.addClass("hide");
  }
});
