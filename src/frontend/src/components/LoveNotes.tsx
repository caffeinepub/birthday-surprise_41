import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { OrnamentedCard } from "./OrnamentedCard";

const notes = [
  {
    id: "note1",
    text: "Aap ke bina yeh zindagi adhoori thi... aap aaye aur sab mukammal ho gaya. \u2665",
  },
  {
    id: "poem1",
    text: "Zindagi ki raahon mein bhatak rahe the hum,\nAap mile toh manzil ka pata mil gaya...\n\nAaj aap k din par ek vaada chahti hoon,\nKya hamesha ke liye mujhe aap ka saath mil gaya? \u2665",
  },
  {
    id: "note3",
    text: "Jab bhi main kho jaati hoon, aap ki yaad mujhe raasta dikhati hai \u2014 aap meri manzil bhi hain, aur saathi bhi.",
  },
  {
    id: "note4",
    text: "Aap ki ek muskaan meri poori duniya roshan kar deti hai \u2014 aur main chahti hoon ki aap hamesha muskurate rahein.",
  },
  {
    id: "note5",
    text: "Main aap se pyaar karti hoon \u2014 aaj bhi, kal bhi, aur jab tak saansein hain, hamesha.",
  },
  {
    id: "note6",
    text: "Aap meri sabse khoobsurat dua hain jo kabhi poori hui. Shukriya mere zindagi mein aane ke liye.",
  },
  {
    id: "note7",
    text: "Har subah aap ki soch ke saath shuru hoti hai, aur har raat aap ki yaad ke saath khatam \u2014 aur isi mein meri khushi hai.",
  },
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
              key={note.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-3 p-4 bg-background rounded-sm border border-border"
            >
              <Heart
                className="text-primary mt-1 flex-shrink-0"
                size={16}
                fill="currentColor"
              />
              <p className="font-dancing text-xl text-foreground leading-snug whitespace-pre-line">
                {note.text}
              </p>
            </motion.div>
          ))}
        </div>
      </OrnamentedCard>
    </section>
  );
}
