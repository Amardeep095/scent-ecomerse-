import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/data/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Product not found.</p>
          <Link to="/products" className="text-gold hover:underline mt-4 inline-block">Back to Collection</Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold font-body mb-2">{product.brand}</p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-display text-gold">${product.price}</span>
                {product.originalPrice && <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Notes */}
              <div className="space-y-4 mb-8">
                <h3 className="font-body text-xs uppercase tracking-widest text-gold">Fragrance Notes</h3>
                <div className="grid grid-cols-3 gap-4">
                  {(["top", "middle", "base"] as const).map(type => (
                    <div key={type} className="p-4 rounded-lg border border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{type}</p>
                      {product.notes[type].map(n => (
                        <p key={n} className="text-sm text-foreground">{n}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{product.size} · Eau de Parfum</p>

              <div className="flex gap-4">
                <button
                  onClick={() => addItem(product)}
                  className="flex-1 gradient-gold text-primary-foreground py-4 rounded-full font-body font-semibold tracking-wide flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
                <button className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
