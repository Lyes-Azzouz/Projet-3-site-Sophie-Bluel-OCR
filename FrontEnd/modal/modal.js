// Déclaration de la variable modale
let modal = null;

// Fonction pour ouvrir la modale
const openModal = function (e) {
    e.preventDefault();
    // Récupération de la modale ciblée
    const target = document.querySelector(e.target.getAttribute("href"));
    // Affichage de la modale
    target.style.display = null;
    // Suppression de l'attribut aria-hidden
    target.removeAttribute("aria-hidden");
    // Ajout de l'attribut aria-modal
    target.setAttribute("aria-modal", "true");
    // Affectation de la variable modale
    modal = target;
    // Ajout de l'écouteur d'événement click pour fermer la modale
    modal.addEventListener("click", closeModal);
    // Ajout de l'écouteur d'événement click pour fermer la modale
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
    // Ajout de l'écouteur d'événement click pour empêcher la propagation du clic sur la modale
    modal
        .querySelector(".js-stop-modal")
        .addEventListener("click", stopPropagation);
};

// Fonction pour fermer la modale
const closeModal = function (e) {
    // Vérification de l'affichage de la modale
    if (modal === null) return;
    e.preventDefault();
    // Masquage de la modale
    modal.style.display = "none";
    // Ajout de l'attribut aria-hidden
    modal.setAttribute("aria-hidden", "true");
    // Suppression de l'attribut aria-modal
    modal.removeAttribute("aria-modal");
    // Remise a zéro de la variable modale
    modal = null;
    // Suppression de l'écouteur d'événement click pour fermer la modale
    modal.removeEventListener("click", closeModal);
    // Suppression de l'écouteur d'événement click pour fermer la modale
    modal
        .querySelector(".js-close-modal")
        .removeEventListener("click", closeModal);
    // Suppression de l'écouteur d'événement click pour empêcher la propagation du clic sur la modale
    modal
        .querySelector(".js-stop-modal")
        .removeEventListener("click", stopPropagation);
};

// Fonction pour empêcher la propagation du clic sur la modale
const stopPropagation = function (e) {
    e.stopPropagation();
};



// Suppression de la galerie
import {article} from '../index.js';
console.log(`"test article modal.js" + ${article}`);
const deleteGallery = document.querySelector("#btn-modal2");
const tokenDeleteGallery = sessionStorage.getItem('token');

deleteGallery.addEventListener("click", function (e) {
    e.preventDefault();
  // récupère tous les ID des éléments de la galerie
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      const ids = data.map(item => item.id);
      console.log(ids);
      // supprime tous les éléments de la galerie en utilisant les IDs récupérés
      data.forEach(item => {
        fetch(`http://localhost:5678/api/works/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDeleteGallery}`
          }
        })
     
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression des éléments de la galerie');
          }
          // supprime les éléments de la galerie de la page HTML
          const sectionGalleryPage = document.querySelector('.gallery');
          sectionGalleryPage.innerHTML = '';
          console.log('Tous les éléments de la galerie ont été supprimés avec succès');
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
})})

// Ajout de l'écouteur d'événement click pour ouvrir la modale
document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
});

// Récupération des éléments HTML nécessaires
const modal1 = document.getElementById("modal1");
const title = modal1.querySelector("#title-modal");
const gallery = modal1.querySelector("#gallery-modal");
const modif = modal1.querySelector(".modif");

// Récupération du bouton "Ajouter une photo"
const btnModal1 = modal1.querySelector("#btn-modal1");

// Récupération du bouton "Supprimer la galerie"
const btnModal2 = modal1.querySelector("#btn-modal2");

