// auth.js

// Reference to Firebase auth
const auth = firebase.auth();

// Login Functionality
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                alert("Login successful!");
                // Redirect to the game
                window.location.href = "game.html";
            } else {
                alert("Please verify your email first!");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Signup Functionality
document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            user.sendEmailVerification()
                .then(() => {
                    alert("Signup successful! Please check your email to verify your account.");
                })
                .catch((error) => {
                    alert(error.message);
                });
        })
        .catch((error) => {
            alert(error.message);
        });
});
