import { cn } from "@/lib/utils";

interface OrnamentedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function OrnamentedCard({ children, className }: OrnamentedCardProps) {
  return (
    <div className={cn("relative bg-card border border-border p-8", className)}>
      {/* Corner ornaments */}
      <span className="ornament-corner ornament-corner-tl" />
      <span className="ornament-corner ornament-corner-tr" />
      <span className="ornament-corner ornament-corner-bl" />
      <span className="ornament-corner ornament-corner-br" />
      {children}
    </div>
  );
}
