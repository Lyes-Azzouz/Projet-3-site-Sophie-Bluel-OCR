const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const divErrorMsg = document.querySelector(".error-msg");














loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Vérification que les deux champs sont remplis
    if (emailInput.value === "" || passwordInput.value === "") {
        if (emailInput.value === "") {
            divErrorMsg.style.display = "block";

        }
        if (passwordInput.value === "") {

            divErrorMsg.innerHTML = "Le champ mot de passe est vide ! ";
            divErrorMsg.style.display = "block";
            divErrorMsg.style.paddingLeft = "121px";
            divErrorMsg.style.paddingTop = "15px";

        }
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
        .then((response) => {
            if (response.status === 200) {
                // Si la réponse du serveur indique que la connexion est réussie, rediriger l'utilisateur vers la page index.html
                return response.json();
            } else {
                // Si la réponse du serveur indique une erreur, afficher le message d'erreur
                divErrorMsg.innerHTML = "Identifiants  renseignés  inccorects !"
                divErrorMsg.style.paddingLeft = "121px"
            }
        })
        .then((data) => {
            // Stocker le token dans le session storage
            sessionStorage.setItem("token", data.token);
            window.location.replace("../index.html");
            document.querySelector(".filterbar").style.display = "block";
        })
        .catch((error) => {
            emailInput.value = "";
            passwordInput.value = "";
            divErrorMsg.style.display = "block";
            console.error(error);
        });
});

