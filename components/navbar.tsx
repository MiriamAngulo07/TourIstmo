"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Destinos", href: "/destinos" },
  { label: "Planes", href: "/planes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Ayuda", href: "/ayuda" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="site-navbar" aria-label="Navegación principal"
      style={{
        position: "relative",
        alignItems: "center",
        background: "#588684",
        width: "95%",
        margin: "20px auto",
        boxShadow: "0 15px 35px rgba(40,57,81,.2)",
        boxSizing: "border-box",
        zIndex: 100,
      }}
    >
      {/* Left links */}
      <div className="site-nav-links">
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={pathname === l.href ? "page" : undefined}
            style={{
              color: pathname === l.href ? "#fff" : "#E2E1E0",
              fontWeight: 700,
              fontSize: 13,
              padding: "6px 12px",
              borderRadius: 10,
              textDecoration: "none",
              transition: "all .2s",
              background:
                pathname === l.href ? "rgba(255,255,255,.18)" : "transparent",
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Center logo */}
      <Link
        href="/"
        className="site-nav-logo"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          textDecoration: "none",
        }}
      >
        <Image
          src="/assets/logowhite.png"
          alt=""
          width={44}
          height={44}
          priority
        />
        <span
          style={{
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#fff",
          }}
        >
          TourIstmo
        </span>
      </Link>

      <Link
        href="/login"
        className="site-nav-login"
        style={{
          background: "#D57133",
          color: "#fff",
          padding: "7px 18px",
          borderRadius: 50,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          transition: "all .2s",
        }}
      >
        Ingresar
      </Link>
    </nav>
  );
}
