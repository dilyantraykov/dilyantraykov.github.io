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

    var gameOverHTML = "<h1>Честито, вече можеш да си получиш наградата!</h1>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("Коя е героинята, по която всички симпваха в началото на League of Legends?", "Катарина", "<img src='resources/league-of-legends.jpg'/>", "#F79328", "пробвай на кирилица"),
    new Question("Как се казва \"пиратският\" кораб, който плава с туристи към Атон?", "Menia Maria", "<img src='resources/ship.jpg'/>", "#4E698C", "Името на кораба се римува с пълното име на любимата ни позната - Ая."),
    new Question("\"And I said?\"", "Bitch", "<img src='resources/bitch.jpg'/>", "#5B7D49"),
    new Question("Кой е любимият цвят на Дидо?", "син", "<img src='resources/colors.jpg'/>", "#A23090"),
    new Question("В кое гръцко градче ти беше първата рисувана татуировка?", "Никити", "<img src='resources/greek-city.jpg'/>", "#1982C3", "Градче с топ гироси, които даже една година бяха изгоряли."),
    new Question("Предполагам знаеш изпълнителя на оригинала на тази песен, но знаеш ли къде е роден той?", "сеул", "<audio controls><source src='resources/cannibal.mp3' type='audio/mpeg'>Your browser does not support the audio element.</audio>", "#5D016D"),
    new Question("Къде за първи път гледа \"Карибски пирати\"?", "Sofia Land", "<img src='resources/pirates.jpg'/>", "#C29F4C", "пробвай на латиница"),
    new Question("Кое е това съзвездие?", "касиопея", "<img src='resources/kassiopeia.jpg'/>", "#061E47"),
    new Question("Назови мазен гей, долен чалгар и секси испанец, известни като триото най-големи свалячи, познати на човечеството.", "Ицо, Мацо, Пацо", "<img src='resources/imp.jpg'/>", "#751D25", "раздели имената със запетая, последвана от празно място"),
    new Question("Къде за първи път гледа \"Игра на Тронове\"?", "Ормос Панагиас", "<img src='resources/got.jpg'/>", "#393C3B", "Най-скучното гръцко селце евар."),
    new Question("Сканирай кода отдолу и виж какво ще намериш. Кой град би асоциирала с откритото поздравче?", "букурещ", "<img src='resources/youtube-code.png'/>", "#d0021b"),
    new Question("Какво е най-вкусното нещо, което можеше да си вземеш от лафката на 138-мо?", "сандвич с маслини", "<img src='resources/138.jpg'/>", "#A37B70"),
    new Question("Какъв е ароматът на една вилорайска зимна вечер през 2017, сгушени в леглото пред телевизора?", "на агнешко", "<img src='resources/ribaritsa.jpg'/>", "#6C752C", "отговорът е във формат 'на ...'"),
    new Question("Разбери как да откриеш песента, която съответства на кода отдолу в Spotify. Като намериш песента, се почувствай поздравена и въведи името й.", "say you won't let go", "<img src='resources/spotify-code.jpeg'/>", "#025b0e"),
];

var quiz = new Quiz(questions);