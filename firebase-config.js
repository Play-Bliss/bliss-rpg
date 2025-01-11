// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";

// Firebase configuration object
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

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Firebase Authentication
export const database = getDatabase(app); // Firebase Realtime Database

// Initialize Firebase Analytics (with feature support check)
let analytics = null;
isSupported()
    .then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
            console.log("Firebase Analytics initialized!");
        } else {
            console.warn("Firebase Analytics is not supported on this device/browser.");
        }
    })
    .catch((error) => {
        console.error("Error initializing Firebase Analytics:", error.message);
    });

// Export other Firebase instances (if needed)
export { analytics };

