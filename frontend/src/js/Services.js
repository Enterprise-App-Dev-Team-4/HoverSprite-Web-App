const serviceAPI = 'http://localhost:8080/service/all';
const navBarURL = 'http://localhost:8080/userName';
let allServices = []; // Store the fetched services globally for filtering

function displayServices(services) {
    const container = document.querySelector('.services-scroll-container .container');
    container.innerHTML = ''; // Clear the container before displaying filtered services

    services.forEach(service => {
        const cropType = service.cropType ? service.cropType : "For All Croptype";
        const serviceCard = `
            <div class="col-12">
                <div class="card service-card">
                    <div class="row no-gutters"> 
                        <div class="col-md-4">
                            <img src="../../public/drone-seeding.jpg" class="card-img" alt="ok">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${service.serviceName}</h5>
                                <p>Crop Type: ${cropType}</p>
                                <p class="card-text">${service.description}</p>
                                <a href="${service.link}" class="btn btn-dark btn-block">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', serviceCard);
    });
}

function fetchAndDisplayServices() {
    const searchInput = document.getElementById('searchInput').value.toUpperCase(); // Convert to uppercase for enum matching
    const cropTypeSelect = document.getElementById('cropTypeSelect').value.toUpperCase(); // Convert to uppercase for enum matching
    const serviceTypeSelect = document.getElementById('serviceTypeSelect').value.toUpperCase(); // Convert to uppercase for enum matching

    console.log(searchInput);
    const queryString = `searchTerm=${encodeURIComponent(searchInput)}&cropType=${encodeURIComponent(cropTypeSelect)}&serviceType=${encodeURIComponent(serviceTypeSelect)}`;

    fetch(`${serviceAPI}?${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allServices = data; // Store the fetched services for later filtering
            displayServices(allServices); // Initially display all services
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getAllService() {
    document.addEventListener('DOMContentLoaded', function() {
        // Fetch and display services initially
        fetchAndDisplayServices();

        // Add event listener for the search button
        document.getElementById('searchButton').addEventListener('click', fetchAndDisplayServices);

        // Add event listeners for filtering and sorting
        document.getElementById('cropTypeSelect').addEventListener('change', fetchAndDisplayServices);
        document.getElementById('serviceTypeSelect').addEventListener('change', fetchAndDisplayServices);
    });
}

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

function loadFooter() {
    document.addEventListener("DOMContentLoaded", function() {
        var content = document.getElementById("footer-container");
        content.innerHTML = returnFooter();
    });
}

// Initialize functions
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
