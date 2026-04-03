import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold text-gold mb-4">LUMIÈRE</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting exceptional fragrances since 1892. Each scent tells a story of artistry, passion, and timeless elegance.
            </p>
          </div>
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-gold mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              {["Collection", "New Arrivals", "Best Sellers", "Gift Sets"].map(item => (
                <Link key={item} to="/products" className="text-sm text-muted-foreground hover:text-gold transition-colors">{item}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-gold mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              {["Our Story", "Craftsmanship", "Sustainability", "Careers"].map(item => (
                <span key={item} className="text-sm text-muted-foreground hover:text-gold transition-colors cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-gold mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>contact@lumiere.com</span>
              <span>+33 1 42 60 38 01</span>
              <span>8 Place Vendôme, Paris</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">© 2026 Lumière. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
