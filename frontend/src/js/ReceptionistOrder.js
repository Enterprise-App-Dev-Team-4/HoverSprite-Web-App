let orders = [];

const itemsPerPage = 30;
let currentPage = 1;
let isGridView = true;


// Fetch Order From Testing Data
fetch('../js/fakeOrder.json')
    .then(response => response.json())
    .then(data => {
        orders = data.orders;
        renderOrders();
    })
    .catch(error => console.error('Error:', error));

function createOrderCard(order) {
    const assignedSprayers = order.assignedSprayers ? order.assignedSprayers.join(', ') : 'None';

    if (isGridView) {
        return `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Order #${order.id}</h5>
                        <p class="card-text">
                            <span class="badge bg-${getStatusColor(order.status)}">${order.status}</span><br>
                            <strong>Date:</strong> ${order.date}<br>
                            <strong>Crop Type:</strong> ${order.cropType}<br>
                            <strong>Area:</strong> ${order.area} decares<br>
                            <strong>Cost:</strong> ${order.cost.toLocaleString()} VND<br>
                            <strong>Assigned Sprayers:</strong> ${assignedSprayers}
                        </p>
                    </div>
                    <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                        <a href="#" class="btn btn-success btn-sm me-2 w-50">View Details</a>
                        <button class="btn btn-warning btn-sm me-2 w-25" onclick="openStatusModal(${order.id})">Change Status</button>
                        <button class="btn btn-primary btn-sm w-50" data-order-id="${order.id}" onclick="openAssignSprayerModal(${order.id})">Assign Sprayer</button>
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
                                <h5 class="card-title mb-0">Order #${order.id}</h5>
                                <span class="badge bg-${getStatusColor(order.status)}">${order.status}</span>
                            </div>
                            <div class="col-md-3 col-lg-2 mb-2 mb-md-0">
                                <strong>Date:</strong> ${order.date}
                            </div>
                            <div class="col-md-2 mb-2 mb-md-0">
                                <strong>Crop:</strong> ${order.cropType}
                            </div>
                            <div class="col-md-2 mb-2 mb-md-0">
                                <strong>Area:</strong> ${order.area} decares
                            </div>
                            <div class="col-md-2 mb-2 mb-md-0">
                                <strong>Cost:</strong> ${order.cost.toLocaleString()} VND
                            </div>
                            <div class="col-md-2 mb-2 mb-md-0">
                                <strong>Assigned Sprayers:</strong> ${assignedSprayers}
                            </div>
                            <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                                <a href="#" class="btn btn-success btn-sm me-2 w-50">View Details</a>
                                <button class="btn btn-warning btn-sm me-2 w-25" onclick="openStatusModal(${order.id})">Change Status</button>
                                <button class="btn btn-primary btn-sm w-50" data-order-id="${order.id}" onclick="openAssignSprayerModal(${order.id})">Assign Sprayer</button>
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
        case 'completed': return 'success';
        case 'in_progress': return 'primary';
        case 'confirmed': return 'info';
        case 'assigned': return 'warning';
        case 'cancelled': return 'danger';
        default: return 'secondary';
    }
}

function renderOrders() {
    console.log('Rendering orders...');
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

// Initial render
renderOrders();

// Add event listeners for search and filters
document.getElementById('searchInput').addEventListener('input', filterOrders);
document.getElementById('statusFilter').addEventListener('change', filterOrders);
document.getElementById('dateFilter').addEventListener('change', filterOrders);

function filterOrders() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toString().includes(searchTerm) ||
            order.cropType.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === '' || order.status === statusFilter;
        const matchesDate = dateFilter === '' || matchesDateFilter(order.date, dateFilter);

        return matchesSearch && matchesStatus && matchesDate;
    });

    currentPage = 1;
    orders.splice(0, orders.length, ...filteredOrders);
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

function openStatusModal(orderId) {
    document.getElementById('statusModalOrderId').value = orderId;
    document.getElementById('statusModal').style.display = 'block';
}

function changeOrderStatus() {
    const orderId = document.getElementById('statusModalOrderId').value;
    const newStatus = document.getElementById('statusSelect').value;

    // Update the status in the order data (this would typically be an API call)
    const order = orders.find(o => o.id == orderId);
    if (order) {
        order.status = newStatus;
        // Re-render the order cards to reflect the new status
        renderOrders();

        // Send the appropriate emails based on the new status
        sendStatusChangeEmail(orderId, newStatus);
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


// Function to open the assign sprayer modal
function openAssignSprayerModal(orderId) {
    // Fetch sprayers and populate the modal with sprayer options
    fetch('../js/fakeSprayers.json')
        .then(response => response.json())
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

// Function to handle sprayer assignment
function assignSprayer() {
    const orderId = document.getElementById('assignSprayerModalOrderId').value;
    const sprayerId = document.getElementById('sprayerSelect').value;

    // Fetch the selected sprayer's details (assuming sprayer data is available in the modal)
    const sprayerName = document.querySelector(`#sprayerSelect option[value="${sprayerId}"]`).textContent;

    // Find the order and update it with the assigned sprayer
    const order = orders.find(o => o.id == orderId);
    if (order) {
        if (!order.assignedSprayers) {
            order.assignedSprayers = [];
        }
        order.assignedSprayers.push(sprayerName);
        order.status = 'assigned'; // Update status to assigned
    }

    // Re-render the order cards to reflect the new assignment
    renderOrders();

    // Close the modal
    document.getElementById('assignSprayerModal').style.display = 'none';

    console.log(`Assigned sprayer ${sprayerName} to order ${orderId}`);
}


console.log('Orders:', orders);
console.log('Current Page:', currentPage);
