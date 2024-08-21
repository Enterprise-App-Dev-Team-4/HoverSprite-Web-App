const UserURL = 'http://localhost:8080/userName';
const UpdateProfileUrl = 'http://localhost:8080/updateProfile';
// Global variable to store user data
let userData = null;

document.addEventListener("DOMContentLoaded", function() {
    loadNavBar();
    loadFooter();
    fetchUserData();
    initializeProfileButtons();
});

function fetchUserData() {
    sendRequestWithToken(UserURL)
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
    document.getElementById('profileUsername').textContent = '@' + (data.username || 'john');
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



function initializeProfileButtons() {
    const profileForm = document.querySelector('.profile-form');
    const profileInfo = document.querySelector('.profile-info');
    const editBtn = document.querySelector('.edit-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const profileImage = document.getElementById('profileImage');

    editBtn.addEventListener('click', function() {
        profileForm.style.display = 'block';
        profileInfo.style.display = 'none';
        editBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        profileForm.style.display = 'none';
        profileInfo.style.display = 'block';
        editBtn.style.display = 'block';
    });

    document.getElementById('profileImageUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImage.src = event.target.result; // Display the image preview
            };
            reader.readAsDataURL(file); // Read the image file as a data URL
        }
    });

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        uploadUserImage().then(profileImageUrl => {
            if (profileImageUrl) {
                submitProfileFormWithImage(profileImageUrl);
            } else {
              submitProfileFormWithImage(userData.profileImage);
            }
        });
    });
}

function submitProfileFormWithImage(imageUrl) {
    const userProfile = {
        profileImage: imageUrl,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value
    };

    console.log(userProfile)
    sendRequestWithToken(UpdateProfileUrl, 'PUT', userProfile)
        .then(data => {
            console.log(data);
            finalizeProfileUpdate();
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
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

function loadNavBar() {
    const navbarContainer = document.getElementById("navbar-container");
    sendRequestWithToken(UserURL)
        .then(data => {
            navbarContainer.innerHTML = returnNavBar(data);
            activeClick();
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function loadFooter() {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = returnFooter();
}
