function loadNavBar()
{
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Navbar component
    var content = document.getElementById("navbar-container");
    content.innerHTML = returnNavBar();
    // content.innerHTML = returnNavBarStyle();
    activeClick();
  });
  
}

function loadFooter()
{
  console.log('Hello  footer');
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Navbar component
    var content = document.getElementById("footer-container");
    content.innerHTML = returnFooter();
  });
}

loadFooter();
loadNavBar();