const cancelBtn = document.querySelector('.cancel-btn');
const profileForm = document.querySelector('.profile-form');
const profileInfo = document.querySelector('.profile-info');
const editBtn = document.querySelector('.edit-btn');


function profileEdit()
{
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Profile updated successfully!');
        profileForm.style.display = 'none';
        profileInfo.style.display = 'block';
        editBtn.style.display = 'block';
    });
}

function cancelButton()
{
    cancelBtn.addEventListener('click', function() {
        profileForm.style.display = 'none';
        profileInfo.style.display = 'block';
        editBtn.style.display = 'block';
    });
}

function editButton()
{
    editBtn.addEventListener('click', function() {
        profileForm.style.display = 'block';
        profileInfo.style.display = 'none';
        editBtn.style.display = 'none';
    });
}

function loadNavBar()
{
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Navbar component
    var content = document.getElementById("navbar-container");
    content.innerHTML = returnNavBar();
    // content.innerHTML = returnNavBarStyle();
    activeClick();
  });
  
}

function loadFooter()
{
  console.log('Hello  footer');
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Navbar component
    var content = document.getElementById("footer-container");
    content.innerHTML = returnFooter();
  });
}


// export the function
loadFooter();
loadNavBar();
profileEdit();
cancelButton();
editButton();

