
// ===============================
// Sky Foundation Premium Script
// ===============================

// Loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);

        }, 1200);
    }
});

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
    menuBtn.onclick = () => {
        navbar.classList.toggle("show");
    };
}

// Dark Mode
const darkBtn = document.getElementById("darkMode");

if (darkBtn) {
    darkBtn.onclick = () => {
        document.body.classList.toggle("dark");
    };
}

// Back To Top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        if (topBtn) topBtn.style.display = "flex";
    } else {
        if (topBtn) topBtn.style.display = "none";
    }

});

if (topBtn) {
    topBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

// Header Shadow
const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (header) {
        if (window.scrollY > 80) {
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
        } else {
            header.style.boxShadow = "none";
        }
    }

});

// Scroll Animation
const revealElements = document.querySelectorAll(
    ".about-card,.service-card,.team-card,.event-card,.mission-box"
);

function reveal() {

    revealElements.forEach((el) => {

        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }

    });

}

reveal();

window.addEventListener("scroll", reveal);
