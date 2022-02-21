//variáveis globais
let allQuizzes = [];
let id = null;
let hit = null;
let userQuiz = null;
let objQuiz = {};
let quizzSelect = [];
let click = 0;
let cont = 0;
let objQuestion = [];
let objLevels = [];
let answer = null;
let answers = [];
let legthQuizz = null;
let nivel = '';
let imgEnd = '';
let percent = null;
let descript = null;
let pag = document.querySelector('.endQuizzResult');


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
    objQuiz.title.length < 20 || objQuiz.title.length > 65 || !objQuiz.image.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)){
        alert("erro");
    } else {
        enterQuizCreation2();
        showQuestionsqtd(qtdPerguntas);
        showLevels(qtdLevels);
    }
}

function createQuiz2(qtd){
    let obj = {};
    let objRespostas = [];
    let erro = null;
    for(i = 1; i <= qtd; i++){
        let titulo = document.querySelector(`.texto-pergunta-${i}`).value;
        let cor = document.querySelector(`.cor-pergunta-${i}`).value;
        let correct = document.querySelector(`.resposta-correta-pergunta-${i}`).value;
        let correctImage = document.querySelector(`.imagem-correta-pergunta-${i}`).value;
        let incorrect1 = document.querySelector(`.resposta-errada-1-pergunta-${i}`).value;
        let incorrect1Image = document.querySelector(`.imagem-errada-1-pergunta-${i}`).value;
        let incorrect2 = document.querySelector(`.resposta-errada-2-pergunta-${i}`).value;
        let incorrect2Image = document.querySelector(`.imagem-errada-2-pergunta-${i}`).value;
        let incorrect3 = document.querySelector(`.resposta-errada-3-pergunta-${i}`).value;
        let incorrect3Image = document.querySelector(`.imagem-errada-3-pergunta-${i}`).value;
        if(titulo.length < 20 || cor.length != 7 || cor[0] != "#" || correct == "" || incorrect1 == "" ||
        incorrect2 == "" || incorrect3 == "" || incorrect1Image.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)|
        incorrect2Image.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)|
        incorrect3Image.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)|
        correctImage.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)){
            erro = 'erro';
            i = 10000;
            alert("Erro");
        } else {
            objRespostas[0] = {
                text: correct,
                image: correctImage,
                isCorrectAnswer: true
            }
            objRespostas[1] = {
                text: incorrect1,
                image: incorrect1Image,
                isCorrectAnswer: false
            }
            objRespostas[2] = {
                text: incorrect2,
                image: incorrect2Image,
                isCorrectAnswer: false
            } 
            objRespostas[3] = {
                text: incorrect3,
                image: incorrect3Image,
                isCorrectAnswer: false
            }
            obj = {
                text: titulo,
                color: cor,
                answers: objRespostas
            }
            objQuestion[i-1] = obj;
        }
    }
    if(erro != "erro"){
        objQuiz.questions = objQuestion;
        enterQuizCreation3();
    }
    console.log(i);
}

function createQuiz3(qtd){
    let erro = null;
    let arrayporcentagem = [];
    for(i = 1; i <= qtd; i++){
        let tituloNivel = document.querySelector(`.titulo-nivel-${i}`).value;
        let porcentagem = parseInt(document.querySelector(`.porcentagem-nivel-${i}`).value);
        arrayporcentagem.push(porcentagem);
        let imagem = document.querySelector(`.imagem-nivel-${i}`).value;
        let descricao = document.querySelector(`.descricao-nivel-${i}`).value;
        if(tituloNivel.length < 10 || porcentagem > 100 || porcentagem < 0 || descricao.length < 30){
            erro = 1;
            i = 10000;
            alert("Erro");
        } else {
            objLevels[i-1] = {
                title: tituloNivel,
                image: imagem,
                text: descricao,
                minValue: porcentagem
            }
        }
    }
    if(arrayporcentagem.includes(0) && erro == null){
        objQuiz.levels = objLevels;
        let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", objQuiz);
        promise.then(enterQuizCreation4);
        promise.catch(alert("Erro no envio do quiz"));
    } else {
        alert("Erro");
    }
}

function enterQuizCreation4(newId){
    alert("envio correto");
}

function enterQuizCreation2(){
    let addHidden = document.querySelector(".create-quizz-1");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz-2");
    addHidden.classList.remove("hidden");
}

function enterQuizCreation3(){
    let addHidden = document.querySelector(".create-quizz-1");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz-2");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz-3");
    addHidden.classList.remove("hidden");
}