// Création de la variable séléction pour sélectionner une catégorie
let selection;
let categorieId
// Ajout de l'écouteur d'événement click sur le bouton "Ajouter une photo" , pour que l'utilisateur puisse ajouter une photo depuis son pc
btnModal1.addEventListener("click", function () {
    // Modification du titre de la modal
    title.textContent = "Ajout photo";
    title.classList.add("title-modal-loadpicture");

    // Masquage de la galerie
    gallery.style.display = "none";

    // Masquage des boutons "Ajouter une photo" et "Supprimer la galerie"
    btnModal1.style.display = "none";
    btnModal2.style.display = "none";
    // Récupération de la div qui contient le forumlaire d'envoi 
    const divForm = document.getElementById("divModalForm")
    // Changement de style pour faire apparaitre la div dans la modal
    divForm.style.display = "block";

    // Attribution des numéro d'id pour chaque catégorie dans la select
    const categories = {
        appart: 2,
        objets: 1,
        hotelresto: 3
    };

    // Récupération de l'élément en question afin de lui attribué la fonction 
    // qui permettra de changer l'option en chiffre 
    selection = document.getElementById('select-categorie-style');

    selection.addEventListener('change', function () {
        const selectionIndex = selection.selectedIndex;
        const selectionOption = selection.options[selectionIndex];
        const selectionCategorie = selectionOption.value;
         categorieId = categories[selectionCategorie]
        console.log(categorieId);
    });

    // Ajout de la flèche retour avec la balise <i> de fontawesome
    const flecheRetour = document.createElement("i");
    flecheRetour.classList.add("fa-sharp", "fa-solid", "fa-arrow-left");
    flecheRetour.classList.add("fleche-modal-style");
    flecheRetour.style.cursor = "pointer";

    // Ajout des éléments HTML créés à la modal
    title.appendChild(flecheRetour);
    // Ajout de l'écouteur d'événement click sur la flèche retour
    flecheRetour.addEventListener("click", function () {
        // Affichage de la galerie
        gallery.style.display = "";
        // Affichage des boutons "Ajouter une photo" et "Supprimer la galerie"
        btnModal1.style.display = "";
        btnModal2.style.display = "";
        divForm.style.display = "none";
        title.textContent = "Gallerie photo";

    });
});


//Création de la fonctionnalité qui permet de charger une photo dans la modal

//Récupération des élements
const boutonAjoutInput = document.getElementById('bouton-ajout');
const boutonAjoutStyle = document.querySelector('.style-bouton-ajout');
const imgI = document.querySelector('.imgI-style');
const imgPreview = document.getElementById('image-form');
const spanSousTitre = document.getElementById('sous-titre-btnmodal');
const titreTravaux = document.getElementById('input-titre-style');
const boutonValider = document.getElementById('btn-valider-style');
const formulaire = document.getElementById('divModalForm')


// Mise en place de l'évènnement change au bouton Ajout
boutonAjoutInput.addEventListener('change', (e) => {
    e.preventDefault();
    const fichierImage = e.target.files[0];
    if (!fichierImage) {
        return;
    }

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
        boutonAjoutStyle.style.display = 'none';
        imgI.style.display = "none";
        spanSousTitre.style.color = "white";
        spanSousTitre.style.bottom = "25px";
    };

});

 // Fonction pour télécharger les photos
//  function telecharger() {
//     const input = document.getElementById("img_input");
//     var telecharger_image = "";
//     const reader = new FileReader();

//     // Ajoute un écouteur d'événements pour charger l'image
//     reader.addEventListener("load", () => {
//       telecharger_image = reader.result;
//       //const photo = document.getElementById("image_telecharger");
//       //document.getElementById("image_telecharger_images").style.display = null;

//     //   photo.style.backgroundImage = `url(${telecharger_image} )`;
//     //   document.getElementById("model_ajout_container").style.display = "none";
//     });

//     reader.readAsDataURL(this.files[0]);
//   }

