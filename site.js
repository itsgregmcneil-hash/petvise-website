document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const header = document.querySelector(".site-header");
  const heroSection = document.querySelector("#home");
  const logoDefault = document.querySelector(".logo-default");
  const logoWhite = document.querySelector(".logo-white");

  // Mobile navigation toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("nav-open")) {
          nav.classList.remove("nav-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Header show/hide on scroll and transparent header on hero
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    
    

    // White header once the user starts scrolling
    if (currentScrollY > 10) {
      header.classList.add("header-scrolled");
      header.classList.remove("header-transparent");
    } else {
      header.classList.remove("header-scrolled");
    }
// Make header transparent when at top of page with hero image
    if (heroSection && heroSection.classList.contains('hero-with-image')) {
      if (currentScrollY <= 10) {
        header.classList.add("header-transparent");
      } else {
        header.classList.remove("header-transparent");
      }
    }
    // Keep header visible (no hide-on-scroll)
    header.classList.remove("header-hidden");

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // Initial check for transparent header - already set in HTML for index page
  if (heroSection && heroSection.classList.contains('hero-with-image') && window.scrollY <= 10) {
    header.classList.add("header-transparent");
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Contact form - Start chat with Megan
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;
      
      // Create email body
      const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
      
      // Open email client with pre-filled information
      window.location.href = `mailto:petviseorg@gmail.com?subject=New Contact from ${encodeURIComponent(name)}&body=${emailBody}`;
    });
  }

  // Testimonials carousel
  const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
  const dots = Array.from(document.querySelectorAll(".testimonial-dot"));
  const prev = document.querySelector(".testimonial-prev");
  const next = document.querySelector(".testimonial-next");

  if (slides.length && dots.length) {
    let current = 0;
    const show = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
      dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    };
    if (prev) prev.addEventListener("click", () => show(current - 1));
    if (next) next.addEventListener("click", () => show(current + 1));
    dots.forEach((d, idx) => d.addEventListener("click", () => show(idx)));
    setInterval(() => show(current + 1), 15000);
  }

});
