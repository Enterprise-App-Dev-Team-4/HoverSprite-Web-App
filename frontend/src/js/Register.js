
function submitForm()
{
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var form = this;
    
        // Create a JSON object with the user input
        var user = {
            username: form.username.value,
            password: form.password.value,
            email: form.email.value,
            phoneNumber: form.phoneNumber.value,
            fullName : form.fullName.value,
            homeAddress: form.homeAddress.value
        };
    
        // Send the form data using fetch
        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            // Handle success
            console.log('Success:', data);
            alert('Registration successful!');
        })
        .catch((error) => {
            // Handle error
            console.error('Error:', error);
            alert('An error occurred during registration.');
        });
        console.log(data);
    });
}

function redirectToLogin()
{
    let url = "http://localhost:3000/login";
    window.location.href = url;
}

submitForm();