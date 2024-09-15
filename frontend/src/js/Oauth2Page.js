const oauth2API = 'http://localhost:8080/api/oauth/config'; // Your OAuth2 API endpoint

// This function will extract the access token from the URL hash fragment.
function getAccessTokenFromUrl() {
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1)); // Remove the leading '#'
        return params.get('access_token');
    }
    return null;
}

// This function will use the access token to make a request to Google's UserInfo API
async function getUserInfo(accessToken) {
    const userInfoEndpoint = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';

    try {
        const response = await fetch(userInfoEndpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        return userInfo;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
}

// Function to set a cookie for storing the JWT token
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration date
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;Secure;SameSite=Lax";
}

// Function to send the encoded email to the OAuth2 API using POST request
async function compareUserToDatabase(email) {
    const payload = { email };  // Data to send in the POST request

    try {
        const response = await fetch(oauth2API, {
            method: 'POST',  // POST request
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(payload) // Send the email in the body
        });

        if (!response.ok) {
            throw new Error('Failed to compare user in database');
        }

        const data = await response.json();

        console.log('Success:', data.token);
        setCookie('jwtToken', data.token, 7); // Save the token in a cookie for 7 days

        // Redirect to the profile page
        const profileUrl = `/profile?role=farmer`;
        window.location.href = profileUrl;  // Redirect to profile page with user role as a param
    } catch (error) {
        console.error('Error sending user email to database:', error);
        document.body.innerHTML = '<h1>Failed to verify user</h1>';
    }
}

// Main function to handle the OAuth flow and get the user's email
async function handleOAuth2() {
    // Get the access token from the URL
    const accessToken = getAccessTokenFromUrl();

    if (accessToken) {
        // Fetch user info using the access token
        const userInfo = await getUserInfo(accessToken);

        if (userInfo && userInfo.email) {
            compareUserToDatabase(userInfo.email);
        } else {
            console.error('User info not available');
            document.body.innerHTML = '<h1>Failed to retrieve user info</h1>';
        }
    } else {
        console.error('Access token not found in URL');
        document.body.innerHTML = '<h1>Access token not found</h1>';
    }
}

// Run the function when the page loads
window.onload = handleOAuth2;
