let map, marker;
const UserURL = 'http://localhost:8080/userName';
// Define the API endpoint
const apiEndpoint = 'http://localhost:8080/requestOrder';
const addFarmAPI = 'http://localhost:8080/farm/add-farm';

const updateServicesAPI = 'http://localhost:8080/services/update'

var sentUser = null;
var sendService = null;

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

function populateSessionOptions() {
  const sessionSelect = document.getElementById("session");

  // Clear existing options
  sessionSelect.innerHTML = "";

  // Populate session select element with options from the array
  availableSessions.forEach((session, index) => {
      const option = document.createElement("option");
      option.textContent = session;

      // Disable the option if the corresponding timeSlot value is 0
      if (sendService.timeSlots[index] === 0) {
          option.disabled = true;
      }

      sessionSelect.appendChild(option);
  });
}


function loadNavBar() {
    const navbarContainer = document.getElementById("navbar-container");
    sendRequestWithToken(UserURL)
        .then(data => {
            console.log(data);
            navbarContainer.innerHTML = returnNavBar(data);
            activeClick();
        })
        .catch(error => console.error('Error loading navbar:', error));
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

    const locationInput = document.getElementById("location");

    marker.on('dragend', function () {
        const position = marker.getLatLng();
        updateLocationInput(position.lat, position.lng);
    });

    map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        updateLocationInput(e.latlng.lat, e.latlng.lng);
    });

    // Set initial location value
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

// Import the lunar-calendar package (for Node.js)

function convertDate(date, fromType, toType) {
  const momentDate = moment(date);

  if (fromType === 'solar' && toType === 'lunar') {
      const lunarDate = momentDate.subtract(1, 'days'); // This is a simplified example
      return lunarDate.format('YYYY-MM-DDTHH:mm'); // Ensure correct format
  } else if (fromType === 'lunar' && toType === 'solar') {
      const solarDate = momentDate.add(1, 'days'); // This is a simplified example
      return solarDate.format('YYYY-MM-DDTHH:mm'); // Ensure correct format
  }

  return momentDate.format('YYYY-MM-DDTHH:mm'); // Default: return in correct format
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
                // Handle success, e.g., redirect or show a success message
                console.log(response);
                console.log('Request submitted successfully');
                // You could redirect or update the UI here
            } else {
                // Handle error
                console.error('Failed to submit request:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error submitting request:', error);
        });
}

function sendRequestOrder(formData) {
    // Send the POST request with the form data
    sendRequestWithToken(apiEndpoint, 'POST', formData)
        .then(data => {
          console.log('order response: ' + data);
        })
        .then(response => {
            if (response.ok) {
                console.log(response);
                // Handle success, e.g., redirect or show a success message
                console.log('Request submitted successfully');
                // You could redirect or update the UI here
            } else {
                // Handle error
                console.error('Failed to submit request:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error submitting request:', error);
        });
}

function sendRequestUpdateService(services) {
  // Send the POST request with the form data
  sendRequestWithToken(updateServicesAPI, 'PUT', services)
      .then(data => {
        console.log('service response: ' + data);
      })
      .then(response => {
          if (response.ok) {
              console.log(response);
              // Handle success, e.g., redirect or show a success message
              console.log('Request submitted successfully');
              // You could redirect or update the UI here
          } else {
              // Handle error
              console.error('Failed to submit request:', response.statusText);
          }
      })
      .catch(error => {
          console.error('Error submitting request:', error);
      });
}


function setupFormHandlers() {
  const form = document.querySelector('form');
  const areaInput = document.getElementById("area");
  const dateInput = document.getElementById("date");
  const dateTypeSelect = document.getElementById("dateType");
  const locationInput = document.getElementById("location");
  const sessionSelect = document.getElementById("session");

  areaInput.addEventListener("input", function () {
      if (this.value < 0) {
          this.value = 0;
      }
  });

  dateTypeSelect.addEventListener('change', function () {
      const currentDate = dateInput.value;
      const currentType = this.value === 'lunar' ? 'solar' : 'lunar';
      const newType = this.value;

      if (currentDate) {
          const convertedDate = convertDate(currentDate, currentType, newType);
          dateInput.value = convertedDate;
      }
  });

  locationInput.addEventListener('change', function () {
      updateMap(this.value);
  });

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Convert lunar date to solar if necessary
      if (dateTypeSelect.value === 'lunar') {
          const lunarDate = dateInput.value;
          const solarDate = convertDate(lunarDate, 'lunar', 'solar');
          dateInput.value = solarDate;
      }

      // Get the selected session index
      const selectedSessionIndex = sessionSelect.selectedIndex;

      // Decrement the selected time slot by 1 on form submission
      if (sendService.timeSlots[selectedSessionIndex] > 0) {
          sendService.timeSlots[selectedSessionIndex] -= 1;

          console.log(`Time slot at index ${selectedSessionIndex} is now ${sendService.timeSlots[selectedSessionIndex]}`);
          console.log(sendService);

          // Optionally disable the session if the time slot reaches 0
          if (sendService.timeSlots[selectedSessionIndex] === 0) {
              sessionSelect.options[selectedSessionIndex].disabled = true;
          }
      } else {
          console.log('Selected time slot is already at 0, cannot decrement further');
      }

      // Calculate the total cost
      const costPerDecare = 30000; // Cost for 1 decare
      const farmArea = parseFloat(areaInput.value); // Get the farm area from the input
      const totalCost = farmArea * costPerDecare; // Calculate the total cost
      console.log(totalCost);

      // Generate farm object based on form, this will be sent to another API
      const farm = {
          farmArea: farmArea,
          cropType: sendService.cropType,
          farmLocation: locationInput.value
      };

      sendAddFarmRequest(farm);
      console.log(sendService.timeSlots);
      sendRequestUpdateService(sendService);

      // Gather form data
      const formData = {
          farmer: sentUser, // User data extracted from URL
          sprayServices: sendService, // Service data extracted from URL
          date: dateInput.value,
          location: locationInput.value,
          serviceTimeSlot: sessionSelect.value, // Include the selected time slot
          totalCost: totalCost // Include the calculated total cost
      };

      console.log(formData);

      sendRequestOrder(formData);
      //redirect to service
      window.location.href = `/service`
  });
}





function setInitialDate() {
    const dateInput = document.getElementById("date");
    const now = new Date();
    dateInput.value = now.toISOString().slice(0, 16);
}
