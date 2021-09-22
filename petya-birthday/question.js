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

function Question(text, answer, resource, color) {
    this.text = text;
    this.resource = resource;
    this.answer = answer;
    this.color = color;
}

Question.prototype.isCorrectAnswer = function(input) {
    return this.answer.toLowerCase() === input.toLowerCase();
}

function populate() {
    if (quiz.isEnded()) {
        showEnd();
    }
    else {
        var quizBox = document.getElementById("grid");
        quizBox.style = "background: " + quiz.getQuestionIndex().color;

        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var resourceDiv = document.getElementById("resource");
        resourceDiv.innerHTML = quiz.getQuestionIndex().resource;

        var button = document.getElementById("guess-button");
        button.onclick = function() {
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
                tip.innerText = "Опитай пак!";
            }
        }
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showEnd() {
    var gameOverHTML = "<h1>Честито, вече можеш да си получиш подаръците!</h1>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// color ideas:
// blue - #2B6AD0 #061E47 #1F4591

var questions = [
    new Question("Кой е любимият цвят на Дидо?", "син", "<img src='resources/colors.png'/>", "#2B6AD0"),
    new Question("Кое е това съзвездие?", "касиопея", "<img src='resources/kassiopeia.jpg'/>", "#061E47"),
    new Question("Предполагам знаеш изпълнителя на оригинала на тази песен, но знаеш ли къде е роден той??", "сеул", "<audio controls><source src='resources/cannibal.mp3' type='audio/mpeg'>Your browser does not support the audio element.</audio>", "#1F4591"),
    new Question("Намери някой с инсталиран Spotify на телефона и разбери как да намериш песента, която съответства на кода отдолу. Като намериш песента, се почувствай поздравена и въведи името й.", "say you won't let go", "<img src='resources/spotify-code.jpeg'/>", "#025b0e"),
    new Question("Сканирай кода отдолу и виж какво ще намериш. Кой град би асоциирала с откритото поздравче?", "say you won't let go", "<img src='resources/youtube-code.png'/>", "#d0021b"),
];

var quiz = new Quiz(questions);

populate();