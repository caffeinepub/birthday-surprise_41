import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

let activeBirthdayCtx: AudioContext | null = null;

function playHappyBirthday() {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;
  if (activeBirthdayCtx) {
    activeBirthdayCtx.close();
    activeBirthdayCtx = null;
  }
  const ctx = new AudioCtx();
  activeBirthdayCtx = ctx;

  const notes: Record<string, number> = {
    G4: 392.0,
    A4: 440.0,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
  };

  const melody: [string, number][] = [
    ["G4", 0.3],
    ["G4", 0.15],
    ["A4", 0.45],
    ["G4", 0.45],
    ["C5", 0.45],
    ["B4", 0.9],
    ["G4", 0.3],
    ["G4", 0.15],
    ["A4", 0.45],
    ["G4", 0.45],
    ["D5", 0.45],
    ["C5", 0.9],
    ["G4", 0.3],
    ["G4", 0.15],
    ["G5", 0.45],
    ["E5", 0.45],
    ["C5", 0.45],
    ["B4", 0.45],
    ["A4", 0.9],
    ["F5", 0.3],
    ["F5", 0.15],
    ["E5", 0.45],
    ["C5", 0.45],
    ["D5", 0.45],
    ["C5", 1.2],
  ];

  let time = ctx.currentTime + 0.05;
  for (const [note, dur] of melody) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(notes[note], time);
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.9);
    osc.start(time);
    osc.stop(time + dur);
    time += dur + 0.02;
  }
}

function stopBirthdayMelody() {
  if (activeBirthdayCtx) {
    activeBirthdayCtx.close();
    activeBirthdayCtx = null;
  }
}

