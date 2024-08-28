let orders = [];
const itemsPerPage = 30;
let currentPage = 1;
let isGridView = true;
let role = null;

// API Endpoints
const orderApiEndpoint = 'http://localhost:8080/receptionistOrder';
const sprayerApiEndpoint = 'http://localhost:8080/sprayers'; // Assuming this is the correct endpoint for sprayers
const navBarURL = 'http://localhost:8080/receptionist';
const receptionistHandleOrderAPI = 'http://localhost:8080/orderStatus';

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
    console.log(role);
    sendRequestWithToken(navBarURL)
        .then(data => content.innerHTML = returnNavBar(data, role))  // Pass role to returnNavBar
        .catch(error => console.error(error));
    activeClick();
}

function loadFooter() {
    const content = document.getElementById("footer-container");
    content.innerHTML = returnFooter();
}

function getAllOrder() {
    sendRequestWithToken(orderApiEndpoint)
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
    const viewDetailsButton = `<a href="/receptionist-order-detail/${order.orderID}?role=${encodeURIComponent(role)}" class="btn btn-success btn-sm w-100">View Details</a>`; // Attach role to URL

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
                    <div class="card-footer bg-transparent border-0">
                        <div class="d-flex flex-wrap gap-2">
                            ${viewDetailsButton}
                            <button class="btn btn-warning btn-sm flex-fill change-status-button" data-order-id="${order.orderID}">Change Status</button>
                            <button class="btn btn-primary btn-sm flex-fill" data-order-id="${order.orderID}" onclick="openAssignSprayerModal(${order.id})">Assign Sprayer</button>
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
                            <div class="col-12 d-flex flex-wrap gap-2">
                                ${viewDetailsButton}
                                <button class="btn btn-warning btn-sm flex-fill change-status-button" data-order-id="${order.orderID}">Change Status</button>
                                <button class="btn btn-primary btn-sm flex-fill" data-order-id="${order.orderID}" onclick="openAssignSprayerModal(${order.id})">Assign Sprayer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
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
        case 'CONFIRM': return 'info';
        case 'assigned': return 'warning';
        case 'REJECTED': return 'danger';
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

function sendOrderUpdateToServer(order)
{
    const body = {
        order: order
    }
    console.log(body.order.orderStatus);
    sendRequestWithToken(receptionistHandleOrderAPI, 'PUT', body)
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function (event) {
        if (event.target.matches('.change-status-button')) {
            const orderId = event.target.getAttribute('data-order-id');
            openStatusModal(orderId);
        }
    });
});

function openStatusModal(orderId) {
    document.getElementById('statusModalOrderId').value = orderId;
    document.getElementById('statusModal').style.display = 'block';
    console.log(orderId);
}


document.addEventListener('DOMContentLoaded', () => {
    const changeStatusButton = document.querySelector('.btn.btn-primary');

    if (changeStatusButton) {
        changeStatusButton.addEventListener('click', changeOrderStatus);
    }
});

function changeOrderStatus() {
    const orderId = document.getElementById('statusModalOrderId').value;
    const newStatus = document.getElementById('statusSelect').value;

    const order = orders.find(o => o.orderID == orderId);
    console.log(orderId);
    if (order) {
        console.log("ok");
        order.orderStatus = newStatus.toUpperCase();
        renderOrders();
        sendStatusChangeEmail(orderId, newStatus);
        sendOrderUpdateToServer(order);
    }
    document.getElementById('statusModal').style.display = 'none';
}

function sendStatusChangeEmail(orderId, status) {
    switch (status) {
        case 'pending':
            console.log(`Email: Order #${orderId} is now pending.`);
            break;
        case 'cancelled':
            console.log(`Email: Order #${orderId} has been cancelled.`);
            break;
        case 'confirmed':
            console.log(`Email: Order #${orderId} has been confirmed.`);
            break;
        case 'assigned':
            console.log(`Email: Order #${orderId} has been assigned to sprayer(s).`);
            break;
        default:
            console.log(`Email: Status of order #${orderId} has been changed to ${status}.`);
            break;
    }
}

function openAssignSprayerModal(orderId) {
    sendRequestWithToken(sprayerApiEndpoint)
        .then(data => {
            const sprayerOptions = data.sprayers.map(sprayer => `<option value="${sprayer.id}">${sprayer.name} (${sprayer.expertise})</option>`).join('');
            document.getElementById('assignSprayerModalBody').innerHTML = `
                <div>
                    <label for="sprayerSelect">Select Sprayer:</label>
                    <select id="sprayerSelect" class="form-select">
                        ${sprayerOptions}
                    </select>
                </div>
            `;
            document.getElementById('assignSprayerModal').style.display = 'block';
            document.getElementById('assignSprayerModalOrderId').value = orderId;
        })
        .catch(error => console.error('Error:', error));
}

function assignSprayer() {
    const orderId = document.getElementById('assignSprayerModalOrderId').value;
    const sprayerId = document.getElementById('sprayerSelect').value;
    const sprayerName = document.querySelector(`#sprayerSelect option[value="${sprayerId}"]`).textContent;

    const order = orders.find(o => o.id == orderId);
    if (order) {
        if (!order.assignedSprayers) {
            order.assignedSprayers = [];
        }
        order.assignedSprayers.push(sprayerName);
        order.orderStatus = 'assigned';
    }

    renderOrders();
    document.getElementById('assignSprayerModal').style.display = 'none';
    console.log(`Assigned sprayer ${sprayerName} to order ${orderId}`);
}

console.log('Orders:', orders);
console.log('Current Page:', currentPage);
