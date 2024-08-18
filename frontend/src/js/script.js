const navBarURL = 'http://localhost:8080/userName';


function loadNavBar()
{
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Navbar component
    var content = document.getElementById("navbar-container");
    sendRequestWithToken(navBarURL).then(data => content.innerHTML = returnNavBar(data.email))
    .catch(error => console.error(error));
    // content.innerHTML = returnNavBar(userData.email);
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