// Function to parse user request parameters
export function parseUserRequestParam(parsedParam, object) {
    var userRoleSelect = document.getElementById(object);
    
    // Get the selected user role
    var selectedRole = userRoleSelect.value;
    
    // Construct the new action URL with the selected role as a parameter
    var actionURL = parsedParam + encodeURIComponent(selectedRole);
    return actionURL;
}

// Function to make a fetch request to the server
export function fetchRequestServer(user, action) {
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
