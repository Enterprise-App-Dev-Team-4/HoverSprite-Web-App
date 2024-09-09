const logoutAPI = 'http://localhost:8080/log-out';
var user = null;
var user_role = null;
var stompClient = null; // Declare a global stompClient for WebSocket connection

function returnNavBar(data, role) {
    console.log('hello navbar');
    user = data;
    user_role = role;

    // Determine the correct order URL based on the user's role
    let orderUrl = '';
    if (role === 'receptionist') {
        orderUrl = '/receptionist-order';
    } else if (role === 'farmer') {
        orderUrl = '/order-list';
    } else if (role === 'sprayer') {
        orderUrl = '/sprayer-order';
    }
    console.log(user);

    // Conditional rendering of the Services tab
    const servicesTab = role !== 'sprayer' ? `<a class="nav-link" href="/service?role=${encodeURIComponent(role)}">Services</a>` : '';

    return `
    <nav class="navbar navbar-expand-lg navbar-custom" id="navbar-container">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../../../public/HoverSpriteLogo.png" style="height:40px;" id="logo-img"> HoverSprite
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="#">Home</a>
                    <a class="nav-link" href="/about-us?role=${encodeURIComponent(role)}">About</a>
                    ${servicesTab}  <!-- Services tab is conditionally rendered -->
                    <a class="nav-link" href="${orderUrl}?role=${encodeURIComponent(role)}">Orders</a>
                </div>

                <!-- Notification Icon with Dropdown -->
                <div class="ms-auto d-flex align-items-center">
                    <div class="dropdown">
                        <button class="btn notification-btn" type="button" id="notificationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-bell" id="bell-icon-empty"></i> <!-- Empty bell icon initially -->
                            <i class="bi bi-bell-fill d-none" id="bell-icon-filled"></i> <!-- Filled bell icon, hidden initially -->
                            <span class="badge bg-danger d-none" id="notification-count">0</span> <!-- Badge for notification count -->
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                            <!-- New notifications will be appended here dynamically -->
                        </ul>
                    </div>

                    <!-- Profile Dropdown -->
                    <div class="dropdown ms-3">
                        <button class="btn profile-dropdown" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src=${data.profileImage} alt="Profile" class="rounded-circle" style="width: 40px;"> ${data.fullName}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                            <li><a class="dropdown-item" href="/profile?role=${encodeURIComponent(role)}"><i class="bi bi-person-circle me-2"></i>View Profile</a></li>
                            <li><a class="dropdown-item" href="#" id="logout-link"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <style>
        .navbar-custom {
            background-color: #fff;
            color: black;
            border-bottom: 1px solid #ccc;
        }
        .navbar-brand, .nav-link {
            color: black;
            font-weight: bold;
        }
        .nav-link.active {
            color: green; /* Active link color */
            text-decoration: underline;
            text-decoration-color: green; /* Green underline */
            text-decoration-thickness: 2px; /* Thickness of the underline */
        }
        .profile-dropdown {
            background-color: transparent; /* Remove background */
            border: none; /* Remove border */
            padding: 0; /* Remove padding */
            color: black; /* Text color */
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .profile-dropdown::after {
            display: none; /* Remove dropdown arrow */
        }
        .profile-badge img {
            border-radius: 50%;
            width: 40px;
        }
        .dropdown-menu {
            max-width: 300px; /* Limit the width for a better layout */
            max-height: 400px; /* Limit the height, so it doesn't overflow */
            overflow-y: auto; /* Add scroll behavior when there are many notifications */
            padding: 0; /* Remove extra padding */
        }

        .dropdown-menu::-webkit-scrollbar {
            width: 8px; /* Custom scrollbar width */
        }

        .dropdown-menu::-webkit-scrollbar-thumb {
            background-color: #888; /* Scrollbar color */
            border-radius: 10px; /* Rounded scrollbar */
        }

        .dropdown-menu::-webkit-scrollbar-thumb:hover {
            background-color: #555; /* Scrollbar color on hover */
        }

        .dropdown-item {
            padding: 10px; /* Add padding for better spacing */
            font-size: 0.9rem; /* Slightly smaller font for notifications */
            border-bottom: 1px solid #f0f0f0; /* Add separator between notifications */
            word-wrap: break-word; /* Ensure long text wraps */
        }

        .dropdown-item:hover {
            background-color: #f8f9fa; /* Slight background color on hover */
        }

        .dropdown-item:last-child {
            border-bottom: none; /* Remove the last item border */
        }

        /* Badge Styling */
        .badge {
            font-size: 0.8rem; /* Make the badge smaller */
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .dropdown-menu {
                max-width: 90vw; /* Ensure dropdown fits smaller screens */
                max-height: 300px; /* Reduce height for smaller screens */
            }

            .dropdown-item {
                padding: 8px; /* Slightly less padding on small screens */
                font-size: 0.85rem; /* Adjust font size on small screens */
            }
        }
    </style>
    `;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=0; path=/; domain=' + window.location.hostname + ';';
}

