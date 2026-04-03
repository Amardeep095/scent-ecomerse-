import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/data/cartStore";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:border-gold/30 transition-all duration-500 gold-border-glow">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
            <button
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              className="gradient-gold text-primary-foreground px-6 py-2.5 rounded-full text-sm font-body font-semibold tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Sale</span>
          )}
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-body">{product.brand}</p>
        <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold font-display text-lg">${product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
