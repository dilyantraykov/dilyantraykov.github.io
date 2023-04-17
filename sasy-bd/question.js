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

function Question(text, answer, resource, color, tip, authorName, authorImage) {
    this.text = text;
    this.resource = resource;
    this.answer = answer;
    this.color = color;
    this.tip = tip;
    this.authorName = authorName;
    this.authorImage = authorImage;
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

        var authorNameSpan = document.getElementById("author-name");
        authorNameSpan.innerHTML = quiz.getQuestionIndex().authorName;

        var authorImage = document.getElementById("author-image");
        authorImage.src = "resources/authors/" + quiz.getQuestionIndex().authorImage;
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
        answerTextBox.blur();
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
    new Question("Как се казваше фестивала в София, на който те поканих при първата ни интеракция по чат?", "A to Jazz", "<img src='resources/festival.jpg'/>", "#103E5A", "част от името е музикален жанр", "Дидо", "dido.jpg"),
    new Question("Какво е първото нещо което сготвихме заедно?", "лазаня", "<img src='resources/cooking.jpg'/>", "#6E4230", "Не е суши", "Анди", "andy.jpg"),
    new Question("Как може да наречеш 'Ани, Дори, Жени, Ива, Деси, Стефи и Саси' само с 5 букви?", "НАРКО", "<img src='resources/7v.jpg'/>", "#525E3A", "Нарича се така, защото не можете една без друга.", "Стефи", "stefi.jpg"),
    new Question("What is the collective name for our closest friends?", "The Chus", "<img src='resources/group.jpg'/>", "#28370C", "The ...", "Emily", "emily.jpg"), 
    new Question("В чие бунгало трябваше да спят някои от нас на лагера в Равда, което доведе до това да спим 5 момичета в стая за двама?", "Кръстева", "<img src='resources/ravda.jpg'/>", "#052943", "Въведи само фамилията", "Жени", "jeni.jpg"),
    new Question("Какво пишеше на тениската, която носих когато излязохме за първи път в Единбург и ме налазиха гейовете?", "Sailors dream", "<img src='resources/tshirt.jpg'/>", "#10181B", "една мечта...", "Влачко", "vladi.jpg"),
    new Question("През коя година НАРКО се събра в пълен състав за пръв път?", "2008", "<img src='resources/narko.jpg'/>", "#78A475", "На рождения ден на Жени.", "Жени", "jeni.jpg"),
    new Question("Кое число те преследва навсякъде?", "23", "<img src='resources/numbers.jpg'/>", "#1F2E47", "няма нужда от подсказка!", "Ани", "ani.jpg"),
    new Question("Какъв е прякора на двете момчета от Равда?", "Боба и джоджена", "<img src='resources/vegetables.jpg'/>", "#346B34", "По азбучен ред с малък член... хъх...", "Дори", "dori.jpg"),
    new Question("For who's birthday we were told to wear strictly Red?", "Florenz and Flo", "<img src='resources/red-dresses.jpg'/>", "#EC312A", "F&F", "Izabela", "izabela.jpg"), 
    new Question("С кой вид алкохол препихме в Равда, като бяхме на море с 51во?", "Текила", "<img src='resources/bottles.jpg'/>", "#971D1E", "Даже и без лимони пихме тия шотове гадни", "Дори", "dori.jpg"),
    new Question("Един от първите ни концерти заедно беше на Керана и космонавтите. Можеш ли обаче да изнамериш кода на билета, с който влезе в Терминал онази вечер?", "IKIREQ88", "<img src='resources/kerana.jpg'/>", "#EC312A", "опитай в Messenger", "Дидо", "dido.jpg"), 
    new Question("Какъв прякор ни бяха дали гаднярките от съседния клас и нашия клас в 51во?", "Кенефен чай", "<img src='resources/writings.jpg'/>", "#605D52", "Групичката на Светла, Хриси, Габи и т.н.", "Дори", "dori.jpg"),
    new Question("Браво, преполови въпросите. Ето ти една поущрителна наградка! А за да продължиш, въведи текста най-долу вдясно на отворения документ.", "истински мед", "<iframe src='resources/honey-certificate.pdf'></iframe>", "#EACD12", "", "Дидо", "dido.jpg"),
    new Question("С какво те уцели Богоев в час по английски?", "Химикал", "<img src='resources/teacher.jpg'/>", "#525E3A", "Пише се с него", "Ива", "iva.jpg"),
    new Question("Къде се събрахме с Кари и Джина през 2014?", "B Bath", "<img src='resources/vlachko.jpg'/>", "#8F0100", "Баня", "Влачко", "vladi.jpg"),
    new Question("Долу може да чуеш една от първите песни, които се осмелих да ти изсвиря. Знаеш ли обаче коя година е роден оригиналният й изпълнител?", "1945", "<audio controls><source src='resources/wonderful.mp3' type='audio/mpeg'>Явно не можеш да отвориш този файл. Оплачи се на Дидо.</audio>", "#5D016D", "", "Дидо", "dido.jpg"),
    new Question("В какво специално превозно средство си се возила по морето с няколко момчета?", "Линейка", "<img src='resources/vehicles.jpg'/>", "#B8141E", "На стоп...", "Дори", "dori.jpg"),
    new Question("What surprised you about me the very first time met?", "Age", "<img src='resources/surprise.jpg'/>", "#F29301", "You had to ask me about it before you handed me the application form!", "Emily", "emily.jpg"), 
    new Question("На коя дата ни напусна Честър Бенингтън - дата, позната в историята и като \"Вечерта, в която ме открадна\"?", "20/07/2017", "<img src='resources/chester.jpg'/>", "#090B40", "Въведи датата във формат DD/MM/YYYY", "Дидо", "dido.jpg"),
    new Question("На какво седна на 12-тия ми рожден ден?", "Тортата", "<img src='resources/party.jpg'/>", "#525E3A", "Важен елемент от един рожден ден", "Ива", "iva.jpg"),
    new Question("Като бяхме по малки използвах наименованието на митологично създание като дразнещ прякор. Кое е митичното създание, на което те оприличавах?", "Саскуоч", "<img src='resources/creatures.jpg'/>", "#313131", "Не е чудовището от Лох Нес", "Анди", "andy.jpg"),
    new Question("Разбери как да откриеш песента, която съответства на кода отдолу в Spotify. Въведи името на песента, последвано от интервал и първото име на певицата.", "силна мила", "<img src='resources/spotify-code.jpeg'/>", "#025b0e", "Това са само 2 от многото качества, които обичам в теб.", "Дидо", "dido.jpg"),
];

var quiz = new Quiz(questions);