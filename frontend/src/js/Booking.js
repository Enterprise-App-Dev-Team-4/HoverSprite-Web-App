let map, marker;
const UserURL = 'http://localhost:8080/userName';
const apiEndpoint = 'http://localhost:8080/requestOrder';
const addFarmAPI = 'http://localhost:8080/farm/add-farm';
const updateServicesAPI = 'http://localhost:8080/services/update';
const ReceptionistURL = 'http://localhost:8080/receptionist';
const stripeAPI = 'http://localhost:8080/simulate-visa-payment';
const checkTimeSlotAPI = 'http://localhost:8080/booking/checkTimeSlot';
const checkFarmerAPI = 'http://localhost:8080/booking/checkPhone';
const createFarmerAPI = 'http://localhost:8080/booking/createFarmer';

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
    
    const dateInput = document.getElementById("date");
    dateInput.addEventListener("change", function () {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            verifyTimeSlots(selectedDate, sendService.id);
        }
    });

    if (role === 'receptionist') {
        showReceptionistForm();
    } else {
        showBookingForm();
    }
});

// Show the receptionist form and hide the booking form
function showReceptionistForm() {
    document.getElementById("receptionist-phone-form").style.display = "block";
    document.getElementById("booking-form").style.display = "none";

    // Set up event listener for the "Check Farmer" button
    document.getElementById("checkFarmerButton").addEventListener("click", function () {
        const phone = document.getElementById("farmerPhone").value;
        checkFarmerByPhone(phone);
    });
}

// Initialization function
function initializeApp() {
    loadNavBar();
    loadFooter();
    initMap();
    const locationInput = document.getElementById("location");
    setupLocationInputHandler(locationInput);
    extractAndStoreUrlParams();
    setupFormHandlers(); // Sets up form, including payment handling
    setInitialDate();
    updatePrice();
}

// Show the booking form after the farmer is found
function showBookingForm() {
    document.getElementById("receptionist-phone-form").style.display = "none";
    document.getElementById("booking-form").style.display = "block";
}

// Check the farmer by phone number via the API
function checkFarmerByPhone(phone) {
    console.log(phone);
    sendRequestWithToken(`${checkFarmerAPI}?phone=${phone}`)
        .then(data => {
            if (data && data.email) {
                // Farmer found, use their data, hide manual input fields
                document.getElementById('farmerEmailInput').value = data.email;
                document.getElementById('farmerEmailInput').readOnly = true;
                document.getElementById('phoneErrorMessage').style.display = 'none';

                // Hide all manual input fields since we found the farmer
                hideManualFarmerInputs();

                // Set the found farmer as the sentUser
                sentUser = { email: data.email };

                // Show the booking form for the receptionist to proceed
                document.getElementById('receptionist-phone-form').style.display = 'none';
                document.getElementById('booking-form').style.display = 'block';
            } else {
                // If farmer is not found, allow manual input for new farmer creation
                showManualFarmerInputs();
                document.getElementById('phoneErrorMessage').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching farmer data:', error);
            document.getElementById('phoneErrorMessage').style.display = 'block';
        });
}

function createNewFarmer(email, firstName, lastName) {
    const fullName = `${firstName} ${lastName}`; // Automatically define full name
    
    const farmerData = {
        email: email,
        phone: document.getElementById('farmerPhone').value, // Get phone from form
        firstName: firstName,
        lastName: lastName,
        fullName: fullName  // Full name is automatically defined by firstName + lastName
    };

    fetch(createFarmerAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(farmerData),
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Set the newly created farmer as the sentUser
                hideManualFarmerInputs();

                // Set the found farmer as the sentUser
                sentUser = { email: data.email };

                // Show the booking form for the receptionist to proceed
                document.getElementById('receptionist-phone-form').style.display = 'none';
                document.getElementById('booking-form').style.display = 'block';
            } else {
                alert('Error creating farmer. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error creating farmer:', error);
        });
}

