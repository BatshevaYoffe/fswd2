// function setLoggedInCookie(minutes, username) {
//   console.log("set");
//   var expirationDate = new Date();
//   expirationDate.setTime(expirationDate.getTime() + (minutes * 60 * 1000));
//   document.cookie = `loggedIn=true; expires=${expirationDate.toUTCString()}; path=/`;
//   document.cookie = `username=${encodeURIComponent(username)}; expires=${expirationDate.toUTCString()}; path=/`;
// }

// function getLoggedInUsername() {
//   console.log('get');
//   const cookies = document.cookie.split(";").map(cookie => cookie.trim());
//   const loggedInCookie = cookies.find(cookie => cookie.startsWith("loggedIn="));
//   const usernameCookie = cookies.find(cookie => cookie.startsWith("username="));
//   const loggedIn = loggedInCookie ? loggedInCookie.split("=")[1].trim() : null;
//   const username = usernameCookie ? decodeURIComponent(usernameCookie.split("=")[1].trim()) : null;
//   console.log(loggedIn);
//   console.log(username);
//   return loggedIn === "true" ? username : null;
// }


// function setLoggedInCookie(minutes, username) {
//   console.log(username);
//   var expirationDate = new Date();
//   expirationDate.setTime(expirationDate.getTime() + (minutes * 60 * 1000));
//   document.cookie = `loggedIn=true; expires=${expirationDate.toUTCString()}; path=/`;
//   document.cookie = `username=${encodeURIComponent(username)}; expires=${expirationDate.toUTCString()}; path=/`;
// }

// function getLoggedInUsername() {
//   const cookies = document.cookie.split(";").map(cookie => cookie.trim());
//   const loggedInCookie = cookies.find(cookie => cookie.startsWith("loggedIn="));
//   const usernameCookie = cookies.find(cookie => cookie.startsWith("username="));
//   const loggedIn = loggedInCookie ? loggedInCookie.split("=")[1].trim() : null;
//   const username = usernameCookie ? decodeURIComponent(usernameCookie.split("=")[1].trim()) : null;
//   return loggedIn === "true" ? username : null;
// }


// if(getLoggedInUsername()){
//   window.location.href = 'home.html';
// }

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(U) {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
      window.location.href = 'home.html';

  } else {
    //  user = prompt("Please enter your name:","");
     if (U != "" && U != null) {
       setCookie("username", user, 30);
     }
  }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (isUserExistslogin(username, password)) {
      // עושה מה שצריך כאשר הכניסה מוצלחת
      localStorage.setItem('playnow', JSON.stringify(username));
      // setLoggedInCookie(2,username);
      console.log('after set');
      updateLoginTimes(username);
      checkCookie(username);
      // העברה לעמוד אחר\
      // window.location.href = 'home.html';

// console.log(`${getLoggedInUsername()}cooki`);
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
  
    if (!isUserExistsreg(newUsername)) {
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
  
function isUserExistslogin(username, password) {
    const users = getUsersFromLocalStorage();
  
    return users.some(user => user.username === username && user.password === password);
}

function isUserExistsreg(username, password) {
  const users = getUsersFromLocalStorage();

  return users.some(user => user.username === username || user.password === password);
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
