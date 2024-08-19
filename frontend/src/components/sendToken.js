function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function sendRequestWithToken(url, method, body) {
    const token = getCookie('jwtToken'); // Retrieve the token from the cookie

    const headers = {
        'Content-Type': 'application/json'
        // No need to include the token in the Authorization header if using a cookie
    };

    const options = {
        method: method,
        headers: headers,
        credentials: 'include' // This ensures cookies are sent with the request
    };

    if (body) {
        options.body = JSON.stringify(body); // If there's a body, stringify it and add it to the request
    }

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                console.error(`Error: ${response.status} ${response.statusText}`);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error('There was a problem with your fetch operation:', error));
}

// Example usage
sendRequestWithToken();
