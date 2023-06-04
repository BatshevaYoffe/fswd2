
const words = ["javascript", "html", "css", "node"];
const LIST = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));
var username =JSON.parse(localStorage.getItem('playnow'));

let secretWord;
let guessedLetters;
let guessesLeft;
let initialScore = 10;

const wordDisplay = document.getElementById("word-display");
const guessesLeftDisplay = document.getElementById("guesses-left");
const lettersGuessedDisplay = document.getElementById("letters-guessed");
const keyboardContainer = document.getElementById("keyboard");
const gameOverMessage = document.getElementById("game-over-message");


initializeGame();

function initializeGame() {
  secretWord = chooseRandomWord();
  guessedLetters = [];
  guessesLeft = initialScore;

  wordDisplay.textContent = generateWordDisplay(secretWord, guessedLetters);
  guessesLeftDisplay.textContent = `Guesses Left: ${guessesLeft}`;
  lettersGuessedDisplay.textContent = `Letters Guessed:`;

  gameOverMessage.classList.add("hidden");
  generateKeyboard();
}

function chooseRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function generateWordDisplay(word, guessedLetters) {
  let display = "";
  for (const letter of word) {
    if (guessedLetters.includes(letter)) {
      display += letter;
    } else {
      display += "_";
    }
    display += " ";
  }
  return display.trim();
}

function generateKeyboard() {
  for (const letter of LIST) {
    console.log("generateKeyboard");
    const button = document.createElement("button");
    button.classList.add("letter-button");
    button.textContent = letter;
    button.addEventListener("click", handleGuess);
    keyboardContainer.appendChild(button);
  }
}

function handleGuess(event) {
  const guessedLetter = event.target.textContent.toLowerCase();

  if (!guessedLetters.includes(guessedLetter)) {
    guessedLetters.push(guessedLetter);
    if (!secretWord.includes(guessedLetter)) {
      guessesLeft -= 1;
    }
  }

  wordDisplay.textContent = generateWordDisplay(secretWord, guessedLetters);
  guessesLeftDisplay.textContent = `Guesses Left: ${guessesLeft}`;
  lettersGuessedDisplay.textContent = `Letters Guessed: ${guessedLetters.join(", ")}`;

  event.target.disabled = true;

  checkGameOver();
}

function checkGameOver() {
  if (guessesLeft <= 0) {
    gameOverMessage.textContent = "Game Over - You Lose!";
    gameOverMessage.classList.remove("hidden");
    disableLetterButtons();
  } else if (!wordDisplay.textContent.includes("_")) {
    updateScore(username,initialScore);
    gameOverMessage.textContent = "Congratulations - You Win!";
    gameOverMessage.classList.remove("hidden");
    disableLetterButtons();
  }
}

function disableLetterButtons() {
  const letterButtons = document.querySelectorAll(".letter-button");
  letterButtons.forEach(button => button.disabled = true);
}

function updateScore(username, newScore) {
  console.log("update");
  // שליפת רשימת המשתמשים מהלוקל סטורז
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // חיפוש המשתמש לפי שם המשתמש
  for (var i = 0; i < users.length; i++) {
      console.log(users[i].username);
      console.log(username);

    if (users[i].username === username) {
      // עדכון הניקוד של המשתמש
      console.log(users[i]);

      users[i].score =users[i].score +newScore;
      break;
    }
  }

  // שמירת רשימת המשתמשים בלוקל סטורז
  localStorage.setItem('users', JSON.stringify(users));
}

