document.addEventListener('DOMContentLoaded', () => {
    const orderId = window.location.pathname.split('/').pop();
    if (orderId) {
        fetchOrderDetails(orderId);
    } else {
        displayErrorMessage('No order ID provided');
    }
});

function fetchOrderDetails(orderId) {
    fetch('../js/fakeOrder.json')
        .then(response => response.json())
        .then(data => {
            const order = data.orders.find(o => o.id === parseInt(orderId));
            if (order) {
                displayOrderDetails(order);
            } else {
                displayErrorMessage('Order not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayErrorMessage('Failed to load order details');
        });
}


function displayOrderDetails(order) {
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('orderStatus').textContent = order.status;
    document.getElementById('orderStatus').classList.add(`bg-${getStatusColor(order.status)}`);
    document.getElementById('orderDate').textContent = formatDate(order.date);
    document.getElementById('farmerName').textContent = order.farmer.name;
    document.getElementById('sprayerNames').textContent = order.assignedSprayers ? order.assignedSprayers.join(', ') : 'None';
    document.getElementById('farmArea').textContent = order.farm.area;
    document.getElementById('cropType').textContent = order.farm.cropType;
    document.getElementById('farmLocation').textContent = order.farm.location;
    document.getElementById('serviceName').textContent = order.sprayService.name;
    document.getElementById('serviceType').textContent = order.sprayService.type;
    document.getElementById('timeSlot').textContent = order.sprayService.timeSlot;
    document.getElementById('orderCost').textContent = `${order.cost.toLocaleString()} VND`;
    if (order.feedback != null) {
        document.getElementById('feedbackRating').textContent = `${order.feedback.rating} / 5 ⭐`;
        document.getElementById('feedbackComment').textContent = order.feedback.comment;
    } else {
        document.getElementById('feedbackRating').textContent = `N/A`;
        document.getElementById('feedbackComment').textContent = `N/A`;
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
