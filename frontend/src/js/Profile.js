const UserURL = 'http://localhost:8080/userName';
const UpdateProfileUrl = 'http://localhost:8080/updateProfile';
const ReceptionistURL = 'http://localhost:8080/receptionist';
const ReceptionistEditProfile = 'http://localhost:8080/receptionistProfile';
const SprayerURL = 'http://localhost:8080/sprayer';
const SprayerEditProfile = 'http://localhost:8080/sprayerProfile';

// Global variable to store user data
let userData = null;
let role = null;

function getUserRoleFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('role');
}

document.addEventListener("DOMContentLoaded", function () {
    const userRole = getUserRoleFromUrl();
    role = userRole;
    loadNavBar(userRole);
    loadFooter();
    fetchUserData(userRole);
    initializeProfileButtons(userRole);
});

function fetchUserData(userRole) {
    var userAPI = null;
    if (userRole === 'receptionist') {
        userAPI = ReceptionistURL;
    } else if (userRole === 'farmer') {
        userAPI = UserURL;
    } else if (userRole === 'sprayer') {
        userAPI = SprayerURL;
    }

    sendRequestWithToken(userAPI)
        .then(data => {
            userData = data;
            console.log(data);
            updateProfileInfo(data);
            populateFormFields(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function updateProfileInfo(data) {
    document.getElementById('profileName').textContent = data.fullName || 'John Smith';
    document.getElementById('profileUsername').textContent = '@' + (data.firstName || 'john');
    document.getElementById('profileEmail').textContent = 'Email: ' + (data.email || 'demomail@mail.com');
    document.getElementById('firstNameDisplay').textContent = data.firstName || 'John';
    document.getElementById('lastNameDisplay').textContent = data.lastName || 'Doe';
    document.getElementById('emailDisplay').textContent = data.email || 'demomail@mail.com';
    document.getElementById('phoneNumberDisplay').textContent = data.phoneNumber || '123-456-7890';

    if (data.profileImage) {
        document.getElementById('profileImage').src = data.profileImage;
    }
}

function populateFormFields(data) {
    document.getElementById('firstName').value = data.firstName || '';
    document.getElementById('lastName').value = data.lastName || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('phoneNumber').value = data.phoneNumber || '';
}

function initializeProfileButtons(userRole) {
    const profileForm = document.querySelector('.profile-form');
    const profileInfo = document.querySelector('.profile-info');
    const editBtn = document.querySelector('.edit-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const profileImage = document.getElementById('profileImage');
    const profileImageUpload = document.getElementById('profileImageUpload');

    editBtn.addEventListener('click', function () {
        profileForm.style.display = 'block';
        profileInfo.style.display = 'none';
        editBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function () {
        profileForm.style.display = 'none';
        profileInfo.style.display = 'block';
        editBtn.style.display = 'block';
    });

    // Update profile image preview when a new image is selected
    profileImageUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                profileImage.src = event.target.result; // Display the image preview
            };
            reader.readAsDataURL(file); // Read the image file as a data URL
        }
    });

    profileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate phone number before submission
        const phoneNumber = document.getElementById('phoneNumber').value;
        const phoneRegex = /^(0|\+84)\s?\d{2,3}\s?\d{3}\s?\d{3,4}$/;

        if (!phoneRegex.test(phoneNumber)) {
            displayAlert('danger', 'Phone number must start with 0 or +84, followed by 9 or 10 digits, and can include spaces.');
            return; // Stop form submission if validation fails
        }

        var userAPI = null;
        if (userRole === 'receptionist') {
            userAPI = ReceptionistEditProfile;
        } else if (userRole === 'farmer') {
            userAPI = UpdateProfileUrl;
        } else if (userRole === 'sprayer') {
            userAPI = SprayerEditProfile;
        }

        // Assuming uploadUserImage is a function that handles image uploading
        uploadUserImage(profileImageUpload.files[0]).then(profileImageUrl => {
            if (profileImageUrl) {
                submitProfileFormWithImage(profileImageUrl, userAPI);
            } else {
                submitProfileFormWithImage(userData.profileImage, userAPI);
            }
        }).catch(error => {
            console.error('Error uploading image:', error);
            displayAlert('danger', error.message);
        });
    });
}

function submitProfileFormWithImage(imageUrl, userAPI) {
    const userProfile = {
        profileImage: imageUrl,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value
    };

    console.log(userProfile.email);

    sendRequestWithToken(userAPI, 'PUT', userProfile)
        .then(data => {
            console.log(data);
            finalizeProfileUpdate();
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            displayAlert('danger', error.message);
        });
}

function finalizeProfileUpdate() {
    const profileForm = document.querySelector('.profile-form');
    const profileInfo = document.querySelector('.profile-info');
    const editBtn = document.querySelector('.edit-btn');

    profileForm.style.display = 'none';
    profileInfo.style.display = 'block';
    editBtn.style.display = 'block';
    fetchUserData(); // Refresh the profile info
}


function loadNavBar(userRole) {
    const navbarContainer = document.getElementById("navbar-container");
    var userAPI = null;
    if (userRole === 'receptionist') {
        userAPI = ReceptionistURL;
    } else if (userRole === 'farmer') {
        userAPI = UserURL;
    } else if (userRole === 'sprayer') {
        userAPI = SprayerURL;
    }
    console.log(userAPI);
    sendRequestWithToken(userAPI)
        .then(data => {
            navbarContainer.innerHTML = returnNavBar(data, role);
            activeClick();
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function displayAlert(type, message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
}


function loadFooter() {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = returnFooter();
}
