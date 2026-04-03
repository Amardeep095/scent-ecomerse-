import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Layout from "@/components/Layout";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Sign in to your Lumière account" : "Join the world of Lumière"}
              </p>
            </div>

            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              {!isLogin && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Full Name</label>
                  <input type="text" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" placeholder="Your full name" />
                </div>
              )}
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Email</label>
                <input type="email" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} className="w-full bg-card border border-border rounded-lg px-4 py-3 pr-11 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full gradient-gold text-primary-foreground py-3.5 rounded-full font-body font-semibold tracking-wide hover:scale-[1.01] transition-transform">
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-gold hover:underline">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
