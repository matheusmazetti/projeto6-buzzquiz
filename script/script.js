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
    let length = quizz.data.questions.length;
    // console.log(length);
    // console.log(quizz.data)
    // console.log(quizz.data.questions);
    for(let i = 0; i<length;i++){
        titleQuestion.innerHTML += `<h1>${quizz.data.questions[i].title}</h1>`;
        optionsQuizz(quizz);
    }

}

function optionsQuizz(quizz){
    let optionsQuizz = document.querySelector(".options");
    console.log(quizz);
    let length = quizz.data.questions.length;
        for(let i = 0; i < length; i++){
            for(let j = 0; j < length; j++){
                let urlimage = quizz.data.questions[i].answers[j].image;
                let nameImage = quizz.data.questions[i].answers[j].text;
                console.log(urlimage)
                console.log(nameImage)
            optionsQuizz.innerHTML += `<figure><img src="${urlimage}" alt="">${nameImage}</figure>`
            }
        }
}

function comparador() { 
	return Math.random() - 0.5; 
}
