
  const form = document.getElementById('form-login');
  const username = document.getElementById('inputUsername');
  const password = document.getElementById('inputPassword');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stoppar standardformulärets skickande

    if (username.value === 'Grupp7' && password.value === '123') {
      // Omdirigerar till admin-sidan
      window.location.href = 'admingpage.html';
    } else {
      alert('Incorrect username or password');
    }
  });



// --