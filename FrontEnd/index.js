export let article;
let idElement;



// Récupération des projets (works) présents sur l'API
async function getWorks() {
    const fetchWorks = await fetch("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDE3OTI5MywiZXhwIjoxNjgwMjY1NjkzfQ.lJKOqeglPNzKxSQGO7mM-nXRKVkZOCKS8CIyr-duoVE",
        }
    });
    return fetchWorks.json();
}

const works = await getWorks();

export { getWorks, genererworks, genererworksmodal };

// Fonction avec une boucle pour générer les articles du site présent sur l'API
async function genererworks(works) {
    for (let i = 0; i < works.length; i++) {
        const article = works[i];
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;
        const sectionGallery = document.querySelector(".gallery");
        figureElement.setAttribute("data-id", article.id);
        sectionGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
    }
}

// Fonction avec une boucle  pour la modal , fonctionne comme celle du haut "genereworks"

async function genererworksmodal(works) {
    for (let i = 0; i < works.length; i++) {
        article = works[i];
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = "editer";
        const mouveArrow = document.createElement("a");
        figureElement.setAttribute("data-id", article.id);
        mouveArrow.href = "#";
        mouveArrow.innerHTML =
            '<i class="fa-solid fa-arrows-up-down-left-right mouve"></i>';
        figureElement.appendChild(mouveArrow);
        const tokenDeleteElement = sessionStorage.getItem("token");
        const trashIcon = document.createElement("a");
        trashIcon.href = "#";
        trashIcon.innerHTML =
            '<i class="fa-sharp fa-regular fa-trash-can trash"></i>';
        trashIcon.setAttribute("data-id", article.id);
        trashIcon.setAttribute("data-index", i);

        // Ajout d'une constante "iconTrash" afin que le clique se fasse sur la balise <i> pour éviter les "problèmes de clique" due a l'élémment trashIcon (<a>) qui contient la balise (<i>)

        const iconTrash = trashIcon.querySelector(".trash");
        iconTrash.addEventListener("click", (event) => {
            event.preventDefault();
            idElement = trashIcon.getAttribute("data-id");

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
                            supprimerElement(idElement);

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
genererworksmodal(works)



// Fonction pour supprimer les projets présents dans la gallery
async function supprimerElement(idElement) {
    const elements = document.querySelectorAll("[data-id='" + idElement + "']");
    elements.forEach((element) => {
        element.remove();
    });

    // Supprimer l'élément de la galerie de la modal
    const modalElements = document.querySelectorAll("#gallery-modal [data-id='" + idElement + "']");
    modalElements.forEach((element) => {
        element.remove();
    });
}

// Mise en place de la filterbar
import { remplirCategories } from "./modal/modal.js";
const filterBar = document.querySelector(".filterbar");


export function filtrerParCategorie(categoryId) {
    const worksFiltres = works.filter(function (work) {
        return work.categoryId === categoryId;
    });
    console.log(worksFiltres);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksFiltres);

}



// Supprimer ou afficher la filterbar si user est co ou non
const userIsCo = sessionStorage.getItem("token") !== null;
const filterbar = document.querySelector(".filterbar");
if (!userIsCo) {
    filterbar.style.display = "block";
    filterBar.style.bottom = "25px";
} else if (userIsCo) {
    filterbar.style.display = "none";
}
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
    window.location.href = "../index.html";
});

// Mise en place de la topBar située en haut de la page si l'user est connecté
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
