const serviceAPI = 'http://localhost:8080/service/all';
const navBarURL = 'http://localhost:8080/userName';
const ReceptionistURL = 'http://localhost:8080/receptionist';
let role = null;

var user = null;
let allServices = []; // Store the fetched services globally for filtering

function getUserRoleFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('role');
}

document.addEventListener("DOMContentLoaded", function() {
    role = getUserRoleFromUrl();
    loadNavBar(role);
    loadFooter();
    getAllService();
});

function displayServices(services) {
    const container = document.querySelector('.services-scroll-container .container');
    container.innerHTML = ''; // Clear the container before displaying filtered services

    services.forEach(service => {
        const cropType = service.cropType ? service.cropType : "For All Croptype";
        const serviceCard = `
            <div class="col-12">
                <div class="card service-card" data-service-id="${service.id}">
                    <div class="row no-gutters"> 
                        <div class="col-md-4">
                            <img src="../../public/drone-seeding.jpg" class="card-img service-image" alt="Service Image" data-service-id="${service.id}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${service.serviceName}</h5>
                                <p>Crop Type: ${cropType}</p>
                                <p class="card-text">${service.description}</p>
                                <button class="btn btn-dark btn-block book-now-btn" data-service-id="${service.id}">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', serviceCard);
    });

    // Attach event listeners to service cards to open modal
    document.querySelectorAll('.service-image').forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const selectedService = services.find(service => service.id == serviceId);
            openModal(selectedService);
        });
    });

    // Attach event listeners to "Book Now" buttons
    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const selectedService = services.find(service => service.id == serviceId);
            redirectToBooking(selectedService, user);
        });
    });
}


function openModal(service) {
    const modal = document.getElementById("serviceModal");
    const modalContent = document.getElementById("modal-body-content");

    modalContent.innerHTML = `
        <h2>${service.serviceName}</h2>
        <p><strong>Crop Type:</strong> ${service.cropType}</p>
        <p><strong>Description:</strong> ${service.description}</p>
        <p><strong>Service Type:</strong> ${service.serviceType}</p>
        <p><strong>Price:</strong> ${service.price} VND</p>
    `;

    modal.style.display = "block";

    // Close the modal when the user clicks on <span> (x)
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function redirectToBooking(service, user) {
    const timeSlotsSerialized = JSON.stringify(service.timeSlots);
    // const ordersSerialized = JSON.stringify(service.orders);

    const bookingParams = new URLSearchParams({
        serviceId: service.id,
        serviceName: service.serviceName,
        serviceType: service.serviceType,
        cropType: service.cropType,
        // serviceOrders: ordersSerialized, // Serialized orders list
        serviceTimeSlots: timeSlotsSerialized, // Serialized timeSlots list
        userEmail: user.email, // Assuming the user object has an 'email' property
        role: role // Attach the user role to the booking URL
    });
    console.log(`/booking?${bookingParams.toString()}`);
    window.location.href = `/booking?${bookingParams.toString()}`;
}

function fetchAndDisplayServices() {
    const searchInput = document.getElementById('searchInput').value.toUpperCase(); // Convert to uppercase for enum matching
    const cropTypeSelect = document.getElementById('cropTypeSelect').value.toUpperCase(); // Convert to uppercase for enum matching
    const serviceTypeSelect = document.getElementById('serviceTypeSelect').value.toUpperCase(); // Convert to uppercase for enum matching

    const queryString = `searchTerm=${encodeURIComponent(searchInput)}&cropType=${encodeURIComponent(cropTypeSelect)}&serviceType=${encodeURIComponent(serviceTypeSelect)}`;

    fetch(`${serviceAPI}?${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            allServices = data; // Store the fetched services for later filtering
            console.log(allServices);
            displayServices(allServices); // Initially display all services
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getAllService() {
    // Fetch and display services initially
    fetchAndDisplayServices();

    // Add event listener for the search button
    document.getElementById('searchButton').addEventListener('click', fetchAndDisplayServices);

    // Add event listeners for filtering and sorting
    document.getElementById('cropTypeSelect').addEventListener('change', fetchAndDisplayServices);
    document.getElementById('serviceTypeSelect').addEventListener('change', fetchAndDisplayServices);
}

function loadNavBar(userRole) {
    const navbarContainer = document.getElementById("navbar-container");
    let userAPI = null;

    if (userRole === 'receptionist') {
        userAPI = ReceptionistURL;
    } else if (userRole === 'farmer') {
        userAPI = navBarURL;
    }

    if (userAPI) {
        sendRequestWithToken(userAPI)
            .then(data => {
                user = data;
                navbarContainer.innerHTML = returnNavBar(data, role);
                activeClick();
            })
            .catch(error => console.error('Error loading navbar:', error));
    } else {
        console.error('Invalid user role or user role not provided.');
    }
}

function loadFooter() {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = returnFooter();
}

// Ensure the document is fully loaded before initializing services
document.addEventListener("DOMContentLoaded", function() {
    const userRole = getUserRoleFromUrl();
    loadNavBar(userRole);
    loadFooter();
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
});
