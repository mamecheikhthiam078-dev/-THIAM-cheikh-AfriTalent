// On récupère le bouton qui permet de changer le thème
const bouton = document.getElementById("theme-toggle");

// On vérifie si le thème enregistré dans le navigateur est "light"
if (localStorage.getItem("theme") === "light") {

    // Si oui, on ajoute la classe light-mode au body
    document.body.classList.add("light-mode");
}

// On écoute le clic sur le bouton
bouton.addEventListener("click", () => {

    // On ajoute ou retire la classe light-mode
    document.body.classList.toggle("light-mode");

    // On vérifie si le mode clair est actuellement activé
    if (document.body.classList.contains("light-mode")) {

        // On sauvegarde "light" dans le localStorage
        localStorage.setItem("theme", "light");

    } else {

        // Sinon on sauvegarde "dark"
        localStorage.setItem("theme", "dark");
    }
});

// On écoute le défilement de la page
window.addEventListener("scroll", () => {

    // On récupère la barre de navigation
    const navbar = document.querySelector(".navbar");

    // Si l'utilisateur a défilé de plus de 50 pixels
    if (window.scrollY > 50) {

        // On ajoute une classe pour modifier l'apparence de la navbar
        navbar.classList.add("navbar-scroll");

    } else {

        // Sinon on retire cette classe
        navbar.classList.remove("navbar-scroll");
    }
});

// On récupère le bouton "Retour en haut"
const backToTop = document.getElementById("backToTop");

// On écoute encore le défilement de la page
window.addEventListener("scroll", () => {

    // Si l'utilisateur descend de plus de 300 pixels
    if (window.scrollY > 300) {

        // On affiche le bouton
        backToTop.style.display = "block";

    } else {

        // Sinon on le cache
        backToTop.style.display = "none";
    }
});

// On écoute le clic sur le bouton Retour en haut
backToTop.addEventListener("click", () => {

    // On remonte en haut de la page avec une animation fluide
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// ===== FADE IN =====

const fadeSections = document.querySelectorAll(".fade-section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });
});

fadeSections.forEach(section => {
    sectionObserver.observe(section);
});


// ===== COUNTERS =====

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = parseInt(counter.dataset.target);

            let count = 0;

            const updateCounter = () => {

                const increment = target / 100;

                if(count < target){

                    count += increment;
                    counter.textContent = "+" + Math.ceil(count);

                    setTimeout(updateCounter, 20);

                } else {

                    counter.textContent = "+" + target;
                }
            };

            updateCounter();

            counterObserver.unobserve(counter);
        }

    });

});

counters.forEach(counter => {
    counterObserver.observe(counter);
});
// ===== FILTRAGE FREELANCES =====

const filterButtons = document.querySelectorAll(".filter-btn");
const freelancerCards = document.querySelectorAll(".freelancer-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        freelancerCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});
// ===== VALIDATION FORMULAIRE =====

const form = document.getElementById("contactForm");

if(form){

    form.addEventListener("submit", function(e){

        e.preventDefault();

        let isValid = true;

        const prenom = document.getElementById("prenom");
        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        document.getElementById("prenomError").textContent = "";
        document.getElementById("nomError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("sujetError").textContent = "";
        document.getElementById("messageError").textContent = "";
        document.getElementById("successMessage").textContent = "";

        if(prenom.value.trim() === ""){
            document.getElementById("prenomError").textContent =
            "Le prénom est obligatoire";
            isValid = false;
        }

        if(nom.value.trim() === ""){
            document.getElementById("nomError").textContent =
            "Le nom est obligatoire";
            isValid = false;
        }

        const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email.value)){
            document.getElementById("emailError").textContent =
            "Email invalide";
            isValid = false;
        }

        if(sujet.value === ""){
            document.getElementById("sujetError").textContent =
            "Veuillez choisir un sujet";
            isValid = false;
        }

        if(message.value.trim().length < 20){
            document.getElementById("messageError").textContent =
            "Le message doit contenir au moins 20 caractères";
            isValid = false;
        }

        if(isValid){

            document.getElementById("successMessage").textContent =
            "Message envoyé avec succès !";

            form.reset();
        }

    });

}