let map, marker;
const UserURL = 'http://localhost:8080/userName';
const apiEndpoint = 'http://localhost:8080/requestOrder';
const addFarmAPI = 'http://localhost:8080/farm/add-farm';
const updateServicesAPI = 'http://localhost:8080/services/update';
const ReceptionistURL = 'http://localhost:8080/receptionist';
const stripeAPI = 'http://localhost:8080/simulate-visa-payment';

let role = null;  // To allow reassignment later
let sentUser = null;
let sendService = null;

// Session times for the form
const availableSessions = [
    "04:00 - 05:00",
    "05:00 - 06:00",
    "06:00 - 07:00",
    "07:00 - 08:00",
    "16:00 - 17:00",
    "17:00 - 18:00"
];

// On document load, initialize the app
document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();
    initializeApp();
});

// Initialization function
function initializeApp() {
    loadNavBar();
    loadFooter();
    initMap();
    extractAndStoreUrlParams();
    setupFormHandlers(); // Sets up form, including payment handling
    setInitialDate();
    populateSessionOptions();
}

// Extract user role from the URL
function getUserRoleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('role');
}

// Populate session times in the select box
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

// Load navbar based on role
function loadNavBar() {
    const navbarContainer = document.getElementById("navbar-container");
    let userAPI = role === 'receptionist' ? ReceptionistURL : role === 'farmer' ? UserURL : null;

    if (userAPI) {
        sendRequestWithToken(userAPI)
            .then(data => {
                navbarContainer.innerHTML = returnNavBar(data, role);
                activeClick();
            })
            .catch(error => console.error('Error loading navbar:', error));
    }
}

// Load footer content
function loadFooter() {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = returnFooter();
}

// Initialize map and marker
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

// Update location input based on lat/lon
function updateLocationInput(lat, lon) {
    const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    fetch(reverseGeocodeUrl)
        .then(response => response.json())
        .then(data => {
            const locationInput = document.getElementById("location");
            if (data && data.address) {
                const { suburb: ward = "", city_district: district = "", city = "", country = "" } = data.address;
                locationInput.value = `${ward}, ${district}, ${city}, ${country}`;
            } else {
                locationInput.value = "Address not found";
            }
        })
        .catch(error => console.error("Error:", error));
}

// Updates the map with a new address
function updateMap(address) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                map.setView([lat, lon], 15);
                marker.setLatLng([lat, lon]);
                updateLocationInput(lat, lon);
            }
        })
        .catch(error => console.error("Error:", error));
}

// Date conversion between solar and lunar calendars
function convertDate(date, fromType, toType) {
    const momentDate = moment(date);
    return fromType === 'solar' && toType === 'lunar'
        ? momentDate.subtract(1, 'days').format('YYYY-MM-DDTHH:mm')
        : momentDate.add(1, 'days').format('YYYY-MM-DDTHH:mm');
}

// Extract user and service data from the URL
function extractAndStoreUrlParams() {
    const { user, service } = getUrlParams();
    sentUser = user;
    sendService = service;
}

// Parse URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        user: { email: params.get('userEmail') },
        service: {
            id: params.get('serviceId'),
            name: params.get('serviceName'),
            cropType: params.get('cropType'),
            serviceType: params.get('serviceType'),
            timeSlots: JSON.parse(params.get('serviceTimeSlots') || '[]')
        }
    };
}

// Send add farm request
function sendAddFarmRequest(farm) {
    const addFarmData = { farm, farmerEmail: sentUser.email };
    sendRequestWithToken(addFarmAPI, 'POST', addFarmData)
        .then(response => response.ok ? console.log('Request submitted successfully') : console.error('Failed to submit request:', response.statusText))
        .catch(error => console.error('Error submitting request:', error));
}

// Send booking request to the server
function sendRequestOrder(formData) {
    sendRequestWithToken(apiEndpoint, 'POST', formData)
        .then(data => console.log('order response:', data))
        .catch(error => console.error('Error submitting request:', error));
}

// Send updated service data
function sendRequestUpdateService(services) {
    sendRequestWithToken(updateServicesAPI, 'PUT', services)
        .then(data => console.log('service response:', data))
        .catch(error => console.error('Error submitting request:', error));
}

// Set up event listeners for the form
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
    setupInputFormattingHandlers();
}

// Ensure the area input doesn't accept negative values
function setupAreaInputHandler(areaInput) {
    areaInput.addEventListener("input", function () {
        if (this.value < 0) this.value = 0;
    });
}

// Handle switching between lunar and solar calendars
function setupDateTypeChangeHandler(dateTypeSelect, dateInput) {
    dateTypeSelect.addEventListener('change', function () {
        if (dateInput.value) {
            dateInput.value = convertDate(dateInput.value, this.value === 'lunar' ? 'solar' : 'lunar', this.value);
        }
    });
}

// Update the map when the location input changes
function setupLocationInputHandler(locationInput) {
    locationInput.addEventListener('change', function () {
        updateMap(this.value);
    });
}

