const logoutAPI = 'http://localhost:8080/log-out';
var user = null;
var user_role = null;
var stompClient = null;
var noti = '';

function returnNavBar(data, role) {
    console.log('hello navbar');
    user = data;
    user_role = role;

    let orderUrl = '';
    if (role === 'receptionist') {
        orderUrl = '/receptionist-order';
    } else if (role === 'farmer') {
        orderUrl = '/order-list';
    } else if (role === 'sprayer') {
        orderUrl = '/sprayer-order';
    }
    console.log(user);

    const servicesTab = role !== 'sprayer' ? `<a class="nav-link" href="/service?role=${encodeURIComponent(role)}">Services</a>` : '';

    return `
    <nav class="navbar navbar-expand-lg navbar-custom" id="navbar-container">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../../../public/HoverSpriteLogo.png" alt="HoverSprite Logo" class="logo-img">
                HoverSprite
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas" aria-controls="navbarOffcanvas" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="navbarOffcanvas" aria-labelledby="navbarOffcanvasLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="navbarOffcanvasLabel">Menu</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="/home?role=${encodeURIComponent(role)}">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="/about-us?role=${encodeURIComponent(role)}">About</a></li>
                        ${role !== 'sprayer' ? `<li class="nav-item">${servicesTab}</li>` : ''}
                        <li class="nav-item"><a class="nav-link" href="${orderUrl}?role=${encodeURIComponent(role)}">Orders</a></li>
                    </ul>
                    <div class="d-flex align-items-center flex-column flex-lg-row">
                        <div class="dropdown me-3 mb-2 mb-lg-0">
                            <button class="btn notification-btn" type="button" id="notificationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-bell" id="bell-icon-empty"></i>
                                <i class="bi bi-bell-fill d-none" id="bell-icon-filled"></i>
                                <span class="badge bg-danger d-none" id="notification-count">0</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                                <!-- Notifications will be appended here -->
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button class="btn profile-dropdown" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src=${data.profileImage} alt="Profile" class="rounded-circle profile-image">
                                <span class="profile-name">${data.fullName}</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li><a class="dropdown-item" href="/profile?role=${encodeURIComponent(role)}"><i class="bi bi-person-circle me-2"></i>View Profile</a></li>
                                <li><a class="dropdown-item" href="#" id="logout-link"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                            </ul>
                        </div>
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
            color: #28a745;
            text-decoration: underline;
            text-decoration-color: #28a745;
            text-decoration-thickness: 2px;
        }
        .profile-dropdown {
            background-color: transparent;
            border: none;
            padding: 0;
            color: black;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .profile-dropdown::after {
            display: none;
        }
        .profile-image {
            width: 40px;
            height: 40px;
            object-fit: cover;
        }
        .dropdown-menu {
            max-width: 300px;
            max-height: 400px;
            overflow-y: auto;
            padding: 0;
        }
        .dropdown-menu::-webkit-scrollbar {
            width: 8px;
        }
        .dropdown-menu::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 10px;
        }
        .dropdown-menu::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        }
        .dropdown-item {
            padding: 10px;
            font-size: 0.9rem;
            border-bottom: 1px solid #f0f0f0;
            word-wrap: break-word;
        }
        .dropdown-item:hover {
            background-color: #f8f9fa;
        }
        .dropdown-item:last-child {
            border-bottom: none;
        }
        /* .badge {
            font-size: 0.8rem;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        } */
        .logo-img {
            height: 40px;
            width: auto;
        }
        .notification-btn {
            background-color: transparent;
            border: none;
            color: #28a745;
        }
        @media (max-width: 991px) {
            .offcanvas {
                width: 300px;
                background-color: #f8f9fa;
            }
            .offcanvas-header {
                background-color: #28a745;
                color: white;
            }
            .offcanvas-body {
                padding-top: 20px;
            }
            .nav-link {
                padding: 10px 15px;
                border-bottom: 1px solid #e9ecef;
            }
            .nav-link:hover {
                background-color: #e9ecef;
            }
            .profile-name {
                display: inline;
            }
            .dropdown-menu {
                position: static !important;
                width: 100%;
                margin-top: 10px;
            }
            .notification-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1030;
                background-color: #28a745;
                color: white;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification-btn .badge {
                position: absolute;
                top: -5px;
                right: -5px;
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
            noti = message.body; 
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
