//variáveis globais
let allQuizzes = [];
let id = null;
let hit = null;
let userQuiz = null;
let objQuiz = {};
let quizzSelect = [];
let click = 0;
let answer = null;
let answers = [];

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
    quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    quizz.then(bannerQuizz);
    quizz.catch(deuxabu);
}
function deuxabu(){
    alert("xabu");
}
function bannerQuizz(quizz){
    quizzSelect = quizz;
    let banner = document.querySelector(".banner-quizz");
    let url = quizzSelect.data.image;
    banner.style.backgroundImage = `url('${url}')`;
    titleQuizz()
}

function titleQuizz(){
    let titleQuestion = document.querySelector(".question");
    let length = quizzSelect.data.questions.length;
    for(let i = 0; i<length;i++){
        titleQuestion.innerHTML += `<h1 id='color${i}'>${quizzSelect.data.questions[i].title}</h1>
                                    <div class="options" id='option${i}' ></div>
        `;
        let color = quizzSelect.data.questions[i].color;
        backgroundColor(i,color);
        optionsQuizz(i);
    }
}
function backgroundColor(i,color){
    let background = document.querySelector(`#color${i}`);
    background.style.backgroundColor += `${color}`;
}

function optionsQuizz(i){
    let optionQuizz = document.querySelector(`#option${i}`)
    let length = quizzSelect.data.questions.length;
            for(let j = 0; j < length; j++){
                let property = quizzSelect.data.questions[i].answers[j];
                let urlimage = property.image;
                let nameImage = property.text;
                answer = property.isCorrectAnswer;
                optionQuizz.innerHTML += `<figure><img class='img-answers' id='img${j}' onclick='opacityImages(${answer}, ${i},${j})' src="${urlimage}" alt="">${nameImage}</figure>`;
            }
}

function comparador() { 
	return Math.random() - 0.5; 
}

// fazer a validação de respostas certas

function opacityImages(answer,i, j){
    if(click==i){
        let images = document.querySelectorAll(`#option${i} .img-answers`);
        console.log(images);
        images.forEach(element =>{
            element.style.opacity = "0.3";
        })
        let image = document.querySelector(`#option${i} #img${j}`)
        image.style.opacity = '1';
        click++;
        answers.push(answer)
    }
}
