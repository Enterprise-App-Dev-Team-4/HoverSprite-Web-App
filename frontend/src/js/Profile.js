const UserURL = 'http://localhost:8080/userName';
const UpdateProfileUrl = 'http://localhost:8080/updateProfile';

document.addEventListener("DOMContentLoaded", function() {
  loadNavBar();
  loadFooter();
  fetchUserData();
  initializeProfileButtons();
});

function fetchUserData() {
  sendRequestWithToken(UserURL)
      .then(data => {
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

  // Update the profile info section with firstName, lastName, email, and phone number
  document.getElementById('firstNameDisplay').textContent = data.firstName || 'John';
  document.getElementById('lastNameDisplay').textContent = data.lastName || 'Doe';
  document.getElementById('emailDisplay').textContent = data.email || 'demomail@mail.com';
  document.getElementById('phoneNumberDisplay').textContent = data.phoneNumber || '123-456-7890';

  // Handle profile image if it's in the response
  if (data.profileImage) {
      const base64Image = `data:image/jpeg;base64,${data.profileImage}`;
      document.getElementById('profileImage').src = base64Image;
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
  const profileImageInput = document.getElementById('profileImageUpload');
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

  // Update profile image preview when a new image is selected
  profileImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
              profileImage.src = event.target.result; // Update the image preview
          };
          reader.readAsDataURL(file);
      }
  });

  profileForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(profileForm);

      // Add profile image file to the FormData if a file is selected
      const profileImageFile = profileImageInput.files[0];
      if (profileImageFile) {
          formData.append('profileImage', profileImageFile);
      }

      // Use the sendRequestWithToken function to send the request
      sendRequestWithToken(UpdateProfileUrl, 'PUT', formData)
          .then(data => {
              console.log(data);
              profileForm.style.display = 'none';
              profileInfo.style.display = 'block';
              editBtn.style.display = 'block';
              updateProfileInfo(data); // Update the profile display with new data
          })
          .catch(error => {
              console.error('Error updating profile:', error);
              alert('Failed to update profile.');
          });
  });
}


function loadNavBar() {
  const navbarContainer = document.getElementById("navbar-container");
  sendRequestWithToken(UserURL)
      .then(data => {
          navbarContainer.innerHTML = returnNavBar(data.email);
          activeClick();
      })
      .catch(error => console.error('Error loading navbar:', error));
}

function loadFooter() {
  const footerContainer = document.getElementById("footer-container");
  footerContainer.innerHTML = returnFooter();
}
