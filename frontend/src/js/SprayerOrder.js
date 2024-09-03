let orders = [];
const orderAPI = 'http://localhost:8080/order/all'; // Replace with sprayer order api
const itemsPerPage = 30;
let currentPage = 1;
let isGridView = true;
const navBarURL = 'http://localhost:8080/userName';
let role = null;

document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();  // Get the role from the URL
    loadNavBar();
    loadFooter();
    getAllOrder();  // Fetch and display orders after the page loads
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

function getAllOrder() {
    sendRequestWithToken(orderAPI)
    .then(data => {
        orders = data;
        console.log(orders);
        renderOrders(); // Render orders after they are fetched
    })
    .catch(error => {
        console.error('Error fetching orders:', error);
    });
}

function createOrderCard(order) {
    const viewDetailsButton = `<a href="/order-detail/${order.orderID}?role=${encodeURIComponent(role)}" class="btn btn-success btn-sm w-100">View Details</a>`; // Attach role to URL
    
    // Only show the "Confirm" button if the order status is "Assigned"
    // const confirmButton = order.orderStatus === 'ASSIGNED' ? 
    //     `<button class="btn btn btn-primary btn-sm w-100" onclick="confirmOrder(${order.orderID})">Confirm</button>` 
    //     : '';

    // For test viewing only, use above
    const confirmButton = `<button class="btn btn-primary btn-sm w-100" onclick="confirmOrder(${order.orderID})">Confirm</button>`;

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
                                <strong>Crop:</strong> ${order.sprayServices.cropType}
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
    sendRequestWithToken(orderAPI, 'PUT', body) // Update with sprayer order api
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
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageOrders = orders.slice(startIndex, endIndex);
    orderList.innerHTML = pageOrders.map(createOrderCard).join('');
    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(orders.length / itemsPerPage);
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
            renderOrders();
        }
    });
}

function filterOrders() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderID.toString().includes(searchTerm) ||
            order.sprayServices.cropType.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === '' || order.orderStatus === statusFilter;
        const matchesDate = dateFilter === '' || matchesDateFilter(order.date, dateFilter);

        return matchesSearch && matchesStatus && matchesDate;
    });

    currentPage = 1;
    orders = filteredOrders;
    renderOrders();
}

function matchesDateFilter(orderDate, filter) {
    const date = new Date(orderDate);
    const now = new Date();
    switch (filter) {
        case 'today':
            return date.toDateString() === now.toDateString();
        case 'this_week':
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
            return date >= weekStart;
        case 'this_month':
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        case 'last_month':
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
            return date >= lastMonth && date <= lastMonthEnd;
        default:
            return true;
    }
}

// Dark mode toggle
const toggleModeBtn = document.getElementById('toggleModeBtn');
toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    toggleModeBtn.innerHTML = isDarkMode ? '<i class="bi bi-sun"></i> Light Mode' : '<i class="bi bi-moon"></i> Dark Mode';
});

// Back to Top button
const backToTopBtn = document.getElementById('backToTop');
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

console.log('Orders:', orders);
console.log('Current Page:', currentPage);
