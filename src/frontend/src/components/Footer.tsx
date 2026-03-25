export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Surprise Event", href: "#hero" },
    { label: "Gallery", href: "#gallery" },
    { label: "Our Story", href: "#story" },
    { label: "Messages", href: "#wishes" },
  ];

  return (
    <footer className="w-full bg-footer text-footer-foreground py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-5">
        {/* Brand */}
        <div className="text-center">
          <p className="font-dancing text-3xl">Love Always</p>
          <p className="font-cormorant text-sm uppercase tracking-[0.25em] opacity-70 mt-1">
            A Birthday Surprise
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              className="font-cormorant text-xs uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="w-24 h-px bg-footer-foreground/30" />

        {/* Copyright */}
        <p className="font-cormorant text-xs opacity-60 text-center">
          © {year}. Built with love using{" "}
          <a
            href={utm}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-100 transition-opacity"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
