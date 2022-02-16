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