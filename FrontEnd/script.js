const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const projet = works[0]
const imgGallery = document.querySelector(".gallery")

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

