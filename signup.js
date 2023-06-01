// מציאת כפתור ההרשמה על ידי הזדהות לפי ה-ID שלו
const registerButton = document.getElementById('register-button');

// הוספת אירוע לחיצה לכפתור ההרשמה
registerButton.addEventListener('click', function(event) {
  event.preventDefault(); // מניעת הגשת הטופס באמצעות רענון הדף
  
  // קבלת ערכים משדות הטופס
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // אפשר לבצע פעולות נוספות כמו בדיקת תקינות ועיבוד של הנתונים המקולטים
  // ולשמור אותם ב-Local Storage כמו שצוין בדרישות

  // שמירת הנתונים ב-Local Storage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  localStorage.setItem('score', 0);

  // מעבר לדף הבא
  window.location.href = 'login.html';
});
