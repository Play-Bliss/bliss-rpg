// Import Firebase Authentication and related functions
import { auth } from "./firebase-config.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Handle user sign-in
const loginUser = (email, password) => {
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
};

// Handle user registration
const registerUser = (email, password) => {
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
};

// Handle user logout
const logoutUser = () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out.");
        })
        .catch((error) => {
            console.error("Error during logout:", error.message);
        });
};

// Example: Add event listeners to buttons in your HTML
document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    loginUser(email, password);
});

document.getElementById("register-btn").addEventListener("click", () => {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    registerUser(email, password);
});

document.getElementById("logout-btn").addEventListener("click", () => {
    logoutUser();
});