//   // Ajoute un écouteur d'événements pour télécharger les photos
//   document.getElementById("bouton-ajout").addEventListener("change", telecharger);


  ///////////////////Envoi des fichiers a API///////////////////

  document.getElementById("divModalForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupération des éléments du formulaire
    const photo = document.getElementById("bouton-ajout");
    const category = document.getElementById("select-categorie-style");
    const title = document.getElementById("input-titre-style");

      // Récupération de l'image et du token de l'utilisateur
      const image = document.getElementById("bouton-ajout").files[0];
      const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDk4ODIwNiwiZXhwIjoxNjgxMDc0NjA2fQ.5XmGJzbP8LZ384kb_fR6gwGT-mmQqy671kz8EvQXBsU'
      const token = sessionStorage.getItem("token");
      console.log(`Bearer  ${token}`);
      const titre = document.getElementById("input-titre-style").value;
// const element = {
//     "imageUrl":"Cristiano_JR_coloring_page_of_cute_unicorn_for_kids_a3e8e223-4fa2-4a23-83ba-47a32ff9cbba.png",
//     "title" :"Test",
//     "categoryId":2


// }
      // Vérification de la taille de l'image
      if (image.size < 4 * 1048576) {
        // Création du formulaire pour l'envoi des données
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", titre);
        formData.append("category", categorieId);
// console.log("voici la value image",formData.getAll("imageUrl"))
// console.log("voici la value title ",formData.getAll("title"))
// console.log("voici la value voici la value",formData.getAll("categoryId"))
// console.log("voici la value",formData )
// console.log("voici la value",element )
        // Envoi des données à l'API via une requête POST
        console.log("ceci est un test" ,formData);
       
        const setNewProject = async (data) => {
          try {
            const requete = await fetch(
              "http://localhost:5678/api/works",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  accept: "application/json",
                },
                body: data,
              }
            );
            if (requete.status === 201) {
            //   document.querySelector(".gallery").innerHTML = "";
            //   document.getElementById("model_gallery").innerHTML = "";
            //   tout();
            //   afficheModel();
            console.log("tout va bien !")
            } else {
                
              throw "Un problème est survenu.";
            }
          } catch (e) {
            console.log(e);
          }
        };
        setNewProject(formData);
    } else {
      // Affichage d'un message d'erreur si la taille de l'image est trop grande
      document.getElementById("msg_err").innerHTML =
        "La taille de la photo est supérieure à 4 Mo.";
      // Réinitialisation du champ d'upload de fichier
      photo.value = null;
      document.getElementById(
        "model_ajout_container"
      ).style.display = null;
      document.getElementById(
        "image_telecharger_images"
      ).style.display = "none";
    }
  })




// Mise en place de l'évènnement submit au bouton Valider
// const test = document.getElementById('btn-valider-style');
// test.addEventListener('click', async (e)  => {
//     e.preventDefault();
//     // const fichier = boutonAjoutInput.files[0];
//     // if (!fichier) {
//     //     return;
//     // }
//     // Création de l'objet FormData
//     const fichier = document.getElementById('image-form')
//     console.log("voici les données",)
//     const formData = new FormData();
//     formData.append("imageUrl", fichier);
//     formData.append("title", titreTravaux.value);
//     formData.append("categoryId", selection.value);
// const element = {
//     imageUrl:'http://localhost:5678/images/CoderlyLogo1680869560812.png',
//     title :'Test',
//     categoryId:2,
//     userId:1

// }
// //console.log(element)
//     const token = sessionStorage.getItem('token');
//     // Envoie une requête a l'url via la méthod 'POST'
//     console.log("Voici les donner de formdata",formData.getAll('imageUrl'))
   
//     console.log("voici le token", token)
//     fetch('http://localhost:5678/api/works/', {
//         method: 'POST',
//         headers: {
         
//             'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDk4Njk0NiwiZXhwIjoxNjgxMDczMzQ2fQ.HqMbvvISN1vONA0Sf1rLxMXig0XbqMEtm9ZWXviUnFY`,
//         },
//          body: formData
//     })
//     .then(response =>response.json())
//     .then(data => console.log(data))


// })










