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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

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
}

// Draw the avatar when the page loads
drawAvatar();

// Fetch User Data
auth.onAuthStateChanged((user) => {
    if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
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
            } else {
                usernameElement.textContent = "Player";
                console.warn("No user data found in database.");
            }
        });
    } else {
        window.location.href = "index.html"; // Redirect to login
    }
});
