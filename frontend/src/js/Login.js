const loginParam = 'http://localhost:8080/login?type=';
const instance = "userRole";

function parseUserRequestParam(parsedParam, object) {
    var userRoleSelect = document.getElementById(object);
    
    // Get the selected user role
    var selectedRole = userRoleSelect.value;
    console.log(selectedRole);
    
    // Construct the new action URL with the selected role as a parameter
    var actionURL = parsedParam + encodeURIComponent(selectedRole);
    return actionURL;
}

/**
 * Google OAuth2 Sign-In
 * Requests access to the user's Google email address
 */
function oauthSignIn() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
        'client_id': '375398691957-il3fitibn2e5a93uuo521p7d4a54k08u.apps.googleusercontent.com',  // Replace with your actual client_id
        'redirect_uri': 'http://localhost:3000/oauth2callback',  // Replace with your actual redirect_uri
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/userinfo.email',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };

    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
}


function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration date
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;Secure;SameSite=Lax";
}

function fetchRequestServer(user, action) {
    console.log(action);
    fetch(action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        // Handle success
        console.log(data);
        console.log('Success:', data.token);
        setCookie('jwtToken', data.token, 7); // Save the token in a cookie for 7 days
        
        // Retrieve the user role to append to the /profile URL
        var userRole = document.getElementById(instance).value;
        console.log(userRole);
        var profileUrl = `/profile?role=${encodeURIComponent(userRole)}`;

        displayAlert('success', 'Login successful!');

        // Delay the redirect by 2 seconds (2000 milliseconds)
        setTimeout(function() {
            window.location.href = profileUrl;  // Redirect to profile page with user role as a param
        }, 1500); // 2000 milliseconds = 2 seconds
    })
    .catch((error) => {
        // Handle error
        console.error('Error:', error);
        displayAlert('danger', 'Wrong user name or Password');
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

function sendLoginDataToServer() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Here we ensure 'form' is defined as the form that triggered the submit event
        var form = event.target; 
        var phoneNumberForm = form.email.value;
        var client = {
            username: null, // Assuming you set this somewhere else or it's not needed
            password: form.password.value,
            email: form.email.value,
            phoneNumber: phoneNumberForm, // Assuming you set this somewhere else or it's not needed
            fullName: null,  // Assuming you set this somewhere else or it's not needed
            homeAddress: null // Assuming you set this somewhere else or it's not needed
        };

        // Construct the new action URL with the selected role as a parameter
        var actionURL = parseUserRequestParam(loginParam, instance);
        // Send the form data using fetch
        fetchRequestServer(client, actionURL);
    });
}

function redirectToRegister() {
    // Ensure the DOM is fully loaded before adding the event listener
    document.addEventListener('DOMContentLoaded', function() {
        const registerButton = document.getElementById('register-page');

        // Check if the element exists
        if (registerButton) {
            registerButton.addEventListener('click', function(event) {
                // Define the URL to redirect to
                let url = "http://localhost:3000/register";

                // Redirect to the URL
                window.location.href = url;
            });
        } else {
            console.error('Element with id "register-page" not found.');
        }
    });
}

redirectToRegister();
sendLoginDataToServer();
