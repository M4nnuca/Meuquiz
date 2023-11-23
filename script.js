
import questions from "./questions.js";


const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const questionCountElement = document.querySelector(".spnQtd");
const finishTextElement = document.querySelector(".finish span");
const contentElement = document.querySelector(".content");
const finishContentElement = document.querySelector(".finish");
const restartButtonElement = document.querySelector(".finish button");

let currentIndex = 0;
let personalityScores = {
  extroversion: 0,
  agreeableness: 0,
  conscientiousness: 0,
  emotionalStability: 0,
  openness: 0
};

restartButtonElement.onclick = () => {
    contentElement.style.display = "flex";
    finishContentElement.style.display = "none";

    currentIndex = 0;
    personalityScores = {
      extroversion: 0,
      agreeableness: 0,
      conscientiousness: 0,
      emotionalStability: 0,
      openness: 0
    };
    loadQuestion();
};

function nextQuestion(e){
    const currentQuestion = questions[currentIndex];
    const selectedAnswer = currentQuestion.answers.find(answer => answer.option === e.target.innerText);

    // Incrementar as pontuações de personalidade com base na resposta selecionada
    personalityScores.extroversion += selectedAnswer.extroversion || 0;
    personalityScores.agreeableness += selectedAnswer.agreeableness || 0;
    personalityScores.conscientiousness += selectedAnswer.conscientiousness || 0;
    personalityScores.emotionalStability += selectedAnswer.emotionalStability || 0;
    personalityScores.openness += selectedAnswer.openness || 0;

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz(){
    // Exibir o perfil de personalidade com base nas pontuações acumuladas
    finishTextElement.innerHTML = `
        Seu perfil de personalidade:
        Extroversão: ${personalityScores.extroversion},
        Simpatia: ${personalityScores.agreeableness},
        Conscienciosidade: ${personalityScores.conscientiousness},
        Estabilidade Emocional: ${personalityScores.emotionalStability},
        Abertura: ${personalityScores.openness}
    `;

    contentElement.style.display = "none";
    finishContentElement.style.display = "flex";
}

function loadQuestion() {
    questionCountElement.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const currentQuestion = questions[currentIndex];
    answersElement.innerHTML = "";
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const answerDiv = document.createElement("div");
        answerDiv.innerHTML = `<button class="answer">
            ${answer.option}
        </button>`;

        answersElement.appendChild(answerDiv);
    });

    document.querySelectorAll(".answer").forEach((item, index) => {
        item.addEventListener("click", nextQuestion);
    });
}

loadQuestion();
