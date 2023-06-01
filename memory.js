var username =JSON.parse(localStorage.getItem('playnow'));

const cardsArray = [
	{
		name: 'apple',
		img: 'images/apple.jpeg'
	},
	{
		name: 'banana',
		img: 'images/banana.jpeg'
	},
	{
		name: 'cherry',
		img: 'images/cherry.jpeg'
	},
	{
		name: 'grape',
		img: 'images/grape.jpeg'
	},
	{
		name: 'lemon',
		img: 'images/lemon.jpeg'
	},
	{
		name: 'orange',
		img: 'images/orange.jpeg'
	},
	{
		name: 'pear',
		img: 'images/pear.jpeg'
	},
	{
		name: 'strawberry',
		img: 'images/strawberry.jpeg'
	},
    {
		name: 'apple',
		img: 'images/apple.jpeg'
	},
	{
		name: 'banana',
		img: 'images/banana.jpeg'
	},
	{
		name: 'cherry',
		img: 'images/cherry.jpeg'
	},
	{
		name: 'grape',
		img: 'images/grape.jpeg'
	},
	{
		name: 'lemon',
		img: 'images/lemon.jpeg'
	},
	{
		name: 'orange',
		img: 'images/orange.jpeg'
	},
	{
		name: 'pear',
		img: 'images/pear.jpeg'
	},
	{
		name: 'strawberry',
		img: 'images/strawberry.jpeg'
	},
];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

const gameGrid = document.querySelector('.game-grid');
const resetButton = document.querySelector('.reset-button');

function createBoard() {
    console.log("createBoard");
	for (let i = 0; i < cardsArray.length; i++) {
		const card = document.createElement('div');
		card.classList.add('card');
		card.setAttribute('data-id', i);
		card.addEventListener('click', flipCard);
		gameGrid.appendChild(card);
	}
}

function flipCard() {
	const cardId = this.getAttribute('data-id');
	cardsChosen.push(cardsArray[cardId].name);
	cardsChosenId.push(cardId);
	this.classList.add('flipped');
	if (cardsChosen.length === 2) {
        console.log(cardsChosen);
		setTimeout(checkForMatch, 500);
	}
}

function checkForMatch() {
	const cards = document.querySelectorAll('.card');
	const optionOneId = cardsChosenId[0];
	const optionTwoId = cardsChosenId[1];
	if (cardsChosen[0] === cardsChosen[1]) {
		alert('You found a match!');
        updateScore(username,1);
		cards[optionOneId].classList.add('matched');
		cards[optionTwoId].classList.add('matched');
		cardsWon.push(cardsChosen);
	} else {
		cards[optionOneId].classList.remove('flipped');
		cards[optionTwoId].classList.remove('flipped');
		alert('Sorry, try again.');
	}
	cardsChosen = [];
	cardsChosenId = [];
	if (cardsWon.length === cardsArray.length / 2) {
        updateScore("username",1)
        alert('Congratulations! You found them all!');
	}
}

function resetBoard() {
    console.log("resetBoard");
	gameGrid.innerHTML = '';
	cardsWon = [];
	createBoard();
}

createBoard();

resetButton.addEventListener('click', resetBoard);
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
  