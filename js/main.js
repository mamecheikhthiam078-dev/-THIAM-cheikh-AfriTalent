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