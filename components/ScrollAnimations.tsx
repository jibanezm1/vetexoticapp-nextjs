"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
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
        ".service-card, .contact-item, .timeline-item, .cert-item, .cv-section, .gallery-item, .promo-content, .about-content"
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
        .cert-item,
        .cv-section,
        .gallery-item,
        .promo-content,
        .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Counter animation for stats
    const stats = document.querySelectorAll(".stat-number");
    let statsAnimated = false;

    function animateStats() {
      if (statsAnimated) return;

      stats.forEach((stat) => {
        const target = parseInt(stat.textContent?.replace("+", "") || "0");
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent =
            Math.floor(current) + (stat.textContent?.includes("+") ? "+" : "");
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

    // Gallery hover effects
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const overlay = item.querySelector(".gallery-overlay") as HTMLElement;
        if (overlay) {
          overlay.style.opacity = "1";
          overlay.style.transform = "translateY(0)";
        }
      });

      item.addEventListener("mouseleave", () => {
        const overlay = item.querySelector(".gallery-overlay") as HTMLElement;
        if (overlay) {
          overlay.style.opacity = "0";
          overlay.style.transform = "translateY(20px)";
        }
      });
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
