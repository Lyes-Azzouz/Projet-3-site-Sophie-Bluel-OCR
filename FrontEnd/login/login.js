const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const divErrorMsg = document.querySelector(".error-msg")
console.log(divErrorMsg);

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Vérification que les deux champs sont remplis
    if (emailInput.value === "" || passwordInput.value === "") {
        if (emailInput.value === "") {
            divErrorMsg.style.display = "block";
        }
        if (passwordInput.value === "") {
            divErrorMsg.style.display = "block";
        }
        return;
    }

    // Vérification si l'e-mail et le mot de passe sont corrects  
    if (emailInput.value !== "sophie.bluel@test.tld" || passwordInput.value !== "S0phie") {
        emailInput.value = "";
        passwordInput.value = "";
        divErrorMsg.style.display = "block";
        return;
    }

    // Si tout est bon alors envoi de la requête au serveur
    const formData = {
        email: emailInput.value,
        password: passwordInput.value,
    };
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