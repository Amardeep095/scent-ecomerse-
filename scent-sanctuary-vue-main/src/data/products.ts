import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import perfume4 from "@/assets/perfume-4.jpg";
import perfume5 from "@/assets/perfume-5.jpg";
import perfume6 from "@/assets/perfume-6.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "woody" | "floral" | "fresh" | "oriental";
  gender: "men" | "women" | "unisex";
  rating: number;
  reviews: number;
  description: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  size: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Noir Éternel",
    brand: "Maison Lumière",
    price: 285,
    originalPrice: 320,
    image: perfume1,
    category: "woody",
    gender: "men",
    rating: 4.8,
    reviews: 124,
    description: "A commanding blend of dark woods and smoky leather, Noir Éternel embodies timeless masculine elegance. This sophisticated fragrance opens with a burst of black pepper and cardamom before settling into a rich heart of oud and cedarwood.",
    notes: { top: ["Black Pepper", "Cardamom", "Bergamot"], middle: ["Oud", "Cedarwood", "Iris"], base: ["Leather", "Amber", "Musk"] },
    size: "100ml",
    inStock: true,
  },
  {
    id: "2",
    name: "Rose Velours",
    brand: "Atelier Fleur",
    price: 345,
    image: perfume2,
    category: "floral",
    gender: "women",
    rating: 4.9,
    reviews: 89,
    description: "An opulent floral masterpiece that captures the essence of a midnight rose garden. Rose Velours wraps you in layers of damask rose, peony, and a whisper of saffron for an unforgettable feminine allure.",
    notes: { top: ["Saffron", "Pink Pepper", "Pear"], middle: ["Damask Rose", "Peony", "Jasmine"], base: ["Sandalwood", "Vanilla", "White Musk"] },
    size: "75ml",
    inStock: true,
  },
  {
    id: "3",
    name: "Bois Sacré",
    brand: "Maison Lumière",
    price: 420,
    image: perfume3,
    category: "woody",
    gender: "unisex",
    rating: 4.7,
    reviews: 67,
    description: "Sacred wood meets mystical incense in this transcendent unisex creation. Bois Sacré is a meditative journey through ancient forests, with rare sandalwood and frankincense at its soul.",
    notes: { top: ["Frankincense", "Elemi", "Citron"], middle: ["Sandalwood", "Guaiac Wood", "Violet Leaf"], base: ["Vetiver", "Benzoin", "Patchouli"] },
    size: "100ml",
    inStock: true,
  },
  {
    id: "4",
    name: "Sultan d'Or",
    brand: "Parfums Royaux",
    price: 510,
    image: perfume4,
    category: "oriental",
    gender: "unisex",
    rating: 4.9,
    reviews: 156,
    description: "An extraordinary oriental treasure inspired by the opulence of ancient palaces. Sultan d'Or weaves threads of rare amber, precious oud, and exotic spices into a tapestry of unmatched luxury.",
    notes: { top: ["Saffron", "Cinnamon", "Rose"], middle: ["Oud", "Amber", "Incense"], base: ["Musk", "Sandalwood", "Vanilla"] },
    size: "50ml",
    inStock: true,
  },
  {
    id: "5",
    name: "Vert Paradis",
    brand: "Jardin Secret",
    price: 195,
    image: perfume5,
    category: "fresh",
    gender: "unisex",
    rating: 4.5,
    reviews: 203,
    description: "A vibrant celebration of nature's freshest essences. Vert Paradis captures the exhilarating feeling of a morning garden drenched in dew, with sparkling citrus and aromatic herbs.",
    notes: { top: ["Bergamot", "Lemon", "Green Apple"], middle: ["Mint", "Basil", "Green Tea"], base: ["White Cedar", "Musk", "Vetiver"] },
    size: "100ml",
    inStock: true,
  },
  {
    id: "6",
    name: "Ombre Noire",
    brand: "Maison Lumière",
    price: 375,
    originalPrice: 410,
    image: perfume6,
    category: "woody",
    gender: "men",
    rating: 4.6,
    reviews: 91,
    description: "Mysterious and magnetic, Ombre Noire is the scent of shadows and sophistication. A daring composition of smoky vetiver, dark tonka, and cold metallic accords that leaves an indelible impression.",
    notes: { top: ["Grapefruit", "Black Pepper", "Metallic Accord"], middle: ["Vetiver", "Geranium", "Lavender"], base: ["Tonka Bean", "Dark Amber", "Leather"] },
    size: "100ml",
    inStock: true,
  },
];

export const categories = [
  { id: "woody", name: "Woody", description: "Deep, warm, and grounding" },
  { id: "floral", name: "Floral", description: "Elegant, romantic, and refined" },
  { id: "fresh", name: "Fresh", description: "Crisp, clean, and invigorating" },
  { id: "oriental", name: "Oriental", description: "Rich, exotic, and sensual" },
];

export const testimonials = [
  { id: 1, name: "Isabelle M.", text: "Sultan d'Or is unlike anything I've ever experienced. It transports you to another world entirely. Pure luxury in a bottle.", rating: 5, product: "Sultan d'Or" },
  { id: 2, name: "James R.", text: "Noir Éternel has become my signature scent. The compliments are endless, and the longevity is incredible.", rating: 5, product: "Noir Éternel" },
  { id: 3, name: "Sofia L.", text: "Rose Velours is the most beautiful floral fragrance I own. It's sophisticated without being overwhelming. Absolute perfection.", rating: 5, product: "Rose Velours" },
];
