
// Récupération des travaux depuis l'API works //
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Récupération des catégorie depuis l'API categories //
const reponseCategorie = await fetch("http://localhost:5678/api/categories")
const categorie = await reponseCategorie.json()


const imgGallery = document.querySelector(".gallery")
// Intégration dynamique des travaux //
function genererGalery(works) {
    imgGallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const figureElement = document.createElement("figure");
        figureElement.dataset.id = works[i].id;
        
        const imgProjet = document.createElement("img");
        imgProjet.src = works[i].imageUrl;
        imgProjet.alt = works[i].title;
        
        const figCaption = document.createElement("figcaption");
        figCaption.innerText = works[i].title;
        
        imgGallery.appendChild(figureElement);
        figureElement.appendChild(imgProjet);
        figureElement.appendChild(figCaption);
    }
}
// Intégration des boutons filtres/tri //
genererGalery(works)

const btnFilters = document.querySelector(".filter-btn")
// Création du boutton -- TOUS -- //
const btnDefault = document.createElement("button")

btnDefault.textContent = "Tous"
btnDefault.classList.add("default-filter")
btnFilters.appendChild(btnDefault)

// Création du boutton -- OBJETS -- //
const btnObjets = document.createElement("button")

btnObjets.textContent = "Objets"
btnObjets.classList.add("objet-filter")
btnFilters.appendChild(btnObjets)

// Création du boutton -- APPARTEMENTS -- //
const btnAppartements = document.createElement("button")

btnAppartements.textContent = "Appartements"
btnAppartements.classList.add("appartement-filter")
btnFilters.appendChild(btnAppartements)

// Création du boutton -- H & R
const btnHR = document.createElement("button")

btnHR.textContent = "Hotels & Restaurants"
btnHR.classList.add("hr-filter")
btnFilters.appendChild(btnHR)

// animation selection bouttons //

const boutton = document.querySelectorAll("button")

boutton.forEach(btn => {
    btn.addEventListener("click", () => {
        boutton.forEach(b => b.classList.remove("btn-selected"))
        btn.classList.add("btn-selected")
    })
})

const objetFilter = document.querySelector(".objet-filter");

/**
 * Filtre les œuvres selon une catégorie et met à jour la galerie affichée.
 *
 * @param {number} idCategorie - L'identifiant de la catégorie à filtrer.
 * @returns {void}
 */
function filtrageCategorie(idCategorie) {
    const result = works.filter(work => work.categoryId === idCategorie)
    genererGalery(result)
}


btnDefault.addEventListener("click", () => {
    imgGallery.innerHTML = ""
    genererGalery(works)
})

btnObjets.addEventListener("click", () => {
    filtrageCategorie(1)
})

btnAppartements.addEventListener("click", () => {
    filtrageCategorie(2)
})

btnHR.addEventListener("click", () => {
    filtrageCategorie(3)
})

// MODE EDITON ====== LOGIN - LOGOUT //
const token = localStorage.getItem("token")

if (token) {
    document.querySelector(".edit-mode").style.display = "flex"
    document.querySelector(".projet-edit div").style.display = "flex"
    // cacher le bouton login = logout
    const loginLink = document.querySelector('a[href="login.html"]')
// cache les filtres en mode edition //
    if (btnFilters) btnFilters.style.display = "none"
// affiche logout si user connecté et retire le token au click //
    if (loginLink) {
        loginLink.textContent = "logout"
        loginLink.addEventListener("click", () => {
            localStorage.removeItem("token")
        })
    }
    // afficher les boutons "modifier"
    const editButtons = document.querySelectorAll(".projet-edit div");
    editButtons.forEach(btn => btn.style.display = "flex");
} else {
      // non connecté = mode édition désactivé
    document.querySelector(".edit-mode").style.display = "none";
    // caches les bouton quand user deconnecté et affiche les filtres //
    const editButtons = document.querySelector(".projet-edit");
    editButtons.style.display = "none"
    if (btnFilters) btnFilters.style.display = "flex";
}
// MODALE //
const boutonModifier = document.querySelector(".btn-modifier");
const modale = document.getElementById("editModal");
const boutonFermer = modale.querySelector(".close");

// function Rendre la modale visible et accessible //
function ouvrirModale(e) {
    if (e) {
        e.preventDefault(); 
    }
    modale.style.display = "flex";
    modale.setAttribute("aria-hidden", "false");
    modale.setAttribute("aria-modal", "true");
}
// Function fermer Modale //
function fermerModale() {
    
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.setAttribute("aria-modal", "false");
}
//ouvrir au click sur modifier//
if (boutonModifier) {
    boutonModifier.addEventListener("click", ouvrirModale);
}
// fermer au click sur la croix //
if (boutonFermer) {
    boutonFermer.addEventListener("click", fermerModale);
}
//fermer au click en dehors de la fenetre
window.addEventListener("click", (e) => {
    if (e.target === modale) {
        fermerModale();
    }
})
// au click du boutton ajouter photo, basculer sur le formulaire //
const btnAjouterPhoto = document.querySelector(".modal-add");
const boutonRetour = document.querySelector(".back");
const afficherGalerie = document.querySelector(".modal-gallery");
const afficherFormulaire = document.querySelector(".modal-form");

