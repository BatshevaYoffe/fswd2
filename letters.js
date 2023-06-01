
const words = ["javascript", "html", "css", "node"];

let secretWord;
let guessedLetters;
let guessesLeft;

const wordDisplay = document.getElementById("word-display");
const guessesLeftDisplay = document.getElementById("guesses-left");
const lettersGuessedDisplay = document.getElementById("letters-guessed");
const letterButtons = document.querySelectorAll(".letter-button");
const startButton = document.getElementById("start-button");
const gameOverMessage = document.getElementById("game-over-message");

startButton.addEventListener("click", startGame);

function startGame() {
  secretWord = chooseRandomWord();
  guessedLetters = [];
  guessesLeft = 10;

  wordDisplay.textContent = generateWordDisplay(secretWord, guessedLetters);
  guessesLeftDisplay.textContent = `Guesses Left: ${guessesLeft}`;
  lettersGuessedDisplay.textContent = `Letters Guessed:`;

  gameOverMessage.classList.add("hidden");
  letterButtons.forEach(button => button.disabled = false);
  letterButtons.forEach(button => button.addEventListener("click", handleGuess));

  console.log(`Secret Word: ${secretWord}`);
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
const list = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));


const keyboardContainer = document.getElementById("keyboard");

for (const letter of list) {
  const button = document.createElement("button");
  button.classList.add("letter-button");
  button.textContent = letter;
  keyboardContainer.appendChild(button);
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
    letterButtons.forEach(button => button.disabled = true);
  } else if (!wordDisplay.textContent.includes("_")) {
    gameOverMessage.textContent = "Congratulations - You Win!";
    gameOverMessage.classList.remove("hidden");
    letterButtons.forEach(button => button.disabled = true);
  }
}
