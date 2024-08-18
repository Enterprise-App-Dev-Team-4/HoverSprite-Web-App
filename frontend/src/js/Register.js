
function submitForm()
{
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var form = this;
        var full_name = form.firstName.value + " " + form.lastName.value;
    
        // Create a JSON object with the user input
        var user = {
            firstName: form.firstName.value,
            lastName : form.lastName.value,
            fullName: full_name,
            password: form.password.value,
            email: form.email.value,
            phoneNumber: form.phoneNumber.value,
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
            alert(error);
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