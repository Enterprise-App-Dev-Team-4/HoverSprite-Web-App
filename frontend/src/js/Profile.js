document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.querySelector('.edit-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const profileForm = document.querySelector('.profile-form');
    const profileInfo = document.querySelector('.profile-info');

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
});
