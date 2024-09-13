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

    if (userAPI) {
        sendRequestWithToken(userAPI)
            .then(data => {
                user = data;
                homeUser = data
                console.log(homeUser);
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
}


function getUserRoleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('role');
}


document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();  // Get the role from the URL

    loadNavBar(role);
    loadFooter();
});