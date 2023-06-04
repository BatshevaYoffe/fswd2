document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (isUserExists(username, password)) {
      // עושה מה שצריך כאשר הכניסה מוצלחת
      localStorage.setItem('playnow', JSON.stringify(username));
      // שמירת הנתונים ב-Cookie עם זמן תפוגה
      setCookie('username', username, 1); // ימים
      setCookie('password', password, 1); // ימים
      // העברה לעמוד אחר\
      window.location.href = 'home.html';


      console.log('התחברת בהצלחה!');
    } else {
      // עושה מה שצריך כאשר הכניסה נכשלת
      alert('שם משתמש או סיסמה שגויים!');
      console.log('שם משתמש או סיסמה שגויים!');
    }
});
  
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
  
    if (!isUserExists(newUsername)) {
      const newUser = {
        username: newUsername,
        password: newPassword,
        score:0,
        loginTimes:0,
        winTimes:0
      };
  
      addUserToLocalStorage(newUser);
      console.log('נרשמת בהצלחה!');
    } else {
      console.log('שם משתמש כבר קיים!');
    }
});
  
function getUsersFromLocalStorage() {
    const usersString = localStorage.getItem('users');
    if (usersString){
      return JSON.parse(usersString) || [];
    }
    return [];
}
  
function isUserExists(username, password) {
    const users = getUsersFromLocalStorage();
  
    return users.some(user => user.username === username && user.password === password);
}
  
function addUserToLocalStorage(user) {
    const users = getUsersFromLocalStorage();
    users.push(user);
  
    localStorage.setItem('users', JSON.stringify(users));
}
  // מציג את טופס ההרשמה
function showRegistrationForm() {
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
}
  
  // מציג את טופס הכניסה
function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registrationForm").style.display = "none";
}
  
  // מאזין ללחיצה על כפתור ההרשמה ומפעיל את פונקציית ההצגה המתאימה
document.getElementById("registrationButton").addEventListener("click", showRegistrationForm);
  
  // מאזין ללחיצה על כפתור הכניסה ומפעיל את פונקציית ההצגה המתאימה
document.getElementById("loginButton").addEventListener("click", showLoginForm);
  // פונקציה להגדרת Cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function updateLoginTimes(username) {
  // שליפת רשימת המשתמשים מהלוקל סטורז
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // חיפוש המשתמש לפי שם המשתמש
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      // עדכון הניקוד של המשתמש
      users[i].loginTimes =users[i].loginTimes +1;
      break;
    }
  }
  // שמירת רשימת המשתמשים בלוקל סטורז
  localStorage.setItem('users', JSON.stringify(users));
}
