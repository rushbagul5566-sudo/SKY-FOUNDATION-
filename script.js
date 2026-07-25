// ===========================
// SKY FOUNDATION SCRIPT
// ===========================

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// Sticky Header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// Scroll Animation
const elements = document.querySelectorAll(
".feature-box,.mission-card,.service-card,.project-card,.why-box"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold:0.15

});

elements.forEach((el)=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// Counter Animation

const counters=document.querySelectorAll(".counter h2");

counters.forEach(counter=>{

const target=parseInt(counter.innerText);

if(isNaN(target)) return;

let count=0;

const speed=target/120;

function update(){

count+=speed;

if(count<target){

counter.innerText=Math.floor(count)+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

}

update();

});

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

console.log("✅ Sky Foundation Premium Website Loaded");