// Function to show manual inputs when farmer is not found
function showManualFarmerInputs() {
    document.getElementById('emailInputContainer').style.display = 'block';
    document.getElementById('firstNameInputContainer').style.display = 'block';
    document.getElementById('lastNameInputContainer').style.display = 'block';
    document.getElementById('continueButtonContainer').style.display = 'block';
}

// Function to hide manual inputs when farmer is found
function hideManualFarmerInputs() {
    document.getElementById('emailInputContainer').style.display = 'none';
    document.getElementById('firstNameInputContainer').style.display = 'none';
    document.getElementById('lastNameInputContainer').style.display = 'none';
    document.getElementById('continueButtonContainer').style.display = 'none';
}

// Event listener for the Continue button
document.getElementById('continueButton').addEventListener('click', function () {
    const email = document.getElementById('farmerEmailInput').value;
    const firstName = document.getElementById('firstNameInput').value;
    const lastName = document.getElementById('lastNameInput').value;

    if (email && firstName && lastName) {
        createNewFarmer(email, firstName, lastName);
    } else {
        alert('Please fill out all required fields.');
    }
});

// Auto-fill the farmer's email in the form after fetching the details
function autoFillFarmerDetails(farmer) {
    document.getElementById("farmerEmailInput").value = farmer.email; // assuming there is a farmerEmailInput in your form
}


// Extract user role from the URL
function getUserRoleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('role');
}


// Populate session times in the table and disable unavailable sessions
function disableUnavailableSessions(availableSlots) {
    availableSlots.forEach((slot, index) => {
        const sessionCell = document.getElementById(`session-${index}`);
        if (sessionCell) {
            if (slot === 0) {
                sessionCell.classList.add('disabled');  // Add disabled class
                sessionCell.style.pointerEvents = 'none';  // Disable click events
                sessionCell.style.backgroundColor = '#e0e0e0';  // Optional: change color to show disabled state
                sessionCell.style.color = '#999';  // Change text color to indicate disabled state
            } else {
                sessionCell.classList.remove('disabled');
                sessionCell.style.pointerEvents = 'auto';  // Enable click events
                sessionCell.style.backgroundColor = '';  // Reset color
                sessionCell.style.color = '';  // Reset text color
            }
        }
    });
}


// Helper function to map index to corresponding time range
function getHourRange(index) {
    const ranges = [
        { start: 4, end: 5 },  // "04:00 - 05:00"
        { start: 5, end: 6 },  // "05:00 - 06:00"
        { start: 6, end: 7 },  // "06:00 - 07:00"
        { start: 7, end: 8 },  // "07:00 - 08:00"
        { start: 16, end: 17 }, // "16:00 - 17:00"
        { start: 17, end: 18 }  // "17:00 - 18:00"
    ];
    return ranges[index];
}

// Convert time to 24-hour format before sending to server
function convertTo24HourFormat(time) {
    const [hour, minute] = time.split(":");
    let formattedTime = '';

    // Convert PM times
    if (hour < 12 && time.includes('PM')) {
        formattedTime = `${parseInt(hour) + 12}:${minute}`;
    } else if (hour == 12 && time.includes('AM')) {
        // Handle midnight case (12:00 AM should be 00:00)
        formattedTime = `00:${minute}`;
    } else {
        formattedTime = `${hour}:${minute}`;
    }

    return formattedTime;
}

function verifyTimeSlots(selectedDate, serviceID) {
    console.log(serviceID);
    fetch(`${checkTimeSlotAPI}?date=${selectedDate}&serviceID=${serviceID}`)
        .then(response => response.json())
        .then(data => {
            console.log('Received time slots from backend:', data);  // Debugging output
            disableUnavailableSessions(data);  // Disable cells in the session table
            restrictTimePicker(data);  // Disable invalid time in date picker
        })
        .catch(error => {
            console.error("Error fetching time slots:", error);
        });
}

