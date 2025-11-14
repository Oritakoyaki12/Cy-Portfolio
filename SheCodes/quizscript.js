
// This is the Quiz Question and Answer Data
// each questions has an array of possible answers
// with a 'correct' property to indicate the right answer
// Each answer contains the answer text and whether it is correct or not
const questions = [
   {
    question: "What does HTML *really* stand for?",
    answers: [
      { text: "Hot Tech Makeup Lines", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "How To Make Latte", correct: false },
      { text: "Hot Tech Markup Language", correct: false }
    ]
  },

  {
    question: "If CSS was a girlboss, what would she be best at?",
    answers: [
      { text: "Styling everything flawlessly 💅", correct: true },
      { text: "Debugging code", correct: false },
      { text: "Drinking 5 coffees at once", correct: false },
      { text: "Taking selfies", correct: false }
    ]
  },

 {
    question: "JavaScript walks into a bar. What does it do?",
    answers: [
      { text: "Throws an error 🍸", correct: true },
      { text: "Orders CSS a drink", correct: false },
      { text: "Starts a function", correct: false },
      { text: "Changes the background color", correct: false }
    ]
  },

  {
    question: "What’s every coder’s real superpower?",
    answers: [
      { text: "Googling the right question 😎", correct: true },
      { text: "Mind reading", correct: false },
      { text: "Coding with eyes closed", correct: false },
      { text: "Predicting bugs before they happen", correct: false }
    ]
  },

  {
    question: "What’s the main purpose of JavaScript?",
    answers: [
      { text: "Making websites come alive ✨", correct: true },
      { text: "Adding more bugs", correct: false },
      { text: "Styling the page", correct: false },
      { text: "Fixing your sleep schedule", correct: false }
    ]
  },

    {
    question: "What happens if you forget the closing tag in HTML?",
    answers: [
      { text: "Your code explodes", correct: false },
      { text: "The browser cries a little", correct: true },
      { text: "You get a virus", correct: false },
      { text: "The internet shuts down", correct: false }
    ]
  },
  
    {
    question: "Why do developers prefer dark mode?",
    answers: [
      { text: "Because light attracts bugs 🪲", correct: true },
      { text: "Because it’s aesthetic", correct: false },
      { text: "To hide the crying", correct: false },
      { text: "To look mysterious", correct: false }
    ]
  },

  {
    question: "What’s the golden rule of SheCodes?",
    answers: [
      { text: "Code. Coffee. Confidence. ☕💻💋", correct: true },
      { text: "Cry, code, repeat", correct: false },
      { text: "Copy, paste, manifest", correct: false },
      { text: "Always blame JavaScript", correct: false }
    ]
  }

];

//the DOM Element References

//Grabs HTML elements by their IDs to manipulate them later
const questionElement = document.getElementById("question"); // this is where the question text will be displayed
const answerButtonsElement = document.getElementById("answer-buttons"); // where answer buttons will be added
const nextButton = document.getElementById("next-btn"); // the button to go to the next question or play again

//Quiz state variables

//Tracks which question the user is on and their score
let currentQuestionIndex = 0;
let score = 0;

//Start Quiz function. This function initializes the quiz
//by resetting the question index and score, updating the next button text,
//and displaying the first question.
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};


// Display Question function. This function displays the current question
// and its possible answers. It resets the state, sets the question text,
// creates buttons for each answer, and adds event listeners to handle answer selection.
function showQuestion() {
  //Clear previous question and answers
  resetState();

  //Get current question based on the index
  let currentQuestion = questions[currentQuestionIndex];
  
  //Display question number and text
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  //Create and displays buttons for each answer
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text; // Set button text to answer text
    button.classList.add("btn"); // Add CSS class for styling
    answerButtonsElement.appendChild(button); // Add button to the answer buttons container
    
    // Store whether the answer is correct in a data attribute
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

     // Add click event listener to check the answer when clicked
    button.addEventListener("click", selectAnswer);
});
};


//Reset State function. This function clears the previous question and answers
function resetState() {
  nextButton.style.display = "none"; // Hide the next button
  //Remove all answer buttons
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//Select Answer function. This function handles the logic when an answer is selected
function selectAnswer(e){
  const selectedButton = e.target; // the button that was clicked
  const isCorrect =selectedButton.dataset.correct === "true"; // eto yung checker if the answer is correct or not
 
// This handles the visual feedback and score updating based on the selected answer
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++; // So if the answer is correct, increase the score by 1 
  } else {
    selectedButton.classList.add("wrong");
  }
  //Highlight the correct answer and disable all buttons after an answer is selected
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true; // this disables all buttons and prevent further clicks
    });
    //Show the next button after an answer is selected
    nextButton.style.display = "block";
}

//Show Score function. This function displays the user's final score
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again"; // Changes the next button text to "Play Again"
  nextButton.style.display = "block"; // Shows the "Play Again" button
}


// Handle Next Button function. This function manages the transition to the next question or the end of the quiz
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
   // Show the next question if there are more questions
    showQuestion();
  } else { // there's no more questions, then it will display the final score
    showScore();
  }
}

// next Button Event Listener
// This listens for clicks on the next button and either moves to the next question or restarts the quiz
nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

//Start the quiz when the page loads
 startQuiz();