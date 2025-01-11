import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
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
const auth = getAuth();
const database = getDatabase(app);

// Get the form and elements
const usernameForm = document.getElementById('username-form');
const newUsernameInput = document.getElementById('new-username');
const statusMessage = document.getElementById('status-message');

// Listen for form submission
usernameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newUsername = newUsernameInput.value.trim();

    // Validate the username
    if (newUsername.length < 3 || newUsername.length > 20) {
        statusMessage.textContent = 'Username must be between 3 and 20 characters.';
        statusMessage.style.color = 'red';
        return;
    }

    // Get current user
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;

        // Update the username in Firebase Realtime Database
        const userRef = ref(database, `users/${userId}`);
        try {
            await update(userRef, { username: newUsername });
            statusMessage.textContent = 'Username updated successfully!';
            statusMessage.style.color = 'green';
            newUsernameInput.value = '';
        } catch (error) {
            statusMessage.textContent = `Error updating username: ${error.message}`;
            statusMessage.style.color = 'red';
        }
    } else {
        statusMessage.textContent = 'You must be logged in to change your username.';
        statusMessage.style.color = 'red';
    }
});
