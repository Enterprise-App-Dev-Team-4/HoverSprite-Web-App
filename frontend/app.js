const express = require('express');
const app = express();
const body_parser = require('body-parser');

const SignupPath = __dirname + '/src/pages/Signup/Signup.html'
const registerPath = __dirname + '/src/pages/Register/Register.html'
const loginPath = __dirname + '/src/pages/Login/Login.html'

app.use(body_parser.urlencoded({extended: true}));

// Serve static images from the public directory
app.use('/public', express.static('./public'));

app.use('/css', express.static('src/css'));

// Serve pages - need to individually set routes if they require specific handling
app.use('/', express.static('src/pages'));

app.use('/', express.static('src/components'));


// handle routing
app.get('/', (req,res)=> {
    res.sendFile(SignupPath);
})

app.get('/register', (req,res)=> {
    res.sendFile(registerPath);
})

app.get('/login', (req,res)=> {
    res.sendFile(loginPath);
})

app.listen(3000, () => {
    console.log("listen on port");

})