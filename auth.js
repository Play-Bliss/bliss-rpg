// Ensure Firebase is initialized correctly
console.log("Initializing Firebase in auth.js...");
firebase.initializeApp(firebaseConfig);

// Reference Firebase Auth
const auth = firebase.auth();
console.log("Firebase Auth initialized.");

// Login function
function loginUser(email, password) {
    console.log("loginUser called with email:", email);
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

// Debugging global exposure
try {
    // Expose functions globally for use in index.html
    window.loginUser = loginUser;
    window.registerUser = registerUser;
    console.log("Functions loginUser and registerUser exposed globally.");
} catch (exposureError) {
    console.error("Error exposing loginUser and registerUser functions:", exposureError);
}

// Add ready-state message to console
console.log("auth.js loaded and ready.");
