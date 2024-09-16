function redirectToRegister() {
    console.log('Redirecting to Register page');
    let url = "http://localhost:3000/register";
    window.location.href = url;
}

function redirectToLogin() {
    console.log('Redirecting to Login page');
    let url = "http://localhost:3000/login";
    window.location.href = url;
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
