// Debugging: Confirm auth.js is loaded
console.log("auth.js loading...");

// Ensure Firebase is initialized before using auth
if (!firebase.apps.length) {
    console.log("Initializing Firebase...");
    firebase.initializeApp(firebaseConfig);
} else {
    console.log("Firebase already initialized.");
}

// Reference Firebase Auth after initialization
let auth;
try {
    auth = firebase.auth();
    console.log("Firebase Auth initialized successfully.");
} catch (error) {
    console.error("Error initializing Firebase Auth:", error);
}

// Login function
function loginUser(email, password) {
    console.log("loginUser called with email:", email);
    if (!auth) {
        console.error("Auth is not initialized. Login aborted.");
        return;
    }
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User logged in successfully:", userCredential.user);
            alert("Login successful!");
            // Redirect to the main game page
            window.location.href = "game.html";
        })
        .catch((error) => {
            console.error("Login error:", error.code, error.message);
            alert("Login failed: " + error.message);
        });
}

// Signup function
function registerUser(email, password) {
    console.log("registerUser called with email:", email);
    if (!auth) {
        console.error("Auth is not initialized. Signup aborted.");
        return;
    }
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User registered successfully:", userCredential.user);
            alert("Signup successful! Please verify your email.");
            // Send email verification
            userCredential.user.sendEmailVerification()
                .then(() => {
                    console.log("Email verification sent to:", email);
                })
                .catch((emailError) => {
                    console.error("Error sending email verification:", emailError.code, emailError.message);
                });
        })
        .catch((error) => {
            console.error("Signup error:", error.code, error.message);
            alert("Signup failed: " + error.message);
        });
}

// Expose functions globally
try {
    window.loginUser = loginUser;
    window.registerUser = registerUser;
    console.log("Functions loginUser and registerUser exposed globally.");
} catch (error) {
    console.error("Error exposing functions globally:", error);
}

// Debugging: Ready state
console.log("auth.js loaded and ready.");
