const express = require('express');
const app = express();
const body_parser = require('body-parser');

const SignupPath = __dirname + '/src/pages/Signup.html'
const registerPath = __dirname + '/src/pages/Register.html'
const loginPath = __dirname + '/src/pages/Login.html'
const aboutPath = __dirname + '/src/pages/About.html'
const servicePath = __dirname + '/src/pages/Services.html'
const bookingPath = __dirname + '/src/pages/Booking.html'
const profilePath = __dirname + '/src/pages/Profile.html'
const userOrderListPath = __dirname + '/src/pages/UserOrderList.html'
const userOrderDetailPath = __dirname + '/src/pages/UserOrderDetail.html'
const receptionistOrderPath = __dirname + '/src/pages/ReceptionistOrder.html'
const receptionistOrderDetailPath = __dirname + '/src/pages/ReceptionistOrderDetail.html'
const sprayerOrderPath = __dirname + '/src/pages/SprayerOrder.html'
const sprayerOrderDetailPath = __dirname + '/src/pages/SprayerOrderDetail.html'
const landingPagePath = __dirname + '/src/pages/LandingPage.html'
const orderFeedBackPath = __dirname + '/src/pages/FeedBack.html'

const testPath = __dirname + '/src/pages/temp.html'
app.use(body_parser.urlencoded({ extended: true }));

// Serve static images from the public directory
app.use('/public', express.static('./public'));

app.use('/css', express.static('src/css'));

// Serve pages - need to individually set routes if they require specific handling
app.use('/pages', express.static('src/pages'));

app.use('/components', express.static('src/components'));

app.use('/js', express.static('src/js'));


// handle routing
app.get('/', (req, res) => {
    res.sendFile(landingPagePath);
})

app.get('/signup', (req, res) => {
    res.sendFile(SignupPath);
})

app.get('/register', (req, res) => {
    res.sendFile(registerPath);
})

app.get('/login', (req, res) => {
    res.sendFile(loginPath);
})

app.get('/about-us', (req, res) => {
    res.sendFile(aboutPath);
})

app.get('/service', (req, res) => {
    res.sendFile(servicePath);
})

app.get('/booking', (req, res) => {
    res.sendFile(bookingPath);
})

app.get('/profile', (req, res) => {
    res.sendFile(profilePath);
})

app.get('/order-list', (req, res) => {
    res.sendFile(userOrderListPath);
})

app.get('/order-detail/:id', (req, res) => {
    res.sendFile(userOrderDetailPath);
});

app.get('/test', (req, res) => {
    res.sendFile(testPath);
})

app.get('/receptionist-order', (req, res) => {
    res.sendFile(receptionistOrderPath);
})

app.get('/receptionist-order-detail/:id', (req, res) => {
    res.sendFile(receptionistOrderDetailPath);
});

app.get('/sprayer-order', (req, res) => {
    res.sendFile(sprayerOrderPath);
})

app.get('/sprayer-order-detail/:id', (req, res) => {
    res.sendFile(sprayerOrderDetailPath);
});

app.get('/feed-back/:id', (req, res) => { // add real id to feedback
    res.sendFile(orderFeedBackPath);
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/src/pages/UserHome.html');
});


app.listen(3000, () => {
    console.log("listen on port");

})