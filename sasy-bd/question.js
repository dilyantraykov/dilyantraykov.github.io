function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.questionIndex++;
        return true;
    }

    return false;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, answer, resource, color, tip) {
    this.text = text;
    this.resource = resource;
    this.answer = answer;
    this.color = color;
    this.tip = tip;
}

Question.prototype.isCorrectAnswer = function(input) {
    return this.answer.toLowerCase().trim() === input.toLowerCase().trim();
}

function populate() {
    if (quiz.isEnded()) {
        showEnd();
    }
    else {
        document.body.style = "background: " + quiz.getQuestionIndex().color;

        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var resourceDiv = document.getElementById("resource");
        resourceDiv.innerHTML = quiz.getQuestionIndex().resource;
    }
};

function makeGuess() {
    var answerTextBox = document.getElementById("answer-textbox");
    var tip = document.getElementById("tip");
    var guess = answerTextBox.value;
    var isGuessCorrect = quiz.guess(guess);
    if (isGuessCorrect)
    {
        populate();
        answerTextBox.classList.remove("wrong-answer");
        answerTextBox.value = "";
        answerTextBox.focus();
        tip.innerText = "";
    }
    else
    {
        answerTextBox.classList.add("wrong-answer");
        var questionTip = quiz.getQuestionIndex().tip;
        if (questionTip != undefined)
        {
            tip.innerText = questionTip;
        }
        else
        {
            tip.innerText = "Опитай пак!";
        }
    }
}

function start() {
    var element = document.getElementById("quiz");
    element.className = "";
    var startPage = document.getElementById("start-page");
    startPage.classList.add("invisible");

    var inputForm = document.getElementById("input-form");
    inputForm.addEventListener('submit', event => {
        event.preventDefault();
        makeGuess();
    })

    populate();
}

function showEnd() {
    document.body.style = "background: #d0021b;";

    var gameOverHTML = "<h1>Честито, вече можеш да си получиш наградата! А тя се намира на следната локация...</h1><br /><div id='resource'><img src='resources/location.jpg'/></div>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("Как се казваше фестивала в София, на който те поканих при първата ни интеракция по чат?", "A to Jazz", "<img src='resources/festival.jpg'/>", "#F79328", "част от името е музикален жанр"),
    new Question("Един от първите ни концерти заедно беше на Керана и космонавтите. Можеш ли обаче да изнамериш кода на билета, с който влезе в Терминал онази вечер?", "IKIREQ88", "<img src='resources/kerana.jpg'/>", "#EC312A", "опитай в Messenger"),
    new Question("Долу може да чуеш една от първите песни, които се осмелих да ти изсвиря. Знаеш ли обаче коя година е роден оригиналният й изпълнител?", "1945", "<audio controls><source src='resources/wonderful.mp3' type='audio/mpeg'>Явно не можеш да отвориш този файл. Оплачи се на Дидо.</audio>", "#5D016D"),
    new Question("Браво, преполови въпросите. Ето ти една поущрителна наградка! А за да продължиш, въведи текста най-долу вдясно на отворения документ.", "истински мед", "<iframe src='resources/honey-certificate.pdf'></iframe>", "#EACD12"),
    new Question("На коя дата ни напусна Честър Бенингтън, дата, позната в историята и като \"Вечерта, в която ме открадна\"?", "20/07/2017", "<img src='resources/chester.jpg'/>", "#090B40", "въведи датата във формат DD/MM/YYYY"),
    new Question("Разбери как да откриеш песента, която съответства на кода отдолу в Spotify. Въведи името на песента, последвано от интервал и първото име на певицата. Това са само 2 от многото качества, които обичам в теб.", "силна мила", "<img src='resources/spotify-code.jpeg'/>", "#025b0e"),
];

var quiz = new Quiz(questions);