let orders = [];
const orderAPI = 'http://localhost:8080/order/all';
const itemsPerPage = 12;
let currentPage = 1;
let totalPages = 0;
let role = null;
let isGridView = true;
const navBarURL = 'http://localhost:8080/userName';

document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();
    loadNavBar();
    loadFooter();
    getAllOrder();
    setupEventListeners();
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
            activeClick();
        })
        .catch(error => console.error(error));
}

function loadFooter() {
    const content = document.getElementById("footer-container");
    content.innerHTML = returnFooter();
}

function getAllOrder() {
    const page = currentPage - 1;
    const size = itemsPerPage;

    const apiUrl = `${orderAPI}?page=${page}&size=${size}`;

    sendRequestWithToken(apiUrl)
        .then(data => {
            orders = data.content;
            totalPages = data.totalPages;
            renderOrders();
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

function createOrderCard(order) {
    const viewDetailsButton = `<a href="/order-detail/${order.orderID}?role=${encodeURIComponent(role)}" class="btn btn-success btn-sm w-100">View Details</a>`;

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
                        ${viewDetailsButton}
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
                            <div class="col-md-3 col-lg-2">
                                ${viewDetailsButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function getStatusColor(status) {
    const colors = {
        'COMPLETED': 'success',
        'IN_PROGRESS': 'primary',
        'CONFIRMED': 'info',
        'ASSIGNED': 'warning',
        'CANCELLED': 'danger',
        'PENDING': 'secondary'
    };
    return colors[status] || 'secondary';
}

function renderOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = orders.map(createOrderCard).join('');
    renderPagination();
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
    pagination.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(e.target.dataset.page);
            getAllOrder();
        });
    });
}

function filterOrders() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const sortOrder = document.getElementById('sortOrder').value;

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderID.toLowerCase().includes(searchTerm) ||
            order.location.toLowerCase().includes(searchTerm) ||
            order.cropType.toLowerCase().includes(searchTerm) ||
            order.orderStatus.toLowerCase().includes(searchTerm) ||
            order.totalCost.toString().toLowerCase().includes(searchTerm) ||
            (order.farmerName && order.farmerName.toLowerCase().includes(searchTerm)) ||
            (order.farmerEmail && order.farmerEmail.toLowerCase().includes(searchTerm)) ||
            (order.address && order.address.toLowerCase().includes(searchTerm)) ||
            (order.pilotName && order.pilotName.toLowerCase().includes(searchTerm)) ||
            (order.pilotEmail && order.pilotEmail.toLowerCase().includes(searchTerm));

        const matchesStatus = statusFilter === '' || order.orderStatus === statusFilter;
        const matchesDate = dateFilter === '' || matchesDateFilter(order.date, dateFilter);

        return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort the filtered orders
    filteredOrders.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Sort by price if needed
    if (sortOrder === 'price_low_high') {
        filteredOrders.sort((a, b) => a.totalCost - b.totalCost);
    } else if (sortOrder === 'price_high_low') {
        filteredOrders.sort((a, b) => b.totalCost - a.totalCost);
    }

    const orderList = document.getElementById('orderList');
    orderList.innerHTML = filteredOrders.map(createOrderCard).join('');
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

function setupEventListeners() {
    const toggleViewBtn = document.getElementById('toggleViewBtn');
    toggleViewBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        toggleViewBtn.innerHTML = isGridView ? '<i class="bi bi-list"></i> List View' : '<i class="bi bi-grid"></i> Grid View';
        renderOrders();
    });

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

    // Add event listeners for filter inputs
    document.getElementById('searchInput').addEventListener('input', filterOrders);
    document.getElementById('statusFilter').addEventListener('change', filterOrders);
    document.getElementById('dateFilter').addEventListener('change', filterOrders);
    document.getElementById('sortOrder').addEventListener('change', filterOrders);
}

// Initialize the page
getAllOrder();
setupEventListeners();
