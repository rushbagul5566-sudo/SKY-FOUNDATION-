// ======================================
// SKY FOUNDATION - PREMIUM SCRIPT
// ======================================
window.onload = function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
};
// Loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});

// Mobile Menu
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

// Close menu after clicking link
document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});

// Sticky Header
window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (window.scrollY > 80) {

        header.style.background = "rgba(255,255,255,.95)";
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";

    } else {

        header.style.background = "rgba(255,255,255,.75)";
        header.style.boxShadow = "none";

    }

});

// Back To Top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});
// ======================================
// Scroll Animation
// ======================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(
".about-card,.service-card,.gallery-item,.event-card,.counter,.donate-box"
).forEach((el) => {
    observer.observe(el);
});

// ======================================
// Counter Animation
// ======================================

const counters = document.querySelectorAll(".counter h2");

counters.forEach(counter => {

    const target = parseInt(counter.innerText);

    let count = 0;

    const update = () => {

        const increment = Math.ceil(target / 100);

        if (count < target) {

            count += increment;

            counter.innerText = count + "+";

            requestAnimationFrame(update);

        } else {

            counter.innerText = target + "+";

        }

    };

    update();

});

// ======================================
// Smooth Anchor Scroll
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// ======================================
// Footer Year
// ======================================

const year = new Date().getFullYear();

const copy = document.querySelector(".copyright");

if (copy
