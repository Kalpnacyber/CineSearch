function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (username !== "" && password.length >= 6) {

        localStorage.setItem("isLoggedIn", "true");

        alert("Login Successful");
        window.location.href = "index.html";
    }
    else {
        alert("Criteria for username and password is not matched!!");
    }
}