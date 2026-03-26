import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "OUR STORY", href: "#story" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  return (
    <header
      id="home"
      className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-xs"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="font-cormorant text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Love Always, Kanchan
          </span>
          <span
            className="font-playfair text-2xl font-bold"
            style={{ color: "#c0392b" }}
          >
            Happy Birthday, My Dear Would-Be Hubby
          </span>
        </div>
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              onClick={() => setActiveLink(link.href)}
              className={cn(
                "font-cormorant text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-foreground",
                activeLink === link.href
                  ? "text-foreground border-b border-foreground pb-0.5"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden text-foreground p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className="w-full h-px bg-border" />
      {mobileOpen && (
        <nav className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setMobileOpen(false);
              }}
              className={cn(
                "font-cormorant text-sm uppercase tracking-widest",
                activeLink === link.href
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
