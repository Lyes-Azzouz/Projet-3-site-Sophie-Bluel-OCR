// Récupère l'élément qui a pour id "login-form"
const loginForm = document.getElementById("login-form");

// Ajout d'un écouteur d'évenement submit
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Création de l'objet data
    const formData = {
        email: emailInput.value,
        password: passwordInput.value,
    };
    // Récupération de l'users pour se connecter présents sur l'API
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem("token", data.token);
            window.location.replace("../index.html");
            document.querySelector(".filterbar").style.display = "block";
        })
        .catch((error) => console.error(error));
});
