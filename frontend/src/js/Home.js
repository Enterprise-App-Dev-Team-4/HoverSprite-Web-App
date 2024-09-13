const navBarURL = 'http://localhost:8080/userName';
const ReceptionistURL = 'http://localhost:8080/receptionist';
const SprayerURL = 'http://localhost:8080/sprayer';
const orderAPI = 'http://localhost:8080/order/all';
const userName = document.getElementById('userName');
let role = null;
let homeUser = null;

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
    const apiUrl = `${orderAPI}?page=0&size=30&sort=date,desc`; // Fetch the 30 most recent orders
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

document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM content loaded');
    role = getUserRoleFromUrl();
    loadNavBar(role);
    loadFooter();
    fetchOrderData();
});
