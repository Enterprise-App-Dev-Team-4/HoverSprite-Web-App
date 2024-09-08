let currentRating = 0;
const starRating = document.getElementById('overallRating');
const stars = starRating.getElementsByClassName('star');
const UpdateFeedBackUrl = 'http://localhost:8080/feedback';
const orderDetailUrl = 'http://localhost:8080/order';

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

    const orderId = window.location.pathname.split('/').pop();

    // Prepare the data to be sent
    const feedbackData = {
        orderId: orderId,
        rating: currentRating,
        comment: feedbackText
    };

    // Send the data to the server using sendRequestWithToken
    sendRequestWithToken(UpdateFeedBackUrl, 'POST', feedbackData)
        .then(data => {
            console.log('Success:', data);
            showPopup();
            // Redirect to order list after a short delay
            setTimeout(() => {
                window.location.href = '/order-list?role=farmer';
            }, 2000);
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

function getOrderDetails() {
    const orderId = window.location.pathname.split('/').pop();

    sendRequestWithToken(`${orderDetailUrl}?orderId=${orderId}`)
        .then(data => {
            if (data.feedback) {
                // Feedback already exists, show message and disable form
                showExistingFeedback(data.feedback);
                disableFeedbackForm();
            } else {
                // No feedback exists, populate order details
                populateOrderDetails(data);
            }
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
            alert('Failed to load order details. Please try again.');
        });
}

function showExistingFeedback(feedback) {
    document.querySelector('.container').innerHTML = `
        <h1>Feedback Already Submitted</h1>
        <p>You have already provided feedback for this order:</p>
        <p><strong>Rating:</strong> ${feedback.rating} / 5</p>
        <p><strong>Comment:</strong> ${feedback.comment}</p>
        <button onclick="window.close()">Close</button>
    `;
}

function disableFeedbackForm() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.style.pointerEvents = 'none');
    document.getElementById('feedbackText').disabled = true;
    document.querySelector('.submit-btn').disabled = true;
}

function populateOrderDetails(data) {
    document.getElementById('orderId').textContent = data.orderID;
    document.getElementById('serviceDate').textContent = new Date(data.date).toLocaleDateString();
    document.getElementById('timeSlot').textContent = data.serviceTimeSlot;
    document.getElementById('farmLocation').textContent = data.location;
    document.getElementById('service').textContent = data.serviceName;
    document.getElementById('cost').textContent = `${data.totalCost.toLocaleString()} VND`;
    document.getElementById('sprayerTeam').textContent = data.sprayer.map(s => s.fullName).join(', ');
}


// Call getOrderDetails when the page loads
document.addEventListener('DOMContentLoaded', getOrderDetails);
