import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/data/cartStore";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Collection" },
    { to: "/ai-recommendation", label: "AI Advisor" },
    { to: "/login", label: "Account" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-display text-xl lg:text-2xl font-bold tracking-wider text-gold">
            LUMIÈRE
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-body uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/products" className="text-muted-foreground hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/login" className="hidden lg:block text-muted-foreground hover:text-gold transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="relative text-muted-foreground hover:text-gold transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border"
          >
            <nav className="flex flex-col py-4 px-4 gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-body uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
