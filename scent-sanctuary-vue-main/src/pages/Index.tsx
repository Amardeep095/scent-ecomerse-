import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories, testimonials } from "@/data/products";
import heroImage from "@/assets/hero-perfume.jpg";

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury Perfume" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-4">The Art of Fragrance</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Discover Your <span className="gradient-gold-text">Signature</span> Scent
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Handcrafted luxury fragrances that tell your unique story. Each bottle is a masterpiece of olfactory art.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="gradient-gold text-primary-foreground px-8 py-3 rounded-full font-body font-semibold tracking-wide hover:scale-105 transition-transform inline-flex items-center gap-2">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/ai-recommendation" className="border border-gold/40 text-gold px-8 py-3 rounded-full font-body font-semibold tracking-wide hover:bg-gold/10 transition-colors inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Advisor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-3">Curated for You</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold">Featured Collection</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="text-gold text-sm uppercase tracking-widest font-body hover:underline underline-offset-4 inline-flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-3">Fragrance Families</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold">Find Your World</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="block p-8 rounded-lg border border-border hover:border-gold/40 transition-all duration-500 text-center group gold-border-glow"
                >
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-gold transition-colors">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-gold/20 p-10 lg:p-16 text-center overflow-hidden gold-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5" />
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">Find Your Fragrance</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
                Let our AI advisor match you with the perfect scent based on your mood, occasion, and personal style.
              </p>
              <Link to="/ai-recommendation" className="gradient-gold text-primary-foreground px-10 py-4 rounded-full font-body font-semibold tracking-wide hover:scale-105 transition-transform inline-flex items-center gap-2">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-3">Voices</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold">What Our Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-lg border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground italic mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">on {t.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
