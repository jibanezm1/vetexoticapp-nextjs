import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        style={{
          display: "flex",
          listStyle: "none",
          padding: "1rem 0",
          fontSize: "0.9rem",
          color: "#666",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href="/"
            itemProp="item"
            style={{ color: "#2c5aa0", textDecoration: "none" }}
          >
            <span itemProp="name">Inicio</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span style={{ color: "#999" }}>/</span>
            {item.href ? (
              <Link
                href={item.href}
                itemProp="item"
                style={{ color: "#2c5aa0", textDecoration: "none" }}
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span itemProp="name" style={{ color: "#333" }}>
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
