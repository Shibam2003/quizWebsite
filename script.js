const questions = [
  {
    question:
      "You're 4th place right now in a race. What place will you be in when you pass the person in 3rd place?",
    answers: [
      { text: "1st", correct: false },
      { text: "2nd", correct: false },
      { text: "3rd", correct: true },
      { text: "None of the above", correct: false },
    ],
    feedback1: `☹️Incorrect! <br />
    When you pass the person in 3rd place, you will take their position
    and become the new 3rd place.`,
    feedback2: `😀Correct! <br />
    When you pass the person in 3rd place, you will take their position
    and become the new 3rd place.`,
  },
  {
    question: "How many months have 28 days?",
    answers: [
      { text: "2", correct: false },
      { text: "1", correct: false },
      { text: "All of them", correct: true },
      { text: "Depends if there's a leap year or not", correct: false },
    ],
    feedback1: `☹️Incorrect! <br />
    All months have 28 days because even though some months have more than 28 days, no month has less than 28 days. Therefore, every month has at least 28 days.`,
    feedback2: `😀Correct! <br />
    All months have 28 days because even though some months have more than 28 days, no month has less than 28 days. Therefore, every month has at least 28 days.`,
  },
  {
    question:
      "A farmer has 17 goats. All of them but 8 die. How many goats are alive? ",
    answers: [
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "25", correct: false },
      { text: "35", correct: false },
    ],
    feedback1: `☹️Incorrect! <br />
    Certainly, let's break it down step by step: 1. The farmer starts with 17 goats 2. The phrase "all of them but 8 die" means that all the goats except for 8 have died. So, subtracting those goats from the total, you have 17 - 8 = 9 goats that have died. 3. Therefore, the number of goats that are still alive is the initial number of goats minus the number that have died, which is 17 - 9 = 8 goats. So, there are 8 goats that are still alive.`,
    feedback2: `😀Correct! <br />
    Certainly, let's break it down step by step: 1. The farmer starts with 17 goats 2. The phrase "all of them but 8 die" means that all the goats except for 8 have died. So, subtracting those goats from the total, you have 17 - 8 = 9 goats that have died. 3. Therefore, the number of goats that are still alive is the initial number of goats minus the number that have died, which is 17 - 9 = 8 goats. So, there are 8 goats that are still alive.`,
  },
  {
    question:
      "There are 45 mangoes in your basket. You take three out of the basket. How many mangoes are left in the basket?",
    answers: [
      { text: "3", correct: false },
      { text: "42", correct: true },
      { text: "45", correct: false },
      { text: "I do not eat mangoes", correct: false },
    ],
    feedback1: `☹️Incorrect! <br />
    If you have 45 mangoes in your basket and you take three out of the basket, there will be 42 mangoes left in the basket.`,
    feedback2: `😀Correct! <br />
    If you have 45 mangoes in your basket and you take three out of the basket, there will be 42 mangoes left in the basket.`,
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedBack = document.getElementById("feedback");

let currentQuestionIndex = 0;
let score = 0;

const feedbackFun = (elem) => {
  if (elem) {
    const feedBack = document.createElement("h2");
    feedBack.innerHTML = questions[currentQuestionIndex].feedback2;
    feedBack.id = "feedback";
    answerButtons.appendChild(feedBack);
    // answerButtons.insertAdjacentHTML("afterend", `${feedBack}`);
  } else {
    const feedBack = document.createElement("h2");
    feedBack.innerHTML = questions[currentQuestionIndex].feedback1;
    feedBack.id = "feedback";
    answerButtons.appendChild(feedBack);
  }
};

const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    feedbackFun(true);
  } else {
    selectedBtn.classList.add("incorrect");
    feedbackFun(false);
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

const showQuestion = () => {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  //answers
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

const startQuiz = () => {
  resetState();
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const resetState = () => {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};
const showScore = () => {
  resetState();
  if (score <= 2) {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 👉SHIBAM SE SIKH KE ANA😁`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  } else if (score == 3) {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 👉SHIBAM NE ACHHA SIKHYA HAI👌`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  } else {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 👉SHIBAM KE ACHHA DOST LAGTEHO ISILIYE ITNE SMART HO😍`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
};

const handleNextButton = () => {
  resetState();
  feedBack.remove(feedBack);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    // console.log("hello");
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
