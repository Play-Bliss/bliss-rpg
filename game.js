import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsqcVJDGpVPXI8-6ZJcqYwCR9Ejpw43lQ",
    authDomain: "play-bliss.firebaseapp.com",
    databaseURL: "https://play-bliss-default-rtdb.firebaseio.com",
    projectId: "play-bliss",
    storageBucket: "play-bliss.appspot.com",
    messagingSenderId: "605761107676",
    appId: "1:605761107676:web:a5391f6f614f27c27ae619",
    measurementId: "G-PQMXK8WQKB",
};

// Initialize Firebase
let app;
let auth;
let database;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth();
    database = getDatabase(app);
    console.log("Firebase initialized successfully.");
} catch (error) {
    console.error("Error initializing Firebase:", error.message);
}

// DOM Elements
const usernameElement = document.getElementById("username");
const userRoleElement = document.getElementById("user-role");
const userLevelElement = document.getElementById("current-level");
const userExpElement = document.getElementById("current-exp");
const progressBarFill = document.getElementById("progress-fill");

// Avatar canvas
const avatarCanvas = document.getElementById("avatar-canvas");
const avatarContext = avatarCanvas.getContext("2d");

// Function to draw the avatar
function drawAvatar() {
    try {
        console.log("Drawing avatar...");
        // Clear the canvas
        avatarContext.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);

        // Draw a face (circle)
        avatarContext.fillStyle = "#FFD700"; // Gold
        avatarContext.beginPath();
        avatarContext.arc(100, 100, 50, 0, Math.PI * 2);
        avatarContext.fill();

        // Draw eyes
        avatarContext.fillStyle = "#000"; // Black
        avatarContext.beginPath();
        avatarContext.arc(80, 90, 5, 0, Math.PI * 2);
        avatarContext.fill();
        avatarContext.beginPath();
        avatarContext.arc(120, 90, 5, 0, Math.PI * 2);
        avatarContext.fill();

        // Draw a smile
        avatarContext.strokeStyle = "#000"; // Black
        avatarContext.lineWidth = 2;
        avatarContext.beginPath();
        avatarContext.arc(100, 110, 20, 0, Math.PI, false);
        avatarContext.stroke();
        console.log("Avatar drawn successfully.");
    } catch (error) {
        console.error("Error drawing avatar:", error.message);
    }
}

// Draw the avatar when the page loads
drawAvatar();

// Fetch User Data
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User authenticated:", user.uid);
        const userRef = ref(database, `users/${user.uid}`);
        
        onValue(userRef, (snapshot) => {
            console.log("Data fetched from Firebase:", snapshot.val());
            const data = snapshot.val();

            if (data) {
                // Update UI with user data
                usernameElement.textContent = data.username || "Player";
                userRoleElement.textContent = data.role || "Member";
                userLevelElement.textContent = data.level || 1;
                userExpElement.textContent = data.experience || 0;

                // Update level bar
                const progress = (data.experience || 0) / 100; // Assuming max XP for each level is 100
                progressBarFill.style.width = `${progress * 100}%`;

                console.log("UI updated with user data.");
            } else {
                console.warn("No user data found. Setting default values.");
                usernameElement.textContent = "Player";
            }
        }, (error) => {
            console.error("Error reading Firebase data:", error.message);
        });
    } else {
        console.warn("No user authenticated. Redirecting to login page.");
        window.location.href = "index.html";
    }
});

// Debugging Function
function debugState() {
    console.log("Debugging Current State:");
    console.log("App Initialized:", !!app);
    console.log("Auth Initialized:", !!auth);
    console.log("Database Initialized:", !!database);
    console.log("Elements Found:", {
        usernameElement,
        userRoleElement,
        userLevelElement,
        userExpElement,
        progressBarFill,
    });
}

// Call debugging function at load
debugState();
