// JavaScript para VetExoticApp
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.backdropFilter = "blur(15px)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    }
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Validate required fields
      let isValid = true;
      const requiredFields = this.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "#e74c3c";
        } else {
          field.style.borderColor = "#27ae60";
        }
      });

      if (isValid) {
        // Simulate form submission
        showNotification(
          "Mensaje enviado correctamente. Nos pondremos en contacto pronto.",
          "success"
        );
        this.reset();

        // Reset field borders
        requiredFields.forEach((field) => {
          field.style.borderColor = "#e0e0e0";
        });
      } else {
        showNotification(
          "Por favor, complete todos los campos requeridos.",
          "error"
        );
      }
    });
  }

  // Notification system
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${
                  type === "success" ? "check-circle" : "exclamation-circle"
                }"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add notification styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "#27ae60" : "#e74c3c"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 350px;
        `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
      hideNotification(notification);
    }, 5000);

    // Close button functionality
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        hideNotification(notification);
      });
  }

  function hideNotification(notification) {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".service-card, .contact-item, .timeline-item, .cert-item"
    )
    .forEach((el) => {
      observer.observe(el);
    });

  // Add animation styles dynamically
  const style = document.createElement("style");
  style.textContent = `
        .service-card,
        .contact-item,
        .timeline-item,
        .cert-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.8;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
  document.head.appendChild(style);

  // Counter animation for stats
  const stats = document.querySelectorAll(".stat-number");
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    stats.forEach((stat) => {
      const target = parseInt(stat.textContent.replace("+", ""));
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent =
          Math.floor(current) + (stat.textContent.includes("+") ? "+" : "");
      }, 30);
    });

    statsAnimated = true;
  }

  // Trigger stats animation when in view
  const aboutSection = document.querySelector(".about");
  if (aboutSection) {
    const statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(aboutSection);
  }

  // Image loading with placeholder
  const images = document.querySelectorAll(
    'img[src=""], img[src*="placeholder"]'
  );
  images.forEach((img) => {
    // Set placeholder images from Unsplash
    const placeholders = {
      "hero-exotic-vet.jpg":
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "dra-siboney.jpg":
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "dra-siboney-cv.jpg":
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    };

    const imgId = img.getAttribute("id");
    if (placeholders[imgId + ".jpg"]) {
      img.src = placeholders[imgId + ".jpg"];
      img.alt = img.alt || "Veterinaria de animales exóticos";
    }
  });

  // Lazy loading for images
  const imageObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("fade-in");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    imageObserver.observe(img);
  });

  // WhatsApp contact integration
  function createWhatsAppLink() {
    const phone = "56934497035";
    const message = encodeURIComponent(
      "Hola, me interesa conocer más sobre los servicios veterinarios para animales exóticos."
    );
    return `https://wa.me/${phone}?text=${message}`;
  }

  // Add WhatsApp button
  const whatsappBtn = document.createElement("a");
  whatsappBtn.href = createWhatsAppLink();
  whatsappBtn.target = "_blank";
  whatsappBtn.className = "whatsapp-float";
  whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  whatsappBtn.style.cssText = `
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 20px;
        right: 20px;
        background: #25d366;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
        text-decoration: none;
    `;

  whatsappBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.6)";
  });

  whatsappBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 5px 20px rgba(37, 211, 102, 0.4)";
  });

  document.body.appendChild(whatsappBtn);

  // Error handling for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0yMCAxMEM0LjUgMTAgLTUgMjUgLTUgMjVTNC41IDQwIDIwIDQwUzQ1IDI1IDQ1IDI1UzMxLjUgMTAgMjAgMTBaIiBmaWxsPSIjQzRDNEM0Ii8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEwIiBmaWxsPSIjRTY3RTIyIi8+Cjx0ZXh0IHg9IjIwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+QvjwvdGV4dD4KPC9zdmc+";
    });
  });
});

// Gallery functionality
document.addEventListener("DOMContentLoaded", function () {
  // Gallery hover effects
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const overlay = item.querySelector(".gallery-overlay");
      overlay.style.opacity = "1";
      overlay.style.transform = "translateY(0)";
    });

    item.addEventListener("mouseleave", () => {
      const overlay = item.querySelector(".gallery-overlay");
      overlay.style.opacity = "0";
      overlay.style.transform = "translateY(20px)";
    });
  });

  // Smooth scroll for gallery navigation
  document
    .querySelector('a[href="#galeria"]')
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("galeria").scrollIntoView({
        behavior: "smooth",
      });
    });
});

// Service worker for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (err) {
        console.log("ServiceWorker registration failed");
      });
  });
}
