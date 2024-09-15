const navBarURL = 'http://localhost:8080/userName';
const ReceptionistURL = 'http://localhost:8080/receptionist';
const SprayerURL = 'http://localhost:8080/sprayer';
const orderAPI = 'http://localhost:8080/order/all';
const orderReceptionistAPI = 'http://localhost:8080/receptionistOrder';
const orderSprayerAPI = 'http://localhost:8080/sprayerOrder';
const userName = document.getElementById('userName');
let role = null;
let homeUser = null;

// Weather API constants
const WEATHER_API_KEY = '4d3356044c814d28b04123015241409';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';
const HO_CHI_MINH_CITY = 'Ho Chi Minh City';

function loadNavBar(userRole) {
    const navbarContainer = document.getElementById("navbar-container");
    let userAPI = null;

    if (userRole === 'receptionist') {
        userAPI = ReceptionistURL;
    } else if (userRole === 'farmer') {
        userAPI = navBarURL;
    } else if (userRole == 'sprayer') {
        userAPI = SprayerURL;
    }

    console.log('User Role:', userRole); // Added console log
    console.log('User API:', userAPI); // Added console log

    if (userAPI) {
        sendRequestWithToken(userAPI)
            .then(data => {
                user = data;
                homeUser = data
                console.log('User Data:', homeUser); // Added console log
                userName.innerHTML = homeUser.fullName;
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
    console.log('Footer loaded'); // Added console log
}

function getUserRoleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    console.log('Role from URL:', role); // Added console log
    return role;
}

function fetchOrderData() {
    let apiUrl = null
    if (role == 'farmer') {
        apiUrl = `${orderAPI}?page=0&size=30&sort=date,desc`; // Fetch the 30 most recent orders
    } else if (role == 'receptionist') {
        apiUrl = `${orderReceptionistAPI}?page=0&size=30&sort=date,desc`; // Fetch the 30 most recent orders
    } else if (role == 'sprayer') {
        apiUrl = `${orderSprayerAPI}?page=0&size=30&sort=date,desc`; // Fetch the 30 most recent orders
    }

    console.log('Fetching order data from:', apiUrl); // Added console log
    sendRequestWithToken(apiUrl)
        .then(data => {
            console.log('Fetched order data:', data); // Added console log
            const allOrders = data.content;
            const upcomingServices = allOrders.filter(order => order.orderStatus === 'IN_PROGRESS').slice(0, 2);
            const serviceHistory = allOrders.filter(order => order.orderStatus === 'COMPLETED').slice(0, 2);

            console.log('Upcoming services:', upcomingServices); // Added console log
            console.log('Service history:', serviceHistory); // Added console log

            updateUpcomingServices(upcomingServices);
            updateServiceHistory(serviceHistory);
        })
        .catch(error => console.error('Error fetching order data:', error));
}

function updateUpcomingServices(services) {
    const upcomingServicesContainer = document.getElementById('upcomingServices');
    if (upcomingServicesContainer) {
        upcomingServicesContainer.innerHTML = services.map(service => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${service.cropType} Spray
                <span class="badge bg-primary rounded-pill">${formatDate(service.date)}</span>
            </li>
        `).join('');
        console.log('Upcoming services updated');
    } else {
        console.error('Upcoming services container not found');
    }
}

function updateServiceHistory(services) {
    const serviceHistoryContainer = document.getElementById('serviceHistory');
    if (serviceHistoryContainer) {
        serviceHistoryContainer.innerHTML = services.map(service => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${service.cropType} Spray
                <span class="badge bg-success rounded-pill">Completed</span>
            </li>
        `).join('');
        console.log('Service history updated');
    } else {
        console.error('Service history container not found');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function updateQuickActions(role) {
    const bookServiceBtn = document.getElementById('bookServiceBtn');
    const viewOrdersBtn = document.getElementById('viewOrdersBtn');
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');

    if (role === 'farmer') {
        bookServiceBtn.onclick = () => location.href = '/service?role=farmer';
        viewOrdersBtn.onclick = () => location.href = '/order-list?role=farmer';
        updateProfileBtn.onclick = () => location.href = '/profile?role=farmer';
        viewHistoryBtn.onclick = () => location.href = '/order-list?role=farmer';
    } else if (role === 'receptionist') {
        bookServiceBtn.textContent = 'Manage Services';
        bookServiceBtn.onclick = () => location.href = '/service?role=receptionist';
        viewOrdersBtn.textContent = 'Manage Orders';
        viewOrdersBtn.onclick = () => location.href = '/receptionist-order?role=receptionist';
        updateProfileBtn.onclick = () => location.href = '/profile?role=receptionist';
        viewHistoryBtn.onclick = () => location.href = '/receptionist-order?role=receptionist';
    } else if (role === 'sprayer') {
        bookServiceBtn.style.display = 'none';
        viewOrdersBtn.textContent = 'View Assigned Orders';
        viewOrdersBtn.onclick = () => location.href = '/sprayer-order?role=sprayer';
        updateProfileBtn.onclick = () => location.href = '/profile?role=sprayer';
        viewHistoryBtn.onclick = () => location.href = '/sprayer-order?role=sprayer';
    }
}

// Weather API
// Get user's location
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => reject(error)
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

function fetchWeatherData(latitude, longitude) {
    const url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherCard(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            updateWeatherCard(null);
        });
}

function updateWeatherCard(weatherData) {
    const weatherCard = document.getElementById('weather-card');

    if (weatherData && weatherData.current) {
        const temperature = Math.round(weatherData.current.temp_c);
        const condition = weatherData.current.condition.text;
        const iconUrl = `https:${weatherData.current.condition.icon}`;

        weatherCard.innerHTML = `
            <img src="${iconUrl}" alt="Weather icon" class="mb-3" style="width: 64px; height: 64px;">
            <h3>${temperature}°C</h3>
            <p>${condition}</p>
            <p>${weatherData.location.name}, ${weatherData.location.country}</p>
        `;
    } else {
        weatherCard.innerHTML = `
            <i class="fas fa-exclamation-triangle fa-4x mb-3" style="color: #ffc107;"></i>
            <h3>Weather Unavailable</h3>
            <p>Unable to fetch weather data</p>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM content loaded');
    role = getUserRoleFromUrl();
    updateQuickActions(role);
    loadNavBar(role);
    loadFooter();
    fetchOrderData();

    // Fetch weather data based on user's location
    getUserLocation()
        .then(coords => fetchWeatherData(coords.latitude, coords.longitude))
        .catch(error => {
            console.error('Error getting user location:', error);
            // Fallback to a default location (e.g., Ho Chi Minh City)
            fetchWeatherData(10.8231, 106.6297);
        });
});
