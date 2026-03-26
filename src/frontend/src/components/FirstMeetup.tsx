import { motion } from "motion/react";
import { OrnamentedCard } from "./OrnamentedCard";

export function FirstMeetup() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-playfair text-3xl font-semibold text-foreground mb-1">
          Our First Meetup
        </h2>
        <div className="w-16 h-0.5 bg-gold mb-8" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <OrnamentedCard className="text-center">
          <p className="font-dancing text-2xl text-primary mb-6">
            February 10th, 2026
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
          <p className="font-cormorant text-xl text-foreground/80 mt-6 italic">
            The day it all began... ♥
          </p>
        </OrnamentedCard>
      </motion.div>
    </section>
  );
}
