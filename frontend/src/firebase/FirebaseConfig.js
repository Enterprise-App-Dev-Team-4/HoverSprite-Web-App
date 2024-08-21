// FirebaseConfig.js

// Import the Firebase SDK and necessary functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

// Firebase configuration for your web app
const firebaseConfig = {
  apiKey: "AIzaSyD3hUpNFgAwXxlpsGs2sfI6Fgp3MOgXanA",
  authDomain: "hoversprite-3d6b3.firebaseapp.com",
  projectId: "hoversprite-3d6b3",
  storageBucket: "hoversprite-3d6b3.appspot.com",
  messagingSenderId: "375398691957",
  appId: "1:375398691957:web:ce8d343181d0e843cef43c",
  measurementId: "G-M1Q0WXPBE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, storage }; // Export the initialized app and storage for use in other files
