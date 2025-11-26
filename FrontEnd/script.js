
// Récupération des travaux depuis l'API works //
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Récupération des catégorie depuis l'API cattegories //
const reponse2 = await fetch("http://localhost:5678/api/categories")
const categorie = await reponse2.json()



const imgGallery = document.querySelector(".gallery")
// Intégration dynamique des travaux //
function genererGalery(works) {
    for (let i = 0; i < works.length; i++) {

        const figureElement = document.createElement("figure")
        
        const imgProjet = document.createElement("img")
        imgProjet.src = works[i].imageUrl
        imgProjet.alt = works[i].title
        
        const figCaption = document.createElement("figcaption")
        figCaption.innerText = works[i].title
        
        imgGallery.appendChild(figureElement)
        figureElement.appendChild(imgProjet)
        figureElement.appendChild(figCaption) 
    }
}
// Intégration des boutons filtres/tri //
genererGalery(works)

const btnFilters = document.querySelector(".filter-btn")
//c Création du boutton -- TOUS -- //
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

function filtrageCategorie(idCategorie) {
    const result = works.filter(work => work.categoryId === idCategorie)
    imgGallery.innerHTML = ""
    genererGalery(result)
}

btnDefault.addEventListener("click", () => {
    imgGallery.innerHTML = ""
    genererGalery(works)
});

btnObjets.addEventListener("click", () => {
    filtrageCategorie(1)
})

btnAppartements.addEventListener("click", () => {
    filtrageCategorie(2)
})

btnHR.addEventListener("click", () => {
    filtrageCategorie(3)
})