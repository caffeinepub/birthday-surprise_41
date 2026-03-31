import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { OrnamentedCard } from "./OrnamentedCard";

const notes = [
  "Zindagi ki raahon mein bhatak rahe the hum, Aap mile toh manzil ka pata mil gaya...",
  "Aaj aap k din par ek vaada chahti hoon, Kya hamesha ke liye mujhe aap ka saath mil gaya?",
  "Aap ki ek muskaan meri poori duniya roshan kar deti hai — aur main chahti hoon ki aap hamesha muskurate rahein.",
  "Jab bhi main kho jaati hoon, aap ki yaad mujhe raasta dikhati hai — aap meri manzil bhi hain, aur saathi bhi.",
  "Aap ke bina yeh zindagi adhoori thi... aap aaye aur sab mukammal ho gaya. ♥",
  "Main aap se pyaar karti hoon — aaj bhi, kal bhi, aur jab tak saansein hain, hamesha.",
  "Aap meri sabse khoobsurat dua hain jo kabhi poori hui. Shukriya mere zindagi mein aane ke liye.",
  "Har subah aap ki soch ke saath shuru hoti hai, aur har raat aap ki yaad ke saath khatam — aur isi mein meri khushi hai.",
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
