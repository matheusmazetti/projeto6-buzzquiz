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
let legthQuizz = null;
let nivel = '';
let imgEnd = '';
let percent = null;
let descript = null;

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
    let qtdPerguntas = document.querySelector(".quizQuestions").value;
    let qtdLevels = document.querySelector(".quizLevels").value;
    console.log(qtdPerguntas);
    if(qtdPerguntas < 3 || objQuiz.title === "" || objQuiz.image === "" || qtdLevels < 2 ||
    objQuiz.title.length < 20 || objQuiz.title.length > 65 || !objQuiz.image.match(/(?:http(s)?:\/\/)?[\^w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)){
        alert("erro");
    } else {
        enterQuizCreation2();
        showQuestionsqtd(qtdPerguntas)
    }
}

function createQuiz2(qtd){
    
}

function enterQuizCreation2(){
    let addHidden = document.querySelector(".create-quizz-1");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz-2");
    addHidden.classList.remove("hidden");
}

function showQuestionsqtd(qtd){
    for(let i = 1; i <= qtd; i++){
        let showQuestions = document.querySelector(".create-quizz-2");
        showQuestions.innerHTML += `
        <div class="box-pergunta ${i}">
            <h2>Pergunta ${i}</h2>
            <input class="texto-pergunta-${i}" type="text" placeholder="Texto da pergunta">
            <input class="cor-pergunta-${i}" type="text" placeholder="Cor de fundo da pergunta">
            <div class="q">
                <h2>Resposta correta</h2>
                <input class="resposta-correta-pergunta-${i}" type="text" placeholder="Resposta correta">
                <input class="imagem-correta-pergunta-${i}" type="text" placeholder="URL da imagem">
            </div>
            <div class="q">
                <h2>Respostas Incorretas</h2>
                <input class="resposta-errada-1-pergunta-${i}" type="text" placeholder="Resposta incorreta 1">
                <input class="imagem-errada-1-pergunta-${i}" type="text" placeholder="URL da imagem 1">
            </div>
            <div class="q">
                <input class="resposta-errada-2-pergunta-${i}" type="text" placeholder="Resposta incorreta 2">
                <input class="imagem-errada-2-pergunta-${i}" type="text" placeholder="URL da imagem 2">
            </div>
            <div class="q">
                <input class="resposta-errada-3-pergunta-${i}" type="text" placeholder="Resposta incorreta 3">
                <input class="imagem-errada-3-pergunta-${i}" type="text" placeholder="URL da imagem 3">
            </div>
        </div>`;
    }
    let showButton = document.querySelector(".create-quizz-2");
    showButton.innerHTML += `<button onclick="createQuiz2(${qtd})">Prosseguir para criar as perguntas</button>`;
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
    window.location.reload();
    // let addHidden = document.querySelector(".list-quizz-1");
    // addHidden.classList.remove("hidden");
    // addHidden = document.querySelector(".list-quizz-2");
    // addHidden.classList.remove("hidden");
    // addHidden = document.querySelector(".pag-quizz");
    // addHidden.classList.add("hidden");
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
    let length = quizzSelect.data.questions[i].answers.length;
            for(let j = 0; j < length; j++){
                let property = quizzSelect.data.questions[i].answers[j];
                let urlimage = property.image;
                let nameImage = property.text;
                answer = property.isCorrectAnswer;
                optionQuizz.innerHTML += `<figure id='fig${j}'><img class='img-answers' id='img${j}' onclick='opacityImages(${answer}, ${i},${j})' src="${urlimage}" alt="">${nameImage}</figure>`;
            }
}

function comparador() { 
	return Math.random() - 0.5; 
}

//adicionar o estilo quando selecionar uma opção
function opacityImages(answer,i, j){
    if(click==i){
        let images = document.querySelectorAll(`#option${i} .img-answers`);
        images.forEach(element =>{
            element.style.opacity = "0.3";
        })
        let image = document.querySelector(`#option${i} #img${j}`)
        image.style.opacity = '1';
        click++;
        answers.push(answer);
        let textImage = document.querySelector(`#fig${j}`).innerText; 
        // console.log(textImage);
        textRed(i);
        screenEnd();
    }
}

function textRed(i){
    let txt = document.querySelectorAll(`#option${i} figure`)
    // :/
}
function textGreen(i,j){
    let textImagee = document.querySelector(`#option${i} #fig${j}`);
}

// validar o número de respostas corretas
function screenEnd(){
    if(answers.length == quizzSelect.data.questions.length){
        percentHits();
        messageEnd();
        let pag = document.querySelector('.endQuizz');
        pag.classList.remove('hidden');
        let pagQZ = document.querySelector(".pag-quizz");
        pagQZ.classList.add("hidden");
    }
}
function percentHits(){
    answers.forEach(element =>{
        if(element == true){
            hit++;
        }
    })
    percent = (hit/answers.length)*100;
    percent = Math.round(percent);
}

//exibir a tela final do jogo
function messageEnd(){
    console.log(quizzSelect)
    for(let i = 0; i<quizzSelect.data.levels.length; i++){
        let valueLevel = quizzSelect.data.levels[i].minValue;
        let msg = quizzSelect.data.levels[i].text;
        let img = quizzSelect.data.levels[i].image;
        // console.log(msg);
        if(percent>=valueLevel){
            nivel = `${percent}% de acerto`;
            imgEnd = img;
            descript = msg;
        }
    }
    innerScreen()
}
function innerScreen(){
    let pag = document.querySelector('.endQuizzResult');
    pag.innerHTML += `
                <h1>${nivel}</h1>
                <img src='${imgEnd}'>
                <h2> ${descript} </h2>
    `
}

function returnQuizz(){
    let endScreen = document.querySelector(".endQuizz");
    let pagQuizz = document.querySelector(".pag-quizz");
    endScreen.classList.add("hidden");
    pagQuizz.classList.remove("hidden");
    click = 0;
    let pics = document.querySelectorAll("figure img");
    pics.forEach(element =>{
        element.style.opacity = "1";
    })
    let answer = null;
    let answers = [];
    let legthQuizz = null;
    let nivel = '';
    let imgEnd = '';
    let percent = null;
    let descript = null; 

}