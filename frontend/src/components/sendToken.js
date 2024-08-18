function sendRequestWithToken(url, method, body) {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach the token to the Authorization header
    };

    const options = {
        method: method,
        headers: headers
    };

    if (body) {
        options.body = JSON.stringify(body); // If there's a body, stringify it and add it to the request
    }

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error('There was a problem with your fetch operation:', error));
}

sendRequestWithToken(url, method, body);
