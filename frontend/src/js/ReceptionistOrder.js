let orders = [];
const itemsPerPage = 12;
let currentPage = 1;
let totalPages = 0;
let isGridView = true;
let role = null;
let currentSortOrder = 'status'; // Default sorting by order status
let listSPrayers = [];

// API Endpoints
const orderApiEndpoint = 'http://localhost:8080/receptionistOrder';
const navBarURL = 'http://localhost:8080/receptionist';
const sprayerApiEndpoint = 'http://localhost:8080/allSprayer';
const receptionistHandleOrderAPI = 'http://localhost:8080/orderStatus';
const assignSprayerAPI = 'http://localhost:8080/assign';

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

    sendRequestWithToken(apiUrl)
        .then(data => {
            orders = data.content;
            totalOrders = data.totalElements;
            totalPages = data.totalPages;

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

function assignSprayer() {
    const orderId = document.getElementById('assignSprayerModalOrderId').value;

    // Get all selected sprayers
    const selectedSprayers = Array.from(document.querySelectorAll('input[name="sprayerSelect"]:checked'))
        .map(checkbox => {
            const sprayer = listSPrayers.find(sprayer => sprayer.email === checkbox.value);
            if (!sprayer) {
                console.error(`Sprayer not found for email: ${checkbox.value}`);  // Log the error if sprayer not found
            } else {
                console.log(`Selected sprayer: ${sprayer.fullName} with email ${sprayer.email}`);  // Log the selected sprayer
            }
            return sprayer;
        }).filter(sprayer => sprayer !== undefined);  // Filter out any undefined values

    if (selectedSprayers.length === 0) {
        console.error('No sprayer selected');
        return;
    }

    console.log('Selected sprayers to assign:', selectedSprayers);  // Log the selected sprayers

    // Prepare the request body to be sent to the backend
    const request = {
        'orderID': orderId,
        'sprayers': selectedSprayers,  // Send the selected sprayers as an array
        'orderStatus': 'ASSIGNED'      // Set the new status to "ASSIGNED"
    };

    // Send the assignment request to the backend
    sendRequestWithToken(assignSprayerAPI, 'POST', request)
        .then(response => {
            console.log('Sprayer assigned successfully:', response);

            // Find the order in the current list and update its status
            const order = orders.find(o => o.orderID == orderId);
            if (order) {
                order.orderStatus = 'ASSIGNED';  // Update the order status locally
            }

            renderOrders();  // Re-render orders after assignment
            document.getElementById('assignSprayerModal').style.display = 'none';
        })
        .catch(error => {
            console.error('Error assigning sprayer:', error);
        });
}



function openAssignSprayerModal(orderId) {
    sendRequestWithToken(sprayerApiEndpoint)
        .then(data => {
            console.log('List of sprayers:', data);
            listSPrayers = data;

            const sprayerTableRows = data.map(sprayer => `
                <tr>
                    <td class="center-align">${sprayer.fullName}</td>
                    <td class="center-align">${sprayer.sprayerExpertise}</td>
                    <td class="center-align">
                        <input type="checkbox" name="sprayerSelect" value="${sprayer.email}" onchange="handleSprayerSelection()" />
                    </td>
                </tr>
            `).join('');

            document.getElementById('assignSprayerModalBody').innerHTML = `
                <table class="table table-striped">
                    <thead>
                        <tr class="center-align">
                            <th class="center-align">Name</th>
                            <th class="center-align">Expertise</th>
                            <th class="center-align">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sprayerTableRows}
                    </tbody>
                </table>
            `;
            document.getElementById('assignSprayerModal').style.display = 'block';
            document.getElementById('assignSprayerModalOrderId').value = orderId;

            // Call function to handle automatic default selection of sprayers
            selectDefaultSprayers();
            handleSprayerSelection(); // Call this to disable/enable checkboxes based on the selection
        })
        .catch(error => console.error('Error:', error));
}

// Function to automatically select default sprayers
function selectDefaultSprayers() {
    const checkboxes = document.querySelectorAll('input[name="sprayerSelect"]');
    let selectedCount = 0;

    // First, automatically select one 'AppretienceSprayer'
    checkboxes.forEach(checkbox => {
        const sprayer = listSPrayers.find(s => s.email === checkbox.value);
        if (sprayer && sprayer.sprayerExpertise === 'AppretienceSprayer' && selectedCount < 1) {
            checkbox.checked = true;
            selectedCount++;
        }
    });

    // Then, select one 'AdeptSprayer' or 'ExpertSprayer'
    checkboxes.forEach(checkbox => {
        const sprayer = listSPrayers.find(s => s.email === checkbox.value);
        if (sprayer && (sprayer.sprayerExpertise === 'AdeptSprayer' || sprayer.sprayerExpertise === 'ExpertSprayer') && selectedCount < 2) {
            checkbox.checked = true;
            selectedCount++;
        }
    });
}

// Function to handle the checkbox selection and disable/enable logic
function handleSprayerSelection() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[name="sprayerSelect"]');
    
    // Get the number of checked checkboxes
    const checkedCheckboxes = document.querySelectorAll('input[name="sprayerSelect"]:checked');

    // If 2 or more checkboxes are checked, disable the rest
    if (checkedCheckboxes.length >= 2) {
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                checkbox.disabled = true;
            }
        });
    } else {
        // If less than 2 are checked, enable all checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
    }

    // Update the state of the "Assign" button based on selected sprayers
    updateAssignButtonState();
}

