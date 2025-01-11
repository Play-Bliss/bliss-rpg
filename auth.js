console.log("auth.js loaded successfully.");

// Firebase Authentication Reference
let auth;
try {
    if (!firebase.apps.length) {
        console.error("Firebase is not initialized. Ensure firebase-config.js is loaded before auth.js.");
    } else {
        auth = firebase.auth();
        console.log("Firebase Auth initialized:", auth);
    }
} catch (error) {
    console.error("Error initializing Firebase Auth:", error);
}

// Login Function
function loginUser(email, password) {
    console.log("loginUser called with email:", email);

    if (!auth) {
        console.error("Firebase Auth not initialized. Login attempt failed.");
        alert("Authentication service is unavailable. Please try again later.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful:", userCredential.user);
            alert("Login successful!");
            window.location.href = "game.html"; // Redirect to game page
        })
        .catch((error) => {
            console.error("Login failed:", error);
            alert("Error during login: " + error.message);
        });
}

// Signup Function
function registerUser(email, password) {
    console.log("registerUser called with email:", email);

    if (!auth) {
        console.error("Firebase Auth not initialized. Signup attempt failed.");
        alert("Authentication service is unavailable. Please try again later.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Signup successful:", userCredential.user);

            // Send verification email
            const user = userCredential.user;
            user.sendEmailVerification()
                .then(() => {
                    console.log("Verification email sent to:", user.email);
                    alert("Signup successful! Verification email sent.");
                })
                .catch((emailError) => {
                    console.error("Error sending verification email:", emailError);
                });

            // Redirect or show confirmation message
        })
        .catch((error) => {
            console.error("Signup failed:", error);
            alert("Error during signup: " + error.message);
        });
}

// Expose Functions Globally
window.loginUser = loginUser;
window.registerUser = registerUser;
console.log("loginUser and registerUser functions are globally available.");
