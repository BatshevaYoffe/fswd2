window.addEventListener('load', function() {
	const username = getCookie('username');
	const password = getCookie('password');
  
	// כאן ניתן לעשות מה שצריך עם הנתונים שנשלפו מה-Cookie
	// לדוגמה, תוכל להציג את שם המשתמש בברוכים הבאים או להביא נתונים נוספים מבסיס הנתונים
  
	// פונקציה לשליפת ערך מ-Cookie
	function getCookie(name) {
	  const cookieName = name + '=';
	  const cookieArray = document.cookie.split(';');
	  for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) === ' ') {
		  cookie = cookie.substring(1);
		}
		if (cookie.indexOf(cookieName) === 0) {
		  return cookie.substring(cookieName.length, cookie.length);
		}
	  }
	  return '';
	}
  });
  document.addEventListener('DOMContentLoaded', function() {
    // שליפת נתונים מהלוקל סטורז
    var players = JSON.parse(localStorage.getItem('users')) || [];
  
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
    }
  });
  