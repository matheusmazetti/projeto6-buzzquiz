let allQuizzes = [];
let id = null;
let hit = null;

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
    console.log(quizz.data);
    for(let i = 0; i<quizz.data.length;i++){
        titleQuestion.innerHTML = `<h1>${quizz.data.title}</h1>`;
        console.log(quizz.data.title);
        optionsQuizz(quizz);
    }
}

function optionsQuizz(quizz){
    let optionsQuizz = document.querySelector(".options");
    let questions = quizz.data.questions;
    let textQuestion = quizz.data.title;
    // console.log(textQuestion);
    questions = questions.sort(comparador);
<<<<<<< HEAD
    // for(j = 0; j<questions.length; j++){

        for(let i = 0; i < questions.length; i++){
            titleQuestion.innerHTML = `<h1>${quizz.data.title}</h1>`;
            let urlimage = questions[i].answers[i].image;
            let nameImage = questions[i].answers[i].text;
            optionsQuizz.innerHTML += `<figure><img src="${urlimage}" alt="">${nameImage}</figure>`
        }
    // }
=======
    console.log(questions);
    questions.forEach(element =>{
        let urlimage = questions[0].answers[0].image;
        optionsQuizz.innerHTML = `<figure><img src="${element.answers.image}" alt="">Gatinho</figure>`
    })
>>>>>>> 8edb5c0da7c378f22687ecadb62d5b57d24331d6
    
}

function comparador() { 
	return Math.random() - 0.5; 
}
