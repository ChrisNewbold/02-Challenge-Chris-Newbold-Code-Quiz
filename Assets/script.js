// Selecting the sections from HTML 
// selecting by .class
const startCard = document.querySelector(".start-card");
const startButton = document.querySelector(".start-btn");
const resultsCard = document.querySelector('.results-card')
const endCard = document.querySelector('.end-card')
const questionCard = document.querySelector(".q-card");
const questionText = document.querySelector(".que-text");
const questionTimer = document.querySelector(".timer");
// selecting by #ID
const answer1Button = document.getElementById("answer1");
const answer2Button = document.getElementById("answer2");
const answer3Button = document.getElementById("answer3");
const answer4Button = document.getElementById("answer4");
const endResult = document.getElementById("result");
// adding an event lisnter calling functions on "click"
answer1Button.addEventListener("click", answerSubmitted);
answer2Button.addEventListener("click", answerSubmitted);
answer3Button.addEventListener("click", answerSubmitted);
answer4Button.addEventListener("click", answerSubmitted);
startButton.addEventListener("click", startGame);

// this variable holds the amount of time remaining
var countDownTimer = 75;
// this holds a reference to the interval allowing us to start and stop the timer
let interval;
// this variable holds the current question the player is up to 
let questionNumber = 0;

// this triggers the start of the game starting the question number at 0 and starts the countdown timer
function startGame() {
  questionNumber = 0;
  //this hides the start card and reveals the question card 
  startCard.classList.add('hide')
  questionCard.classList.remove('hide')
  setNextQuestion(questionNumber)
  startTimer()
}
// this calls when the game is finished or when the timer ends
function finishGame() {
  //stops the count down timer
  clearInterval(interval)
  //this hides the result card and reveals the end card******
  questionCard.classList.add('hide')
  resultsCard.classList.remove('hide')
  endResult.textContent = countDownTimer
}
//this decrements the timer
function decrementTimer() {
  countDownTimer = countDownTimer - 1;
  questionTimer.textContent = countDownTimer;
  //if there is no more time remaining the game ends
  if (countDownTimer == 0) {
    finishGame();
  }
}
// if the answer is wrong it decrements the time by 10 seconds
function wrongAnswer() {
  countDownTimer = countDownTimer - 10;
  questionTimer.textContent = countDownTimer;
}
// this decrements the timer every 1 second
function startTimer() {
  interval = setInterval(decrementTimer, 1000)
}
// this updates the question and answers on the questionCard 
function setNextQuestion(index) {
  const currentQuestion = questions[index]
  questionText.textContent = currentQuestion.questionText
  answer1Button.textContent = currentQuestion.options[0]
  answer2Button.textContent = currentQuestion.options[1]
  answer3Button.textContent = currentQuestion.options[2]
  answer4Button.textContent = currentQuestion.options[3]
}
// this is called when the user clicks an answer button
function answerSubmitted(event) {
  event.preventDefault()
  const answer = event.target.value;
  const currentQuestion = questions[questionNumber]
  // this determins if the user chose the wrong answer
  if (currentQuestion.answer != answer) {
    wrongAnswer()

  }
  //if user is on the last question this will end the game or go to the next question
  if (questionNumber === questions.length - 1) {
    finishGame()
  } else {
    questionNumber++
    setNextQuestion(questionNumber)
  }
}
//this is called when the user "clicks" save on the result card
resultsCard.addEventListener("submit", function (e) {
  e.preventDefault()
  //this hides the result card and reveals the end card
  resultsCard.classList.add('hide')
  endCard.classList.remove('hide')
  endCard.textContent = startCard
});