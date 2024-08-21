// Profile.js

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

  profileImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
          // Use FileReader to preview the selected image
          const reader = new FileReader();
          reader.onload = function(event) {
              profileImage.src = event.target.result; // Display the image preview
          };
          reader.readAsDataURL(file); // Read the image file as a data URL

          const storageRef = initializeFirebase().storage.ref('profileImages/' + file.name);
          const uploadTask = storageRef.put(file);

          uploadTask.on('state_changed',
              function(snapshot) {
                  // Handle progress if needed
              },
              function(error) {
                  console.error('Error uploading file:', error);
              },
              function() {
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      document.getElementById('profileImageBase64').value = downloadURL;

                      // Auto-submit the form after the image has been uploaded
                      submitProfileFormWithImage(downloadURL);
                  });
              }
          );
      }
  });

  profileForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(profileForm);

      sendRequestWithToken(UpdateProfileUrl, 'PUT', formData)
          .then(data => {
              console.log(data);
              profileForm.style.display = 'none';
              profileInfo.style.display = 'block';
              editBtn.style.display = 'block';
              updateProfileInfo(data);
          })
          .catch(error => {
              console.error('Error updating profile:', error);
              alert('Failed to update profile.');
          });
  });
}

function submitProfileFormWithImage(imageUrl) {
    const profileForm = document.querySelector('.profile-form');
    const formData = new FormData(profileForm);

    // Append the image URL to the form data
    console.log(imageUrl);
    formData.append('profileImage', imageUrl);

    sendRequestWithToken(UpdateProfileUrl, 'PUT', formData)
        .then(data => {
            console.log(data);
            profileForm.style.display = 'none';
            document.querySelector('.profile-info').style.display = 'block';
            document.querySelector('.edit-btn').style.display = 'block';
            updateProfileInfo(data);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
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
