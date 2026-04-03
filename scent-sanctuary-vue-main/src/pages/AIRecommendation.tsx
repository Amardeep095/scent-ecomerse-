import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const moods = ["Confident", "Romantic", "Mysterious", "Fresh & Energetic", "Cozy & Warm"];
const occasions = ["Date Night", "Office", "Party", "Casual", "Special Event"];

export default function AIRecommendation() {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [occasion, setOccasion] = useState("");
  const [showResults, setShowResults] = useState(false);

  const getRecommendations = () => {
    // Simple matching logic
    let filtered = [...products];
    if (mood === "Romantic" || mood === "Cozy & Warm") filtered = filtered.filter(p => p.category === "floral" || p.category === "oriental");
    else if (mood === "Mysterious" || mood === "Confident") filtered = filtered.filter(p => p.category === "woody" || p.category === "oriental");
    else filtered = filtered.filter(p => p.category === "fresh" || p.category === "floral");
    return filtered.slice(0, 3);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">AI Fragrance Advisor</h1>
            <p className="text-muted-foreground">Tell us about yourself and we'll find your perfect scent</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                {/* Mood */}
                <div>
                  <h3 className="font-display text-xl mb-4">How do you want to feel?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {moods.map(m => (
                      <button
                        key={m}
                        onClick={() => { setMood(m); setStep(1); }}
                        className={`p-4 rounded-lg border text-sm font-body transition-all duration-300 ${
                          mood === m ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                {step >= 1 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="font-display text-xl mb-4">What's the occasion?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {occasions.map(o => (
                        <button
                          key={o}
                          onClick={() => setOccasion(o)}
                          className={`p-4 rounded-lg border text-sm font-body transition-all duration-300 ${
                            occasion === o ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {mood && occasion && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <button
                      onClick={handleSubmit}
                      className="gradient-gold text-primary-foreground px-10 py-4 rounded-full font-body font-semibold tracking-wide hover:scale-105 transition-transform inline-flex items-center gap-2"
                    >
                      Find My Fragrance <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center mb-10">
                  <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-2">Based on your preferences</p>
                  <h2 className="font-display text-2xl font-bold">Your Perfect Matches</h2>
                  <p className="text-sm text-muted-foreground mt-2">Mood: {mood} · Occasion: {occasion}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {getRecommendations().map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
                <div className="text-center mt-10">
                  <button onClick={() => { setShowResults(false); setMood(""); setOccasion(""); setStep(0); }} className="text-gold text-sm uppercase tracking-widest hover:underline">
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}
