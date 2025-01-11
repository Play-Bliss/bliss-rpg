// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Export Firebase services if needed
export const auth = getAuth(app);
export const database = getDatabase(app);
