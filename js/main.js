(function () {
  "use strict";

  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      const expanded = navToggle.classList.contains("active");
      navToggle.setAttribute("aria-expanded", expanded);
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Variables for Scroll Effects
  const progressBar = document.getElementById("scrollProgress");
  const nav = document.querySelector(".nav");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = "";
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      const href = link.getAttribute("href");
      if (href === "#" + current) {
        link.classList.add("active-link");
      }
    });
  }

  // 3. Scroll Progress & Navbar Effects
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = progress + "%";
    if (nav) nav.classList.toggle("scrolled", scrollTop > 40);
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 400);

    updateActiveNav();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 4. Back to Top Button
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 5. Reveal on Scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // 6. Typed Text Effect
  const typedEl = document.getElementById("typedText");
  const phrases = [
    "A Web Developer",
    "A React & Django Developer",
    "An AI Intern",
    "A Content Creator",
  ];

  if (typedEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      const speed = isDeleting ? 45 : 80;

      if (!isDeleting) {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, speed);
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      typedEl.textContent = phrases[0];
    } else {
      typeLoop();
    }
  }

  // 7. Contact Form Feedback & Sending
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      const name = form.querySelector('input[name="Name"]');
      const email = form.querySelector('input[name="Email"]');
      const message = form.querySelector('textarea[name="Message"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        e.preventDefault();
        if (formStatus) {
          formStatus.textContent = "Please fill in all fields before sending.";
          formStatus.style.color = "#c0392b";
        }
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        e.preventDefault();
        if (formStatus) {
          formStatus.textContent = "Please enter a valid email address.";
          formStatus.style.color = "#c0392b";
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = "Sending your message... Please wait.";
        formStatus.style.color = "#872351";
      }

      if (submitBtn) {
        submitBtn.textContent = "Sending...";
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";
      }
    });
  }

  // 8. Dynamic Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 9. Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 10. Dark / Light Mode Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    htmlElement.setAttribute("data-theme", "dark");
  } else {
    htmlElement.setAttribute("data-theme", "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
})();
