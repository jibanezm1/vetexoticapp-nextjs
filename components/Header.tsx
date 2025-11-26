"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <Link href="/"><h1><i className="fas fa-paw"></i> VetExoticApp</h1></Link>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <li>
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/#servicios"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                href="/#sobre-mi"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link
                href="/#galeria"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Galería
              </Link>
            </li>
            <li>
              <Link
                href="/clinicas"
                className={`nav-link ${isActive("/clinicas") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Clínicas
              </Link>
            </li>
            <li>
              <Link
                href="/docencia"
                className={`nav-link ${isActive("/docencia") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Docencia
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/casos-clinicos"
                className={`nav-link ${isActive("/casos-clinicos") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Casos Clínicos
              </Link>
            </li>
            <li>
              <Link
                href="/cursos"
                className={`nav-link ${isActive("/cursos") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </Link>
            </li>
            <li>
              <Link
                href="/curriculum"
                className={`nav-link ${isActive("/curriculum") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Currículum
              </Link>
            </li>
            <li>
              <Link
                href="/#contacto"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
          <div
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
