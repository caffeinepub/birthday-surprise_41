import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-romantic.dim_1200x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      <div className="absolute inset-4 border border-white/20 pointer-events-none" />
      <div className="absolute inset-[18px] border border-white/10 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16 w-full">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-dancing text-gold text-2xl mb-2"
          >
            A Special Day for a Special Man
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            Happy Birthday,
            <br />
            <span className="italic">Sumit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-cormorant text-white/85 text-xl leading-relaxed"
          >
            Every moment with you is a treasure I hold dear. Today, I celebrate
            the most wonderful person in my world. — With love, Kanchan
          </motion.p>
        </div>
      </div>
    </section>
  );
}
