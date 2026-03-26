import { motion } from "motion/react";
import { OrnamentedCard } from "./OrnamentedCard";

export function FirstMeetup() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Ornate heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        {/* Top ribbon line */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-gold/80 max-w-[120px]" />
          <span className="text-gold/70 text-sm tracking-widest">❦ ❦ ❦</span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/80 max-w-[120px]" />
        </div>

        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground">
          <span className="text-gold/60 font-dancing text-3xl align-middle mr-2">
            ✦
          </span>
          Our First Meetup
          <span className="text-gold/60 font-dancing text-3xl align-middle ml-2">
            ✦
          </span>
        </h2>

        {/* Bottom ribbon line */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-gold/80 max-w-[120px]" />
          <span className="text-rose-400/70 text-base tracking-widest">
            🌹 ♥ 🌹
          </span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/80 max-w-[120px]" />
        </div>
      </motion.div>

      {/* Rose accents row */}
      <div
        className="flex justify-center gap-4 mb-4 text-2xl select-none"
        aria-hidden
      >
        🌸 🌹 💕 🌹 🌸
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Decorative top border above card */}
        <div className="flex items-center justify-center mb-3">
          <span className="block h-0.5 w-24 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="mx-3 text-gold text-lg">♥</span>
          <span className="block h-0.5 w-24 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <OrnamentedCard className="text-center border-2 border-gold/20">
          {/* Prominent date */}
          <p
            className="font-dancing text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "oklch(0.82 0.14 80)" }}
          >
            ♥ February 10th, 2026 ♥
          </p>

          <div
            className="overflow-hidden rounded-sm shadow-card mx-auto"
            style={{ maxWidth: "520px" }}
          >
            <img
              src="/assets/uploads/1-019d2948-030a-748b-8600-d9ce33d6c14e-1.jpeg"
              alt="Our first meetup"
              className="w-full object-cover block"
            />
          </div>

          <p className="font-cormorant text-2xl text-foreground/85 mt-6 italic">
            The day it all began... ♥
          </p>
        </OrnamentedCard>

        {/* Decorative bottom border below card */}
        <div className="flex items-center justify-center mt-3">
          <span className="block h-0.5 w-24 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="mx-3 text-gold text-lg">♥</span>
          <span className="block h-0.5 w-24 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      </motion.div>

      {/* Rose accents row bottom */}
      <div
        className="flex justify-center gap-4 mt-4 text-2xl select-none"
        aria-hidden
      >
        🌸 💕 🌹 💕 🌸
      </div>
    </section>
  );
}
