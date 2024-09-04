let orders = [];
let totalPages = 0;  // Total pages from backend
let currentPage = 1; // Current page
const itemsPerPage = 30;
const orderAPI = 'http://localhost:8080/sprayerOrder'; // Replace with sprayer order API
const navBarURL = 'http://localhost:8080/sprayer';
let role = null;
let isGridView = true;

document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();  // Get the role from the URL
    console.log(role);
    loadNavBar();
    loadFooter();
    getAllOrders();  // Fetch and display orders after the page loads
});

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

function getAllOrders() {
    const page = currentPage - 1; // Backend is 0-indexed
    const size = itemsPerPage;

    const apiUrl = `${orderAPI}?page=${page}&size=${size}`;

    sendRequestWithToken(apiUrl)
        .then(data => {
            // Assuming data contains pagination metadata
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
        `<button class="btn btn-primary btn-sm w-100" onclick="confirmOrder(${order.orderID})">Confirm</button>` 
        : '';

    if (isGridView) {
        return `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Order #${order.orderID}</h5>
                        <p class="card-text">
                            <span class="badge bg-${getStatusColor(order.orderStatus)}">${order.orderStatus}</span><br>
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
                            <div class="col-md-3 col-lg-2 mb-2 mb-md-0">
                                <h5 class="card-title mb-0">Order #${order.orderID}</h5>
                                <span class="badge bg-${getStatusColor(order.orderStatus)}">${order.orderStatus}</span>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function confirmOrder(orderId) {
    const order = orders.find(o => o.orderID == orderId);
    
    if (order) {
        // Update the order status to 'IN_PROGRESS'
        order.orderStatus = 'IN_PROGRESS';
        
        // Update the order on the server
        sendOrderUpdateToServer(order);

        renderOrders();
        console.log(`Order #${orderId} status updated to 'In Progress'`);
    }
}

function sendOrderUpdateToServer(order) {
    const body = {
        order: order
    }
    console.log(body.order.orderStatus);
    sendRequestWithToken(orderAPI, 'PUT', body) // Update with sprayer order API
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
            getAllOrders(); // Fetch orders for the selected page
        });
    });
}
