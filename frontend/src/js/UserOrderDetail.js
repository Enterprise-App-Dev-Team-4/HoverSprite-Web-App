const orderDetailAPI = 'http://localhost:8080/order';

document.addEventListener('DOMContentLoaded', () => {
    const orderId = window.location.pathname.split('/').pop();
    if (orderId) {
        fetchOrderDetails(orderId);
    } else {
        displayErrorMessage('No order ID provided');
    }
});

function fetchOrderDetails(orderId) {
    const url = `${orderDetailAPI}?orderId=${orderId}`; // Attach the orderId to the URL
    console.log(url);
    sendRequestWithToken(url)
        .then(data => {
            console.log(data);
            displayOrderDetails(data); // Directly use data assuming the API returns the order details
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

function displayOrderDetails(order) {
    console.log(order);  // Debugging: Ensure the order object is correct

    // Set order details
    document.getElementById('orderId').textContent = order.orderID;
    document.getElementById('orderStatus').textContent = order.status;
    document.getElementById('orderStatus').classList.add(`bg-${getStatusColor(order.status)}`);
    document.getElementById('orderDate').textContent = formatDate(order.date);
    document.getElementById('farmerName').textContent = order.farmer.fullName;

    // Check if sprayer and sprayServices exist before accessing them
    if (order.sprayer) {
        document.getElementById('sprayerName').textContent = order.sprayer.name;
    } else {
        document.getElementById('sprayerName').textContent = 'N/A';
    }

    if (order.sprayServices) {
        document.getElementById('cropType').textContent = order.sprayServices.cropType;
        document.getElementById('serviceName').textContent = order.sprayServices.serviceName;
        document.getElementById('serviceType').textContent = order.sprayServices.serviceType;
    } else {
        document.getElementById('cropType').textContent = 'N/A';
        document.getElementById('serviceName').textContent = 'N/A';
        document.getElementById('serviceType').textContent = 'N/A';
    }

    document.getElementById('farmLocation').textContent = order.location;
    document.getElementById('timeSlot').textContent = order.serviceTimeSlot;
    document.getElementById('orderCost').textContent = `${order.totalCost.toLocaleString()} VND`;

    // Handle feedback
    if (order.feedback) {
        document.getElementById('feedbackRating').textContent = `${order.feedback.rating} / 5 ⭐`;
        document.getElementById('feedbackComment').textContent = order.feedback.comment;
    } else {
        document.getElementById('feedbackRating').textContent = 'N/A';
        document.getElementById('feedbackComment').textContent = 'N/A';
    }

    animateNumbers();
}


function getStatusColor(status) {
    switch (status) {
        case 'completed': return 'success';
        case 'in_progress': return 'primary';
        case 'confirmed': return 'info';
        case 'assigned': return 'warning';
        case 'cancelled': return 'danger';
        default: return 'secondary';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function displayErrorMessage(message) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}

function animateNumbers() {
    const costElement = document.getElementById('orderCost');
    const targetCost = parseInt(costElement.textContent.replace(/[^\d]/g, ''));
    let currentCost = 0;
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = targetCost / steps;

    const timer = setInterval(() => {
        currentCost += increment;
        if (currentCost >= targetCost) {
            clearInterval(timer);
            currentCost = targetCost;
        }
        costElement.textContent = `${Math.round(currentCost).toLocaleString()} VND`;
    }, duration / steps);
}

loadNavBar();
loadFooter();