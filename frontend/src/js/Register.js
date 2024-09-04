function submitForm() {
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var form = this;
        var full_name = form.firstName.value + " " + form.lastName.value;

        // Get the phone number value
        var phoneNumber = form.phoneNumber.value;

        // Regex to validate the phone number format (starts with 0 or +84, followed by 9 or 10 digits, allowing spaces)
        var phoneRegex = /^(0|\+84)\s?\d{2,3}\s?\d{3}\s?\d{3,4}$/;

        // Validate the phone number
        if (!phoneRegex.test(phoneNumber)) {
            // Show an error message if validation fails
            displayAlert('danger', 'Phone number must start with 0 or +84, followed by 9 or 10 digits, and can include spaces.');
            return; // Stop form submission
        }

        // Create a JSON object with the user input
        var user = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            fullName: full_name,
            password: form.password.value,
            email: form.email.value,
            phoneNumber: phoneNumber,
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
            setTimeout(function() {
                window.location.href = '/login';  // Redirect to profile page with user role as a param
            }, 1500); // 1500 milliseconds = 1.5 seconds
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