// Function to restrict time selection in date picker based on unavailable sessions
function restrictTimePicker(availableSlots) {
    const dateInput = document.getElementById("date");
    
    // Extract available time slots (AM/PM sessions) from availableSlots array
    let unavailableTimeRanges = [];
    
    // Map time slots to actual hour ranges (for example, "04:00 - 05:00" becomes 04:00 to 05:00)
    availableSlots.forEach((slot, index) => {
        if (slot === 0) {
            let range = getHourRange(index);
            unavailableTimeRanges.push(range);
        }
    });

    // Disable unavailable times in the time picker
    dateInput.addEventListener("input", function () {
        let selectedTime = new Date(dateInput.value).getHours(); // Get the hour of the selected time
        
        unavailableTimeRanges.forEach((range) => {
            if (selectedTime >= range.start && selectedTime < range.end) {
                alert(`The selected time is unavailable: ${range.start}:00 - ${range.end}:00`);
                dateInput.value = ''; // Clear invalid time selection
            }
        });
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
                const { road, house_number, suburb, city_district, city, state, country } = data.address;
                const addressParts = [
                    house_number,
                    road,
                    suburb,
                    city_district,
                    city,
                    state,
                    country
                ].filter(Boolean);
                locationInput.value = addressParts.join(', ');
            } else {
                locationInput.value = "Address not found";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("location").value = "Error retrieving address";
        });
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

// Extract user and service data from the URL or the receptionist form
function extractAndStoreUrlParams() {
    const { user, service } = getUrlParams();
    sentUser = user;
    sendService = service;
    if (role === 'receptionist') {
        sentUser = { email: document.getElementById("farmerEmailInput").value };  // Get the email from the input
    }
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
// Send booking request to the server
function sendRequestOrder(formData) {
    const endpointWithRole = `${apiEndpoint}?role=${encodeURIComponent(role)}`;
    
    console.log('Sending request to endpoint:', endpointWithRole);  // Debugging output
    sendRequestWithToken(endpointWithRole, 'POST', formData)
        .then(data => {
            console.log('Order response:', data);
        })
        .catch(error => {
            console.error('Error submitting request:', error);
        });
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
        updatePrice();
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

    locationInput.addEventListener('focus', function () {
        this.select(); // Select all text when focused
    });
}

// Function to show booking success modal with a green checkmark
function showBookingSuccessModal() {
    const bookingSuccessModal = new bootstrap.Modal(document.getElementById('bookingSuccessModal'));
    bookingSuccessModal.show();
}

// Function to hide the success modal after backend has finished processing
function hideBookingSuccessModal() {
    const bookingSuccessModalElement = document.getElementById('bookingSuccessModal');
    const bookingSuccessModal = bootstrap.Modal.getInstance(bookingSuccessModalElement);
    if (bookingSuccessModal) {
        bookingSuccessModal.hide();
    }
}

// Setup form submit handler for booking
function setupFormSubmitHandler(form, areaInput, dateInput, dateTypeSelect, locationInput, sessionSelect) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Extract the hour from the datepicker
        const dateValue = new Date(dateInput.value);
        const selectedHour = dateValue.getHours();

        // Convert the selected time from the datepicker to the session in the table
        const sessionTimeSlot = mapTimeToSession(selectedHour);

        if (!sessionTimeSlot) {
            alert("The selected time does not match any available session times.");
            return;
        }

        showConfirmationModal(areaInput.value, dateInput.value, dateTypeSelect.value, locationInput.value, sessionTimeSlot);
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
        // updateServiceTimeSlots(sessionSelect);

        const totalCost = calculateTotalCost(areaInput.value);
        const farm = generateFarmObject(areaInput.value, locationInput.value);
        sendAddFarmRequest(farm);
        sendRequestUpdateService(sendService);

        // Get the session time slot
        const dateValue = new Date(dateInput.value);
        const selectedHour = dateValue.getHours();
        const sessionTimeSlot = mapTimeToSession(selectedHour);

        const formData = gatherFormData(areaInput.value, locationInput.value, dateInput.value, sessionTimeSlot, totalCost);
        formData.paymentMethod = "cash";

        // Show booking success modal
        showBookingSuccessModal();

        sendRequestOrder(formData);
        hideBookingSuccessModal();
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

// Map the hour from the datepicker to the session timeslot in the table
function mapTimeToSession(hour) {
    const sessionTimes = [
        { session: "04:00 - 05:00", startHour: 4, endHour: 5 },
        { session: "05:00 - 06:00", startHour: 5, endHour: 6 },
        { session: "06:00 - 07:00", startHour: 6, endHour: 7 },
        { session: "07:00 - 08:00", startHour: 7, endHour: 8 },
        { session: "16:00 - 17:00", startHour: 16, endHour: 17 },
        { session: "17:00 - 18:00", startHour: 17, endHour: 18 },
    ];

    for (let i = 0; i < sessionTimes.length; i++) {
        const { session, startHour, endHour } = sessionTimes[i];
        if (hour >= startHour && hour < endHour) {
            return session;
        }
    }

    return null; // Return null if no session matches the selected time
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
    const totalCost = calculateTotalCost(area);

    console.log(date);

    // Extract the hour from the datepicker
    const dateValue = new Date(date);
    const selectedHour = dateValue.getHours();

    // Convert the selected time from the datepicker to the session in the table
    const sessionTimeSlot = mapTimeToSession(selectedHour);

    if (!sessionTimeSlot) {
        alert("The selected time does not match any available session times.");
        return;
    }

    const farm = generateFarmObject(area, location);
    sendAddFarmRequest(farm);
    sendRequestUpdateService(sendService);

    const formData = gatherFormData(area, location, date, sessionTimeSlot, totalCost);
    formData.paymentMethod = isCardPayment ? "card" : "cash";

    // Show booking success modal
    showBookingSuccessModal();

    sendRequestOrder(formData);
    hideBookingSuccessModal();
    setTimeout(redirectToServicePage, 2000);
}

// Show confirmation modal
function showConfirmationModal(area, date, dateType, location, session) {
    const price = calculateTotalCost(area);
    document.getElementById('confirmLocation').textContent = location;
    document.getElementById('confirmArea').textContent = area;
    document.getElementById('confirmDateType').textContent = dateType === 'solar' ? 'Solar Calendar' : 'Lunar Calendar';
    document.getElementById('confirmDate').textContent = date;
    document.getElementById('confirmSession').textContent = session;
    document.getElementById('confirmPrice').textContent = `${price.toLocaleString()} VND`;

    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}


// Helper functions for date conversion, cost calculation, and redirection
function handleDateConversionIfNeeded(dateTypeSelect, dateInput) {
    if (dateTypeSelect.value === 'lunar') dateInput.value = convertDate(dateInput.value, 'lunar', 'solar');
}

// function updateServiceTimeSlots(sessionSelect) {
//     const selectedSessionIndex = sessionSelect.selectedIndex;
//     if (sendService.timeSlots[selectedSessionIndex] > 0) sendService.timeSlots[selectedSessionIndex]--;
// }

function calculateTotalCost(farmArea) {
    const costPerDecare = 30000;
    return parseFloat(farmArea) * costPerDecare;
}

function generateFarmObject(farmArea, farmLocation) {
    return { farmArea, cropType: sendService.cropType, farmLocation };
}

function gatherFormData(farmArea, location, date, session, totalCost) {
    let formattedDate = date;
    if (session.includes('PM')) {
        formattedDate = convertTo24HourFormat(date);
    }
    return {
        farmer: sentUser,
        sprayServices: sendService,
        date: formattedDate,
        location,
        serviceTimeSlot: session,
        totalCost
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

//update price
function updatePrice() {
    const area = document.getElementById('area').value;
    const price = area * 30000;
    document.getElementById('priceDisplay').textContent = `Price: ${price.toLocaleString()} VND`;
}
