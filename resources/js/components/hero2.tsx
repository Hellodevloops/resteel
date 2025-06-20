import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from '@inertiajs/react';
const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-slate-950">
      {/* Background Image with overlay effects */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero.jpg')" }}
      >
        {/* Radiant Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t  from-slate-900  via-blue-600/20 to-slate-900 backdrop-blur-xs" />

        {/* Conic Highlighting */}
        <div className="absolute inset-0 bg-gradient-conic from-blue-900 via-transparent to-orange-500 opacity-20 blur-3xl" />

        {/* Subtle Noise/Grain Layer (Optional aesthetic) */}
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        >
         Buy & Sell Used Steel Structures Across <span className="text-orange-500">Europe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 max-w-3xl text-lg md:text-xl text-white/80 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
      From agricultural halls to industrial warehouses — trusted relocation and resale since 2005.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >


          <Link href="/webshop">
            <Button
              size="lg"
              className="bg-orange-600/80 hover:bg-orange-600/90 text-white shadow-lg rounded rounded-10"
            >
              Browse Structures
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="text-slate-800 shadow-md rounded rounded-10"
            >
              Sell Your Property
            </Button>
          </Link>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
