let originalWord = "";

function shuffleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
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
    const filteredWords = words.filter(word => word.length >= minLength && word.length <= minLength + 1);

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
        }, 2000);
    } else {
        result.textContent = "Грешен отговор. Опитайте отново.";
        result.className = "incorrect";
    }
}

// Listen for the Enter key press in the input field
document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

document.getElementById("minLength").addEventListener("change", newWord);

newWord();
