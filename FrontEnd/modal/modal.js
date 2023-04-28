// Déclaration de la variable modale
let modal = null;

// Fonction pour ouvrir la modale
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .addEventListener("click", stopPropagation);
};

// Fonction pour fermer la modale
const closeModal = function (e) {
  // Vérification de l'affichage de la modale
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal = null;
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-close-modal")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .removeEventListener("click", stopPropagation);
};

// Fonction pour empêcher la propagation du clic sur la modale
const stopPropagation = function (e) {
  e.stopPropagation();
};

// Suppression de la galerie
import { article } from "../index.js";
console.log(`"test article modal.js" + ${article}`);
const deleteGallery = document.querySelector("#btn-modal2");
const tokenDeleteGallery = sessionStorage.getItem("token");

deleteGallery.addEventListener("click", async function (e) {
  e.preventDefault();
  // Afficher une boîte de dialogue de confirmation
  const confirmation = confirm(
    "Voulez-vous vraiment supprimer la gallery ?"
  );

  if (confirmation) {
    // Récupère tous les projets(works) présents sur l'API
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        const ids = data.map((item) => item.id);
        console.log(ids);
        // Supprime tous les éléments de la galerie en utilisant les IDs récupérés
        data
          .forEach((item) => {
            fetch(`http://localhost:5678/api/works/${item.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenDeleteGallery}`,
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    "Erreur lors de la suppression des éléments de la galerie"
                  );
                }
                // Supprime les éléments de la galerie de la page HTML
                const sectionGalleryPage = document.querySelector(".gallery");
                sectionGalleryPage.innerHTML = "";
                console.log(
                  "Tous les éléments de la galerie ont été supprimés avec succès"
                );
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
  }
});

// Ajout de l'écouteur d'événement click pour ouvrir la modale
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Récupération des éléments HTML nécessaires
const modal1 = document.getElementById("modal1");
const title = modal1.querySelector("#title-modal");
const gallery = modal1.querySelector("#gallery-modal");
const modif = modal1.querySelector(".modif");
const btnModal1 = modal1.querySelector("#btn-modal1");
const btnModal2 = modal1.querySelector("#btn-modal2");

// Création des variables "selection" et "categorieId" pour le forumlaire d'envois de fichiers
let selection;
let categorieId;

// Mise en place de la foncionnalité "Ajouter une photo" , pour que l'utilisateur puisse ajouter une photo depuis son pc
btnModal1.addEventListener("click", function () {
  title.textContent = "Ajout photo";
  title.classList.add("title-modal-loadpicture");
  gallery.style.display = "none";
  btnModal1.style.display = "none";
  btnModal2.style.display = "none";
  const divForm = document.getElementById("divModalForm");
  divForm.style.display = "block";

  // Attribution des numéro d'id pour chaque catégorie dans la select
  const categories = {
    appart: 2,
    objets: 1,
    hotelresto: 3,
  };

  // Paramètrage de la selection des catégories
  selection = document.getElementById("select-categorie-style");
  selection.addEventListener("change", function () {
    const selectionIndex = selection.selectedIndex;
    const selectionOption = selection.options[selectionIndex];
    const selectionCategorie = selectionOption.value;
    categorieId = categories[selectionCategorie];
    console.log(categorieId);
  });

  // Paramètrage de la flèche retour avec la balise <i> de fontawesome
  const flecheRetour = document.createElement("i");
  flecheRetour.classList.add("fa-sharp", "fa-solid", "fa-arrow-left");
  flecheRetour.classList.add("fleche-modal-style");
  flecheRetour.style.cursor = "pointer";
  title.appendChild(flecheRetour);
  flecheRetour.addEventListener("click", function () {
    gallery.style.display = "";
    btnModal1.style.display = "";
    btnModal2.style.display = "";
    divForm.style.display = "none";
    title.textContent = "Gallerie photo";
  });
});

/////////////////////////Création de la logique qui permet de charger une photo dans la modal//////////////////////////

//Récupération des élements
const boutonAjoutInput = document.getElementById("bouton-ajout");
const boutonAjoutStyle = document.querySelector(".style-bouton-ajout");
const imgI = document.querySelector(".imgI-style");
const imgPreview = document.getElementById("image-form");
const spanSousTitre = document.getElementById("sous-titre-btnmodal");
const errorMessageModal = document.querySelector('.msg-error-modal');
const photo = document.getElementById("bouton-ajout");
const category = document.getElementById("select-categorie-style");
const submitBtn = document.getElementById("btn-valider-style");
const titleWorks = document.getElementById("input-titre-style")
let fichierImage;


// Mise en place de l'évènnement change au bouton Ajout
boutonAjoutInput.addEventListener("change", (e) => {
  e.preventDefault();
  fichierImage = e.target.files[0];



  console.log(fichierImage);
  const lecteurFichier = new FileReader();
  lecteurFichier.readAsDataURL(fichierImage);
  lecteurFichier.onload = () => {
    imgPreview.src = lecteurFichier.result;
    imgPreview.style.display = "block";
    imgPreview.style.height = "193px";
    imgPreview.style.width = "129px";
    imgPreview.style.position = "relative";
    imgPreview.style.left = "250px";
    imgPreview.style.bottom = "50px";
    boutonAjoutStyle.style.display = "none";
    imgI.style.display = "none";
    spanSousTitre.style.color = "white";
    spanSousTitre.style.bottom = "25px";
    console.log(lecteurFichier);
  };
});


///////////////////Envoi des fichiers a API///////////////////


// Fonction qui va valider le formulaire si tout les champs sont remplis 
function formulaireValide() {
  if (category.value !== "none" && titleWorks.value !== "" && photo.files.length > 0) {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "#1D6154";
  } else {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "";
  }


}

// Ajout d'un évènnement 'change' pour tout les inputs afin de valider l'envois
photo.addEventListener("change", formulaireValide);
category.addEventListener("change", formulaireValide);
titleWorks.addEventListener("change", formulaireValide);

console.log(errorMessageModal);
// Envoie de la requete à l'API si tout es correct
document.getElementById("divModalForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const image = photo.files[0];
  const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDk4ODIwNiwiZXhwIjoxNjgxMDc0NjA2fQ.5XmGJzbP8LZ384kb_fR6gwGT-mmQqy671kz8EvQXBsU";
  const token = sessionStorage.getItem("token");
  console.log(`Bearer  ${token}`);
  const titre = titleWorks.value;

  if (image.size < 4 * 1048576) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", titre);
    formData.append("category", categorieId);
    console.log("ceci est un test", formData);

    try {
      const requete = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        body: formData,
      });
      if (requete.status === 201) {
        console.log('test rechargement!!!');
        document.querySelector(".gallery").innerHTML = "";

      } else {
        throw "Un problème est survenu.";
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    errorMessageModal.innerHTML = "La taille de la photo est supérieure à 4 Mo.";
    photo.value = null;
    document.getElementById("model_ajout_container").style.display = null;
    document.getElementById("image_telecharger_images").style.display = "none";
  }
});