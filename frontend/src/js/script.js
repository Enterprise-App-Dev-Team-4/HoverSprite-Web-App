

function loadNavBar()
{
  console.log('Hello');
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Navbar component
    var content = document.getElementById("navbar-container");
    content.innerHTML = returnNavBar();
    activeClick();
  });
}

loadNavBar();