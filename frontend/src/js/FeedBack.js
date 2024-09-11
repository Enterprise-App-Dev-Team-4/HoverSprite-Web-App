let ratings = {
    overall: 0,
    attentiveness: 0,
    friendliness: 0,
    professionalism: 0
};
let orderIdFromData;
const UpdateFeedBackUrl = 'http://localhost:8080/feedback';
const orderDetailUrl = 'http://localhost:8080/order';

function setRating(category, rating) {
    ratings[category] = rating;
    const stars = document.querySelectorAll(`#${category}Rating .star`);
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.toggle('active', i < rating);
    }
}

function initializeRatings() {
    const ratingCategories = ['overall', 'attentiveness', 'friendliness', 'professionalism'];
    ratingCategories.forEach(category => {
        const stars = document.querySelectorAll(`#${category}Rating .star`);
        stars.forEach(star => {
            star.addEventListener('click', function () {
                setRating(category, parseInt(this.getAttribute('data-value')));
            });

            star.addEventListener('mouseover', function () {
                const value = parseInt(this.getAttribute('data-value'));
                highlightStars(category, value);
            });

            star.addEventListener('mouseout', function () {
                highlightStars(category, ratings[category]);
            });
        });
    });
}

function highlightStars(category, rating) {
    const stars = document.querySelectorAll(`#${category}Rating .star`);
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

function submitFeedback() {
    let feedbackText = document.getElementById('feedbackText').value;
    if (Object.values(ratings).some(rating => rating === 0)) {
        alert("Please provide ratings for all categories before submitting.");
        return;
    }
    if (feedbackText.trim() === '') {
        alert("Please provide some feedback before submitting.");
        return;
    }

    const orderIdFromLink = window.location.pathname.split('/').pop().split('?')[0];

    const feedbackData = {
        orderID: orderIdFromLink,
        feedback: {
            overallRating: ratings.overall,
            attentivenessRating: ratings.attentiveness,
            friendlinessRating: ratings.friendliness,
            professionalismRating: ratings.professionalism,
            content: feedbackText
        }
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
    Object.keys(ratings).forEach(category => {
        ratings[category] = 0;
        highlightStars(category, 0);
    });
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
        <p><strong>Overall Rating:</strong> ${feedback.overallRating} / 5</p>
        <p><strong>Attentiveness Rating:</strong> ${feedback.attentivenessRating} / 5</p>
        <p><strong>Friendliness Rating:</strong> ${feedback.friendlinessRating} / 5</p>
        <p><strong>Professionalism Rating:</strong> ${feedback.professionalismRating} / 5</p>
        <p><strong>Comment:</strong> ${feedback.content}</p>
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
    orderIdFromData = data.orderID;
    document.getElementById('orderId').textContent = data.orderID;
    document.getElementById('serviceDate').textContent = new Date(data.date).toLocaleDateString();
    document.getElementById('timeSlot').textContent = data.serviceTimeSlot;
    document.getElementById('farmLocation').textContent = data.location;
    document.getElementById('service').textContent = data.serviceName;
    document.getElementById('cost').textContent = `${data.totalCost.toLocaleString()} VND`;
    document.getElementById('sprayerTeam').textContent = data.sprayer.map(s => s.fullName).join(', ');
}

// Call initializeRatings and getOrderDetails when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeRatings();
    getOrderDetails();
});
