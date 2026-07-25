
// ===============================
// SKY FOUNDATION - script.js
// ===============================

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Sticky Header
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
        header.style.background = "#ffffff";
    } else {
        header.style.boxShadow = "none";
        header.style.background = "rgba(255,255,255,.95)";
    }
});

// Back To Top Button
const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }
});

// Smooth Fade Animation
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll(
".card,.mission-box,.service-card,.project-card,.testimonial-card"
).forEach(el=>{
    el.classList.add("hidden");
    observer.observe(el);
});

// Counter Animation
const counters = document.querySelectorAll(".impact-grid h2");

counters.forEach(counter => {

    const target = counter.innerText;

    if (!/^\d+/.test(target)) return;

    const number = parseInt(target.replace(/\D/g, ""));
    let count = 0;

    const speed = number / 100;

    const update = () => {

        count += speed;

        if (count < number) {

            counter.innerText = Math.floor(count) + "+";

            requestAnimationFrame(update);

        } else {

            counter.innerText = number + "+";

        }

    };

    update();

});

// Current Year
const copy = document.querySelector(".copyright");

if(copy){

copy.innerHTML =
`© ${new Date().getFullYear()} Sky Foundation. All Rights Reserved.`;

}

console.log("Sky Foundation Website Loaded Successfully.");
