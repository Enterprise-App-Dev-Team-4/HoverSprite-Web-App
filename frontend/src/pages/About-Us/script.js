document.addEventListener("DOMContentLoaded", function() {
    fetch("../../components/Navbar.html")
      .then(response => response.text())
      .then(html => {
        document.getElementById("navbar-container").innerHTML = html;
        // Dynamically load CSS
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../../css/Navbar.css'; // Adjust the path as needed
        document.head.appendChild(link);
  
        // Dynamically load JavaScript
        let script = document.createElement('script');
        script.src = '../../components/Navbar.js'; // Adjust the path as needed
        document.body.appendChild(script);
      })
      .catch(error => console.error('Error loading the navbar:', error));
  });
  