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
  modal.removeEventListener("click", closeModal);
  const closeButton = modal.querySelector(".js-close-modal");
  if (closeButton !== null) {
    closeButton.removeEventListener("click", closeModal);
  }
  const stopButton = modal.querySelector(".js-stop-modal");
  if (stopButton !== null) {
    stopButton.removeEventListener("click", stopPropagation);
  }
  modal = null;
};

// Fonction pour empêcher la propagation du clic sur la modale
const stopPropagation = function (e) {
  e.stopPropagation();
};

// Suppression de la galerie
import { genererworks, getWorks, genererworksmodal } from "../index.js";
const deleteGallery = document.querySelector("#btn-modal2");
const tokenDeleteGallery = sessionStorage.getItem("token");

deleteGallery.addEventListener("click", async function (e) {
  e.preventDefault()
  // Afficher une boîte de dialogue de confirmation
  const confirmation = confirm(
    "Voulez-vous vraiment supprimer la gallery ?"
  );

  if (confirmation) {
    try {
      // Récupère tous les projets(works) présents sur l'API
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      const ids = data.map((item) => item.id);

      // Supprime tous les éléments de la galerie en utilisant les IDs récupérés
      await Promise.all(
        data.map((item) =>
          fetch(`http://localhost:5678/api/works/${item.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenDeleteGallery}`,
            },
          }).then((response) => {
            if (!response.ok) {
              throw new Error(
                "Erreur lors de la suppression des éléments de la galerie"
              );
            }
          })
        )
      );

      // Supprime les éléments de la galerie de la page HTML
      const sectionGalleryPage = document.querySelector(".gallery");
      const sectionGalleryPageModal = document.querySelector("#gallery-modal");
      sectionGalleryPage.innerHTML = "";
      sectionGalleryPageModal.innerHTML = "";
      console.log(
        "Tous les éléments de la galerie ont été supprimés avec succès"
      );

    } catch (error) {
      console.error(error);
    }
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

  // Attribution des numéro d'id pour chaque catégorie dans la select (j'aurais pu le faire en récupérant les données sur swagger mais j'ai préféré procéder de la sorte)




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
const divModalForm = document.querySelector('#divModalForm');
const photo = document.getElementById("bouton-ajout");

const submitBtn = document.getElementById("btn-valider-style");
const titleWorks = document.getElementById("input-titre-style")
let fichierImage;





// Mise en place de l'évènnement change au bouton Ajout
boutonAjoutInput.addEventListener("change", (e) => {
  e.preventDefault();
  fichierImage = e.target.files[0];




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

  };
});


///////////////////Envoi des fichiers a API///////////////////



import { getCategories } from "../index.js";
let select;
// Fonction pour remplir la liste déroulante des catégories avec les données de l'API
async function remplirCategorySelect() {
  const categories = await getCategories();
  select = document.getElementById('select-categorie-style');

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.text = category.name;
    select.appendChild(option);
    console.log(option);
  });

}
remplirCategorySelect();














// Fonction qui va valider le formulaire si tout les champs sont remplis 
function formulaireValide() {
  if (titleWorks.value !== "" && photo.files.length > 0) {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "#1D6154";
    submitBtn.style.cursor = "pointer";
  } else {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "";
    submitBtn.style.cursor = "not-allowed";

  } if (titleWorks.value === "" && titleWorks === document.activeElement) {
    alert("Attention , vous n'avez pas renseigné de titre.");
  }
}


// Fonction qui va reinitialiser le formulaire une fois qu'un projet est ajouté afin de permettre a l'user d'ajouter un nouveau projet si il le souhaite
function reinitialiserFormulaire() {
  document.getElementById("image-form").src = "";
  document.querySelector(".imgI-style").style.display = "block";
  document.getElementById("input-titre-style").value = "";
  document.getElementById("select-categorie-style").value = "";
  document.getElementById("bouton-ajout").value = "";
  document.querySelector('.style-bouton-ajout').style.display = "flex";
  document.querySelector("#image-form").removeAttribute("alt");
  document.querySelector("#image-form").style.display = "none";
  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "";
  submitBtn.style.cursor = "default";
  select.selectedIndex = 0;
}




// Ajout d'un évènnement 'change' pour tout les inputs afin de valider l'envois
photo.addEventListener("input", formulaireValide);
titleWorks.addEventListener("input", formulaireValide);


// Envoie de la requête à l'API si tout est correct
submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const token = sessionStorage.getItem("token");
  const titre = titleWorks.value;
  const categorySelect = document.getElementById('select-categorie-style');
  const categoryId = categorySelect.value;
  console.log(categoryId);

  if (photo.files.length > 0) {
    const image = photo.files[0];
    if (image.size < 4 * 1048576) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", titre);
      formData.append("category", categoryId);


      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: formData,
        });

        const data = await response.json();
        console.log(data);

        document.querySelector(".gallery").innerHTML = "";
        document.querySelector("#gallery-modal").innerHTML = "";
        genererworks(await getWorks());
        genererworksmodal(await getWorks());
      } catch (error) {
        console.trace(error)
        console.log(error + "un probleme est survenu");
      }
    } else {
      alert("L'image est supérieure à 4 mo")
      reinitialiserFormulaire()
    }
  } else {
    alert("Attention, vous n'avez pas sélectionné d'image.");
  }

  // Utilisation de la fonction "reinitialiserFormulaire" pour remettre à jour la modal
  reinitialiserFormulaire()
});
