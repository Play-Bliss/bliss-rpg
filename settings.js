import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// Firebase configuration (already initialized in firebase-config.js)
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// HTML Elements
const usernameForm = document.getElementById("username-form");
const newUsernameInput = document.getElementById("new-username");
const statusMessage = document.getElementById("status-message");

// Display current username on page load
function loadCurrentUsername() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = ref(database, `users/${user.uid}/username`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    newUsernameInput.placeholder = `Current: ${snapshot.val()}`;
                } else {
                    newUsernameInput.placeholder = "Enter username";
                }
            } catch (error) {
                statusMessage.textContent = `Error loading username: ${error.message}`;
                statusMessage.style.color = "red";
            }
        } else {
            statusMessage.textContent = "You must be logged in to view settings.";
            statusMessage.style.color = "red";
        }
    });
}

// Save the new username to the database
usernameForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUsername = newUsernameInput.value.trim();

    // Validate username
    if (newUsername.length < 3 || newUsername.length > 20) {
        statusMessage.textContent = "Username must be between 3 and 20 characters.";
        statusMessage.style.color = "red";
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            try {
                await update(userRef, { username: newUsername });
                statusMessage.textContent = "Username updated successfully!";
                statusMessage.style.color = "green";
                newUsernameInput.placeholder = `Current: ${newUsername}`;
                newUsernameInput.value = "";
            } catch (error) {
                statusMessage.textContent = `Error updating username: ${error.message}`;
                statusMessage.style.color = "red";
            }
        } else {
            statusMessage.textContent = "You must be logged in to change your username.";
            statusMessage.style.color = "red";
        }
    });
});

// Load current username on page load
loadCurrentUsername();
