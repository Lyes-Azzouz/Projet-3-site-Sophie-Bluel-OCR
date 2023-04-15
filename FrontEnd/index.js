// Récupération des projets présents sur l'api
const reponse = await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
        authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDE3OTI5MywiZXhwIjoxNjgwMjY1NjkzfQ.lJKOqeglPNzKxSQGO7mM-nXRKVkZOCKS8CIyr-duoVE",
    },
});
const works = await reponse.json();

// Fonction avec une boucle pour générer les articles du site avec les données du JSON
function genererworks(works) {
    for (let i = 0; i < works.length; i++) {
        const article = works[i];
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;
        const sectionGallery = document.querySelector(".gallery");
        sectionGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
    }
}

// Fonction avec une boucle pour la modal , fonctionne comme celle du haut "genereworks" + requête DELETE
export let article;
function genererworksmodal(works) {
    for (let i = 0; i < works.length; i++) {
        article = works[i];
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = "editer";
        const mouveArrow = document.createElement("a");
        mouveArrow.href = "#";
        mouveArrow.innerHTML =
            '<i class="fa-solid fa-arrows-up-down-left-right mouve"></i>';
        figureElement.appendChild(mouveArrow);

        //Mise en place de l'îcone trashIcon ainsi que de la requête DELETE
        const tokenDeleteElement = sessionStorage.getItem("token");
        const trashIcon = document.createElement("a");
        trashIcon.href = "#";
        trashIcon.innerHTML =
            '<i class="fa-sharp fa-regular fa-trash-can trash"></i>';
        trashIcon.setAttribute("data-id", article.id);
        trashIcon.setAttribute("data-index", i); // Ajouter l'indice de l'élément à supprimer
        // Ajout d'une constante "iconTrash" afin que le clique se fasse sur la balise <i> pour évité les "problèmes de clique" due a l'élémment trashIcon (<a>) qui contient la balise (<i>)
        const iconTrash = trashIcon.querySelector(".trash");
        // Ajout d'un événement clic pour l'icon trash, pour qu'au clic l'élément en question soit supprimé
        iconTrash.addEventListener("click", (event) => {
            event.preventDefault();
            const idElement = trashIcon.getAttribute("data-id");
            const index = event.target.getAttribute("data-index");
            // Afficher une boîte de dialogue de confirmation
            const confirmation = confirm(
                "Voulez-vous vraiment supprimer ce projet ?"
            );
            if (confirmation) {
                fetch(`http://localhost:5678/api/works/${idElement}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenDeleteElement}`,
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            // Supprimer l'élément de la galerie
                            supprimerElement(index);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
        figureElement.appendChild(trashIcon);
        const sectionGallery = document.querySelector("#gallery-modal");
        sectionGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
    }
}
genererworks(works);
genererworksmodal(works);

// Fonction qui va sélectionner la gallery et supprime l'enfant element de la gallery
function supprimerElement(index) {
    const sectionGallery = document.querySelector(".gallery");
    const childNodes = sectionGallery.childNodes;

    if (
        index >= 0 &&
        index < childNodes.length &&
        childNodes[index] instanceof Node
    ) {
        sectionGallery.removeChild(childNodes[index]);
    }
}

// Filterbar : relier les les éléments enfants à la filterbar
const filterBar = document.querySelector(".filterbar");
const boutonTous = document.querySelector(".tous");
const boutonObjets = document.querySelector(".objets");
const boutonAppart = document.querySelector(".appart");
const boutonHotel = document.querySelector(".hotel");
filterBar.appendChild(boutonTous);
filterBar.appendChild(boutonObjets);
filterBar.appendChild(boutonAppart);
filterBar.appendChild(boutonHotel);

// Ajout d'évènement au click de chaque bouton de la filterbar
boutonTous.addEventListener("click", function () {
    const worksTous = works.filter(function (work) {
        return work.categoryId;
    });
    console.log(worksTous);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksTous);
});
boutonObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (work) {
        return work.categoryId === 1;
    });
    console.log(worksObjets);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksObjets);
});
boutonAppart.addEventListener("click", function () {
    const worksAppart = works.filter(function (work) {
        return work.categoryId === 2;
    });
    console.log(worksAppart);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksAppart);
});
boutonHotel.addEventListener("click", function () {
    const worksHotel = works.filter(function (work) {
        return work.categoryId === 3;
    });
    console.log(worksHotel);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksHotel);
});

// Supprimer ou afficher la filterbar si user est co ou non
const userIsCo = sessionStorage.getItem("token") !== null;
const filterbar = document.querySelector(".filterbar");
if (!userIsCo) {
    filterbar.style.display = "block";
    filterBar.style.bottom = "25px";
} else if (userIsCo) {
    filterbar.style.display = "none";
}

// Modifier le bouton login en logout en fonction de la connexion de l'utilisateur
const loginBtn = document.querySelector(".logOut");
if (userIsCo) {
    loginBtn.innerText = "logout";
    loginBtn.style.textDecoration = "none";
    loginBtn.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        loginBtn.href = "./index.html";
    });
} else {
    loginBtn.innerText = "login";
    loginBtn.style.textDecoration = "none";
}
// Modifier le bouton "modifier" en fonction de la connexion
const titrePage = document.getElementById("titre-page-top");
const modifierBtn = document.getElementById("btn-modifier");
const modifierBtn2 = document.getElementById("btn-modifier-2");
if (userIsCo) {
    modifierBtn.classList.remove("button-modifier-hide");
    modifierBtn2.classList.remove("button-modifier-hide");
    titrePage.classList.add("titre-top");
} else {
    modifierBtn.classList.add("button-modifier-hide");
    modifierBtn2.classList.add("button-modifier-hide");
    titrePage.classList.remove("titre-top");
}
const logoutLink = document.querySelector("#loginOut");
logoutLink.addEventListener("click", function () {
    sessionStorage.removeItem("token");
    // Redirige l'utilisateur vers la page index.html
    window.location.href = "../index.html";
});

// Création de la topBar située en haut de la page
if (userIsCo) {
    const headerPage = document.querySelector("header");
    const topBar = document.createElement("div");
    const boutonsTopBar = document.createElement("div");
    const boutonEditionI = document.createElement("span");
    boutonEditionI.classList.add(
        "boutonEI",
        "fa-sharp",
        "fa-regular",
        "fa-pen-to-square"
    );
    const boutonEdition = document.createElement("span");
    boutonEdition.textContent = "Mode édition";
    const boutonChangement = document.createElement("span");
    boutonChangement.textContent = "publier les changements";
    boutonEdition.classList.add("bouton-edition");
    boutonChangement.classList.add("bouton-changement");
    headerPage.appendChild(topBar);
    headerPage.style.marginTop = "100px";
    topBar.classList.add("topbar-style");
    topBar.appendChild(boutonsTopBar);
    boutonsTopBar.appendChild(boutonEdition);
    boutonsTopBar.appendChild(boutonChangement);
    boutonEdition.appendChild(boutonEditionI);
}
