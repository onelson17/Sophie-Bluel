const form = document.querySelector("form")
const msgError = document.querySelector(".error-msg")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = document.getElementById("connexion-E").value.trim()
    const password = document.getElementById("mdp").value.trim()

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem("token", data.token)
            window.location.href = "index.html"
        } else {
            msgError.textContent = "E-mail ou mot de passe incorrect."
            msgError.style.display = "block"
        }

    } catch (error) {
        msgError.textContent = "Erreur de connexion au serveur."
        msgError.style.display = "block"
        console.error(error)
    }
})
 


