"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimations from "@/components/ScrollAnimations";
import blogsData from "@/data/blogs.json";

// Note: metadata must be in a server component, will need to create a wrapper
// For now, using next/head alternative for client component

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedSpecies, setSelectedSpecies] = useState("Todos");

  // Extraer categorías y especies únicas
  const categories = ["Todos", ...Array.from(new Set(blogsData.flatMap(blog => blog.categories))).filter(c => c !== "Todos")];
  const species = ["Todos", ...Array.from(new Set(blogsData.flatMap(blog => blog.species))).filter(s => s !== "Todos")];

  // Filtrar blogs
  const filteredBlogs = blogsData.filter(blog => {
    const categoryMatch = selectedCategory === "Todos" || blog.categories.includes(selectedCategory);
    const speciesMatch = selectedSpecies === "Todos" || blog.species.includes(selectedSpecies);
    return categoryMatch && speciesMatch;
  });

  return (
    <>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="cv-header">
        <div className="container">
          <div className="cv-intro">
            <div className="cv-basic-info">
              <h1>Blog Veterinario</h1>
              <h2>Consejos y Cuidados para Animales Exóticos</h2>
              <p>
                Artículos especializados sobre salud, nutrición, y bienestar de tus mascotas exóticas.
                Información basada en evidencia científica y experiencia clínica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="case-filters">
        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#2c5aa0", marginBottom: "1rem", textAlign: "center" }}>
              <i className="fas fa-filter"></i> Filtrar por Categoría
            </h3>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: "#2c5aa0", marginBottom: "1rem", textAlign: "center" }}>
              <i className="fas fa-paw"></i> Filtrar por Especie
            </h3>
            <div className="filter-buttons">
              {species.map((specie) => (
                <button
                  key={specie}
                  className={`filter-btn ${selectedSpecies === specie ? "active" : ""}`}
                  onClick={() => setSelectedSpecies(specie)}
                >
                  {specie}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="clinical-cases">
        <div className="container">
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <h2>
              {filteredBlogs.length} {filteredBlogs.length === 1 ? "Artículo" : "Artículos"}
            </h2>
          </div>

          <div className="cases-grid">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="case-card">
                <div className="case-image">
                  <Image
                    src={blog.image || "/images/veterinaria-placeholder.svg"}
                    alt={blog.title}
                    width={400}
                    height={250}
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/veterinaria-placeholder.svg";
                    }}
                  />
                  <div className="case-overlay">
                    <span className="case-category">{blog.specialty}</span>
                  </div>
                </div>

                <div className="case-content">
                  <h3>{blog.title}</h3>
                  <p className="case-summary">{blog.excerpt}</p>

                  <div className="case-details">
                    <div className="detail">
                      <i className="fas fa-user"></i>
                      <span>{blog.author}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-calendar"></i>
                      <span>
                        {new Date(blog.date).toLocaleDateString("es-CL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-clock"></i>
                      <span>{blog.readTime} de lectura</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-paw"></i>
                      <span>{blog.species.join(", ")}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "#f0f0f0",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "15px",
                            fontSize: "0.85rem",
                            color: "#666",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/blog/${blog.slug}`} className="btn-case-detail">
                    Leer Artículo Completo
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <i className="fas fa-search" style={{ fontSize: "4rem", color: "#ccc", marginBottom: "1rem" }}></i>
              <h3 style={{ color: "#666", marginBottom: "1rem" }}>
                No se encontraron artículos
              </h3>
              <p style={{ color: "#999" }}>
                Intenta cambiar los filtros para ver más contenido
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="courses-promo">
        <div className="container">
          <div className="promo-content" style={{ gridTemplateColumns: "1fr" }}>
            <div className="promo-text" style={{ textAlign: "center" }}>
              <h2>¿Tienes Dudas sobre la Salud de tu Mascota Exótica?</h2>
              <h3>Agenda una Consulta Especializada</h3>
              <p style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
                Nuestro equipo de especialistas está disponible para atender las necesidades
                de salud de tu mascota exótica con el más alto estándar de cuidado veterinario.
              </p>
              <div className="promo-buttons" style={{ justifyContent: "center" }}>
                <Link href="/#contacto" className="btn btn-primary">
                  Agendar Consulta
                </Link>
                <Link href="/casos-clinicos" className="btn btn-secondary">
                  Ver Casos Clínicos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
