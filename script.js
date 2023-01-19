(function(){
/*
https://plainenglish.io/blog/top-beginner-friendly-projects-using-apis-f43356aeac7f
https://opentdb.com/api_config.php Trivia API
*/

/*
variables to select elements from the DOM 
*/
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const start = document.querySelector("#start");
const next = document.querySelector("#next");
const numba = document.querySelector("#numba");
const question = document.querySelector("#question");
const options = document.querySelectorAll("input[type='radio']");
const aa = document.querySelector("#aa");
const bb = document.querySelector("#bb");
const cc = document.querySelector("#cc");
const dd = document.querySelector("#dd");
const feedback = document.querySelector("#feedback");
const again = document.querySelector("#again");

/*
Global variables plus Object to hold API URLs
*/
let score = 0;
let numbaDigit = 1;

const obj = [
  {9: {
    easy: "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple",
    medium: "https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple",
    hard: "https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple"
}}
 , {17: {
  easy: "https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple",
  medium: "https://opentdb.com/api.php?amount=1&category=17&difficulty=medium&type=multiple",
  hard: "https://opentdb.com/api.php?amount=1&category=17&difficulty=hard&type=multiple"
}}
  ,{18: {
    easy: "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple",
    medium: "https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple",
    hard: "https://opentdb.com/api.php?amount=1&category=18&difficulty=hard&type=multiple"
}}
,{27: {
  easy: "https://opentdb.com/api.php?amount=1&category=27&difficulty=easy&type=multiple",
  medium: "https://opentdb.com/api.php?amount=1&category=27&difficulty=medium&type=multiple",
  hard: "https://opentdb.com/api.php?amount=1&category=27&difficulty=hard&type=multiple"
}}
]

/*
Function to get Fetch API URL based on chosen question standards
*/
function getURL(){
  const catSel = category.value;
  const difSel = difficulty.value;
  const catInd = category.selectedIndex;
  return obj[catInd-1][catSel][difSel];
}

/* Alternative way to run getURL function
function getUR2() {
  const selCategory = category.value;
  const selDifficulty = difficulty.value;
  
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].hasOwnProperty(selCategory)) {
      if (obj[i][selCategory].hasOwnProperty(selDifficulty)) {
        return obj[i][selCategory][selDifficulty];
      }
    }
  }
}
*/

/*
Async Function to get Fetch API data
*/
async function fetchQA(){
  try {
      let argueURL = getURL();
      const response = await fetch(argueURL);
      const data = await response.json();
      console.log(data.results[0]);
      setQuest(data);
      setAns(data);
      correctAns(data);
  } catch (error) {
      console.error(error);
      feedback.style.color = "red";
      feedback.innerHTML = `First select Category and Difficulty level, then press Start`;
      feedback.style.fontSize = "1.2rem";
      setTimeout(() => {
        location.reload();
      }, 4000);
  }
}

/*
Function to populate question
*/
function setQuest(data){
      question.textContent = data.results[0].question;
}

/*
Function to populate multiple choice answers
*/
function setAns(data){
    const correct_answer = data.results[0].correct_answer;
    const incorrect_answers = data.results[0].incorrect_answers;

    const allAnswers = [...incorrect_answers, correct_answer];
    allAnswers.sort(() => Math.random() - 0.5);
    console.log(allAnswers);

    const answerElements = [aa, bb, cc, dd];

    for (let i = 0; i < allAnswers.length; i++) {
        answerElements[i].previousSibling.textContent = allAnswers[i];
    }
}

/*
Function to disable buttons options in course of game
*/
function disableOptions(options, e) {
  options.forEach(option => {
    if(option !== e.target) {
      option.setAttribute("disabled", "true");
    }
  });
  start.setAttribute("disabled", "true");
  next.removeAttribute("disabled");
}

/*
Function to reset options when its time to move to next question
*/
function resetOptions() {
  options.forEach(option => {
    option.parentElement.parentElement.style.backgroundColor = "#5ba3f1";
    option.removeAttribute("disabled");
    option.checked = false;
  });
}

/*
Function to populate feedback to keep track of game score
*/
function populateFeedback() {
  feedback.innerHTML = `Score: ${score}/${numbaDigit} `;
}

/*
Function to populate numba variable to keep track of questions answered
*/
function populateNumba() {
  numba.textContent = numbaDigit;
}

/*
addEventListener to kickstart quiz on click
*/
start.addEventListener("click", () => {
  fetchQA();
});

/*
addEventListener to activate question options
*/
function correctAns(data){
  options.forEach(option => {
    option.addEventListener("change", e => {
      if(e.target.previousSibling.textContent === data.results[0].correct_answer){
        e.target.parentElement.parentElement.style.backgroundColor = "green";
        score++;
        populateFeedback();
        disableOptions(options, e);
        
      } else {
        e.target.parentElement.parentElement.style.backgroundColor = "red";
        populateFeedback();
        disableOptions(options, e);
      }
    });
  });
}

/*
addEventListener to fire up next button
*/
next.addEventListener("click", () => {
  if (numbaDigit === 5){
    next.setAttribute("disabled", "true");
    again.removeAttribute("disabled");
    feedback.innerHTML = `Game over! Final Score: ${score}/${numbaDigit}. Press "Play again" to have another try`;
    feedback.style.color = "#00008B";
    feedback.style.fontSize = "1.2rem";
  } else {
  numbaDigit++;
  populateNumba();
  resetOptions();
  fetchQA(); }
});

/*
addEventListener to fire up again button
*/
again.addEventListener("click", () => {
  location.reload();
});
        
})();
