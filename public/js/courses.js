// JavaScript para la página de cursos

document.addEventListener("DOMContentLoaded", function () {
  // Course enrollment functionality
  const enrollButtons = document.querySelectorAll(".course-card .btn-primary");
  const infoButtons = document.querySelectorAll(".course-card .btn-secondary");

  enrollButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseCard = this.closest(".course-card");
      const courseTitle = courseCard.querySelector("h3").textContent;

      // WhatsApp enrollment
      const message = encodeURIComponent(
        `Hola Dra. Siboney, estoy interesado/a en inscribirme al curso "${courseTitle}". ¿Podrían enviarme más información sobre fechas y modalidades de pago?`
      );
      window.open(`https://wa.me/56934497035?text=${message}`, "_blank");
    });
  });

  infoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseCard = this.closest(".course-card");
      const courseTitle = courseCard.querySelector("h3").textContent;

      // Email for more info
      const subject = encodeURIComponent(
        `Información sobre curso: ${courseTitle}`
      );
      const body = encodeURIComponent(
        `Estimada Dra. Siboney,\n\nMe interesa obtener más información sobre el curso "${courseTitle}".\n\nPor favor, envíenme detalles sobre:\n- Fechas de inicio\n- Horarios\n- Requisitos\n- Modalidades de pago\n- Material incluido\n\nGracias por su tiempo.\n\nSaludos cordiales.`
      );
      window.open(
        `mailto:vetexotic.app@gmail.com?subject=${subject}&body=${body}`,
        "_blank"
      );
    });
  });

  // Workshop reservation functionality
  const workshopButtons = document.querySelectorAll(".workshop-item .btn");

  workshopButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const workshopItem = this.closest(".workshop-item");
      const workshopTitle = workshopItem.querySelector("h3").textContent;
      const workshopDate =
        workshopItem.querySelector(".workshop-date .day").textContent +
        " de " +
        workshopItem.querySelector(".workshop-date .month").textContent;

      // WhatsApp reservation
      const message = encodeURIComponent(
        `Hola Dra. Siboney, me gustaría reservar un cupo para el workshop "${workshopTitle}" del ${workshopDate}. ¿Está disponible?`
      );
      window.open(`https://wa.me/56934497035?text=${message}`, "_blank");
    });
  });

  // CTA buttons functionality
  const ctaButtons = document.querySelectorAll(".cta-buttons .btn");

  ctaButtons.forEach((button) => {
    if (button.href && button.href.includes("mailto:")) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const subject = encodeURIComponent(
          "Consulta sobre cursos especializados"
        );
        const body = encodeURIComponent(
          `Estimada Dra. Siboney,\n\nMe interesa conocer más sobre sus cursos especializados en medicina de animales exóticos.\n\n¿Podrían enviarme información sobre:\n- Próximas fechas de inicio\n- Cursos disponibles\n- Modalidades (presencial/online)\n- Certificaciones\n- Costos y formas de pago\n\nMi perfil profesional:\n- Profesión: \n- Años de experiencia: \n- Área de interés específica: \n\nGracias por su tiempo.\n\nSaludos cordiales.`
        );
        window.open(
          `mailto:vetexotic.app@gmail.com?subject=${subject}&body=${body}`,
          "_blank"
        );
      });
    }
  });

  // Animate statistics on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".number");

        statNumbers.forEach((statNumber) => {
          const finalNumber = parseInt(
            statNumber.textContent.replace(/\D/g, "")
          );
          const hasPlus = statNumber.textContent.includes("+");
          let currentNumber = 0;
          const increment = finalNumber / 60;

          const updateNumber = () => {
            currentNumber += increment;
            if (currentNumber < finalNumber) {
              statNumber.textContent =
                Math.floor(currentNumber) + (hasPlus ? "+" : "");
              requestAnimationFrame(updateNumber);
            } else {
              statNumber.textContent = finalNumber + (hasPlus ? "+" : "");
            }
          };

          updateNumber();
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".instructor-stats").forEach((stats) => {
    observer.observe(stats);
  });

  // Course card hover effects
  const courseCards = document.querySelectorAll(".course-card");

  courseCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = card.classList.contains("featured")
        ? "scale(1.02)"
        : "translateY(0) scale(1)";
    });
  });

  // Testimonial carousel functionality (if needed)
  const testimonials = document.querySelectorAll(".testimonial");
  let currentTestimonial = 0;

  if (testimonials.length > 3) {
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      testimonials[currentTestimonial].style.opacity = "0.6";
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonials[currentTestimonial].style.opacity = "1";
    }, 5000);
  }

  // Smooth scroll for anchor links
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

  // Workshop timeline animation
  const workshopItems = document.querySelectorAll(".workshop-item");

  const workshopObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
          entry.target.style.transition = "all 0.6s ease";
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  workshopItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-50px)";
    workshopObserver.observe(item);
  });

  // Course highlights animation
  const highlights = document.querySelectorAll(".highlight");

  highlights.forEach((highlight, index) => {
    highlight.style.animationDelay = `${index * 0.1}s`;
    highlight.classList.add("animate-highlight");
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        .animate-highlight {
            animation: bounceIn 0.6s ease both;
        }
        
        @keyframes bounceIn {
            0% {
                transform: translateY(30px);
                opacity: 0;
            }
            60% {
                transform: translateY(-10px);
                opacity: 1;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .course-card {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .workshop-item:hover .workshop-date {
            transform: scale(1.05);
            transition: transform 0.3s ease;
        }
        
        .testimonial {
            transition: all 0.3s ease;
        }
        
        .testimonial:hover {
            transform: translateY(-5px);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .instructor-image img:hover {
            transform: scale(1.02);
            transition: transform 0.3s ease;
        }
    `;

  document.head.appendChild(style);

  // Form validation for contact forms (if any)
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#e74c3c";
        } else {
          input.style.borderColor = "#ddd";
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert("Por favor, complete todos los campos requeridos.");
      }
    });
  });

  // Lazy loading for course images
  const images = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
    img.style.transition = "opacity 0.3s ease";
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });

  // Price highlight animation
  const prices = document.querySelectorAll(".price");

  prices.forEach((price) => {
    price.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.transition = "transform 0.3s ease";
    });

    price.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  console.log("✅ Página de cursos cargada correctamente");
  console.log("📧 Contacto: vetexotic.app@gmail.com");
  console.log("📱 WhatsApp: +56 9 3449 7035");
});

// Helper function for notifications
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#27ae60" : "#e74c3c"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add notification animation
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyle);
