let controller;
let slideScene;
let pageScene;
let detailScene;

// Title Intro
function removeIntro(element) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  return function () {
    element.parentNode.removeChild(element);
  };
}

let introTl = gsap.timeline();

introTl.from(".introTitle", {
  duration: 1,
  opacity: 0,
  y: "random(-200, 200)",
  stagger: 0.25,
  delay: 1,
});
introTl.addLabel("titleOutro", "+=1");
introTl.to(
  ".introTitle",
  { duration: 0.5, opacity: 0, x: 200, ease: "power3.out" },
  "titleOutro"
);
introTl.call(removeIntro("#intro"));

function animateSlides() {
  //Initialise Controller
  controller = new ScrollMagic.Controller();

  //Selectors
  const sliders = document.querySelectorAll(".slidemain");
  const nav = document.querySelector(".nav-header");

  //Loop over each slide
  sliders.forEach((slidemain, index, slides) => {
    const revealImg = slidemain.querySelector(".reveal-img");
    const img = slidemain.querySelector("img");
    const revealText = slidemain.querySelector(".reveal-text");

    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    //Create SlideScene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slidemain,
      triggerHook: 0.75,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide",
      // })
      .addTo(controller);

    //Create scroll page animation
    const pageTl = gsap.timeline();

    pageTl.fromTo(
      slidemain,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5 }
    );

    //Create new scroll page scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slidemain,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slidemain, { pushFollowers: false })
      .setTween(pageTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "page",
      //   indent: 200,
      // })
      .addTo(controller);
  });
}
// Variables
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
const home = document.querySelector(".homelnk");
const review = document.querySelector(".reviewlnk");
const services = document.querySelector(".serviceslnk");
const gallery = document.querySelector(".gallerylnk");
const contactbtn = document.querySelector(".bathroom-exp");
const tapbtn = document.querySelector(".tap-exp");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;

  if (item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}

function navToggle(e) {
  if (!burger.classList.contains("active")) {
    burger.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    burger.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

//Barba Page Transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
        home.href = "./index.html";
        review.href = "./reviews.html";
        gallery.href = "./gallery.html";
        services.href = "./services.html";
        const contactbtn = document.querySelector(".bathroom-exp");
        const tapbtn = document.querySelector(".tap-exp");
        contactbtn.addEventListener("click", navToggle);
        tapbtn.addEventListener("click", navToggle);
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "review",
      beforeEnter() {
        logo.href = "./index.html";
        home.href = "./index.html";
        review.href = "./reviews.html";
        gallery.href = "./gallery.html";
        services.href = "./services.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "gallery",
      beforeEnter() {
        logo.href = "./index.html";
        home.href = "./index.html";
        review.href = "./reviews.html";
        gallery.href = "./gallery.html";
        services.href = "./services.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "services",
      beforeEnter() {
        logo.href = "./index.html";
        home.href = "./index.html";
        review.href = "./reviews.html";
        gallery.href = "./gallery.html";
        services.href = "./services.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();

        //Scroll to the top
        window.scrollTo(0, 0);

        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { y: "0%" },

          { y: "100%", stagger: 0.2, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");

  slides.forEach((slidemain, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slidemain, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });

    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slidemain,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slidemain, { pushFollowers: false })
      .setTween(slideTl)
      .addTo(controller);
  });
}

//EventListeners
gallery.addEventListener("click", navToggle);
services.addEventListener("click", navToggle);
burger.addEventListener("click", navToggle);
home.addEventListener("click", navToggle);
review.addEventListener("click", navToggle);
contactbtn.addEventListener("click", navToggle);
tapbtn.addEventListener("click", navToggle);

// Mouse hover animates slide title
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

