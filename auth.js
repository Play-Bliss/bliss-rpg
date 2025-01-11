// Ensure Firebase is initialized correctly
firebase.initializeApp(firebaseConfig);

// Reference Firebase Auth
const auth = firebase.auth();

// Login function
function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            alert("Login successful!");
            // Redirect to the main game page
            window.location.href = "game.html";
        })
        .catch((error) => {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        });
}

// Signup function
function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User registered:", userCredential.user);
            alert("Signup successful! Please verify your email.");
            // Send email verification
            userCredential.user.sendEmailVerification();
        })
        .catch((error) => {
            console.error("Signup error:", error);
            alert("Signup failed: " + error.message);
        });
}

// Expose functions globally
window.loginUser = loginUser;
window.registerUser = registerUser;
