let currentRating = 0;
const starRating = document.getElementById('overallRating');
const stars = starRating.getElementsByClassName('star');
const UpdateFeedBackUrl = 'http://localhost:8080/FeedBack'; //add reall feedback api

function setRating(rating) {
    currentRating = rating;
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.toggle('active', i < rating);
    }
}

for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', function () {
        setRating(parseInt(this.getAttribute('data-value')));
    });

    stars[i].addEventListener('mouseover', function () {
        const value = parseInt(this.getAttribute('data-value'));
        highlightStars(value);
    });

    stars[i].addEventListener('mouseout', function () {
        highlightStars(currentRating);
    });
}

function highlightStars(rating) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.toggle('active', i < rating);
    }
}

function submitFeedback() {
    let feedbackText = document.getElementById('feedbackText').value;
    if (currentRating === 0) {
        alert("Please provide a star rating before submitting.");
        return;
    }
    if (feedbackText.trim() === '') {
        alert("Please provide some feedback before submitting.");
        return;
    }

    // Prepare the data to be sent
    const feedbackData = {
        rating: currentRating,
        comment: feedbackText,
        orderId: document.getElementById('orderId').textContent
    };

    // Send the data to the server 
    fetch(UpdateFeedBackUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            showPopup();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while submitting your feedback. Please try again.');
        });
}

function showPopup() {
    document.getElementById('thankYouPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('thankYouPopup').style.display = 'none';
    // Reset the form
    currentRating = 0;
    highlightStars(currentRating);
    document.getElementById('feedbackText').value = '';
}

//Order details (replace with actual data)
document.getElementById('orderId').textContent = '12345';
document.getElementById('serviceDate').textContent = '02/09/2024';
document.getElementById('timeSlot').textContent = '06:00 - 07:00';
document.getElementById('farmLocation').textContent = 'Hello Hello';
document.getElementById('area').textContent = '5';
document.getElementById('service').textContent = 'Hello';
document.getElementById('cost').textContent = '150,000';
document.getElementById('sprayerTeam').textContent = 'Hello';