let map, marker;
const UserURL = 'http://localhost:8080/userName';
const apiEndpoint = 'http://localhost:8080/requestOrder';
const addFarmAPI = 'http://localhost:8080/farm/add-farm';
const updateServicesAPI = 'http://localhost:8080/services/update';
const ReceptionistURL = 'http://localhost:8080/receptionist';

let role = null;  // Ensure role is let, not const, so it can be reassigned
let sentUser = null;
let sendService = null;

// Array of session times
const availableSessions = [
    "04:00 - 05:00",
    "05:00 - 06:00",
    "06:00 - 07:00",
    "07:00 - 08:00",
    "16:00 - 17:00",
    "17:00 - 18:00"
];

document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();  // Extract role from URL
    initializeApp();
});

function initializeApp() {
    loadNavBar();
    loadFooter();
    initMap();
    extractAndStoreUrlParams();
    setupFormHandlers();
    setInitialDate();
    populateSessionOptions(); // Populate the session select element
}

function getUserRoleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('role');
}

function populateSessionOptions() {
    const sessionSelect = document.getElementById("session");

    sessionSelect.innerHTML = ""; // Clear existing options

    availableSessions.forEach((session, index) => {
        const option = document.createElement("option");
        option.textContent = session;

        if (sendService && sendService.timeSlots[index] === 0) {
            option.disabled = true;
        }

        sessionSelect.appendChild(option);
    });
}

function loadNavBar() {
    const navbarContainer = document.getElementById("navbar-container");

    let userAPI = null;

    if (role === 'receptionist') {
        userAPI = ReceptionistURL;
    } else if (role === 'farmer') {
        userAPI = UserURL;
    }

    if (userAPI) {
        sendRequestWithToken(userAPI)
            .then(data => {
                navbarContainer.innerHTML = returnNavBar(data, role);
                activeClick();
            })
            .catch(error => console.error('Error loading navbar:', error));
    } else {
        console.error('Invalid role or user API could not be determined.');
    }
}

function loadFooter() {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = returnFooter();
}

function initMap() {
    const defaultLocation = [10.7285, 106.7151];
    map = L.map('map').setView(defaultLocation, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker(defaultLocation, { draggable: true }).addTo(map);

    marker.on('dragend', function () {
        const position = marker.getLatLng();
        updateLocationInput(position.lat, position.lng);
    });

    map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        updateLocationInput(e.latlng.lat, e.latlng.lng);
    });

    updateLocationInput(defaultLocation[0], defaultLocation[1]);
}

function updateLocationInput(lat, lon) {
    const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    fetch(reverseGeocodeUrl)
        .then(response => response.json())
        .then(data => {
            const locationInput = document.getElementById("location");
            if (data && data.address) {
                const address = data.address;
                const ward = address.suburb || "";
                const district = address.city_district || address.district || "";
                const city = address.city || address.town || address.village || "";
                const country = address.country || "";

                locationInput.value = `${ward}, ${district}, ${city}, ${country}`;
            } else {
                locationInput.value = "Address not found";
            }
        })
        .catch(error => console.error("Error:", error));
}

function updateMap(address) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                map.setView([lat, lon], 15);
                marker.setLatLng([lat, lon]);
                updateLocationInput(lat, lon); // Update location input with address
            } else {
                console.log("Address not found");
            }
        })
        .catch(error => console.error("Error:", error));
}

function convertDate(date, fromType, toType) {
    const momentDate = moment(date);

    if (fromType === 'solar' && toType === 'lunar') {
        const lunarDate = momentDate.subtract(1, 'days');
        return lunarDate.format('YYYY-MM-DDTHH:mm');
    } else if (fromType === 'lunar' && toType === 'solar') {
        const solarDate = momentDate.add(1, 'days');
        return solarDate.format('YYYY-MM-DDTHH:mm');
    }

    return momentDate.format('YYYY-MM-DDTHH:mm');
}

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    const user = {
        email: params.get('userEmail')
    };

    const service = {
        id: params.get('serviceId'),
        name: params.get('serviceName'),
        cropType: params.get('cropType'),
        serviceType: params.get('serviceType'),
        orders: JSON.parse(params.get('serviceOrders') || '[]'),
        timeSlots: JSON.parse(params.get('serviceTimeSlots') || '[]')
    };

    return { user, service };
}

function extractAndStoreUrlParams() {
    const { user, service } = getUrlParams();
    sentUser = user;
    sendService = service;

    console.log('User:', sentUser);
    console.log('Service:', sendService);
}

