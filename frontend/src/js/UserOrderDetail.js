const orderDetailAPI = 'http://localhost:8080/order';
let role = null;

function getUserRoleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('role');
}

document.addEventListener('DOMContentLoaded', () => {
    role = getUserRoleFromUrl();  // Get the role from the URL
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

// Function to handle "Back to Order List"
document.addEventListener("DOMContentLoaded", function () {
    const returnOrderListBtn = document.getElementById('returnOrderList');
    console.log('ok');
    if (returnOrderListBtn) {
        returnOrderListBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default anchor behavior
            returnToOrderList();
        });
    }
});

function returnToOrderList() {
    console.log(role);
    window.location.href = `/order-list?role=${encodeURIComponent(role)}`;
}

function getSprayerFeedbackScore(order, orderId) {
    // Get the first sprayer
    const sprayer = order.sprayer[0];

    if (sprayer && sprayer.feedback && sprayer.feedback.length > 0) {
        // Find the feedback with the matching orderId
        const feedback = sprayer.feedback.find(f => f.orderID === orderId);

        if (feedback) {
            return {
                attentivenessRating: feedback.attentivenessRating,
                friendlinessRating: feedback.friendlinessRating,
                professionalismRating: feedback.professionalismRating,
                content: feedback.content
            };
        }
    }

    // Return null if not found
    return null;
}

function displayOrderDetails(order) {
    console.log(order);  // Debugging: Ensure the order object is correct
    let sprayerFeedBack = getSprayerFeedbackScore(order, order.orderID);
    console.log(sprayerFeedBack);

    document.getElementById('orderId').textContent = order.orderID || 'N/A';
    document.getElementById('orderStatus').textContent = order.orderStatus || 'N/A';
    document.getElementById('orderStatus').classList.add(`bg-${getStatusColor(order.orderStatus)}`);
    document.getElementById('orderDate').textContent = formatDate(order.date || new Date());
    document.getElementById('farmerName').textContent = order.farmerFullName ? order.farmerFullName : 'N/A';

    // Handle table for sprayers
    const sprayerTableBody = document.getElementById('sprayerTableBody');
    sprayerTableBody.innerHTML = '';  // Clear any existing rows

    if (order.sprayer && order.sprayer.length > 0) {
        order.sprayer.forEach(sprayer => {
            const row = document.createElement('tr');

            // Create table data for sprayer name
            const nameCell = document.createElement('td');
            nameCell.textContent = sprayer.fullName || 'N/A';
            row.appendChild(nameCell);

            // Create table data for sprayer expertise
            const expertiseCell = document.createElement('td');
            expertiseCell.textContent = sprayer.sprayerExpertise || 'N/A';
            row.appendChild(expertiseCell);

            // Append the row to the table body
            sprayerTableBody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        const noDataCell = document.createElement('td');
        noDataCell.textContent = 'No sprayers assigned';
        noDataCell.colSpan = 2;
        row.appendChild(noDataCell);
        sprayerTableBody.appendChild(row);
    }

    // Other order details
    document.getElementById('cropType').textContent = order.cropType || 'N/A';
    document.getElementById('serviceName').textContent = order.serviceName || 'N/A';
    document.getElementById('serviceType').textContent = order.serviceType || 'N/A';
    document.getElementById('farmLocation').textContent = order.location || 'N/A';
    document.getElementById('timeSlot').textContent = order.serviceTimeSlot || 'N/A';
    document.getElementById('orderCost').textContent = `${order.totalCost.toLocaleString()} VND`;

    // Handle feedback
    if (order.feedBacks) {
        document.getElementById('feedbackRating').textContent = `${order.feedBacks.ratingScore} / 5 ⭐`;
        document.getElementById('attentivenessRating').textContent = `${sprayerFeedBack.attentivenessRating} / 5 ⭐`;
        document.getElementById('friendlinessRating').textContent = `${sprayerFeedBack.friendlinessRating} / 5 ⭐`;
        document.getElementById('professionalRating').textContent = `${sprayerFeedBack.professionalismRating} / 5 ⭐`;
        document.getElementById('feedbackComment').textContent = order.feedBacks.content || 'N/A';
    } else {
        document.getElementById('feedbackRating').textContent = 'N/A';
        document.getElementById('feedbackComment').textContent = 'N/A';
    }
    //the feedback button
    handleFeedbackButton(order);
    // Trigger number animations (if applicable)
    animateNumbers();
}


function getStatusColor(status) {
    switch (status) {
        case 'COMPLETED': return 'success';
        case 'IN_PROGRESS': return 'primary';
        case 'CONFIRMED': return 'info';
        case 'ASSIGNED': return 'warning';
        case 'CANCELLED': return 'danger';
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

function handleFeedbackButton(order) {
    const feedbackBtn = document.getElementById('provideFeedbackBtn');
    if (order.orderStatus === 'COMPLETED' && !order.feedBacks) {
        feedbackBtn.classList.remove('d-none');
        feedbackBtn.addEventListener('click', () => {
            window.location.href = `/feed-back/${order.orderID}?role=farmer`;
            // window.open(
            //     `/feed-back/${order.orderID}?role=farmer`,
            //     '_blank' // <- This is what makes it open in a new window.
            // );
        });
    } else {
        feedbackBtn.classList.add('d-none');
    }
}

loadNavBar();
loadFooter();