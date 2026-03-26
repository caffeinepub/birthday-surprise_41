import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { OrnamentedCard } from "./OrnamentedCard";

const notes = [
  "Zindagi ki raahon mein bhatak rahe the hum, Aap mile toh manzil ka pata mil gaya...",
  "Aaj aap k din par ek vaada chahti hoon, Kya hamesha ke liye mujhe aap ka saath mil gaya?",
  "Your smile is my favorite thing in the whole world.",
  "Coming home to you is the best part of every single day.",
  "You make ordinary Tuesday evenings feel like magic.",
  "You are my greatest adventure and my coziest home.",
];

export function LoveNotes() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-playfair text-3xl font-semibold text-foreground mb-1">
          My Love Notes for You
        </h2>
        <div className="w-16 h-0.5 bg-gold mb-8" />
      </motion.div>

      <OrnamentedCard>
        <div className="grid sm:grid-cols-2 gap-5">
          {notes.map((note) => (
            <motion.div
              key={note}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-3 p-4 bg-background rounded-sm border border-border"
              data-ocid={`notes.item.${notes.indexOf(note) + 1}`}
            >
              <Heart
                className="text-primary mt-1 flex-shrink-0"
                size={16}
                fill="currentColor"
              />
              <p className="font-dancing text-xl text-foreground leading-snug">
                {note}
              </p>
            </motion.div>
          ))}
        </div>
      </OrnamentedCard>
    </section>
  );
}
