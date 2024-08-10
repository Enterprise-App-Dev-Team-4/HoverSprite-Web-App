document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Navbar component
    var content = document.getElementById("navbar-container");
    content.innerHTML = returnNavBar();
    // content.innerHTML = returnNavBarStyle();
    activeClick();
  });
  