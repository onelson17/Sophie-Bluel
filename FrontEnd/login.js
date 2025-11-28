const links = document.querySelectorAll("nav a")
const currentURL = window.location.pathname
console.log(currentURL)
links.forEach(link => {
    // Si le href du lien correspond au chemin actuel -> active
    if (link.getAttribute("href") === currentURL) {
        link.classList.add("active");
    }
    console.log("links")
});
