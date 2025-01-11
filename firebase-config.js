console.log("firebase-config.js loaded successfully.");

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
firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized:", firebase);

// Optional: Initialize analytics
try {
  const analytics = firebase.analytics();
  console.log("Firebase Analytics initialized:", analytics);
} catch (error) {
  console.warn("Firebase Analytics initialization error:", error);
}

// Expose Firebase globally for other scripts
window.firebase = firebase;
