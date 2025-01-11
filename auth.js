// Import Firebase Authentication and functions
import { auth } from "./firebase-config.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Login Function
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            if (!userCredential.user.emailVerified) {
                console.warn("Email is not verified. Please verify your email.");
            }
        })
        .catch((error) => {
            console.error("Error during login:", error.message);
        });
}

// Register Function
function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User registered:", userCredential.user);
            sendEmailVerification(userCredential.user)
                .then(() => {
                    console.log("Email verification sent.");
                })
                .catch((error) => {
                    console.error("Error sending email verification:", error.message);
                });
        })
        .catch((error) => {
            console.error("Error during registration:", error.message);
        });
}

// Expose functions globally
window.loginUser = loginUser;
window.registerUser = registerUser;
