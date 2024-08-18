const UserURL = 'http://localhost:8080/userName';

document.addEventListener("DOMContentLoaded", function() {
  loadNavBar();
  loadFooter();
  fetchUserData();
  initializeProfileButtons();
});

function fetchUserData() {
  sendRequestWithToken(UserURL)
      .then(data => {
          updateProfileInfo(data);
          populateFormFields(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
}

function updateProfileInfo(data) {
  document.getElementById('profileName').textContent = data.fullName || 'John Smith';
  document.getElementById('profileUsername').textContent = '@' + (data.username || 'john');
  document.getElementById('profileEmail').textContent = 'Email: ' + (data.email || 'demomail@mail.com');

  document.getElementById('fullNameDisplay').textContent = data.fullName || 'John';
  document.getElementById('usernameDisplay').textContent = data.username || 'cultivated farmer';
  document.getElementById('emailDisplay').textContent = data.email || 'demomail@mail.com';
  // Optionally set Facebook and Twitter if included in the UserDTO
  document.getElementById('facebookDisplay').textContent = data.facebook || 'Facebook Username';
  document.getElementById('twitterDisplay').textContent = data.twitter || 'Twitter Username';
}

function populateFormFields(data) {
  document.getElementById('fullName').value = data.fullName || '';
  document.getElementById('username').value = data.username || '';
  document.getElementById('email').value = data.email || '';
  document.getElementById('facebook').value = data.facebook || '';
  document.getElementById('twitter').value = data.twitter || '';
}

function initializeProfileButtons() {
  const profileForm = document.querySelector('.profile-form');
  const profileInfo = document.querySelector('.profile-info');
  const editBtn = document.querySelector('.edit-btn');
  const cancelBtn = document.querySelector('.cancel-btn');

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

  profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add form submission logic here
      alert('Profile updated successfully!');
      profileForm.style.display = 'none';
      profileInfo.style.display = 'block';
      editBtn.style.display = 'block';
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
