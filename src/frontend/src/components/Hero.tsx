import { motion } from "motion/react";

const floatingHearts = [
  { id: 1, left: "10%", delay: 0, duration: 6 },
  { id: 2, left: "25%", delay: 1.5, duration: 7.5 },
  { id: 3, left: "60%", delay: 0.8, duration: 5.5 },
  { id: 4, left: "78%", delay: 2.2, duration: 8 },
  { id: 5, left: "45%", delay: 3, duration: 6.8 },
];

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
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />
      <div className="absolute inset-4 border border-white/20 pointer-events-none" />
      <div className="absolute inset-[18px] border border-white/10 pointer-events-none" />

      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-rose-300/60 text-2xl pointer-events-none select-none"
          style={{ left: heart.left, bottom: "0px" }}
          animate={{
            y: ["-10px", "-420px"],
            opacity: [0, 0.7, 0.5, 0],
            scale: [0.8, 1.1, 0.9, 0.7],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.span>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16 w-full">
        <div className="max-w-xl">
          {/* Sparkle row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-xl mb-1 tracking-widest"
          >
            ✨ 🌹 ✨
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-dancing text-gold text-2xl mb-2"
          >
            Happy Birthday, My Dear Would-Be Hubby
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            Happy Birthday,
            <br />
            <span
              className="italic"
              style={{
                textShadow:
                  "0 0 18px oklch(0.82 0.14 80 / 0.85), 0 0 40px oklch(0.82 0.14 80 / 0.45), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              Sumit
            </span>
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-dancing text-gold/80 text-xl tracking-widest mb-4"
          >
            ✦ &nbsp;♥&nbsp; ✦
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-cormorant text-white/85 text-xl leading-relaxed"
          >
            Aap mere dil ki har dhadkan mein hain... aaj aur hamesha. Yeh din
            sirf aap ke liye hai, mere pyaar. — With love, Kanchan ♥
          </motion.p>
        </div>
      </div>
    </section>
  );
}
