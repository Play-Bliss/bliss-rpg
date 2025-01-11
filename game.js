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

// Fetch User Data
auth.onAuthStateChanged((user) => {
    if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();

            // Update UI with user data
            if (data) {
                usernameElement.textContent = data.username || "Player";
                userRoleElement.textContent = data.role || "Member";
                userLevelElement.textContent = data.level || 1;
                userExpElement.textContent = data.experience || 0;
            } else {
                usernameElement.textContent = "Player";
                console.warn("No user data found in database.");
            }
        });
    } else {
        window.location.href = "index.html"; // Redirect to login
    }
});
