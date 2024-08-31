function submitForm() {
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var form = this;
        var full_name = form.firstName.value + " " + form.lastName.value;

        // Create a JSON object with the user input
        var user = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            fullName: full_name,
            password: form.password.value,
            email: form.email.value,
            phoneNumber: form.phoneNumber.value,
            homeAddress: form.homeAddress.value,
            profileImage: 'https://firebasestorage.googleapis.com/v0/b/hoversprite-3d6b3.appspot.com/o/user-avatar.png?alt=media&token=ebc0c97d-28c7-4316-9ce2-a68215fe9c22'
        };

        // Send the form data using fetch
        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            console.log('Success:', data);
            displayAlert('success', 'Account created successfully! Check your email for verification.');
            document.getElementById('userForm').reset(); // Reset the form
        })
        .catch((error) => {
            // Handle error
            console.error('Error:', error);
            displayAlert('danger', error.message);
        });
    });
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

function redirectToLogin() {
    let url = "http://localhost:3000/login";
    window.location.href = url;
}

submitForm();