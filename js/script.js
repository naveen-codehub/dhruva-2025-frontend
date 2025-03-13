document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const showLogin = document.getElementById("showLogin");
    const showSignup = document.getElementById("showSignup");
    const alertBox = document.getElementById("alert");

    showLogin.addEventListener("click", function () {
        loginForm.classList.remove("d-none");
        signupForm.classList.add("d-none");
    });

    showSignup.addEventListener("click", function () {
        signupForm.classList.remove("d-none");
        loginForm.classList.add("d-none");
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "welcome.html";
                } else {
                    showAlert("Invalid login credentials", "danger");
                }
            })
            .catch(() => showAlert("Server error, try again later", "danger"));
    });

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        fetch("http://127.0.0.1:8000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showAlert("Signup successful! Please login.", "success");
                    showLogin.click();
                } else {
                    showAlert("Signup failed, try again", "danger");
                }
            })
            .catch(() => showAlert("Server error, try again later", "danger"));
    });

    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.classList.remove("d-none");
        setTimeout(() => alertBox.classList.add("d-none"), 3000);
    }
});