function showQuestionsqtd(qtd){
    for(let i = 1; i <= qtd; i++){
        let showQuestions = document.querySelector(".create-quizz-2");
        showQuestions.innerHTML += `
        <div class="box-pergunta ${i}">
            <h2>Pergunta ${i}</h2>
            <input data-identifier="question" class="texto-pergunta-${i}" type="text" placeholder="Texto da pergunta">
            <input data-identifier="question" class="cor-pergunta-${i}" type="text" placeholder="Cor de fundo da pergunta">
            <div class="q">
                <h2>Resposta correta</h2>
                <input data-identifier="question" class="resposta-correta-pergunta-${i}" type="text" placeholder="Resposta correta">
                <input data-identifier="question" class="imagem-correta-pergunta-${i}" type="text" placeholder="URL da imagem">
            </div>
            <div class="q">
                <h2>Respostas Incorretas</h2>
                <input data-identifier="question" class="resposta-errada-1-pergunta-${i}" type="text" placeholder="Resposta incorreta 1">
                <input data-identifier="question" class="imagem-errada-1-pergunta-${i}" type="text" placeholder="URL da imagem 1">
            </div>
            <div class="q">
                <input data-identifier="question" class="resposta-errada-2-pergunta-${i}" type="text" placeholder="Resposta incorreta 2">
                <input data-identifier="question" class="imagem-errada-2-pergunta-${i}" type="text" placeholder="URL da imagem 2">
            </div>
            <div class="q">
                <input data-identifier="question" class="resposta-errada-3-pergunta-${i}" type="text" placeholder="Resposta incorreta 3">
                <input data-identifier="question" class="imagem-errada-3-pergunta-${i}" type="text" placeholder="URL da imagem 3">
            </div>
        </div>`;
    }
    let showButton = document.querySelector(".create-quizz-2");
    showButton.innerHTML += `<button onclick="createQuiz2(${qtd})">Prosseguir para criar as perguntas</button>`;
}

function showLevels(qtd){
    for(let i = 1; i <= qtd; i++){
        let levels = document.querySelector(".create-quizz-3");
        levels.innerHTML += `
        <div class="n1">
            <h2>Nível ${i}</h2>
            <input data-identifier="level" class="titulo-nivel-${i}" type="text" placeholder="Título do nível">
            <input data-identifier="level" class="porcentagem-nivel-${i}" type="number" placeholder="% de acerto mínima">
            <input data-identifier="level" class="imagem-nivel-${i}" type="text" placeholder="URL da imagem do nível">
            <textarea data-identifier="level" class="descricao-nivel-${i}" name="text" id="text" cols="30" rows="15" placeholder="Descrição do nível"></textarea>
        </div>`;
    }
    let levelsButton = document.querySelector(".create-quizz-3");
    levelsButton.innerHTML += `<button onclick="createQuiz3(${qtd})">Prosseguir para criar as perguntas</button>`;
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
        <div class="quizz ${element.id}" data-identifier="quizz-card" onclick="selectQuiz(${element.id})">
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
    let bannerTitle = document.querySelector(".banner-quizz h1")
    bannerTitle.innerHTML = quizzSelect.data.title;
    let url = quizzSelect.data.image;
    banner.style.background = (`linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${url}')`);
    titleQuizz()
}

function titleQuizz(){
    let titleQuestion = document.querySelector(".question");
    let length = quizzSelect.data.questions.length;
    for(let i = 0; i<length;i++){
        titleQuestion.innerHTML += `<div class= "ask"><h1  id='color${i}'>${quizzSelect.data.questions[i].title}</h1></div>
                                    <div class="options" id='option${i}'></div>
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
                
                optionQuizz.innerHTML += `<figure id='fig${j}'>
                <img class='img-answers' id='img${j}' onclick='opacityImages(${answer},this, ${i},${j})' src="${urlimage}"><p class = '${answer}'>${nameImage}</p>
                </figure>`;
            }
}

function comparador() { 
	return Math.random() - 0.5; 
}

//adicionar o estilo quando selecionar uma opção
function opacityImages(answer, element, i, j){
    if(click == i){
        let father = element.parentNode.parentNode;
        let lie = father.querySelectorAll(".false");
        lie.forEach(element => {
        element.style.color = 'red';
        });
        let bet = father.querySelector(".true");
        bet.style.color = "green";

        father.querySelectorAll("figure").forEach(element =>{
            element.style.opacity = '0.3';
        })
        element.parentNode.style.opacity = '1';
        answers.push(answer);
        click++;
        screenEnd();
    }
    // if(click==i){
    //     let images = document.querySelectorAll(`#option${i} .img-answers`);
    //     images.forEach(element =>{
    //         element.style.opacity = "0.3";
    //     })
    //     let image = document.querySelector(`#option${i} #img${j}`)
    //     image.style.opacity = '1';
    //     click++;
    //     answers.push(answer);
    //     let textImage = document.querySelector(`#fig${j}`).innerText; 
    //     textRed(i);
    //     screenEnd();
    // }
}

function textRed(i){
    let txt = document.querySelectorAll(`#option${i} figure`);
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
    // console.log(quizzSelect)
    for(let i = 0; i<quizzSelect.data.levels.length; i++){
        let valueLevel = quizzSelect.data.levels[i].minValue;
        let msg = quizzSelect.data.levels[i].text;
        let img = quizzSelect.data.levels[i].image;
        if(percent>=valueLevel){
            nivel = `${percent}% de acerto`;
            imgEnd = img;
            descript = msg;
        }
    }
    innerScreen()
}
function innerScreen(){
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
    let pics = document.querySelectorAll("figure");
    console.log(pics)
    console.log(pics);
    pics.forEach(element =>{
        element.style.opacity = "1";
    })
    answer = null;
    answers = [];
    legthQuizz = null;
    nivel = '';
    imgEnd = '';
    percent = null;
    descript = null; 
    hit = 0;
    pag.innerHTML="";
}