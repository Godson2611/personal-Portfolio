/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const scrollUpBtn = document.querySelector(".scroll-up-btn");
  const menuItems = document.querySelectorAll(".navbar .menu li a");
  const menuBtn = document.querySelector(".menu-btn");

  // sticky navbar on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }

    // scroll-up button show/hide
    if (window.scrollY > 500) {
      scrollUpBtn.classList.add("show");
    } else {
      scrollUpBtn.classList.remove("show");
    }
  });

  // slide-up script
  scrollUpBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // removing smooth scroll on slide-up button click
    document.documentElement.style.scrollBehavior = "auto";
  });

  // applying smooth scroll on menu items click
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function () {
      document.documentElement.style.scrollBehavior = "smooth";
    });
  });

  // toggle menu/navbar script
  menuBtn.addEventListener("click", function () {
    document.querySelector(".navbar .menu").classList.toggle("active");
    menuBtn.querySelector("i").classList.toggle("active");
  });

  // typing text animation script
  const typingElements = document.querySelectorAll(".typing");
  typingElements.forEach(function (typingElement) {
    const typed = new Typed(typingElement, {
      strings: ["Web Developer", "UI UX Designer", 'Mern stack Developer', 'FullStack Developer'],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  });

  // owl carousel script
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    new Glide(carousel, {
      type: "carousel",
      perView: 1,
      autoplay: 2000,
      hoverpause: true,
      breakpoints: {
        600: {
          perView: 2,
        },
        1000: {
          perView: 3,
        },
      },
    }).mount();
  }
});
