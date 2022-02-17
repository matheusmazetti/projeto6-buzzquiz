let allQuizzes = [];
let id = null;
let hit = null;
let userQuiz = null;
let objQuiz = {};

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

function enterQuizCreation(){
    let addHidden = document.querySelector(".list-quizz-1");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".list-quizz-2");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz");
    addHidden.classList.remove("hidden");
    addHidden = document.querySelector(".pag-quizz");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz-1");
    addHidden.classList.remove("hidden");
}

function createQuiz1(){
    objQuiz.title = document.querySelector(".quizTitle").value;
    objQuiz.image = document.querySelector(".quizImage").value;
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
    allQuizzes = quiz.data;
    allQuizzes.forEach(element => {
        id = element.id;
        let quizzes = document.querySelector(".all-quizz");
        quizzes.innerHTML += `
        <div class="quizz ${element.id}" onclick="selectQuiz(${element.id})">
            <h2>${element.title}</h2>
            <div class="mask"></div>
            <img class="quizz-img" src="${element.image}"/>
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

// inserir os elementos, banner, título, perguntas e respostas da página do quizz dinâmicamente
function captureQuizz(id){
    let quizzSelect = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    quizzSelect.then(bannerQuizz)
    quizzSelect.catch(deuxabu);
}
function deuxabu(){
    alert("xabu");
}
function bannerQuizz(quizz){
    let banner = document.querySelector(".banner-quizz");
    let url = quizz.data.image;
    banner.style.backgroundImage = `url('${url}')`;
    titleQuizz(quizz)
}

function titleQuizz(quizz){
    let titleQuestion = document.querySelector(".question");
    let length = quizz.data.questions.length;
    for(let i = 0; i<length;i++){
        titleQuestion.innerHTML += `<h1 id='color${i}'>${quizz.data.questions[i].title}</h1>
                                    <div class="options" id='option${i}' ></div>
        `;
        let color = quizz.data.questions[i].color;
        backgroundColor(i,color);
        optionsQuizz(quizz, i);
    }
}
function backgroundColor(i,color){
    let background = document.querySelector(`#color${i}`);
    background.style.backgroundColor += `${color}`;
}

function optionsQuizz(quizz, i){
    let optionQuizz = document.querySelector(`#option${i}`)
    let length = quizz.data.questions.length;
            for(let j = 0; j < length; j++){
                let urlimage = quizz.data.questions[i].answers[j].image;
                let nameImage = quizz.data.questions[i].answers[j].text;
                optionQuizz.innerHTML += `<figure><img class='img-anwers' src="${urlimage}" alt="">${nameImage}</figure>`;
            }
}

function comparador() { 
	return Math.random() - 0.5; 
}

//fazer a validação de respostas certas