// Setup form submit handler for booking
function setupFormSubmitHandler(form, areaInput, dateInput, dateTypeSelect, locationInput, sessionSelect) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        showConfirmationModal(areaInput.value, dateInput.value, dateTypeSelect.value, locationInput.value, sessionSelect.value);
    });

    // Handle confirmation and payment selection
    document.getElementById("confirmSubmitButton").addEventListener("click", function () {
        const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
        confirmationModal.hide(); // Hide the confirmation modal

        const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        paymentModal.show(); // Show the payment modal
    });

    // Handle cash payment
    document.getElementById("payByCashButton").addEventListener("click", function () {
        const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
        paymentModal.hide();

        handleDateConversionIfNeeded(dateTypeSelect, dateInput);
        updateServiceTimeSlots(sessionSelect);

        const totalCost = calculateTotalCost(areaInput.value);
        const farm = generateFarmObject(areaInput.value, locationInput.value);
        sendAddFarmRequest(farm);
        sendRequestUpdateService(sendService);

        const formData = gatherFormData(areaInput.value, locationInput.value, dateInput.value, sessionSelect.value, totalCost);
        formData.paymentMethod = "cash";

        sendRequestOrder(formData);
        setTimeout(redirectToServicePage, 2000);
    });

    // Handle Visa payment
    document.getElementById("payByCardButton").addEventListener("click", function () {
        const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
        paymentModal.hide();

        const visaPaymentModal = new bootstrap.Modal(document.getElementById('visaPaymentModal'));
        visaPaymentModal.show(); // Show Visa modal for payment
    });

    document.getElementById("submitVisaPaymentButton").addEventListener("click", handleVisaPayment);
}

function handleVisaPayment(event) {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value.replace(/\s+/g, ''); // Remove spaces
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    const totalCost = calculateTotalCost(document.getElementById('area').value);

    // Front-end validation
    if (!validateCardNumber(cardNumber)) {
        document.getElementById('visa-errors').textContent = "Invalid card number.";
        return;
    }

    if (!validateExpiryDate(expiryDate)) {
        document.getElementById('visa-errors').textContent = "Invalid expiry date.";
        return;
    }

    if (!validateCVV(cvv)) {
        document.getElementById('visa-errors').textContent = "Invalid CVV.";
        return;
    }

    // Simulate payment by sending data to backend
    const paymentData = {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        amount: totalCost
    };

    fetch(stripeAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Payment successful:', data);
            processBooking(true); // Trigger booking after successful payment
        } else {
            document.getElementById('visa-errors').textContent = "Payment failed: " + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('visa-errors').textContent = "Payment failed.";
    });
}

// Function to setup input formatting for card number and expiry date
function setupInputFormattingHandlers() {
    const cardNumberInput = document.getElementById("cardNumber");
    const expiryDateInput = document.getElementById("expiryDate");

    // Format the card number to add spaces every 4 digits and restrict to 16 digits
    cardNumberInput.addEventListener("input", formatCardNumber);

    // Format the expiry date to MM/YY and restrict to 5 characters
    expiryDateInput.addEventListener("input", formatExpiryDate);
}

// Format card number input to add space every 4 digits and limit to 16 digits
function formatCardNumber(event) {
    let cardNumber = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters

    // Limit the input to 16 digits
    if (cardNumber.length > 16) {
        cardNumber = cardNumber.substring(0, 16);
    }

    // Format the card number to add space every 4 digits
    event.target.value = cardNumber.replace(/(.{4})/g, '$1 ').trim(); // Add a space every 4 digits
}

// Format expiry date input and restrict to MM/YY format
function formatExpiryDate(event) {
    let input = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters

    // Limit to 4 digits (MMYY)
    if (input.length > 4) {
        input = input.substring(0, 4);
    }

    // Automatically insert "/" after the first two digits (month)
    if (input.length > 2) {
        event.target.value = input.slice(0, 2) + '/' + input.slice(2);
    } else {
        event.target.value = input;
    }
}


// Utility functions to validate card info
function validateCardNumber(cardNumber) {
    let sum = 0, shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        if (shouldDouble) digit = digit * 2 > 9 ? digit * 2 - 9 : digit * 2;
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

function validateExpiryDate(expiryDate) {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!regex.test(expiryDate)) return false;
    const [expMonth, expYear] = expiryDate.split('/').map(Number);

    return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Process the booking and redirect
function processBooking(isCardPayment) {
    const area = document.getElementById('area').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const session = document.getElementById('session').value;
    const totalCost = calculateTotalCost(area);

    const farm = generateFarmObject(area, location);
    sendAddFarmRequest(farm);
    sendRequestUpdateService(sendService);

    const formData = gatherFormData(area, location, date, session, totalCost);
    formData.paymentMethod = isCardPayment ? "card" : "cash";

    sendRequestOrder(formData);
    setTimeout(redirectToServicePage, 2000);
}

// Show confirmation modal
function showConfirmationModal(area, date, dateType, location, session) {
    document.getElementById('confirmLocation').textContent = location;
    document.getElementById('confirmArea').textContent = area;
    document.getElementById('confirmDateType').textContent = dateType === 'solar' ? 'Solar Calendar' : 'Lunar Calendar';
    document.getElementById('confirmDate').textContent = date;
    document.getElementById('confirmSession').textContent = session;

    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}

// Helper functions for date conversion, cost calculation, and redirection
function handleDateConversionIfNeeded(dateTypeSelect, dateInput) {
    if (dateTypeSelect.value === 'lunar') dateInput.value = convertDate(dateInput.value, 'lunar', 'solar');
}

function updateServiceTimeSlots(sessionSelect) {
    const selectedSessionIndex = sessionSelect.selectedIndex;
    if (sendService.timeSlots[selectedSessionIndex] > 0) sendService.timeSlots[selectedSessionIndex]--;
}

function calculateTotalCost(farmArea) {
    const costPerDecare = 30000;
    return parseFloat(farmArea) * costPerDecare;
}

function generateFarmObject(farmArea, farmLocation) {
    return { farmArea, cropType: sendService.cropType, farmLocation };
}

function gatherFormData(farmArea, location, date, session, totalCost) {
    return { farmer: sentUser, sprayServices: sendService, date, location, serviceTimeSlot: session, totalCost };
}

function redirectToServicePage() {
    window.location.href = `/service?role=${encodeURIComponent(role)}`;
}

function setInitialDate() {
    const dateInput = document.getElementById("date");
    const now = new Date();
    dateInput.value = now.toISOString().slice(0, 16);
}
