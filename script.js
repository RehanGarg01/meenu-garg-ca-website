/* ===================================
   MOBILE NAVIGATION
=================================== */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});

/* ===================================
   STICKY HEADER EFFECT
=================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.padding = "10px 6%";
        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.08)";

    }

    else{

        header.style.padding = "15px 6%";
        header.style.boxShadow =
        "0 2px 20px rgba(0,0,0,.05)";

    }

});

/* ===================================
   COUNTER ANIMATION
=================================== */

const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    const statsSection =
    document.querySelector(".stats-section");

    const top =
    statsSection.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

        counterStarted = true;

        counters.forEach(counter => {

            const target =
            +counter.dataset.target;

            let current = 0;

            const increment =
            target / 120;

            const updateCounter = () => {

                if(current < target){

                    current += increment;

                    counter.innerText =
                    Math.ceil(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                }

                else{

                    counter.innerText =
                    target + "+";

                }

            };

            updateCounter();

        });

    }

}

/* ===================================
   TESTIMONIAL SLIDER
=================================== */

const testimonials =
document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

function showTestimonial(index){

    testimonials.forEach(item => {

        item.classList.remove("active");

    });

    testimonials[index]
    .classList.add("active");

}

function nextTestimonial(){

    testimonialIndex++;

    if(
        testimonialIndex >=
        testimonials.length
    ){
        testimonialIndex = 0;
    }

    showTestimonial(
        testimonialIndex
    );

}

setInterval(
    nextTestimonial,
    5000
);

/* ===================================
   SCROLL REVEAL ANIMATION
=================================== */

const revealElements =
document.querySelectorAll(
`
.section-title,
.stat-card,
.service-card,
.why-card,
.litigation-card,
.about-left,
.about-right,
.contact-left,
.contact-right
`
);

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform =
    "translateY(40px)";
    el.style.transition =
    "all .8s ease";

});

function revealOnScroll(){

    revealElements.forEach(el => {

        const top =
        el.getBoundingClientRect().top;

        if(
            top <
            window.innerHeight - 120
        ){

            el.style.opacity = "1";

            el.style.transform =
            "translateY(0px)";

        }

    });

}

/* ===================================
   ACTIVE NAV LINK
=================================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".navbar a");

function activeLink(){

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        const sectionHeight =
        section.clientHeight;

        if(
            pageYOffset >= sectionTop &&
            pageYOffset <
            sectionTop + sectionHeight
        ){

            current =
            section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
            "current"
        );

        if(
            link.getAttribute("href")
            === "#" + current
        ){

            link.classList.add(
                "current"
            );

        }

    });

}

/* ===================================
   CONTACT FORM
=================================== */

const contactForm =
document.querySelector(
".contact-form"
);

if(contactForm){

    contactForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const honeypot =
        document.getElementById(
        "website"
        );

        if(
            honeypot &&
            honeypot.value.trim() !== ""
        ){

            console.log(
            "Bot detected"
            );

            return;
        }

        alert(
        "Thank you for contacting M/s Meenu Garg & Co. We will get back to you shortly."
        );

        contactForm.reset();

    });

}

/* ===================================
   BACK TO TOP BUTTON
=================================== */

const backToTop =
document.createElement("div");

backToTop.innerHTML =
'<i class="fas fa-arrow-up"></i>';

backToTop.className =
"back-to-top";

document.body.appendChild(
backToTop
);

backToTop.style.cssText = `
position:fixed;
left:25px;
bottom:25px;
width:55px;
height:55px;
background:#6F3B12;
color:white;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
cursor:pointer;
opacity:0;
pointer-events:none;
transition:.3s;
z-index:999;
`;

window.addEventListener(
"scroll",
() => {

    if(window.scrollY > 400){

        backToTop.style.opacity = "1";
        backToTop.style.pointerEvents =
        "auto";

    }

    else{

        backToTop.style.opacity = "0";
        backToTop.style.pointerEvents =
        "none";

    }

}
);

backToTop.addEventListener(
"click",
() => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
);

/* ===================================
   INITIAL LOAD
=================================== */

window.addEventListener(
"load",
() => {

    revealOnScroll();

    startCounters();

    activeLink();

}
);

/* ===================================
   SCROLL EVENTS
=================================== */

window.addEventListener(
"scroll",
() => {

    revealOnScroll();

    startCounters();

    activeLink();

}
);
/* ==========================
   FAQ ACCORDION
========================== */
console.log("FAQ JS loaded");
const faqQuestions =
document.querySelectorAll(
".faq-question"
);

faqQuestions.forEach(question => {

    question.addEventListener(
    "click",
    () => {

        const answer =
        question.nextElementSibling;

        if(answer.style.maxHeight){

            answer.style.maxHeight =
            null;

        }

        else{

            answer.style.maxHeight =
            answer.scrollHeight +
            "px";

        }

    });

});

