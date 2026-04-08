import { motion } from "motion/react";
import { OrnamentedCard } from "./OrnamentedCard";

export function FirstProposal() {
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
          <span className="text-gold/70 text-sm tracking-widest">❦ 💍 ❦</span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/80 max-w-[120px]" />
        </div>

        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground">
          <span className="text-gold/60 font-dancing text-3xl align-middle mr-2">
            ✦
          </span>
          Our First Proposal 💍
          <span className="text-gold/60 font-dancing text-3xl align-middle ml-2">
            ✦
          </span>
        </h2>

        {/* Bottom ribbon line */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-gold/80 max-w-[120px]" />
          <span className="text-rose-400/70 text-base tracking-widest">
            💍 ♥ 💍
          </span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/50 to-gold/80 max-w-[120px]" />
        </div>
      </motion.div>

      {/* Rose accents row */}
      <div
        className="flex justify-center gap-4 mb-4 text-2xl select-none"
        aria-hidden
      >
        🌸 💍 💕 💍 🌸
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
            ♥ April 7th, 2026 ♥
          </p>

          <div
            className="overflow-hidden rounded-sm shadow-card mx-auto"
            style={{ maxWidth: "520px" }}
          >
            <img
              src="/assets/uploads/whatsapp_image_2026-04-08_at_8.15.55_pm-019d6da8-d1ca-70d5-a180-dec13b645e7b.jpeg"
              alt="Our first proposal — WhatsApp chat screenshot"
              className="w-full object-cover block"
            />
          </div>

          <p className="font-cormorant text-2xl text-foreground/85 mt-6 italic">
            The moment our forever began... 💍♥
          </p>

          {/* Romantic exchange text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 mx-auto max-w-lg space-y-3 text-left px-2"
          >
            <p
              className="font-dancing text-lg md:text-xl italic leading-relaxed"
              style={{ color: "oklch(0.70 0.18 0)" }}
            >
              <span className="font-semibold not-italic">Kanchan:</span> "Dil
              Bhi Aap k, Haan Bhi Aap k, Jaan Bhi Aap k...{" "}
              <span style={{ color: "oklch(0.75 0.20 15)" }}>
                I Love you Soooo Much Forever ♥
              </span>
              "
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/60 max-w-[80px]" />
              <span className="text-rose-400/60 text-sm">♥</span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/60 max-w-[80px]" />
            </div>
            <p
              className="font-dancing text-lg md:text-xl italic leading-relaxed"
              style={{ color: "oklch(0.70 0.18 0)" }}
            >
              <span className="font-semibold not-italic">Sumit:</span> "Mera dil
              bhi aapka, hum bhi aapke hi, meri zindagi bhi aapki,{" "}
              <span style={{ color: "oklch(0.75 0.20 15)" }}>
                I love you too ♥
              </span>
              "
            </p>
          </motion.div>
        </OrnamentedCard>

        {/* Decorative bottom border below card */}
        <div className="flex items-center justify-center mt-3">
          <span className="block h-0.5 w-24 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="mx-3 text-gold text-lg">♥</span>
          <span className="block h-0.5 w-24 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      </motion.div>

      {/* Floating hearts row bottom */}
      <div
        className="flex justify-center gap-4 mt-4 text-2xl select-none"
        aria-hidden
      >
        💕 💍 🌹 💍 💕
      </div>
    </section>
  );
}
