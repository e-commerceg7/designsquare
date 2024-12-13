
    const form = document.getElementById('form-login');
    const username = document.getElementById('inputUsername');
    const password = document.getElementById('inputPassword');

    form.addEventListener('submit', (e) => {
        if (username.value !== 'Grupp7') {
            e.preventDefault(); // Stoppar formuläret från att skicka
            alert('Incorrect username or password');
        }

        if (password.value !== '123') {
            e.preventDefault(); // Stoppar formuläret från att skicka
            alert('Incorrect username or password');
        }
    });

