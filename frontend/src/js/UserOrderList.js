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
    getAllOrder(); // Fetch initial order list with default sorting (by order status)
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

function getAllOrder(sortOrder = 'status') {
    const page = currentPage - 1;
    const size = itemsPerPage;

    let apiUrl = `${orderAPI}?page=${page}&size=${size}`;

    // Add sort parameter to the API URL based on the sortOrder
    if (sortOrder === 'newest') {
        apiUrl += '&sort=date,desc';
    } else if (sortOrder === 'oldest') {
        apiUrl += '&sort=date,asc';
    } else if (sortOrder === 'price_low_high') {
        apiUrl += '&sort=totalCost,asc';
    } else if (sortOrder === 'price_high_low') {
        apiUrl += '&sort=totalCost,desc';
    } else if (sortOrder === 'status') {
        apiUrl += '&sort=status'; // Default sort by status
    }

    console.log(apiUrl);
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
            getAllOrder(document.getElementById('sortOrder').value); // Pass the current sort order when changing page
        });
    });
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

    // Add event listener for the sort dropdown
    document.getElementById('sortOrder').addEventListener('change', function () {
        const selectedSortOrder = this.value;
        getAllOrder(selectedSortOrder); // Fetch orders from the backend based on the selected sort order
    });

    // Add event listeners for other filters (search, status, date)
    document.getElementById('searchInput').addEventListener('input', filterOrders);
    document.getElementById('statusFilter').addEventListener('change', filterOrders);
    document.getElementById('dateFilter').addEventListener('change', filterOrders);
}

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

// Initialize the page
getAllOrder();
setupEventListeners();
