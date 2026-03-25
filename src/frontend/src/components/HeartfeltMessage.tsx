import { motion } from "motion/react";
import { OrnamentedCard } from "./OrnamentedCard";

export function HeartfeltMessage() {
  return (
    <section id="story" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <OrnamentedCard>
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-1">
              A Heartfelt Message
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-5" />
            <p className="font-cormorant text-lg leading-relaxed text-foreground/90 mb-4">
              My dearest Sumit,
            </p>
            <p className="font-cormorant text-lg leading-relaxed text-foreground/80 mb-4">
              From the moment you walked into my life, you turned ordinary
              moments into extraordinary memories. Your laughter is my favorite
              melody, and your arms are my safest place in this world.
            </p>
            <p className="font-cormorant text-lg leading-relaxed text-foreground/80 mb-4">
              On this special day — born 10th April 1996 — I want you to know
              how deeply you are loved. Not just by me, but by everyone whose
              life you have touched. You are kind, brave, and endlessly
              wonderful.
            </p>
            <p className="font-cormorant text-lg leading-relaxed text-foreground/80 mb-6">
              Here's to another year of adventures, midnight laughs, and quiet
              mornings together. I love you more than words can say.
            </p>
            <p className="font-dancing text-2xl text-primary">
              Forever yours, Kanchan ♥
            </p>
          </OrnamentedCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <div className="relative">
            <div className="absolute inset-0 border border-border translate-x-3 translate-y-3" />
            <img
              src="/assets/generated/portrait-wife.dim_300x400.jpg"
              alt="A loving portrait"
              className="relative w-full object-cover shadow-card"
              style={{ maxHeight: "420px" }}
            />
          </div>
          <OrnamentedCard className="text-center">
            <p className="font-dancing text-3xl text-primary mb-1">
              Kanchan & Sumit
            </p>
            <p className="font-cormorant text-muted-foreground tracking-widest text-sm uppercase">
              Together & In Love
            </p>
          </OrnamentedCard>
        </motion.div>
      </div>
    </section>
  );
}
