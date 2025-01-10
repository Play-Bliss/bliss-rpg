// Firebase Auth and Database Initialization
const auth = firebase.auth();
const database = firebase.database();

// User data
let user = null;
const progressFill = document.getElementById("progress-fill");
const levelDisplay = document.getElementById("level-display");

// Draw Avatar
function drawAvatar() {
    const canvas = document.getElementById("avatar-canvas");
    const ctx = canvas.getContext("2d");

    // Avatar body
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(50, 80, 100, 100);

    // Avatar head
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(100, 60, 30, 0, Math.PI * 2);
    ctx.fill();

    // Avatar arms
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(30, 100, 20, 50);
    ctx.fillRect(150, 100, 20, 50);
}

// Update User Stats
function updateUserStats(user) {
    const userRef = database.ref(`users/${user.uid}`);

    userRef.once("value", (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById("username").innerText = user.displayName || "Player";
            document.getElementById("user-role").innerText = data.role || "Member";
            document.getElementById("current-level").innerText = data.level || 1;
            document.getElementById("current-exp").innerText = data.exp || 0;

            // Update level bar
            const levelExp = data.exp % 100;
            progressFill.style.width = `${levelExp}%`;
            levelDisplay.innerText = `Level ${data.level}`;
        }
    });
}

// Handle Firebase User
auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
        user = currentUser;

        // Check user's role
        database
            .ref(`users/${user.uid}`)
            .set({ role: "Member", level: 1, exp: 0 })
            .catch((err) => console.error(err));

        drawAvatar();
        updateUserStats(user);
    } else {
        window.location.href = "index.html"; // Redirect to login if not authenticated
    }
});
