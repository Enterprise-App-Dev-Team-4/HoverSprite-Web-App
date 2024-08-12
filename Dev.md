# Connecting to the Shared PostgreSQL Server

Follow these steps to connect to the shared PostgreSQL server.

## Prerequisites

1. Ensure you have PostgreSQL client tools installed. You can download them from the [official PostgreSQL website](https://www.postgresql.org/download/).
2. Obtain the following connection details from the database administrator:
   - **Host:** 192.168.100.90
   - **Port:** 5432 
   - **Database:** hover_sprite
   - **Username:** developer_user
   - **Password:** 1234

## Using Command Line to access in the psql
```sh
psql -h your_server_ip -p 5432 -U developer_user -d hover_sprite

```
## Connect database in pgadmin
1. Register-> new Server
2. Enter the server detail with the configuration above.

## Table permission denied
- Need to create to table in database first before using JPA

## to send post request to the server
1. In html the form should have action the the url that server handle with method post:
```
<form id="userForm" method="post" action="http://localhost:8080/register?type=farmer">
```

2. In javascript, the data must be colleceted and packaged in JSON to be sent
```js
 // Create a JSON object with the user input
            var user = {
                username: form.username.value,
                password: form.password.value,
                email: form.email.value,
                phoneNumber: form.phoneNumber.value,
                fullName : form.fullName.value,
                homeAddress: form.homeAddress.value
            };
```
3. Using fetch to send the JSON to server:
```js
// Send the form data using fetch
fetch(form.action, { // make connection to server; action: This specifies the URL to which the request is sent.
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
})
.then(response => response.json()) // PROMISE
.then(data => { // call respojse data from the server
    // Handle success
    console.log('Success:', data);
    alert('Registration successful!');
})
.catch((error) => {
    // Handle error
    console.error('Error:', error);
    alert('An error occurred during registration.');
});
```
- This will fetch JSON to send to server via POST request

## If encounter the error ``add ID manually before persit ``
- Proccess the generate id function before calling the saveToDatabase function

## To handle the js static hosted by express
- In the ``js`` file, for the function is called in html tag, the file path to the script file is ``./parent/child``
- For the function is called inside the js file, the file path is: ``./child``
- Example
```js
<script src="./Register.js"></script> // the function is called globally
```
```js
<script src="./Signup/Signup.js"></script> // function is called directly
```

# Host Front end to different server port
## Purpose
- It is a nice practice that the url of the front end indicates the same url end point that can be handled by spring server
## Steps
1. Install express
``
npm -i express
``
2. Install nodemon
``
npm -i nodemon
``
3. Go to ``frontend`` folder
``
cd frontend/
``
4. Run ``nodemon app``

## Reuse components:
1. using bootstrap ``<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">``