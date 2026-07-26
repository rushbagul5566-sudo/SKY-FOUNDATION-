// ===============================
// SKY FOUNDATION PREMIUM JS
// ===============================

// Loader

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1200);
});

// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("showMenu");
});

// Sticky Header

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});

// Animated Counter

const counters = document.querySelectorAll(".hero-stats h2");

const speed = 150;

counters.forEach(counter => {

    const animate = () => {

        const target = +counter.innerText.replace(/\D/g, "");

        const count = +counter.innerText.replace(/\D/g, "");

        const increment = target / speed;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(animate, 20);

        } else {

            counter.innerText = target + "+";

        }

    };

    animate();

});

// Scroll To Top

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};
