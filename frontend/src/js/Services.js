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
                                <button class="btn btn-dark btn-block book-now-btn" data-service-id="${service.id}">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', serviceCard);
    });

    // Attach event listeners to the "Book Now" buttons
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const selectedService = services.find(service => service.id === serviceId);
            if (selectedService && user) {
                redirectToBooking(selectedService, user);
            } else {
                console.error('Service or user data not found');
            }
        });
    });
}

function redirectToBooking(service, user) {
    const timeSlotsSerialized = JSON.stringify(service.timeSlots);
    const ordersSerialized = JSON.stringify(service.orders);

    const bookingParams = new URLSearchParams({
        serviceId: service.id,
        serviceName: service.serviceName,
        serviceType: service.serviceType,
        cropType: service.cropType,
        serviceOrders: ordersSerialized, // Serialized orders list
        serviceTimeSlots: timeSlotsSerialized, // Serialized timeSlots list
        userEmail: user.email, // Assuming the user object has an 'email' property
    });

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
            allServices = data; // Store the fetched services for later filtering
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
});
