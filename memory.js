const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
const gameOverMessage = document.getElementById("game-over-message");

// רשימת האיקונים
const icons = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🐯', '🦁', '🐷', '🐸', '🐵', '🐤', '🦉', '🦆'
];

let cards = [];
let flippedCards = [];
let matchedCards = [];

let initialScore = 10; 
var username =JSON.parse(localStorage.getItem('playnow'));

// יצירת קלף
function createCard(icon) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<span class="hidden">' + icon + '</span>';
    card.addEventListener('click', function () {
        if (!card.classList.contains('flipped') && flippedCards.length < 2) {
            flipCard(card);
        }
    });
    return card;
}

// הפיכת הקלף
function flipCard(card) {
    card.classList.add('flipped');
    card.querySelector('.hidden').style.display = 'block';
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// החזרת הקלפים למערכים המתאימים
function unflipCards() {
    flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.hidden').style.display = 'none';
    });
    flippedCards = [];
}

// התאמת הקלפים
function matchCards() {
    flippedCards.forEach(card => {
        card.classList.add('matched');
        matchedCards.push(card);
    });
    flippedCards = [];
    
    if (matchedCards.length === cards.length) {
        setTimeout(function () {
            updateScore(username,initialScore);
            alert('כל הקלפים מתאימים! תעלה לרמה הבאה.');
            resetGame();
        }, 500);
    }
}

// בדיקת התאמת הקלפים
function checkMatch() {
    const [card1, card2] = flippedCards;
    const icon1 = card1.querySelector('.hidden').innerHTML;
    const icon2 = card2.querySelector('.hidden').innerHTML;

    if (icon1 === icon2) {
        matchCards();
    } else {
        setTimeout(unflipCards, 500);
    }
}

// איפוס המשחק
function resetGame() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = [];
}

// התחלת המשחק
function startGame(level) {
    resetGame();

    const gameContainer = document.querySelector('.game-container');
    //עידכון מספר הקלפים במשחק
    const pairs = level*2;
    initialScore=pairs;
    const randomIcons = icons.sort(() => Math.random() - 0.5).slice(0, pairs);
    const duplicatedIcons = [...randomIcons, ...randomIcons].sort(() => Math.random() - 0.5);


    duplicatedIcons.forEach(icon => {
        const card = createCard(icon);
        cards.push(card);
        gameContainer.appendChild(card);
    });
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
        // עדכון הניקוד ומספר הנצחונות של המשתמש
        users[i].winTimes=users[i].winTimes+1;
        users[i].score =users[i].score +newScore;
        break;
      }
    }
  
    // שמירת רשימת המשתמשים עם עידכון למשתמש המשחק בלוקל סטורז
    localStorage.setItem('users', JSON.stringify(users));
  }
  