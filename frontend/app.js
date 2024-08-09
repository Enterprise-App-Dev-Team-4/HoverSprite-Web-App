const express = require('express');
const app = express();
const body_parser = require('body-parser');

const SignupPath = __dirname + '/src/pages/Signup/Signup.html'
const registerPath = __dirname + '/src/pages/Register/Register.html'

// Serve static images from the public directory
app.use('/public', express.static('./public'));

app.use('/css', express.static('src/css'));

// Serve pages - need to individually set routes if they require specific handling
app.use('/', express.static('src/pages'));
// middle ware handling error

// handle routing
app.get('/', (req,res)=> {
    res.sendFile(SignupPath);
})

app.get('/register', (req,res)=> {
    res.sendFile(registerPath);
})

app.listen(3000, () => {
    console.log("listen on port");

})