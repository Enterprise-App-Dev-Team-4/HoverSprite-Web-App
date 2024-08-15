const serviceAPI = 'http://localhost:8080/service/'

// function getAllService()
// {
//     fetch(serviceAPI)
//     .then(response => {
//         if (!response.ok) {
//         throw new Error('Network response was not ok');
//         }
//         return response.json(); // assuming the response is in JSON
//     })
//     .then(data => {
//         console.log(data); // Process the data
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });
// }

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
getAllService();