// Function to add a new notification
function addNotification(messageContent) {
    // Get the notification dropdown list
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationList = notificationDropdown.nextElementSibling; // Get the ul inside dropdown

    // Create a new list item for the notification
    const newNotification = document.createElement('li');
    newNotification.innerHTML = `<a class="dropdown-item" href="#">${messageContent}</a>`;

    // Append the new notification to the list
    notificationList.appendChild(newNotification);

    // Update notification count
    const notificationCount = document.getElementById('notification-count');
    let count = parseInt(notificationCount.innerText);
    count += 1;
    notificationCount.innerText = count;
    notificationCount.classList.remove('d-none');  // Make sure badge is visible

    // Show the filled bell icon and hide the empty bell icon
    const bellIconEmpty = document.getElementById('bell-icon-empty');
    const bellIconFilled = document.getElementById('bell-icon-filled');
    bellIconEmpty.classList.add('d-none');
    bellIconFilled.classList.remove('d-none');
}

// Function to connect to WebSocket server and subscribe to topics
function connectToWebSocket() {
    var socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected to WebSocket: ' + frame);

        // Subscribe to the public broadcast topic
        stompClient.subscribe('/all/messages', function (message) {
            console.log('Received public message: ' + message.body);
            // Add the public message to the notification dropdown
            addNotification(`Public Message: ${message.body}`);
        });

        // Subscribe to specific user messages
        stompClient.subscribe(`/user/${user.email}/specific/messages`, function (message) {
            console.log('Received specific user message: ' + message.body);
            // Add the specific message to the notification dropdown
            addNotification(`User Message: ${message.body}`);
        });
    });
}

function activeClick() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            console.log("Hello");
        });
    });
    console.log("Hello");

    // Connect to WebSocket on page load
    connectToWebSocket();

    const logoutLink = document.getElementById('logout-link');
    console.log('Logout link:', logoutLink); // Add this to check if logout-link is correctly selected

    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            console.log('Logout clicked'); // Add this to ensure the click event is firing
            event.preventDefault(); // Prevent the default link behavior

            var logOutURL = logoutAPI + `?type=${encodeURIComponent(user_role)}`;
            console.log('Logout URL:', logOutURL); // Check the URL being used for logout

            // Send the logout request using sendRequestWithToken
            sendRequestWithToken(logOutURL, 'POST', user)
                .then(data => {
                    console.log('Logout successful:', data); // Log success data
                    // Delete the JWT token from the cookie
                    deleteCookie('jwtToken');
                    window.location.href = '/';
                })
                .catch(error => {
                    console.error('Logout failed', error); // Log any errors
                });
        });
    }

    // Add event listener for bell icon animation and icon switch
    const bellIconEmpty = document.getElementById('bell-icon-empty');
    const bellIconFilled = document.getElementById('bell-icon-filled');
    const notificationCount = document.getElementById('notification-count');
    
    if (bellIconEmpty) {
        bellIconEmpty.addEventListener('click', function () {
            // Swap icons: hide the empty bell, show the filled one
            bellIconEmpty.classList.add('d-none');
            bellIconFilled.classList.remove('d-none');
            
            // Clear the notification count
            notificationCount.classList.add('d-none');
            
            // Add bell shake animation
            bellIconFilled.classList.add('bell-animate');
            
            // Remove the animation class after it completes
            setTimeout(function () {
                bellIconFilled.classList.remove('bell-animate');
            }, 600);
        });
    }

    // Reset the notification count when the bell icon is clicked
    document.getElementById('notificationDropdown').addEventListener('click', function () {
        // Reset notification count and switch icons back
        notificationCount.innerText = '0';
        notificationCount.classList.add('d-none');
        bellIconFilled.classList.add('d-none');
        bellIconEmpty.classList.remove('d-none');
    });
}

returnNavBar();
activeClick();
