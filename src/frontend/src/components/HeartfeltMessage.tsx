import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { OrnamentedCard } from "./OrnamentedCard";

function getRandomNoPosition() {
  const margin = 80;
  const x = Math.random() * (window.innerWidth - margin * 2) + margin;
  const y = Math.random() * (window.innerHeight - margin * 2) + margin;
  return { x, y };
}

const PARTICLES = Array.from({ length: 12 }, (_, i) => i);

function HeartBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <span className="absolute inset-0 pointer-events-none" aria-hidden>
      {PARTICLES.map((i) => {
        const angle = (i / PARTICLES.length) * 360;
        const distance = 48 + Math.random() * 30;
        const dx = Math.cos((angle * Math.PI) / 180) * distance;
        const dy = Math.sin((angle * Math.PI) / 180) * distance;
        const symbols = ["♥", "✦", "✿", "♥"];
        const sym = symbols[i % symbols.length];
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: dx, y: dy, scale: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.03 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400 text-sm font-bold select-none"
            style={{ position: "absolute" }}
          >
            {sym}
          </motion.span>
        );
      })}
    </span>
  );
}

export function HeartfeltMessage() {
  const [yesClicked, setYesClicked] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [noSurrendered, setNoSurrendered] = useState(false);

  const handleNoEscape = useCallback(() => {
    const next = noAttempts + 1;
    setNoAttempts(next);
    if (next >= 3) {
      setNoSurrendered(true);
    } else {
      setNoPosition(getRandomNoPosition());
    }
  }, [noAttempts]);

  const handleYes = () => {
    setYesClicked(true);
    setNoSurrendered(false);
    setBurstKey((k) => k + 1);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 800);
  };

  const isFloating = noPosition !== null && !noSurrendered;

  return (
    <section id="story" className="max-w-6xl mx-auto px-6 py-16">
      {/* Two-column: letter + photos */}
      <div className="grid md:grid-cols-2 gap-8 items-start mb-10">
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
              On this special day, I want you to know how deeply you are loved.
              Not just by me, but by everyone whose life you have touched. You
              are kind, brave, and endlessly wonderful.
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
        >
          <div className="flex gap-0">
            <div className="relative flex-1 overflow-hidden">
              <img
                src="/assets/uploads/kanchan-019d23dd-19ed-7638-97bf-f93342a4eeaf-2.jpeg"
                alt="Kanchan"
                className="w-full h-full object-cover shadow-card"
                style={{ maxHeight: "420px", display: "block" }}
              />
            </div>
            <div className="relative flex-1 overflow-hidden">
              <img
                src="/assets/uploads/image-019d23dd-1388-703a-a5ba-8823a21f8eed-1.jpg"
                alt="Sumit"
                className="w-full h-full object-cover shadow-card"
                style={{ maxHeight: "420px", display: "block" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-width: Kanchan & Sumit poem + buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <OrnamentedCard className="text-center">
          {/* Title block */}
          <div className="mb-2">
            <p
              className="font-dancing text-5xl text-primary pb-2 leading-tight"
              style={{ textShadow: "0 2px 18px oklch(var(--primary) / 0.25)" }}
            >
              Kanchan & Sumit
            </p>
            <span className="inline-block text-primary text-xl leading-none mb-2">
              ♥
            </span>
            <p className="font-cormorant text-lg italic tracking-[0.3em] text-muted-foreground">
              Together & In Love
            </p>
          </div>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4 mb-5" />

          <p className="font-dancing text-lg text-foreground/80 leading-relaxed">
            Zindagi ki raahon mein bhatak rahe the hum,
          </p>
          <p className="font-dancing text-lg text-foreground/80 leading-relaxed">
            Aap mile toh manzil ka pata mil gaya...
          </p>
          <p className="font-dancing text-lg text-foreground/80 leading-relaxed mt-2">
            Aaj aap k din par ek vaada chahti hoon,
          </p>
          <p className="font-dancing text-lg text-primary leading-relaxed">
            Kya hamesha ke liye mujhe aap ka saath mil gaya? ♥
          </p>

          {/* Yes / No interactive section */}
          <div className="mt-6">
            <p className="font-dancing text-xl text-foreground/70 mb-4">
              Sumit ka jawab?
            </p>
            <div className="flex items-center justify-center gap-4">
              {/* Haan button with burst effect */}
              <div className="relative inline-flex">
                <motion.button
                  type="button"
                  data-ocid="answer.primary_button"
                  onClick={handleYes}
                  animate={
                    yesClicked
                      ? {
                          scale: [1, 1.25, 0.95, 1.1, 1],
                          rotate: [0, -6, 6, -3, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  className="relative px-8 py-3 rounded-full font-dancing text-lg font-semibold text-white bg-primary hover:bg-primary/90 shadow-md transition-colors duration-200 active:scale-95 overflow-visible z-10"
                >
                  Haan ♥
                </motion.button>
                <AnimatePresence>
                  {showBurst && (
                    <HeartBurst key={burstKey} active={showBurst} />
                  )}
                </AnimatePresence>
              </div>

              {!noSurrendered && (
                <button
                  type="button"
                  data-ocid="answer.secondary_button"
                  onMouseEnter={handleNoEscape}
                  onTouchStart={handleNoEscape}
                  onClick={(e) => e.preventDefault()}
                  className="px-8 py-3 rounded-full font-dancing text-lg font-semibold text-foreground/50 bg-muted hover:bg-muted/80 border border-border shadow-sm transition-colors duration-150 select-none"
                  style={
                    isFloating
                      ? {
                          position: "fixed",
                          left: noPosition!.x,
                          top: noPosition!.y,
                          transform: "translate(-50%, -50%)",
                          zIndex: 9999,
                          transition: "left 0.15s ease, top 0.15s ease",
                        }
                      : {}
                  }
                >
                  Nahi
                </button>
              )}

              {noSurrendered && !yesClicked && (
                <motion.button
                  type="button"
                  data-ocid="answer.surrender_button"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={handleYes}
                  className="px-8 py-3 rounded-full font-dancing text-lg font-semibold text-white bg-primary shadow-md"
                >
                  Fine... YES! ♥
                </motion.button>
              )}
            </div>

            <AnimatePresence>
              {yesClicked && (
                <motion.div
                  key="yes-message"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-5"
                >
                  <p className="font-dancing text-primary text-xl leading-relaxed">
                    Haan, hamesha ke liye...
                  </p>
                  <p className="font-dancing text-primary text-xl leading-relaxed">
                    Aap ka saath hai aur rahega ♥
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </OrnamentedCard>
      </motion.div>

      {/* New poem: Mere pyaar mein */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <OrnamentedCard className="text-center">
          <span className="inline-block text-primary text-2xl mb-3">♥</span>
          <div className="space-y-3">
            <p className="font-dancing text-xl text-foreground/85 leading-relaxed">
              Mere pyaar mein aur bakiyon ke pyaar mein bahut fark hai...
            </p>
            <div className="w-12 h-px bg-gold/50 mx-auto" />
            <p className="font-dancing text-xl text-foreground/80 leading-relaxed">
              Kyunki log roop dekhte hain...
            </p>
            <p className="font-dancing text-xl text-primary leading-relaxed">
              Aur main dil.
            </p>
            <div className="w-12 h-px bg-gold/50 mx-auto" />
            <p className="font-dancing text-xl text-foreground/80 leading-relaxed">
              Log sapne dekhte hain...
            </p>
            <p className="font-dancing text-xl text-primary leading-relaxed">
              Aur main tumhe.
            </p>
            <div className="w-12 h-px bg-gold/50 mx-auto" />
            <p className="font-dancing text-xl text-foreground/80 leading-relaxed">
              Ek fark aur yeh bhi hai...
            </p>
            <p className="font-dancing text-xl text-foreground/80 leading-relaxed">
              Ki log poori duniya dekhte hain...
            </p>
            <p className="font-dancing text-2xl text-primary leading-relaxed font-bold">
              Aur meri poori duniya... sirf tum... ♥
            </p>
          </div>
        </OrnamentedCard>
      </motion.div>
    </section>
  );
}
