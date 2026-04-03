import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Plus, Pencil, Trash2, Users, DollarSign, TrendingUp, Menu, X } from "lucide-react";
import { products } from "@/data/products";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const stats = [
  { label: "Total Revenue", value: "$124,580", icon: DollarSign, change: "+12.5%" },
  { label: "Total Orders", value: "1,284", icon: ShoppingCart, change: "+8.2%" },
  { label: "Active Users", value: "3,429", icon: Users, change: "+15.3%" },
  { label: "Growth", value: "+23%", icon: TrendingUp, change: "+4.1%" },
];

const orders = [
  { id: "#ORD-001", customer: "Isabelle Martin", product: "Sultan d'Or", total: "$510", status: "Delivered", date: "Mar 28, 2026" },
  { id: "#ORD-002", customer: "James Roberts", product: "Noir Éternel", total: "$285", status: "Shipped", date: "Mar 29, 2026" },
  { id: "#ORD-003", customer: "Sofia Laurent", product: "Rose Velours", total: "$345", status: "Processing", date: "Mar 30, 2026" },
  { id: "#ORD-004", customer: "Alexander Chen", product: "Bois Sacré", total: "$420", status: "Pending", date: "Mar 31, 2026" },
  { id: "#ORD-005", customer: "Emma Wilson", product: "Vert Paradis", total: "$195", status: "Delivered", date: "Apr 1, 2026" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const statusColor = (status: string) => {
    if (status === "Delivered") return "text-emerald-400";
    if (status === "Shipped") return "text-blue-400";
    if (status === "Processing") return "text-amber-400";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border p-6 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-xl font-bold text-gold">LUMIÈRE</h2>
          <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Admin Panel</p>
        <nav className="space-y-1 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-colors ${
                activeTab === item.id ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </nav>
        <a href="/" className="text-xs text-muted-foreground hover:text-gold transition-colors">← Back to Store</a>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-background/80 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center px-6 gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          <h1 className="font-display text-lg font-semibold capitalize">{activeTab}</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-4">
                      <s.icon className="w-5 h-5 text-gold" />
                      <span className="text-xs text-emerald-400 font-body">{s.change}</span>
                    </div>
                    <p className="font-display text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold mb-4">Recent Orders</h3>
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead className="bg-secondary">
                        <tr>
                          {["Order", "Customer", "Product", "Total", "Status", "Date"].map(h => (
                            <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                            <td className="px-4 py-3 text-gold">{o.id}</td>
                            <td className="px-4 py-3">{o.customer}</td>
                            <td className="px-4 py-3">{o.product}</td>
                            <td className="px-4 py-3">{o.total}</td>
                            <td className={`px-4 py-3 ${statusColor(o.status)}`}>{o.status}</td>
                            <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground text-sm">{products.length} products</p>
                <button className="gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-body font-semibold inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead className="bg-secondary">
                      <tr>
                        {["Product", "Brand", "Category", "Price", "Rating", "Actions"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                              <span className="font-medium">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                          <td className="px-4 py-3"><span className="text-xs border border-border rounded-full px-2 py-0.5 capitalize">{p.category}</span></td>
                          <td className="px-4 py-3 text-gold">${p.price}</td>
                          <td className="px-4 py-3">{p.rating}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-muted-foreground hover:text-gold transition-colors"><Pencil className="w-4 h-4" /></button>
                              <button className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead className="bg-secondary">
                      <tr>
                        {["Order", "Customer", "Product", "Total", "Status", "Date"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                          <td className="px-4 py-3 text-gold">{o.id}</td>
                          <td className="px-4 py-3">{o.customer}</td>
                          <td className="px-4 py-3">{o.product}</td>
                          <td className="px-4 py-3">{o.total}</td>
                          <td className={`px-4 py-3 ${statusColor(o.status)}`}>{o.status}</td>
                          <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={s.label} className="p-6 rounded-lg border border-border bg-card">
                  <s.icon className="w-5 h-5 text-gold mb-4" />
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  <p className="text-xs text-emerald-400 mt-2">{s.change} vs last month</p>
                </div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
