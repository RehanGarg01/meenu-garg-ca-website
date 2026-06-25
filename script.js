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
   EMAILJS CONTACT FORM
=================================== */
let lastSubmission = 0;
emailjs.init({

    publicKey:
    "v0j06FaIi4N71PUig"

});
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

        const submitBtn =
        contactForm.querySelector(
        "button"
        );

        
        const templateParams = {

            name:
            document.getElementById(
            "name"
            ).value,

            email:
            document.getElementById(
            "email"
            ).value,

            phone:
            document.getElementById(
            "phone"
            ).value,

            message:
            document.getElementById(
            "message"
            ).value,

            time:
            new Date()
            .toLocaleString()

        };
        

/* Cooldown */

const now = Date.now();

if(
    now - lastSubmission < 30000
){

    alert(
    "Please wait 30 seconds before submitting again."
    );

    return;

}

/* Email Check */

const email =
document.getElementById(
"email"
).value.toLowerCase();

const blockedDomains = [

    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com"

];

if(

    blockedDomains.some(
        domain =>
        email.endsWith(domain)
    )

){

    alert(
        "Temporary email addresses are not allowed."
    );

    return;

}
        submitBtn.disabled =
        true;

        submitBtn.innerText =
        "Sending...";

        emailjs.send(

            "service_cz5ikno",

            "template_zqj40wn",

            templateParams

        )

        .then(() => {

    lastSubmission =
    Date.now();

    alert(
    "Thank you for contacting M/s Meenu Garg & Co. We will get back to you shortly."
    );

    contactForm.reset();

    if(window.turnstile){

        turnstile.reset();

    }

})

        .catch((error) => {

            console.error(
            error
            );

            alert(
            "Message could not be sent. Please try again."
            );

        })

        .finally(() => {

            submitBtn.disabled =
            false;

            submitBtn.innerText =
            "Send Inquiry";

        });

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
/* ==================================================
                KNOWLEDGE CENTRE
================================================== */

const categoryButtons =
document.querySelectorAll(".category-btn");

const faqQuestions =
document.querySelectorAll(".faq-question");

const faqSearch =
document.getElementById("faqSearch");

/* ======================================
      CATEGORY ACCORDION
====================================== */

categoryButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

const content =
button.nextElementSibling;

const isOpen =
button.classList.contains("active");

/* Close all */

categoryButtons.forEach(btn=>{

btn.classList.remove("active");

btn.nextElementSibling.style.maxHeight = null;

});

/* Open current */

if(!isOpen){

button.classList.add("active");

content.style.maxHeight =
content.scrollHeight + "px";

}

});

});

/* ======================================
      QUESTION ACCORDION
====================================== */

faqQuestions.forEach(question=>{

question.addEventListener(
"click",
()=>{

const answer =
question.nextElementSibling;

const isOpen =
question.classList.contains("active");

const category =
question.closest(".category-content");

/* Close others in same category */

category.querySelectorAll(".faq-question")
.forEach(q=>{

q.classList.remove("active");

q.nextElementSibling.style.maxHeight = null;

});

/* Open */

if(!isOpen){

question.classList.add("active");

answer.style.maxHeight =
answer.scrollHeight + "px";

/* Update category height */

setTimeout(()=>{

category.style.maxHeight =
category.scrollHeight + "px";

},350);

}

});

});

/* ======================================
      SEARCH
====================================== */

if(faqSearch){

faqSearch.addEventListener(
"keyup",
()=>{

const value =
faqSearch.value.toLowerCase().trim();

const categories =
document.querySelectorAll(".faq-category");

categories.forEach(category=>{

const items =
category.querySelectorAll(".faq-item");

let visible = 0;

items.forEach(item=>{

const text =
item.innerText.toLowerCase();

if(text.includes(value)){

item.style.display="block";

visible++;

}else{

item.style.display="none";

}

});

const button =
category.querySelector(".category-btn");

const content =
category.querySelector(".category-content");

if(visible>0){

category.style.display="block";

button.classList.add("active");

content.style.maxHeight =
content.scrollHeight + "px";

}else{

category.style.display="none";

button.classList.remove("active");

content.style.maxHeight = null;

}

});

/* Reset */

if(value===""){

categories.forEach(category=>{

category.style.display="block";

category.querySelector(".category-btn")
.classList.remove("active");

category.querySelector(".category-content")
.style.maxHeight = null;

category.querySelectorAll(".faq-item")
.forEach(item=>{

item.style.display="block";

});

});

}

});

}

/* ======================================
      ESC TO CLEAR SEARCH
====================================== */

document.addEventListener(
"keydown",
e=>{

if(
e.key==="Escape" &&
faqSearch
){

faqSearch.value="";

faqSearch.dispatchEvent(
new Event("keyup")
);

}

});

/* ======================================
      KEYBOARD SUPPORT
====================================== */

document.querySelectorAll(
".category-btn,.faq-question"
).forEach(button=>{

button.addEventListener(
"keydown",
e=>{

if(

e.key==="Enter" ||

e.key===" "

){

e.preventDefault();

button.click();

}

});

});

/* ======================================
      OPEN FIRST CATEGORY
====================================== */

window.addEventListener(
"load",
()=>{

if(categoryButtons.length){

categoryButtons[0].click();

}

});