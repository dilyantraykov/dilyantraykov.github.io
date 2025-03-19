let originalWord = "";
let letterGroups = [
    ["к", "у", "р"],
    ["п", "у", "т", "к", "а"],
    ["п", "е", "н", "и", "с"]
];

function removeFirstOccurrence(word, letter) {
    const index = word.indexOf(letter);
    if (index !== -1) {
        return word.slice(0, index) + word.slice(index + 1);
    }
    return word;
}

function isGroupPresent(word, group) {
    return group.every(letter => word.includes(letter));
}

function shuffleWord(word) {
    let groupedLetters = [];
    let remainingLetters = [];
    let groupFound = false;
    var finalWord = word;

    letterGroups.forEach(group => {
        if (!groupFound && isGroupPresent(word, group)) {
            groupedLetters.push(group.join(''));
            group.forEach(letter => {
                finalWord = removeFirstOccurrence(finalWord, letter);
            });

            console.log(finalWord);
            groupFound = true;
        }
    });

    remainingLetters = finalWord.split('').sort(() => Math.random() - 0.5);

    let shuffledWord = [...remainingLetters];

    groupedLetters.forEach(group => {
        let randomPosition = Math.floor(Math.random() * (shuffledWord.length + 1));
        shuffledWord.splice(randomPosition, 0, group);
    });

    return shuffledWord.join('');
}

async function loadWords() {
    const response = await fetch("words.txt");
    const text = await response.text();
    return text.split("\n").map(word => word.trim()).filter(word => word.length > 0);
}

async function newWord() {
    const words = await loadWords();
    const minLength = parseInt(document.getElementById("minLength").value); // Get selected minimum length

    // Filter words based on the selected minimum length
    const filteredWords = words.filter(word => word.length >= 0);

    if (filteredWords.length === 0) {
        document.getElementById("word").textContent = "Няма налични думи с тази дължина!";
        return;
    }

    originalWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    let shuffled = shuffleWord(originalWord);
    
    while (shuffled === originalWord) {
        shuffled = shuffleWord(originalWord);
    }

    document.getElementById("word").textContent = shuffled.toUpperCase();  // Convert the shuffled word to uppercase
    document.getElementById("result").textContent = "";  // Clear the result message
    document.getElementById("result").className = "";  // Remove any styles
    document.getElementById("guess").value = "";  // Clear the input field
}

function checkGuess() {
    const guess = document.getElementById("guess").value.trim();
    const result = document.getElementById("result");
    if (guess.toLowerCase() === originalWord) {
        result.textContent = "Правилно!";
        result.className = "correct";
        setTimeout(() => {
            newWord();
        }, 1500);
    } else {
        result.textContent = "Грешен отговор. Опитайте отново.";
        result.className = "incorrect";
    }
}

function showOriginalWord() {
    const result = document.getElementById("result");
    result.textContent = "Търсената дума беше " + originalWord.toUpperCase();
    result.className = "info";
    setTimeout(() => {
        newWord();
    }, 1500);
}

document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        showOriginalWord();
    }
});

document.getElementById("minLength").addEventListener("change", newWord);

newWord();
