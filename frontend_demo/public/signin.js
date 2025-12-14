// Sign In Logic

function signInWithGoogle() {
    console.log("Initiating Google Login...");
    alert("Use Google functionality placeholder.");
}

function signInWithFacebook() {
    console.log("Initiating Facebook Login...");
    alert("Use Facebook functionality placeholder.");
}

function signInWithLinkedin() {
    console.log("Initiating LinkedIn Login...");
    alert("Use LinkedIn functionality placeholder.");
}

function signInWithApple() {
    console.log("Initiating Apple Login...");
    alert("Use Apple functionality placeholder.");
}

function signInWithMicrosoft() {
    console.log("Initiating Windows/Microsoft Login...");
    alert("Use Windows/Microsoft functionality placeholder.");
}

function handleEmailSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('signin-btn');
    const loadingIcon = btn.querySelector('.loading-icon');
    const btnText = btn.querySelector('.btn-text');

    // Basic Validation
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Simulate Loading
    btn.disabled = true;
    loadingIcon.style.display = 'inline-block';
    btnText.style.display = 'none';

    setTimeout(() => {
        // Mock Success
        btn.disabled = false;
        loadingIcon.style.display = 'none';
        btnText.style.display = 'inline-block';

        // Simulating Role
        handleLoginSuccess('Patient');
    }, 1500);
}

function handleLoginSuccess(role) {
    console.log(`Login Successful. Redirecting as ${role}...`);
    alert(`Successfully signed in!\nRedirecting to ${role} Dashboard...`);
    // window.location.href = '/dashboard'; // Uncomment when dashboard exists
}

function handlePasswordReset(event) {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;

    if (!email) return;

    alert(`If ${email} is registered, a password reset link has been sent.`);
    showSignInStats();
}

// UI Toggles
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showForgotStats() {
    document.getElementById('signin-card').style.display = 'none';
    document.getElementById('forgot-card').style.display = 'block';
}

function showSignInStats() {
    document.getElementById('forgot-card').style.display = 'none';
    document.getElementById('signin-card').style.display = 'block';
}

// Modal Logic
function openSigninModal() {
    const modal = document.getElementById('signin-modal');
    document.body.classList.add('modal-open');
    modal.classList.add('active');
    // Ensure we start with sign in card
    showSignInStats();
}

function closeSigninModal() {
    const modal = document.getElementById('signin-modal');
    document.body.classList.remove('modal-open');
    modal.classList.remove('active');
}

// Close modal when clicking outside the card
window.onclick = function (event) {
    const modal = document.getElementById('signin-modal');
    if (event.target == modal) {
        closeSigninModal();
    }
}