const CONFETTI_COLORS = [
  "#ff6b9d",
  "#ffd700",
  "#ff4757",
  "#ff7f50",
  "#ff69b4",
  "#ffa500",
  "#ffec8b",
  "#ff1493",
  "#ff6347",
  "#ffb347",
];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.floor(Math.random() * 8),
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
          }}
          initial={{ y: -20, opacity: 1, rotate: p.rotation }}
          animate={{
            y: "100vh",
            opacity: [1, 1, 0],
            rotate: p.rotation + 1080,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    size: 16 + Math.floor(Math.random() * 24),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-0 select-none"
          style={{ left: h.left, fontSize: h.size }}
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ y: "-100vh", opacity: 0 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 2,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

const SPARKLES = [
  { emoji: "✨", id: "sparkle-1" },
  { emoji: "🌟", id: "sparkle-2" },
  { emoji: "💫", id: "sparkle-3" },
  { emoji: "⭐", id: "sparkle-4" },
  { emoji: "🌸", id: "sparkle-5" },
  { emoji: "🎊", id: "sparkle-6" },
  { emoji: "🎉", id: "sparkle-7" },
];

const ORBIT_EMOJIS = [
  { emoji: "🌸", id: "orbit-1" },
  { emoji: "📛", id: "orbit-2" },
  { emoji: "🎉", id: "orbit-3" },
  { emoji: "💕", id: "orbit-4" },
  { emoji: "⭐", id: "orbit-5" },
  { emoji: "🌟", id: "orbit-6" },
];

const BOUNCE_EMOJIS = [
  { emoji: "🎉", id: "bounce-1" },
  { emoji: "✨", id: "bounce-2" },
  { emoji: "💕", id: "bounce-3" },
  { emoji: "🌟", id: "bounce-4" },
  { emoji: "🎊", id: "bounce-5" },
];

function DecorativeSparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {SPARKLES.map((s, i) => (
        <motion.span
          key={s.id}
          className="absolute text-2xl select-none"
          style={{
            top: `${10 + (i % 3) * 30}%`,
            left: i < 4 ? `${-5 + i * 3}%` : `${88 + (i - 4) * 4}%`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 20, -20, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export function CakeButton() {
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    // Stop background music
    window.dispatchEvent(new CustomEvent("stopBackgroundMusic"));
    playHappyBirthday();
    setClicked(true);
    setTimeout(() => setShowModal(true), 200);
  }, []);

  const handleClose = useCallback(() => {
    stopBirthdayMelody();
    setShowModal(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("resumeBackgroundMusic"));
    }, 300);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <section className="py-16 px-4 flex flex-col items-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.85 0.08 50 / 0.4) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 relative"
      >
        <p className="font-dancing text-2xl text-primary mb-2">
          — A Special Surprise Just for You —
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl text-foreground">
          Press the Magic Cake 🎂
        </h2>
      </motion.div>

      <div
        ref={buttonRef}
        className="relative flex items-center justify-center"
      >
        <DecorativeSparkles />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: 220,
            height: 220,
            background:
              "conic-gradient(from 0deg, oklch(0.75 0.15 20), oklch(0.78 0.12 65), oklch(0.72 0.14 340), oklch(0.75 0.15 20))",
            filter: "blur(8px)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute rounded-full border-4"
          style={{
            width: 200,
            height: 200,
            borderColor: "oklch(0.75 0.15 20 / 0.5)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.button
          data-ocid="cake.primary_button"
          onClick={handleClick}
          className="relative z-10 flex flex-col items-center justify-center gap-1 font-playfair font-bold text-white cursor-pointer select-none"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, oklch(0.78 0.15 20), oklch(0.55 0.13 10))",
            boxShadow:
              "0 0 30px oklch(0.7 0.15 20 / 0.6), inset 0 2px 8px oklch(0.9 0.05 20 / 0.4)",
            border: "3px solid oklch(0.85 0.08 65)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={
            clicked ? { scale: [1, 1.2, 0.9, 1.1, 1] } : { scale: [1, 1.03, 1] }
          }
          transition={
            clicked
              ? { duration: 0.5 }
              : { duration: 2.5, repeat: Number.POSITIVE_INFINITY }
          }
        >
          <span style={{ fontSize: 52 }}>🎂</span>
          <span
            className="text-xs tracking-wide"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            Click to Celebrate!
          </span>
        </motion.button>

        {ORBIT_EMOJIS.map((item, i) => (
          <motion.span
            key={item.id}
            className="absolute select-none pointer-events-none"
            style={{ fontSize: 22 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: (i / 6) * 10,
            }}
          >
            <span
              style={{
                display: "block",
                transform: `translateY(-${110 + i * 5}px)`,
              }}
            >
              {item.emoji}
            </span>
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "oklch(0.1 0.03 350 / 0.92)",
              backdropFilter: "blur(6px)",
            }}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <Confetti />
            <FloatingHearts />

            <motion.div
              className="relative z-10 text-center max-w-lg w-full mx-auto rounded-3xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.2 0.05 350), oklch(0.15 0.04 20), oklch(0.18 0.06 340))",
                border: "2px solid oklch(0.75 0.12 65 / 0.5)",
                boxShadow:
                  "0 0 60px oklch(0.6 0.2 20 / 0.4), 0 0 120px oklch(0.55 0.15 350 / 0.2)",
              }}
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className="h-2 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.75 0.15 20), oklch(0.78 0.12 65), oklch(0.72 0.14 340), oklch(0.78 0.12 65), oklch(0.75 0.15 20))",
                }}
              />

              <div className="px-8 py-10">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  🎂
                </motion.div>

                <motion.h2
                  className="font-playfair text-3xl md:text-4xl font-bold mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffd700, #ffb347, #ff69b4, #ffd700)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% auto",
                  }}
                  animate={{ backgroundPosition: ["0% center", "200% center"] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  Happy Birthday, Sumit!
                </motion.h2>

                <div className="flex justify-center gap-1 text-2xl mb-6">
                  {BOUNCE_EMOJIS.map((item, i) => (
                    <motion.span
                      key={item.id}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.15,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      {item.emoji}
                    </motion.span>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "oklch(0.25 0.04 20 / 0.5)",
                    border: "1px solid oklch(0.75 0.12 65 / 0.3)",
                  }}
                >
                  <p
                    className="font-cormorant text-lg leading-relaxed"
                    style={{ color: "oklch(0.95 0.02 75)" }}
                  >
                    Wishing you all the love, laughter, and happiness in the
                    world! Today is <em>YOUR</em> special day — celebrate it
                    fully, my dearest!
                  </p>
                  <p
                    className="font-cormorant text-base mt-3 italic"
                    style={{ color: "oklch(0.85 0.06 65)" }}
                  >
                    You are my whole world, Sumit... Aaj ka din sirf tumhara hai
                    ♥
                  </p>
                  <p
                    className="font-dancing text-xl mt-4"
                    style={{ color: "oklch(0.78 0.14 20)" }}
                  >
                    — With all my love, Kanchan 💕
                  </p>
                </div>

                <motion.button
                  data-ocid="cake.close_button"
                  onClick={handleClose}
                  className="font-playfair font-semibold text-sm tracking-widest uppercase px-8 py-3 rounded-full cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.12 20), oklch(0.55 0.1 10))",
                    color: "oklch(0.97 0.005 75)",
                    border: "1px solid oklch(0.78 0.12 65 / 0.5)",
                    boxShadow: "0 4px 20px oklch(0.6 0.15 20 / 0.4)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close ♥
                </motion.button>
              </div>

              <div
                className="h-2 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.14 340), oklch(0.78 0.12 65), oklch(0.75 0.15 20), oklch(0.78 0.12 65), oklch(0.72 0.14 340))",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
