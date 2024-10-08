let orders = [];
let totalPages = 0;  // Total pages from backend
let currentPage = 1; // Current page
const itemsPerPage = 30;
const orderAPI = 'http://localhost:8080/sprayerOrder'; // Replace with sprayer order API
const confirmOrderAPI = 'http://localhost:8080/sprayerConfirm';
const completeOrderAPI = 'http://localhost:8080/sprayerComplete'; // Replace with the correct API to complete orders
const checkOrderQueueAPI = 'http://localhost:8080/sprayercheckQueue';
const navBarURL = 'http://localhost:8080/sprayer';
let role = null;
let isGridView = true;
let currentSortOrder = 'status'; // Default sort by status

// Add event listeners for other filters (search, status, date)
document.getElementById('searchInput').addEventListener('input', filterOrders);
document.getElementById('statusFilter').addEventListener('change', filterOrders);
document.getElementById('dateFilter').addEventListener('change', filterOrders);

function filterOrders() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderID.toLowerCase().includes(searchTerm) ||
            order.location.toLowerCase().includes(searchTerm) ||
            order.cropType.toLowerCase().includes(searchTerm) ||
            order.orderStatus.toLowerCase().includes(searchTerm) ||
            order.totalCost.toString().toLowerCase().includes(searchTerm);

        const matchesStatus = statusFilter === '' || order.orderStatus === statusFilter;
        const matchesDate = dateFilter === '' || matchesDateFilter(order.date, dateFilter);

        return matchesSearch && matchesStatus && matchesDate;
    });

    const orderList = document.getElementById('orderList');
    orderList.innerHTML = filteredOrders.map(createOrderCard).join('');
}

document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();  // Get the role from the URL
    loadNavBar();
    loadFooter();
    getAllOrders();  // Fetch and display orders after the page loads
    setupEventListeners(); // Add event listeners for sorting and other UI elements
});

// Modify checkOrderQueue to enable Complete buttons when data is received
function checkOrderQueue(orderID) {
    return sendRequestWithToken(`${checkOrderQueueAPI}?orderID=${encodeURIComponent(orderID)}`)
        .then(data => {
            // Assuming `data.someCondition` determines if the complete button should be hidden
            console.log(data);
            const completeButtonContainer = document.getElementById(`completeButtonContainer-${orderID}`);
            if (data) {
                completeButtonContainer.innerHTML = ''; // Hide the button if some condition is met
            } else {
                // Show the complete button if the condition is not met
                completeButtonContainer.innerHTML = `<button class="btn btn-warning btn-sm w-100" onclick="completeOrder('${orderID}')">Complete Order</button>`;
            }
        })
        .catch(error => {
            console.error(error);
            const completeButtonContainer = document.getElementById(`completeButtonContainer-${orderID}`);
            completeButtonContainer.innerHTML = ''; // Default to hiding the button on error
        });
}




function getUserRoleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('role');
}

function loadNavBar() {
    const content = document.getElementById("navbar-container");
    sendRequestWithToken(navBarURL)
        .then(data => {
            content.innerHTML = returnNavBar(data, role);
            activeClick();  // Initialize event listeners after rendering the navbar
        })
        .catch(error => console.error(error));
}

function loadFooter() {
    const content = document.getElementById("footer-container");
    content.innerHTML = returnFooter();
}

