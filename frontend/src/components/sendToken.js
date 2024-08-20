function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function sendRequestWithToken(url, method = 'GET', body = null) {
    const token = getCookie('jwtToken'); // Retrieve the token from the cookie

    const headers = {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json' 
        // Note: Do not set 'Content-Type' if body is FormData
    };

    const options = {
        method: method,
        headers: headers,
        credentials: 'include' // This ensures cookies are sent with the request
    };

    if (body) {
        if (body instanceof FormData) {
            // If the body is FormData, do not stringify it or set the Content-Type header
            options.body = body;
        } else {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
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
