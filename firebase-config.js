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

// Initialize other Firebase services
const auth = firebase.auth();
const database = firebase.database();

// Initialize Analytics safely
try {
    const analytics = firebase.analytics();
    console.log("Firebase Analytics initialized successfully!");
} catch (error) {
    console.warn("Firebase Analytics could not be initialized:", error.message);
}

// Expose Firebase services globally if needed
window.firebaseAuth = auth;
window.firebaseDatabase = database;