function sendAddFarmRequest(farm) {
    const addFarmData = {
        farm: farm,
        farmerEmail: sentUser.email
    };
    sendRequestWithToken(addFarmAPI, 'POST', addFarmData)
        .then(response => {
            if (response.ok) {
                console.log('Request submitted successfully');
            } else {
                console.error('Failed to submit request:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error submitting request:', error);
        });
}

function sendRequestOrder(formData) {
    sendRequestWithToken(apiEndpoint, 'POST', formData)
        .then(data => console.log('order response:', data))
        .catch(error => console.error('Error submitting request:', error));
}

function sendRequestUpdateService(services) {
    sendRequestWithToken(updateServicesAPI, 'PUT', services)
        .then(data => console.log('service response:', data))
        .catch(error => console.error('Error submitting request:', error));
}

function setupFormHandlers() {
    const form = document.querySelector('form');
    const areaInput = document.getElementById("area");
    const dateInput = document.getElementById("date");
    const dateTypeSelect = document.getElementById("dateType");
    const locationInput = document.getElementById("location");
    const sessionSelect = document.getElementById("session");

    setupAreaInputHandler(areaInput);
    setupDateTypeChangeHandler(dateTypeSelect, dateInput);
    setupLocationInputHandler(locationInput);
    setupFormSubmitHandler(form, areaInput, dateInput, dateTypeSelect, locationInput, sessionSelect);
}

function setupAreaInputHandler(areaInput) {
    areaInput.addEventListener("input", function () {
        if (this.value < 0) {
            this.value = 0;
        }
    });
}

function setupDateTypeChangeHandler(dateTypeSelect, dateInput) {
    dateTypeSelect.addEventListener('change', function () {
        const currentDate = dateInput.value;
        const currentType = this.value === 'lunar' ? 'solar' : 'lunar';
        const newType = this.value;

        if (currentDate) {
            const convertedDate = convertDate(currentDate, currentType, newType);
            dateInput.value = convertedDate;
        }
    });
}

function setupLocationInputHandler(locationInput) {
    locationInput.addEventListener('change', function () {
        updateMap(this.value);
    });
}

function setupFormSubmitHandler(form, areaInput, dateInput, dateTypeSelect, locationInput, sessionSelect) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Display the modal with booking details
        showConfirmationModal(areaInput.value, dateInput.value, dateTypeSelect.value, locationInput.value, sessionSelect.value);
    });

    // Handle final confirmation
    document.getElementById("confirmSubmitButton").addEventListener("click", function () {
        // Finalize the booking request
        handleDateConversionIfNeeded(dateTypeSelect, dateInput);
        updateServiceTimeSlots(sessionSelect);
        const totalCost = calculateTotalCost(areaInput.value);

        const farm = generateFarmObject(areaInput.value, locationInput.value);
        sendAddFarmRequest(farm);
        sendRequestUpdateService(sendService);

        const formData = gatherFormData(areaInput.value, locationInput.value, dateInput.value, sessionSelect.value, totalCost);
        sendRequestOrder(formData);

        setTimeout(function() {
            redirectToServicePage();
        }, 2000); // 2000 milliseconds = 2 seconds
    });
}

function showConfirmationModal(area, date, dateType, location, session) {
    // Set the confirmation modal values
    document.getElementById('confirmLocation').textContent = location;
    document.getElementById('confirmArea').textContent = area;
    document.getElementById('confirmDateType').textContent = dateType === 'solar' ? 'Solar Calendar' : 'Lunar Calendar';
    document.getElementById('confirmDate').textContent = date;
    document.getElementById('confirmSession').textContent = session;

    // Show the modal
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}

function handleDateConversionIfNeeded(dateTypeSelect, dateInput) {
    if (dateTypeSelect.value === 'lunar') {
        const lunarDate = dateInput.value;
        const solarDate = convertDate(lunarDate, 'lunar', 'solar');
        dateInput.value = solarDate;
    }
}

function updateServiceTimeSlots(sessionSelect) {
    const selectedSessionIndex = sessionSelect.selectedIndex;

    if (sendService.timeSlots[selectedSessionIndex] > 0) {
        sendService.timeSlots[selectedSessionIndex] -= 1;

        console.log(`Time slot at index ${selectedSessionIndex} is now ${sendService.timeSlots[selectedSessionIndex]}`);

        if (sendService.timeSlots[selectedSessionIndex] === 0) {
            sessionSelect.options[selectedSessionIndex].disabled = true;
        }
    } else {
        console.log('Selected time slot is already at 0, cannot decrement further');
    }
}

function calculateTotalCost(farmArea) {
    const costPerDecare = 30000;
    return parseFloat(farmArea) * costPerDecare;
}

function generateFarmObject(farmArea, farmLocation) {
    return {
        farmArea: farmArea,
        cropType: sendService.cropType,
        farmLocation: farmLocation
    };
}

function gatherFormData(farmArea, location, date, session, totalCost) {
    return {
        farmer: sentUser,
        sprayServices: sendService,
        date: date,
        location: location,
        serviceTimeSlot: session,
        totalCost: totalCost
    };
}

function redirectToServicePage() {
    window.location.href = `/service?role=${encodeURIComponent(role)}`;
}

function setInitialDate() {
    const dateInput = document.getElementById("date");
    const now = new Date();
    dateInput.value = now.toISOString().slice(0, 16);
}
