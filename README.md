# VetExoticApp - Next.js 15 SSR

Sitio web de la Dra. Siboney Pérez, veterinaria especialista en animales exóticos en Chile, migrado a **Next.js 15** con **Server-Side Rendering (SSR)** y **TypeScript**.

## 🚀 Características

- ✅ **Next.js 15** con App Router
- ✅ **TypeScript** para type safety
- ✅ **Server-Side Rendering (SSR)** para SEO óptimo
- ✅ **Datos en JSON** (cursos, docentes, workshops)
- ✅ **Optimización de imágenes** con Next/Image
- ✅ **SEO completo** con metadata
- ✅ **Google Tag Manager** integrado
- ✅ **Responsive Design**

## 📁 Estructura del Proyecto

```
nextjs-ssr/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   ├── cursos/page.tsx     # Cursos (SSR)
│   └── docentes/page.tsx   # Docentes (SSR)
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── data/
│   ├── cursos.json
│   ├── docentes.json
│   └── workshops.json
└── public/
    ├── images/
    ├── css/
    └── js/
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📊 Datos Dinámicos (JSON)

Los datos se cargan desde `/data`:
- **cursos.json** - Información de cursos
- **docentes.json** - Perfiles de docentes
- **workshops.json** - Talleres disponibles

Para actualizar datos, editar los archivos JSON y reconstruir.

## 📱 SEO

Cada página incluye:
- Meta titles y descriptions
- Open Graph tags
- Twitter Cards
- Schema.org estructurado

## 🚧 Páginas Pendientes

- [ ] Casos Clínicos
- [ ] Clínicas
- [ ] Docencia
- [ ] Currículum

## 📞 Contacto

- Email: vetexotic.app@gmail.com
- Teléfono: +56 9 3449 7035
- Instagram: @drasibo.exotic

---

**Desarrollado con Next.js 15**
