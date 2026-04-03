import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const genders = ["all", "men", "women", "unisex"] as const;
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200 - $350", min: 200, max: 350 },
  { label: "$350 - $500", min: 350, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [gender, setGender] = useState<string>("all");
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "all" && p.category !== category) return false;
      if (gender !== "all" && p.gender !== gender) return false;
      const range = priceRanges[priceRange];
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });
  }, [search, category, gender, priceRange]);

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">The Collection</h1>
            <p className="text-muted-foreground">Discover our curated selection of luxury fragrances</p>
          </motion.div>

          {/* Search & Filter Toggle */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search fragrances..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-card border border-border rounded-full pl-11 pr-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 border border-border rounded-full px-5 py-3 text-sm font-body text-muted-foreground hover:border-gold/40 transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8 p-6 rounded-lg border border-border bg-card space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-body text-sm font-semibold uppercase tracking-wider">Filters</h3>
                <button onClick={() => { setCategory("all"); setGender("all"); setPriceRange(0); }} className="text-xs text-gold hover:underline">Clear All</button>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip active={category === "all"} onClick={() => setCategory("all")}>All</FilterChip>
                  {categories.map(c => (
                    <FilterChip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>{c.name}</FilterChip>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Gender</p>
                <div className="flex flex-wrap gap-2">
                  {genders.map(g => (
                    <FilterChip key={g} active={gender === g} onClick={() => setGender(g)}>{g === "all" ? "All" : g.charAt(0).toUpperCase() + g.slice(1)}</FilterChip>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Price</p>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((r, i) => (
                    <FilterChip key={r.label} active={priceRange === i} onClick={() => setPriceRange(i)}>{r.label}</FilterChip>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No fragrances found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-body tracking-wide transition-all duration-300 ${
        active ? "bg-gold text-primary-foreground" : "border border-border text-muted-foreground hover:border-gold/40"
      }`}
    >
      {children}
    </button>
  );
}
