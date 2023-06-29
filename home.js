// שליפת השם מאחסון המקומי
var storedUsername = JSON.parse(localStorage.getItem('playnow'));
var usernameElement = document.getElementById('username');
usernameElement.textContent = "HELLO "+storedUsername;

document.addEventListener('DOMContentLoaded', function () {
  // שליפת נתונים מהלוקל סטורז
  var players = JSON.parse(localStorage.getItem('users')) || [];
  players.sort(function (a, b) {
    return b.score - a.score;
  });
  // קישור לתגית tbody של טבלת הניקוד
  var scoreboardBody = document.getElementById('scoreboardBody');

  // יצירת שורות בטבלה עבור כל שחקן
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var row = scoreboardBody.insertRow();


    // יצירת תאים עבור שם המשתמש והניקוד
    var nameCell = row.insertCell();
    nameCell.textContent = player.username;


    var scoreCell = row.insertCell();
    scoreCell.textContent = player.score;

    var loginTimesCell = row.insertCell();
    loginTimesCell.textContent = player.loginTimes;

    var winTimesCell = row.insertCell();
    winTimesCell.textContent = player.winTimes;

console.log(storedUsername);
console.log(player.username);
	if(player.username===storedUsername){
    console.log('yes');
		row.className = 'play_now_user';
	}
  }
});