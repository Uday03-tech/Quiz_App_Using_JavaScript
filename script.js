// Array of quiz questions with options and correct answers
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
      { text: "Ernest Hemingway", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "O2", correct: false },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false },
    ],
  },
  {
    question: "What is the largest mammal?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
    ],
  },
];

// Get HTML elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;

// Function to start/restart the quiz
function startQuiz() {
  currentQuestionIndex = 0; // reset question index
  score = 0; // reset score
  nextButton.innerHTML = "Next"; // set button text
  showQuestion(); // display first question
}

// Function to display current question and answers
function showQuestion() {
  resetState(); // clear previous answers
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  // Display question text
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Loop through answers and create buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); // create button
    button.innerHTML = answer.text; // set answer text
    button.classList.add("btn"); // add CSS class
    answerButtonsElement.appendChild(button); // add button to UI

    // Store correct answer in dataset
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    // Add click event to each button
    button.addEventListener("click", selectAnswer);
  });
}

// Function to reset UI before showing next question
function resetState() {
  nextButton.style.display = "none"; // hide next button

  // Remove all previous answer buttons
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;

  // Check if selected answer is correct
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct"); // highlight correct answer
    score++; // increase score
  } else {
    selectedBtn.classList.add("incorrect"); // highlight wrong answer
  }

  // Show correct answer and disable all buttons
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // highlight correct answer
    }
    button.disabled = true; // disable all buttons after selection
  });

  nextButton.style.display = "block"; // show next button
}

// Function to display final score
function showScore() {
  resetState(); // clear answers

  // Show score message
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;

  nextButton.innerHTML = "Play Again"; // change button text
  nextButton.style.display = "block"; // show button
}

// Function to handle next button click
function handleNextButton() {
  currentQuestionIndex++; // move to next question

  // Check if more questions are left
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore(); // show final score
  }
}

// Event listener for next button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz(); // restart quiz
  }
});

// Start the quiz on page load
startQuiz();
