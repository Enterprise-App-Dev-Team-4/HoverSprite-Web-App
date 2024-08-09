function parseUserRequestParam()
{
    var userRoleSelect = document.getElementById("userRole");
    
     // Get the selected user role
     var selectedRole = userRoleSelect.value;
    
     // Construct the new action URL with the selected role as a parameter
     var actionURL = 'http://localhost:8080/login?type=' + encodeURIComponent(selectedRole);
     return actionURL;
}


var client = {
    password: form.password.value,
    email: form.email.value,
}

function fetchRequestServer(user, action)
{
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
    console.log(data);
}

function sendLoginDataToServer()
{
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        // var form = this;       
         // Construct the new action URL with the selected role as a parameter
         var actionURL = parseUserRequestParam();

        var user = client; // assign client from login to user

        // Send the form data using fetch
        fetchRequestServer(user, actionURL);
    });
}