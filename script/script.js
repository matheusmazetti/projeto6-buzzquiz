let allQuizzes = [];
let id = null;

function selectQuiz(id){
    let addHidden = document.querySelector(".list-quizz-1");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".list-quizz-2");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".pag-quizz");
    addHidden.classList.remove("hidden");
    captureQuizz(id);
}

function getQuizzes(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisse.then(showQuizzes);
    promisse.catch(error);
}
getQuizzes();

function error(erro){
    console.log(erro.status);
}

function showQuizzes(quiz){
    console.log(quiz);
    allQuizzes = quiz.data;
    allQuizzes.forEach(element => {
        id = element.id;
        let quizzesHome = document.querySelector(".all-quizz");
        quizzesHome.innerHTML += `
        <div class="quizz ${element.id}" onclick="selectQuiz(${id})">
        <h2>${element.title}</h2>
        </div>`
    });
}

function returnHome(){
    let addHidden = document.querySelector(".list-quizz-1");
    addHidden.classList.remove("hidden");
    addHidden = document.querySelector(".list-quizz-2");
    addHidden.classList.remove("hidden");
    addHidden = document.querySelector(".pag-quizz");
    addHidden.classList.add("hidden");
}

function captureQuizz(id){
    let quizzSelect = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    quizzSelect.then(bannerQuizz)
}

// inserir os elementos, banner, título, perguntas e respostas da página do quizz dinâmicamente
function bannerQuizz(quizz){
    let banner = document.querySelector(".banner-quizz");
    let url = quizz.data.image;
    banner.style.backgroundImage = `url('${url}')`;
    titleQuizz(quizz)
}

function titleQuizz(quizz){
    let titleQuestion = document.querySelector(".question");
    titleQuestion.innerHTML = `<h1>${quizz.data.title}</h1>`;
    optionsQuizz(quizz)
}

function optionsQuizz(quizz){
    let optionsQuizz = document.querySelector(".options");
    let questions = quizz.data.questions;
    questions = questions.sort(comparador);
    let urlimage = questions[0].answers[0].image;
    console.log(optionsQuizz)
}

function comparador() { 
	return Math.random() - 0.5; 
}
