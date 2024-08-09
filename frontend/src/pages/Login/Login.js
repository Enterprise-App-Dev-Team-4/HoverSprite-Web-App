const loginParam = 'http://localhost:8080/login?type=';
const instance = "userRole";

function parseUserRequestParam(parsedParam, object) {
    var userRoleSelect = document.getElementById(object);
    
    // Get the selected user role
    var selectedRole = userRoleSelect.value;
    
    // Construct the new action URL with the selected role as a parameter
    var actionURL = parsedParam + encodeURIComponent(selectedRole);
    return actionURL;
}

function fetchRequestServer(user, action) {
    fetch(action, {
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
        alert('Login successful!');
    })
    .catch((error) => {
        // Handle error
        console.error('Error:', error);
        alert('Wrong user name or Password');
    });
}

function sendLoginDataToServer() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Here we ensure 'form' is defined as the form that triggered the submit event
        var form = event.target; 

        var client = {
            username: null, // Assuming you set this somewhere else or it's not needed
            password: form.password.value,
            email: form.email.value,
            phoneNumber: null, // Assuming you set this somewhere else or it's not needed
            fullName: null,  // Assuming you set this somewhere else or it's not needed
            homeAddress: null // Assuming you set this somewhere else or it's not needed
        };

        // Construct the new action URL with the selected role as a parameter
        var actionURL = parseUserRequestParam(loginParam, instance);
        console.log(actionURL);

        // Send the form data using fetch
        fetchRequestServer(client, actionURL);
    });
}

sendLoginDataToServer();
