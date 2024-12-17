window.onload = function() {
    fetch('nav.html') .then(response => response.text())         
    .then(data => document.getElementById('navbar').innerHTML = data)         
    .catch(error => console.error('Det gick inte att ladda navbaren:', error));
} 
// --