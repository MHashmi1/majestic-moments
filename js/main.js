// MAIN.JS - Navigation & Interactions

document.addEventListener("DOMContentLoaded", function () {

  // MOBILE MENU TOGGLE
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");
  const backToTopButton = document.getElementById("backToTop");

  if (navToggle) {
    navToggle.addEventListener("click", function () {

      navMenu.classList.toggle("active");

      const spans = navToggle.querySelectorAll("span");

      if (navMenu.classList.contains("active")) {

        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";

      } else {

        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";

      }

    });
  }

  // CLOSE MOBILE MENU WHEN LINK CLICKED
  navLinks.forEach(link => {
    link.addEventListener("click", function () {

      if (window.innerWidth <= 768) {

        navMenu.classList.remove("active");

        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";

      }

    });
  });

  // CLOSE MENU WHEN CLICKING OUTSIDE
  document.addEventListener("click", function (event) {

    if (
      navMenu.classList.contains("active") &&
      !navToggle.contains(event.target) &&
      !navMenu.contains(event.target)
    ) {

      navMenu.classList.remove("active");

      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";

    }

  });

  // SMOOTH SCROLLING
  navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

      const href = this.getAttribute("href");

      if (href && href.startsWith("#")) {

        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {

          const navHeight = navbar.offsetHeight;
          const targetPosition = target.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }

      }

    });

  });

  // ACTIVE NAV LINK ON SCROLL
  const sections = document.querySelectorAll("section[id], header[id]");

  function updateActiveNavLink() {

    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {

        navLinks.forEach(link => {

          link.classList.remove("active");

          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }

        });

      }

    });

  }

  // STICKY NAVBAR + SCROLL HANDLER
  function handleScroll() {

    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(44,44,44,0.1)";
    }

    updateActiveNavLink();
    updateBackToTopButton();

  }

  // THROTTLED SCROLL EVENT
  let isScrolling;

  window.addEventListener("scroll", function () {

    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);

  });

  // BACK TO TOP BUTTON
  function updateBackToTopButton() {

    if (!backToTopButton) return;

    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }

  }

  if (backToTopButton) {

    backToTopButton.addEventListener("click", function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }

  // INTERSECTION OBSERVER ANIMATIONS
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  }, observerOptions);

  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

  });

  // INITIAL RUN
  handleScroll();

  // RESIZE HANDLER
  window.addEventListener("resize", function () {

    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {

      navMenu.classList.remove("active");

      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";

    }

  });

});