import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/data/cartStore";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
            <h1 className="font-display text-4xl font-bold mb-10">Shopping Bag</h1>
          </motion.div>

          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-6" />
              <p className="text-muted-foreground text-lg mb-6">Your bag is empty</p>
              <Link to="/products" className="gradient-gold text-primary-foreground px-8 py-3 rounded-full font-body font-semibold inline-block">
                Explore Collection
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 p-6 rounded-lg border border-border bg-card"
                >
                  <Link to={`/product/${item.product.id}`} className="w-24 h-32 rounded overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.product.brand}</p>
                      <h3 className="font-display text-lg font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.product.size}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold/40 hover:text-gold transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-body w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold/40 hover:text-gold transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gold font-display text-lg">${item.product.price * item.quantity}</span>
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Summary */}
              <div className="border-t border-border pt-8 space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span><span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span><span>Complimentary</span>
                </div>
                <div className="flex justify-between text-lg font-display font-bold border-t border-border pt-4">
                  <span>Total</span><span className="text-gold">${totalPrice}</span>
                </div>
                <button className="w-full gradient-gold text-primary-foreground py-4 rounded-full font-body font-semibold tracking-wide hover:scale-[1.01] transition-transform mt-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