if (btnAjouterPhoto) {
    btnAjouterPhoto.addEventListener("click", () => {
        afficherGalerie.style.display = "none"
        afficherFormulaire.style.display = "block"
    })
}
// Retour -  sur la modale gallery //
if (boutonRetour) {
    boutonRetour.addEventListener("click", () => {
        afficherGalerie.style.display = "flex"
        afficherFormulaire.style.display = "none"
    })
}

// ajout de la galerie dans la modale //

const modalGalery = document.querySelector(".photos-mini")
// generer la galerie à vide, eviter les doublons si plusieurs appels à la fonction //
function genererGaleryModale(works) {
    modalGalery.innerHTML = ""
// ajout dynamique des travaux dans la modale //
    works.forEach(work => {
        const figure = document.createElement("figure")
        figure.classList.add("work-item")
        figure.dataset.id = work.id

        const img = document.createElement("img")
        img.src = work.imageUrl
        img.alt = work.title

        const button = document.createElement("button")
        button.classList.add("delete-item")

        const icon = document.createElement("i")
        icon.classList.add("fa-regular", "fa-trash-can")

        button.appendChild(icon)
        figure.appendChild(img)
        figure.appendChild(button)
        modalGalery.appendChild(figure)
// permet de supprimer uniquement si l'utilisateur est connecté = token présent //
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            //  supprime le projet dans la galerie et dans la modale  //
            if (response.ok) {
                const index = works.findIndex(w => w.id === work.id);
                if (index !== -1) {
                    works.splice(index, 1);
                }
                document.querySelectorAll(`[data-id="${work.id}"]`).forEach(el => el.remove());
            }
        });
    })
}

genererGaleryModale(works)
// modale form - categorie //
const categorieSelect = document.getElementById("categorie");
// récupération dynamique des catégories //
async function recupCategorie() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json();

        categorieSelect.innerHTML = '<option value=""></option>';

        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            categorieSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
    }
}

recupCategorie();
// preview de l'image selectionner //
const imageInput = document.getElementById("image-upload");
const imagePreview = document.querySelector(".image-preview");
const previewContain = document.querySelector(".preview-contain")
const uploadElement = document.querySelector(".upload-elements")

imageInput.addEventListener("change", () => {
    const image = imageInput.files[0]

    if(image) {

        if (image.size > 4 * 1024 * 1024) {
            alert("Le fichier est trop volumineux (4Mo max).")
             imageInput.value = ""
             return
        }

        const reader = new FileReader()

        reader.onload = (e) => {
            imagePreview.src = e.target.result
            document.querySelector(".hide-element").style.display = "none"
            imagePreview.style.display = "block"
            uploadElement.style.display = "none"
        }
        reader.readAsDataURL(image)
    }
})

//
const form = document.querySelector(".modal-form form");
const btnValider = document.querySelector(".modal-form .modal-add");
// passage au vert du bouton lorsque toutes les champs sont remplis//
form.addEventListener("input", () => {
    const title = document.getElementById("titre-modale").value;
    const category = document.getElementById("categorie").value;
    const image = imageInput.files[0];


    if (title && category && image) {
        btnValider.style.backgroundColor = "#1D6154"
        btnValider.disabled = false;
    } else {
        btnValider.style.backgroundColor = "#A7A7A7"
        btnValider.disabled = true;
    }
})

// création de l'objet, requete post a l'API //
form.addEventListener("submit", async (e) => {
    e.preventDefault() 

    const formData = new FormData()
    formData.append("title", document.getElementById("titre-modale").value)
    formData.append("category", document.getElementById("categorie").value)
    formData.append("image", imageInput.files[0])
    const token = localStorage.getItem("token")

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: formData
        })
        
    if(response.ok) {
        const newWork = await response.json()
        majGalery(newWork)

    } else {
        document.querySelector(".error-fmodal").textContent = "Erreur lors de l'envoi"
    }

} catch(error) {
console.log("Erreur réseau", error)
}
})
// ajout de l'objet au tableau des works, ajout dans les galeries //
function majGalery(newProject) {
    works.push(newProject)

    genererGalery(works)
    genererGaleryModale(works)
    resetForm()
    fermerModale()
}
// reset du form après ajout de la photo //
function resetForm() {
    form.reset()
    uploadElement.style.display = "flex"
    imagePreview.style.display = "none"
    btnValider.style.backgroundColor = "#A7A7A7"
}


