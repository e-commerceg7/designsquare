const form = document.getElementById('form-login');
const username = document.getElementById('inputUsername');
const password = document.getElementById('inputPassword');

// Hämta "Forgotten Password"-knappen
const forgottenPasswordButton = document.querySelector('.forgotten-password');

// Lyssnare för inloggningsformuläret
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stoppar standardformulärets skickande

  // Kontroll av användarnamn och lösenord
  if (username.value === 'Grupp7' && password.value === '123') {
    // Omdirigerar till admin-sidan
    window.location.href = 'admingpage.html';
  } else {
    alert('Incorrect username or password');
  }
});

// Lyssnare för "Forgotten Password"-knappen
forgottenPasswordButton.addEventListener('click', (e) => {
  alert('Contact Customer Service'); // Visar meddelande
});

// --