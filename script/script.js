function selectQuiz(){
    let addHidden = document.querySelector(".list-quizz-1");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".list-quizz-2");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".create-quizz");
    addHidden.classList.add("hidden");
    addHidden = document.querySelector(".pag-quizz");
    addHidden.classList.remove("hidden");
}

function getQuizzes(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisse.then(showQuizzes);
    promisse.catch(error);
}

function error(erro){
    console.log(erro.status);
}

function showQuizzes(quiz){
    console.log(quiz);
    let allQuizzes = quiz.data;
    allQuizzes.forEach(element => {
        let quizzesHome = document.querySelector(".all-quizz");
        quizzesHome.innerHTML += `
        <div class="quizz ${element.id}" onclick="selectQuiz()">
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
getQuizzes();