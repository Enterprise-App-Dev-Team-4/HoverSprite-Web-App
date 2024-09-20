// API URLs
const navBarURL = 'http://localhost:8080/userName';
const SprayerURL = 'http://localhost:8080/sprayer';
const ReceptionistURL = 'http://localhost:8080/receptionist';
const orderDetailAPI = 'http://localhost:8080/order';
const farmerMsgAPI = 'http://localhost:8080/queue/message';

let role = null;
let sprayers = [];
let farmer = '';
let orderId = null;

// Extract role and orderId on page load
document.addEventListener("DOMContentLoaded", function () {
    role = getUserRoleFromUrl();  // Get the user role from the URL
    orderId = getOrderIdFromUrl();  // Get the orderID from the URL (query string)

    loadNavBar(role);  // Load navigation bar based on role
    loadFooter();  // Load footer
    fetchOrderDetails(orderId);  // Fetch order details and update UI

    setupChatForm();  // Set up the form for sending messages
});

// Function to extract user role from URL parameters
function getUserRoleFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('role');
}

// Function to extract orderID from the query string (URL)
function getOrderIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('orderID');  // Extract orderID from the query string (orderID=xxx)
}

// Fetch order details and update the UI
function fetchOrderDetails(orderId) {
    const url = `${orderDetailAPI}?orderId=${orderId}`; // Attach the orderId to the URL
    console.log(`Fetching order details from: ${url}`);

    sendRequestWithToken(url)
        .then(orderData => {
            console.log('Order Data:', orderData);
            sprayers = orderData.sprayer;
            farmer = orderData.farmerEmail;
            updateChatHeader(orderData.sprayer);  // Update the chat header with sprayer's first name
            clearChatContent();  // Clear any existing chat content
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
        });
}

// Update chat header with the full names of all sprayers
function updateChatHeader(sprayers) {
    const chatHeader = document.querySelector('.chat-header h5');
    
    if (sprayers && sprayers.length > 0) {
        // Map over the sprayers array to get all full names and join them with commas
        const sprayerNames = sprayers.map(sprayer => sprayer.fullName).join(', ');
        chatHeader.textContent = sprayerNames;  // Update header with all full names
    } else {
        chatHeader.textContent = 'Sprayers';  // Default if no sprayers found
    }
}

// Clear existing chat content
function clearChatContent() {
    const chatBody = document.querySelector('.chat-body');
    chatBody.innerHTML = '';  // Remove all previous chat messages
}

// Function to handle form submission and send the message
function setupChatForm() {
    const chatForm = document.querySelector('.chat-footer');
    const messageInput = chatForm.querySelector('input');
    const sendButton = chatForm.querySelector('button');

    // Add an event listener for the send button
    sendButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent form submission
        const message = messageInput.value.trim();
        
        if (message) {
            // Display user message
            addMessageToChatBody(message, true);
            if(role === 'farmer')
            {
                farmerSendMessage(message, sprayers, farmer);
            }
            
            // Simulate receiving a response from the server
            // setTimeout(() => {
            //     const serverMessage = `Server response to: ${message}`;
            //     addMessageToChatBody(serverMessage, false);
            // }, 1000);  // Simulate a 1-second delay for server response

            messageInput.value = '';  // Clear the input
        }
    });
}

// Function to add a message to the chat body
function addMessageToChatBody(message, sentByUser) {
    const chatBody = document.querySelector('.chat-body');
    
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message', sentByUser ? 'sent' : 'received');

    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message');
    messageBubble.textContent = message;

    chatMessage.appendChild(messageBubble);
    chatBody.appendChild(chatMessage);

    // Scroll to the bottom of the chat body to show the new message
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Load the navigation bar based on the user role
function loadNavBar(userRole) {
    const navbarContainer = document.getElementById("navbar-container");
    let userAPI = null;

    // Determine the API endpoint based on the role
    if (userRole === 'receptionist') {
        userAPI = ReceptionistURL;
    } else if (userRole === 'farmer') {
        userAPI = navBarURL;
    } else if (userRole === 'sprayer') {
        userAPI = SprayerURL;
    }

    console.log(`Fetching user data for role: ${userRole} from: ${userAPI}`);
    
    // Fetch user data and load navigation
    sendRequestWithToken(userAPI)
        .then(userData => {
            console.log('User Data:', userData);
            // Render the navigation bar dynamically based on the role
            navbarContainer.innerHTML = returnNavBar(userData, userRole);
            activeClick();  // Attach event handlers for the navigation bar
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Load the footer dynamically
function loadFooter() {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = returnFooter();  // Assuming returnFooter returns the footer HTML content
}

// Placeholder for sending requests with an authorization token
function sendRequestWithToken(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assuming token is stored in localStorage
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
}

function farmerSendMessage(content, sprayers, farmerEmail) {
    // The userMessage object contains the recipient and the message content
    var sprayerEmail = [];
    for(let i = 0; i < sprayers.length; i++)
    {
        sprayerEmail.push(sprayers[i].email);
    }
    
    const userMessage = {
        content: content,
        sprayerEmail: sprayerEmail,
        farmerEmail: farmerEmail
    };

    sendRequestWithToken(farmerMsgAPI, 'POST', userMessage)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
            });
}
