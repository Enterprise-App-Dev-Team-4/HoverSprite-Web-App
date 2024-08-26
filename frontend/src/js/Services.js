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

document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  var modal = document.getElementById("serviceModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Add click event to each service image
  document.querySelectorAll('.service-image').forEach(function(image) {
      image.addEventListener('click', function() {
          var service = this.getAttribute('data-service');
          document.getElementById('modal-body-content').innerHTML = '<h2>' + service + '</h2>';
          modal.style.display = "block";
      });
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});
