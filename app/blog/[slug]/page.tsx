import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollAnimations from "@/components/ScrollAnimations";
import blogsData from "@/data/blogs.json";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Encontrar artículos relacionados (misma categoría o especie)
  const relatedBlogs = blogsData
    .filter((b) => 
      b.slug !== blog.slug && 
      (b.categories.some(cat => blog.categories.includes(cat)) ||
       b.species.some(sp => blog.species.includes(sp)))
    )
    .slice(0, 3);

  return (
    <>
      <ScrollAnimations />

      {/* Article Header */}
      <article>
        <header className="cv-header">
          <div className="container">
            <div className="cv-intro">
              <div className="cv-basic-info">
                <div style={{ marginBottom: "1.5rem" }}>
                  {blog.categories.map((category) => (
                    <span
                      key={category}
                      style={{
                        background: "rgba(255, 255, 255, 0.25)",
                        color: "white",
                        padding: "0.5rem 1.2rem",
                        borderRadius: "25px",
                        fontSize: "0.95rem",
                        marginRight: "0.7rem",
                        display: "inline-block",
                        fontWeight: "500",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <h1 style={{ 
                  fontSize: "2.8rem", 
                  marginBottom: "1.5rem",
                  color: "white",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                  lineHeight: "1.3"
                }}>{blog.title}</h1>

                <div className="case-details" style={{ 
                  justifyContent: "center", 
                  marginBottom: "1.5rem",
                  gap: "1.5rem"
                }}>
                  <div className="detail" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                    <i className="fas fa-user" style={{ color: "#ffd700" }}></i>
                    <span style={{ fontWeight: "500" }}>{blog.author}</span>
                  </div>
                  <div className="detail" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                    <i className="fas fa-calendar" style={{ color: "#ffd700" }}></i>
                    <span>
                      {new Date(blog.date).toLocaleDateString("es-CL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="detail" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                    <i className="fas fa-clock" style={{ color: "#ffd700" }}></i>
                    <span>{blog.readTime} de lectura</span>
                  </div>
                </div>

                <div style={{ 
                  marginBottom: "1rem",
                  color: "rgba(255, 255, 255, 0.95)",
                  fontSize: "1.05rem"
                }}>
                  <strong style={{ color: "white", fontWeight: "600" }}>
                    <i className="fas fa-paw"></i> Especies:{" "}
                  </strong>
                  <span>{blog.species.join(", ")}</span>
                </div>

                <div style={{ 
                  marginBottom: "1rem",
                  color: "rgba(255, 255, 255, 0.95)",
                  fontSize: "1.05rem"
                }}>
                  <strong style={{ color: "white", fontWeight: "600" }}>
                    <i className="fas fa-stethoscope"></i> Especialidad:{" "}
                  </strong>
                  <span>{blog.specialty}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <section style={{ background: "#f9f9f9", padding: "3rem 0" }}>
          <div className="container">
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <Image
                src={blog.image}
                alt={blog.title}
                width={900}
                height={500}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section style={{ padding: "4rem 0" }}>
          <div className="container">
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

              {/* Tags */}
              <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "2px solid #f0f0f0" }}>
                <h3 style={{ color: "#2c5aa0", marginBottom: "1rem" }}>
                  <i className="fas fa-tags"></i> Etiquetas
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#f0f0f0",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.95rem",
                        color: "#666",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author Info */}
        <section style={{ background: "#f9f9f9", padding: "3rem 0" }}>
          <div className="container">
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                background: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ color: "#2c5aa0", marginBottom: "1rem" }}>
                <i className="fas fa-user-md"></i> Sobre el Autor
              </h3>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.7", color: "#666" }}>
                <strong>{blog.author}</strong> es Médica Veterinaria especializada en animales exóticos
                con amplia experiencia en el cuidado y tratamiento de especies no convencionales.
                Cuenta con múltiples certificaciones internacionales y se dedica a la docencia
                y divulgación científica sobre medicina veterinaria de animales exóticos.
              </p>
              <Link href="/curriculum" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Ver Currículum Completo
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section style={{ padding: "4rem 0" }}>
            <div className="container">
              <div className="section-header" style={{ marginBottom: "3rem" }}>
                <h2>
                  <i className="fas fa-book-open"></i> Artículos Relacionados
                </h2>
              </div>

              <div className="cases-grid">
                {relatedBlogs.map((relatedBlog) => (
                  <article key={relatedBlog.id} className="case-card">
                    <div className="case-image">
                      <Image
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        width={400}
                        height={250}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="case-overlay">
                        <span className="case-category">{relatedBlog.specialty}</span>
                      </div>
                    </div>

                    <div className="case-content">
                      <h3>{relatedBlog.title}</h3>
                      <p className="case-summary">{relatedBlog.excerpt}</p>

                      <div className="case-details">
                        <div className="detail">
                          <i className="fas fa-calendar"></i>
                          <span>
                            {new Date(relatedBlog.date).toLocaleDateString("es-CL", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="detail">
                          <i className="fas fa-clock"></i>
                          <span>{relatedBlog.readTime}</span>
                        </div>
                      </div>

                      <Link href={`/blog/${relatedBlog.slug}`} className="btn-case-detail">
                        Leer Artículo
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <Link href="/blog" className="btn btn-secondary">
                  Ver Todos los Artículos
                </Link>
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