// Function to update the state of the Assign button
function updateAssignButtonState() {
    const assignButton = document.getElementById('assign'); // Assuming you have an Assign button with this ID
    const checkedCheckboxes = Array.from(document.querySelectorAll('input[name="sprayerSelect"]:checked'));

    // Check for expertise in selected sprayers
    const hasAdeptOrExpertSprayer = checkedCheckboxes.some(checkbox => {
        const sprayer = listSPrayers.find(s => s.email === checkbox.value);
        return sprayer && (sprayer.sprayerExpertise === 'AdeptSprayer' || sprayer.sprayerExpertise === 'ExpertSprayer');
    });

    const hasTwoAppretienceSprayers = checkedCheckboxes.every(checkbox => {
        const sprayer = listSPrayers.find(s => s.email === checkbox.value);
        return sprayer && sprayer.sprayerExpertise === 'AppretienceSprayer';
    });

    // Disable the Assign button if:
    // 1. There are no selected sprayers.
    // 2. All selected sprayers are 'AppretienceSprayer' (i.e., no 'AdeptSprayer' or 'ExpertSprayer').
    if (checkedCheckboxes.length === 0 || (checkedCheckboxes.length === 2 && hasTwoAppretienceSprayers) || !hasAdeptOrExpertSprayer) {
        assignButton.disabled = true;
    } else {
        assignButton.disabled = false;
    }
}






// Open the status change modal
function openStatusModal(orderId) {
    document.getElementById('statusModalOrderId').value = orderId;
    document.getElementById('statusModal').style.display = 'block';
}

// Change the order status
function changeOrderStatus() {
    const orderId = document.getElementById('statusModalOrderId').value;
    const newStatus = document.getElementById('statusSelect').value;
    console.log(newStatus);
    const order = orders.find(o => o.orderID == orderId);
    if (order) {
        order.orderStatus = newStatus.toUpperCase();
        renderOrders();
        sendOrderUpdateToServer(order);
    }
    document.getElementById('statusModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const changeStatusButton = document.querySelector('.btn.btn-primary');

    if (changeStatusButton) {
        changeStatusButton.addEventListener('click', changeOrderStatus);
    }
});

// Send order update to the server
function sendOrderUpdateToServer(order) {
    const body = { order: order };
    sendRequestWithToken(receptionistHandleOrderAPI, 'PUT', body)
        .then(data => {
            console.log('Order status updated:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Render the orders
function renderOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = orders.map(createOrderCard).join('');
    renderPagination(); // Update pagination
}

// Render pagination
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
    sortOrderSelect.addEventListener('change', function () {
        currentSortOrder = this.value;
        getAllOrder(currentSortOrder);
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

// Setup event listener for status change button clicks
document.addEventListener('click', function (event) {
    if (event.target.matches('.change-status-button')) {
        const orderId = event.target.getAttribute('data-order-id');
        openStatusModal(orderId);
    }
});

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
