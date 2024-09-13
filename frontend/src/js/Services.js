const serviceAPI = 'http://localhost:8080/service/all';
const navBarURL = 'http://localhost:8080/userName';
const ReceptionistURL = 'http://localhost:8080/receptionist';
let role = null;
let allServices = [];

document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();
    loadNavBar(role);
    loadFooter();
    setupEventListeners();
    getAllServices();
});

function getUserRoleFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('role');
}

function setupEventListeners() {
    document.getElementById('searchButton').addEventListener('click', handleSearch);
    document.getElementById('cropTypeSelect').addEventListener('change', handleSearch);
    document.getElementById('serviceTypeSelect').addEventListener('change', handleSearch);
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));
}

function handleSearch() {
    getAllServices();
}

function getAllServices() {
    showLoading(true);
    const searchInput = document.getElementById('searchInput').value.toUpperCase();
    const cropTypeSelect = document.getElementById('cropTypeSelect').value.toUpperCase();
    const serviceTypeSelect = document.getElementById('serviceTypeSelect').value.toUpperCase();

    const queryString = `searchTerm=${encodeURIComponent(searchInput)}&cropType=${encodeURIComponent(cropTypeSelect)}&serviceType=${encodeURIComponent(serviceTypeSelect)}`;

    fetch(`${serviceAPI}?${queryString}`)
        .then(handleResponse)
        .then(data => {
            console.log(data);
            allServices = data;
            displayServices(allServices);
        })
        .catch(handleError)
        .finally(() => showLoading(false));
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function handleError(error) {
    console.error('There was a problem with the fetch operation:', error);
    showErrorMessage('Failed to load services. Please try again later.');
}

function displayServices(services) {
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';

    services.forEach(service => {
        const serviceCard = createServiceCard(service);
        container.insertAdjacentHTML('beforeend', serviceCard);
    });

    attachEventListeners();
}

function createServiceCard(service) {
    const cropType = service.cropType ? service.cropType : "For All Croptypes";
    
    // Calculate the overall rating score for the service
    let totalRating = 0;
    let numberOfRatings = 0;

    if (service.order && service.order.length > 0) {
        service.order.forEach(order => {
            if (order.feedBacks) {
                totalRating += order.feedBacks.ratingScore;
                numberOfRatings++;
            }
        });
    }

    const averageRating = numberOfRatings > 0 ? (totalRating / numberOfRatings).toFixed(1) : 0;
    const starRatingHTML = generateStarRating(averageRating); // Generate stars for the average rating

    return `
        <div class="col-md-6 col-lg-4">
            <div class="card service-card h-100" data-service-id="${service.id}">
                <img src="../../public/drone-seeding.jpg" class="card-img-top service-image" alt="${service.serviceName}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${service.serviceName}</h5>
                    <p class="card-text">Crop Type: ${cropType}</p>
                    <p class="card-text flex-grow-1">${service.description}</p>
                    <p class="card-text"><strong>Overall Rating:</strong> ${starRatingHTML} (${averageRating})</p>
                    <button class="btn btn-primary mt-auto book-now-btn" data-service-id="${service.id}">Book Now</button>
                </div>
            </div>
        </div>
    `;
}


function attachEventListeners() {
    document.querySelectorAll('.service-image, .card-title').forEach(element => {
        element.addEventListener('click', function () {
            const serviceId = this.closest('.service-card').getAttribute('data-service-id');
            const selectedService = allServices.find(service => service.id == serviceId);
            openModal(selectedService);
        });
    });

    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', function () {
            const serviceId = this.getAttribute('data-service-id');
            const selectedService = allServices.find(service => service.id == serviceId);
            redirectToBooking(selectedService, user);
        });
    });
}

function openModal(service) {
    const modalTitle = document.getElementById('serviceModalLabel');
    const modalBody = document.getElementById('modal-body-content');
    const bookNowButton = document.getElementById('bookNowModal');

    // Calculate the overall rating score for the modal
    let totalRating = 0;
    let numberOfRatings = 0;

    let feedbackDetails = '';
    if (service.order && service.order.length > 0) {
        service.order.forEach(order => {
            if (order.feedBacks) {
                totalRating += order.feedBacks.ratingScore;
                numberOfRatings++;
                feedbackDetails += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h6 class="card-title">Name: ${order.farmerFullName}</h6>
                            <p class="card-text">Comment: ${order.feedBacks.content}</p>
                            <p class="card-text">Rating: ${generateStarRating(order.feedBacks.ratingScore)} (${order.feedBacks.ratingScore})</p>
                        </div>
                    </div>
                `;
            }
        });
    } else {
        feedbackDetails = '<p>No feedback available for this service.</p>';
    }

    const averageRating = numberOfRatings > 0 ? (totalRating / numberOfRatings).toFixed(1) : 0;
    const starRatingHTML = generateStarRating(averageRating); // Generate stars for the average rating

    modalTitle.textContent = service.serviceName;
    modalBody.innerHTML = `
        <p><strong>Crop Type:</strong> ${service.cropType || 'For All Croptypes'}</p>
        <p><strong>Description:</strong> ${service.description}</p>
        <p><strong>Service Type:</strong> ${service.serviceType}</p>
        <p><strong>Price:</strong> ${service.price} VND</p>
        <p><strong>Feedbacks:</strong></p>
        <div class="feedback-list" style="max-height: 200px; overflow-y: auto;">
            ${feedbackDetails}
        </div>
    `;

    bookNowButton.onclick = () => redirectToBooking(service, user);

    const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
    modal.show();
}



function generateStarRating(rating) {
    const fullStar = '<i class="fas fa-star"></i>';
    const halfStar = '<i class="fas fa-star-half-alt"></i>';
    const emptyStar = '<i class="far fa-star"></i>';

    let starHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starHTML += fullStar;
    }

    // Add half star if applicable
    if (hasHalfStar) {
        starHTML += halfStar;
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starHTML += emptyStar;
    }

    return starHTML;
}

function redirectToBooking(service, user) {
    const timeSlotsSerialized = JSON.stringify(service.timeSlots);
    const bookingParams = new URLSearchParams({
        serviceId: service.id,
        serviceName: service.serviceName,
        serviceType: service.serviceType,
        cropType: service.cropType,
        serviceTimeSlots: timeSlotsSerialized,
        userEmail: user.email,
        role: role
    });
    window.location.href = `/booking?${bookingParams.toString()}`;
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

function showLoading(isLoading) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.toggle('d-none', !isLoading);
}

function showErrorMessage(message) {
    // Implement error message display logic here
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