function getAllOrders(sortOrder = 'status') {
    const page = currentPage - 1; // Backend is 0-indexed
    const size = itemsPerPage;

    // Construct the API URL based on the selected sort order
    let apiUrl = `${orderAPI}?page=${page}&size=${size}`;

    if (sortOrder === 'newest') {
        apiUrl += '&sort=date,desc';
    } else if (sortOrder === 'oldest') {
        apiUrl += '&sort=date,asc';
    } else if (sortOrder === 'price_low_high') {
        apiUrl += '&sort=totalCost,asc';
    } else if (sortOrder === 'price_high_low') {
        apiUrl += '&sort=totalCost,desc';
    } else if (sortOrder === 'status') {
        apiUrl += '&sort=orderStatus,asc';
    }

    sendRequestWithToken(apiUrl)
        .then(data => {
            orders = data.content; // List of orders
            totalPages = data.totalPages; // Total number of pages from the backend

            console.log("Orders:", orders);
            console.log("Total Pages:", totalPages);

            renderOrders(); // Render the orders after they are fetched
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

function createOrderCard(order) {
    const viewDetailsButton = `<a href="/sprayer-order-detail/${order.orderID}?role=${encodeURIComponent(role)}" class="btn btn-success btn-sm w-100">View Details</a>`;

    // Only show the "Confirm" button if the order status is "ASSIGNED"
    const confirmButton = order.orderStatus === 'ASSIGNED' ?
        `<button class="btn btn-primary btn-sm w-100" onclick="confirmOrder('${order.orderID}')">Confirm</button>`
        : '';

    // Create an empty completeButtonContainer div to populate later if needed
    let completeButton = '';
    const completeButtonContainerId = `completeButtonContainer-${order.orderID}`;

    // Only call checkOrderQueue if the order status is "IN_PROGRESS"
    if (order.orderStatus === 'IN_PROGRESS') {
        checkOrderQueue(order.orderID);  // Call the function to check if the button should be shown or hidden
    }
    const statusBadge = `<span class="badge bg-${getStatusColor(order.orderStatus)} w-50">${order.orderStatus}</span>`;
    if (isGridView) {
        return `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">Order #${order.orderID}</h5>
                            ${statusBadge}
                        </div>
                        <p class="card-text">
                            <strong>Date:</strong> ${order.date}<br>
                            <strong>Location:</strong> ${order.location}<br>
                            <strong>Crop Type:</strong> ${order.cropType}<br>
                            <strong>Cost:</strong> ${order.totalCost.toLocaleString()} VND
                        </p>
                    </div>
                    <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                        <div class="flex-fill me-2">
                            ${viewDetailsButton}
                        </div>
                        <div class="flex-fill">
                            ${confirmButton}
                            <div id="${completeButtonContainerId}">
                                ${completeButton} <!-- Complete button will be managed by checkOrderQueue -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="col-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="card-title mb-0">Order #${order.orderID}</h5>
                                    ${statusBadge}
                            </div>
                            <div class="col-md-3 col-lg-2 mb-2 mb-md-0">
                                <strong>Date:</strong> ${order.date}
                            </div>
                            <div class="col-md-2 mb-2 mb-md-0">
                                <strong>Crop:</strong> ${order.cropType}
                            </div>
                            <div class="col-md-2 mb-2 mb-md-0">
                                <strong>Location:</strong> ${order.location}
                            </div>
                            <div class="col-md-2 mb-2 mb-md-0">
                                <strong>Cost:</strong> ${order.totalCost.toLocaleString()} VND
                            </div>
                            <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                                <div class="flex-fill me-2">
                                    ${viewDetailsButton}
                                </div>
                                <div class="flex-fill">
                                    ${confirmButton}
                                    <div id="${completeButtonContainerId}">
                                        ${completeButton} <!-- Complete button will be managed by checkOrderQueue -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}



function completeOrder(orderId) {
    console.log(`Order #${orderId} marked as completed.`);

    // Update the order on the server to mark as "COMPLETED"
    const completeOrderURL = `${completeOrderAPI}?orderID=${encodeURIComponent(orderId)}`;
    sendRequestWithToken(completeOrderURL, 'POST') // Assuming you have an endpoint to mark it as complete
        .then(data => {
            console.log(data);

            // Show the Order Completed modal
            const orderCompletedModal = new bootstrap.Modal(document.getElementById('orderCompletedModal'));
            orderCompletedModal.show();

            // Hide Modal after 2s
            setTimeout(() => {
                orderCompletedModal.hide();
            }, 2000);

            getAllOrders(currentSortOrder); // Refresh the orders list to reflect the updated status
        })
        .catch(error => console.error('Error completing the order:', error));
}



function confirmOrder(orderId) {
    console.log(orderId);
    if (orderId) {
        // Update the order on the server
        sendOrderUpdateToServer(orderId);

        // Show the Order Confirmed modal
        const orderConfirmedModal = new bootstrap.Modal(document.getElementById('orderConfirmedModal'));
        orderConfirmedModal.show();

        // Hide Modal after 2s
        setTimeout(() => {
            orderConfirmedModal.hide();
        }, 2000);

        renderOrders();
        console.log(`Order #${orderId} status updated to 'In Progress'`);
    }
}

function sendOrderUpdateToServer(orderId) {
    let confirmURL = confirmOrderAPI + `?orderID=${encodeURIComponent(orderId)}`;
    const body = {
        orderID: orderId
    };

    console.log(body);
    sendRequestWithToken(confirmURL, 'PUT', body) // Update with sprayer order API
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
}

const toggleViewBtn = document.getElementById('toggleViewBtn');
toggleViewBtn.addEventListener('click', () => {
    isGridView = !isGridView;
    toggleViewBtn.innerHTML = isGridView ? '<i class="bi bi-list"></i> List View' : '<i class="bi bi-grid"></i> Grid View';
    renderOrders();
});

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

function renderOrders() {
    const orderList = document.getElementById('orderList');

    // Render the order cards directly from the `orders` array which already contains paginated data
    orderList.innerHTML = orders.map(createOrderCard).join('');

    renderPagination(); // Update pagination controls
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML = paginationHTML;

    // Remove previous event listeners to prevent multiple calls
    pagination.replaceChildren(...pagination.children);

    // Add event listener to pagination links
    pagination.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(e.target.dataset.page);
            getAllOrders(currentSortOrder); // Fetch orders for the selected page with current sorting
        });
    });
}

function setupEventListeners() {
    document.getElementById('sortOrder').addEventListener('change', function () {
        currentSortOrder = this.value; // Set the current sorting order
        getAllOrders(currentSortOrder); // Fetch orders with the selected sort order
    });
}

// Initialize the page
getAllOrders();
setupEventListeners();
