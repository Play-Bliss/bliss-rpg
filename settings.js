import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// Firebase configuration (if not already initialized globally in firebase-config.js)
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

// Get form and DOM elements
const usernameForm = document.getElementById("username-form");
const newUsernameInput = document.getElementById("new-username");
const statusMessage = document.getElementById("status-message");

// Listen for form submission
usernameForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload on form submission

  const newUsername = newUsernameInput.value.trim();

  // Validate the new username
  if (newUsername.length < 3 || newUsername.length > 20) {
    updateStatusMessage(
      "Username must be between 3 and 20 characters.",
      "red"
    );
    return;
  }

  // Check if a user is logged in
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;

    try {
      // Update username in Firebase
      const userRef = ref(database, `users/${userId}`);
      await update(userRef, { username: newUsername });

      // Feedback to user
      updateStatusMessage("Username updated successfully!", "green");

      // Clear input field
      newUsernameInput.value = "";
    } catch (error) {
      // Handle database update error
      updateStatusMessage(`Error updating username: ${error.message}`, "red");
    }
  } else {
    updateStatusMessage(
      "You must be logged in to change your username.",
      "red"
    );
  }
});

// Utility function for updating status messages
function updateStatusMessage(message, color) {
  statusMessage.textContent = message;
  statusMessage.style.color = color;
}
// Display current username on the settings page
const currentUsernameElement = document.getElementById("current-username");

// Fetch and display the user's current username
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const userId = user.uid;
        const userRef = ref(database, `users/${userId}`);
        
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists() && snapshot.val().username) {
                currentUsernameElement.textContent = snapshot.val().username;
            } else {
                currentUsernameElement.textContent = "Player";
            }
        } catch (error) {
            currentUsernameElement.textContent = "Error loading username.";
            console.error("Error fetching username:", error);
        }
    } else {
        currentUsernameElement.textContent = "Not logged in.";
    }
});
