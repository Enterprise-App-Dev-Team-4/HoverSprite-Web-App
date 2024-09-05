const navBarURL = 'http://localhost:8080/userName';


function loadNavBar() {
  const content = document.getElementById("navbar-container");
  sendRequestWithToken(navBarURL)
    .then(data => {
      content.innerHTML = returnNavBar(data, role);
      activeClick();  // Initialize event listeners after rendering the navbar
    })
    .catch(error => console.error(error));
}

function loadFooter() {
  console.log('Hello  footer');
  document.addEventListener("DOMContentLoaded", function () {
    // Fetch the Navbar component
    var content = document.getElementById("footer-container");
    content.innerHTML = returnFooter();
  });
}

function getUserRoleFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('role');
}


document.addEventListener("DOMContentLoaded", function () {
  role = getUserRoleFromUrl();  // Get the role from the URL
  loadNavBar();
  loadFooter();
});