/*
Put in head:
<link rel="stylesheet" href="css/footer.css">

Put in bottom of body:
<footer id="footer"></footer>
<script src="js/footer.js"></script>
*/

document.addEventListener("DOMContentLoaded", () => {
    const footerElement = document.getElementById('footer');

    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            footerElement.innerHTML = data;
        })
        .catch(error => {
            console.error(error);
            footerElement.innerHTML = "<p>Error loading footer.</p>";
        });
});