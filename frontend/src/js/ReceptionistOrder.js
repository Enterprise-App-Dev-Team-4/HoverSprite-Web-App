let orders = [];
const itemsPerPage = 12;
let currentPage = 1;
let totalPages = 0;
let isGridView = true;
let role = null;
let currentSortOrder = 'status'; // Default sorting by order status

// API Endpoints
const orderApiEndpoint = 'http://localhost:8080/receptionistOrder';
const navBarURL = 'http://localhost:8080/receptionist';

document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();  // Get the role from the URL
    loadNavBar();
    loadFooter();
    getAllOrder();  // Fetch and display orders after the page loads
    setupSortEventListeners();  // Setup sorting event listeners
    setupToggleViewListener();  // Setup grid/list view toggle
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

// Fetch all orders with sorting logic
function getAllOrder(sortOrder = 'status') {
    const page = currentPage - 1;
    const size = itemsPerPage;

    // Modify the API request URL based on the current sort order
    let apiUrl = `${orderApiEndpoint}?page=${page}&size=${size}`;

    if (sortOrder === 'newest') {
        apiUrl += '&sort=date,desc';
    } else if (sortOrder === 'oldest') {
        apiUrl += '&sort=date,asc';
    } else if (sortOrder === 'price_low_high') {
        apiUrl += '&sort=totalCost,asc';
    } else if (sortOrder === 'price_high_low') {
        apiUrl += '&sort=totalCost,desc';
    } else if (sortOrder === 'status') {
        apiUrl += '&sort=status';
    }

    console.log(apiUrl);
    sendRequestWithToken(apiUrl)
        .then(data => {
            orders = data.content; // Update orders with backend content
            totalOrders = data.totalElements; // Total orders for pagination
            totalPages = data.totalPages; // Total pages from backend
            
            renderOrders(); // Render orders after fetching
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

// Function to create an order card
function createOrderCard(order) {
    const viewDetailsButton = `<a href="/receptionist-order-detail/${order.orderID}?role=${encodeURIComponent(role)}" class="btn btn-success btn-sm w-100">View Details</a>`;

    const assignSprayerButton = order.orderStatus === 'CONFIRMED' 
        ? `<button class="btn btn-primary btn-sm flex-fill" data-order-id="${order.orderID}" onclick="openAssignSprayerModal('${order.orderID}')">Assign Sprayer</button>`
        : '';

    const hideChangeStatusButton = ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].includes(order.orderStatus);
    const changeStatusButton = !hideChangeStatusButton 
        ? `<button class="btn btn-warning btn-sm flex-fill change-status-button" data-order-id="${order.orderID}">Change Status</button>` 
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
                    <div class="card-footer bg-transparent border-0 d-flex flex-wrap gap-2">
                        ${viewDetailsButton}
                        ${changeStatusButton}
                        ${assignSprayerButton}
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
                            <div class="col-12 d-flex flex-wrap gap-2">
                                ${viewDetailsButton}
                                ${changeStatusButton}
                                ${assignSprayerButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Function to render orders
function renderOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = orders.map(createOrderCard).join('');
    renderPagination(); // Update pagination
}

// Function to render pagination
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

    pagination.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            currentPage = parseInt(e.target.dataset.page);
            getAllOrder(currentSortOrder); // Fetch orders for the selected page with current sorting
        }
    });
}

// Setup event listeners for sort dropdown
function setupSortEventListeners() {
    const sortOrderSelect = document.getElementById('sortOrder');
    sortOrderSelect.addEventListener('change', function() {
        currentSortOrder = this.value; // Set the selected sorting order
        getAllOrder(currentSortOrder); // Fetch orders with the selected sort order
    });
}

// Toggle between grid and list view
function setupToggleViewListener() {
    const toggleViewBtn = document.getElementById('toggleViewBtn');
    toggleViewBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        toggleViewBtn.innerHTML = isGridView ? '<i class="bi bi-list"></i> List View' : '<i class="bi bi-grid"></i> Grid View';
        renderOrders();
    });
}

// Function to return status color for badges
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
getAllOrder();