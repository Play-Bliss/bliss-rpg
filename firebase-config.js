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
firebase.initializeApp(firebaseConfig);

// Check and initialize Analytics if supported
try {
    const analytics = firebase.analytics();
    console.log("Analytics initialized successfully.");
} catch (error) {
    console.warn("Firebase Analytics is not available:", error.message);
}

// Initialize other Firebase services
const auth = firebase.auth();
const database = firebase.database();

// Optionally export services globally
window.firebaseAuth = auth;
window.firebaseDatabase = database;
