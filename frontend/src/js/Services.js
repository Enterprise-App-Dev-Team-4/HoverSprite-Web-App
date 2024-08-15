const serviceAPI = 'http://localhost:8080/service/all';

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

function filterServices(services) {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cropTypeSelect = document.getElementById('cropTypeSelect').value;
    const serviceTypeSelect = document.getElementById('serviceTypeSelect').value;

    const filteredServices = services.filter(service => {
        const matchesSearch = service.serviceName.toLowerCase().includes(searchInput);
        const matchesCropType = cropTypeSelect ? service.cropType === cropTypeSelect : true;
        const matchesServiceType = serviceTypeSelect ? service.serviceType === serviceTypeSelect : true;

        return matchesSearch && matchesCropType && matchesServiceType;
    });

    displayServices(filteredServices);
}

function getAllService() {
    document.addEventListener('DOMContentLoaded', function() {
        fetch(serviceAPI)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display all services initially
                displayServices(data);

                // Add event listeners for filtering
                document.getElementById('searchInput').addEventListener('input', () => filterServices(data));
                document.getElementById('cropTypeSelect').addEventListener('change', () => filterServices(data));
                document.getElementById('serviceTypeSelect').addEventListener('change', () => filterServices(data));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
}

function loadNavBar() {
    document.addEventListener("DOMContentLoaded", function() {
        var content = document.getElementById("navbar-container");
        content.innerHTML = returnNavBar();
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
