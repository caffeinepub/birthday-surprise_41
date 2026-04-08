import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { OrnamentedCard } from "./OrnamentedCard";

function getRandomNoPosition() {
  const margin = 80;
  const x = Math.random() * (window.innerWidth - margin * 2) + margin;
  const y = Math.random() * (window.innerHeight - margin * 2) + margin;
  return { x, y };
}

const PARTICLES = Array.from({ length: 12 }, (_, i) => i);
const FLOAT_HEARTS = Array.from({ length: 14 }, (_, i) => i);

const BG_SONG_SRC =
  "/assets/videoplayback-019d6dc8-71e3-747d-a040-f95e58145707.mp4";
const BG_SONG_VOLUME = 0.3;

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

function RomanticPopup({ onClose }: { onClose: () => void }) {
  const [surprisePlaying, setSurprisePlaying] = useState(false);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const surpriseAudioRef = useRef<HTMLAudioElement>(null);
  const bgSongRef = useRef<HTMLAudioElement>(null);

  // Set background song volume on mount
  useEffect(() => {
    if (bgSongRef.current) {
      bgSongRef.current.volume = BG_SONG_VOLUME;
    }
  }, []);

  // Cleanup on unmount — stop both audios
  useEffect(() => {
    return () => {
      const bg = bgSongRef.current;
      if (bg) {
        bg.pause();
        bg.currentTime = 0;
      }
      const sa = surpriseAudioRef.current;
      if (sa) {
        sa.pause();
        sa.currentTime = 0;
      }
    };
  }, []);

  const handleSurprise = () => {
    const audio = surpriseAudioRef.current;
    const bgSong = bgSongRef.current;
    if (!audio) return;
    setSurpriseRevealed(true);
    if (!surprisePlaying) {
      // Stop background music
      window.dispatchEvent(new CustomEvent("stopBackgroundMusic"));
      // Start surprise audio
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => setSurprisePlaying(true)).catch(() => {});
      } else {
        setSurprisePlaying(true);
      }
      // Start background MP4 song at low volume
      if (bgSong) {
        bgSong.volume = BG_SONG_VOLUME;
        bgSong.currentTime = 0;
        bgSong.play().catch(() => {});
      }
    } else {
      // Pause surprise audio
      audio.pause();
      audio.currentTime = 0;
      setSurprisePlaying(false);
      // Stop bg song
      if (bgSong) {
        bgSong.pause();
        bgSong.currentTime = 0;
      }
      // Resume background music
      window.dispatchEvent(new CustomEvent("resumeBackgroundMusic"));
    }
  };

  const handleClose = () => {
    const audio = surpriseAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    // Stop bg song
    const bgSong = bgSongRef.current;
    if (bgSong) {
      bgSong.pause();
      bgSong.currentTime = 0;
    }
    setSurprisePlaying(false);
    // Resume background music
    window.dispatchEvent(new CustomEvent("resumeBackgroundMusic"));
    onClose();
  };

  return (
    <motion.div
      key="romantic-popup-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: "rgba(10, 0, 20, 0.82)",
        backdropFilter: "blur(8px)",
      }}
      onClick={handleClose}
    >
      {/* Hidden surprise audio */}
      {/* biome-ignore lint/a11y/useMediaCaption: surprise audio */}
      <audio
        ref={surpriseAudioRef}
        src="/assets/whatsapp_audio_2026-04-06_at_12.19.33_pm-019d61a6-68f5-7028-825a-c5acee993653.mp4"
        preload="auto"
        playsInline
      />
      {/* Hidden background song (low volume melody) */}
      {/* biome-ignore lint/a11y/useMediaCaption: background melody */}
      <audio
        ref={bgSongRef}
        src={BG_SONG_SRC}
        preload="auto"
        playsInline
        loop
      />

      {/* Floating hearts background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        {FLOAT_HEARTS.map((i) => {
          const left = 5 + ((i * 6.5) % 92);
          const delay = (i * 0.43) % 4;
          const duration = 4 + ((i * 0.6) % 4);
          const size = 14 + ((i * 7) % 22);
          return (
            <motion.span
              key={i}
              initial={{ y: "110vh", opacity: 0.6 }}
              animate={{ y: "-10vh", opacity: [0.6, 0.9, 0.4, 0] }}
              transition={{
                duration,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute text-pink-300 select-none"
              style={{ left: `${left}%`, bottom: 0, fontSize: size }}
            >
              ♥
            </motion.span>
          );
        })}
      </div>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full rounded-3xl text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.18 0.06 5), oklch(0.14 0.04 340))",
          border: "1.5px solid oklch(0.72 0.18 40 / 0.5)",
          boxShadow:
            "0 0 60px oklch(0.65 0.28 5 / 0.35), 0 0 120px oklch(0.55 0.22 5 / 0.15), inset 0 0 40px oklch(0.72 0.18 40 / 0.07)",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Close button top-right */}
        <button
          type="button"
          data-ocid="romantic_popup.close_button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-pink-300 hover:text-pink-100 transition-colors text-xl leading-none font-bold"
          aria-label="Close"
        >
          ×
        </button>

        {/* Golden divider top */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.72 0.18 40 / 0.7))",
            }}
          />
          <span className="text-yellow-400 text-lg">♥</span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, oklch(0.72 0.18 40 / 0.7))",
            }}
          />
        </div>

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-dancing text-4xl font-bold mb-3"
          style={{
            color: "oklch(0.88 0.18 5)",
            textShadow: "0 2px 20px oklch(0.65 0.28 5 / 0.5)",
          }}
        >
          Haan, hamesha ke liye...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="font-dancing text-2xl mb-4"
          style={{ color: "oklch(0.82 0.12 10)" }}
        >
          Aap ka saath hai aur rahega ♥
        </motion.p>

        {/* Ornament divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex items-center justify-center gap-3 my-5"
        >
          <div
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.72 0.18 40 / 0.6))",
            }}
          />
          <span className="text-yellow-400">✦ ♥ ✦</span>
          <div
            className="h-px w-16"
            style={{
              background:
                "linear-gradient(to left, transparent, oklch(0.72 0.18 40 / 0.6))",
            }}
          />
        </motion.div>

        {/* Romantic lines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="space-y-3"
        >
          <p
            className="font-dancing text-xl"
            style={{ color: "oklch(0.78 0.10 10)" }}
          >
            Aap mere sapno ki duniya hain...
          </p>
          <p
            className="font-dancing text-xl"
            style={{ color: "oklch(0.78 0.10 10)" }}
          >
            Har pal, har lamha... bas aap
          </p>
          <p
            className="font-dancing text-2xl font-bold mt-3"
            style={{
              color: "oklch(0.90 0.20 5)",
              textShadow: "0 2px 12px oklch(0.65 0.28 5 / 0.4)",
            }}
          >
            I Love You, Sumit...
          </p>
          <p
            className="font-dancing text-xl"
            style={{ color: "oklch(0.82 0.14 5)" }}
          >
            Aaj bhi, kal bhi, hamesha ♥
          </p>
        </motion.div>

        {/* Surprise button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6"
        >
          <motion.button
            type="button"
            data-ocid="romantic_popup.surprise_button"
            onClick={handleSurprise}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.06 }}
            animate={
              surprisePlaying
                ? {
                    boxShadow: [
                      "0 0 12px oklch(0.72 0.22 40 / 0.5)",
                      "0 0 28px oklch(0.72 0.22 40 / 0.9)",
                      "0 0 12px oklch(0.72 0.22 40 / 0.5)",
                    ],
                  }
                : {}
            }
            transition={
              surprisePlaying
                ? {
                    duration: 1.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
                : {}
            }
            className="px-7 py-2.5 rounded-full font-dancing text-lg font-semibold transition-all duration-200"
            style={{
              background: surprisePlaying
                ? "linear-gradient(135deg, oklch(0.55 0.22 40), oklch(0.45 0.18 60))"
                : "linear-gradient(135deg, oklch(0.72 0.22 40), oklch(0.60 0.20 55))",
              color: "oklch(0.10 0.02 5)",
              boxShadow: "0 4px 18px oklch(0.65 0.20 40 / 0.45)",
            }}
          >
            {surprisePlaying ? "🎵 Playing... Pause" : "🎁 Surprise for You!"}
          </motion.button>

          {/* Reveal message after clicking surprise */}
          <AnimatePresence>
            {surpriseRevealed && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-dancing text-base mt-3"
                style={{ color: "oklch(0.78 0.12 40)" }}
              >
                ✨ Yeh sirf aap ke liye hai, Sumit... ♥
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom divider */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.72 0.18 40 / 0.7))",
            }}
          />
          <span className="text-yellow-400 text-lg">♥</span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, oklch(0.72 0.18 40 / 0.7))",
            }}
          />
        </div>

        <button
          type="button"
          data-ocid="romantic_popup.close_button"
          onClick={handleClose}
          className="mt-5 px-6 py-2 rounded-full font-dancing text-lg font-semibold transition-all duration-200"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 5), oklch(0.45 0.18 340))",
            color: "oklch(0.96 0.03 5)",
            boxShadow: "0 4px 20px oklch(0.55 0.22 5 / 0.4)",
          }}
        >
          ♥ Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export function HeartfeltMessage() {
  const [yesClicked, setYesClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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
    setShowPopup(true);
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
              Jab se aap mere zindagi mein aaye hain, har subah khoobsurat lagne
              lagi hai. Aap ki muskaan meri sabse badi daulat hai, aur aap ka
              saath meri sabse badi zaroorat — ek zaroorat jo koi lafz poori
              tarah bayan nahi kar sakta.
            </p>
            <p className="font-cormorant text-lg leading-relaxed text-foreground/80 mb-4">
              Aaj is khaas din par, main sirf itna kehna chahti hoon ki aap jo
              hain — woh duniya mein koi nahi. Aap ki aankhen mein jo roshan
              hai, woh mujhe roz naya jeena sikhati hai. Aap ka hona hi meri
              sabse badi khushi hai.
            </p>
            <p className="font-cormorant text-lg leading-relaxed text-foreground/80 mb-6">
              Har sapna ab aap ke saath dekhna chahti hoon... har raat ki neend
              aap ki baahon mein, har subah aap ki awaaz se. Aap hain toh sab
              hai, aap nahi toh kuch nahi. Happy Birthday, mere pyaar. ♥
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
              Aur main aap ko.
            </p>
            <div className="w-12 h-px bg-gold/50 mx-auto" />
            <p className="font-dancing text-xl text-foreground/80 leading-relaxed">
              Ek fark aur yeh bhi hai...
            </p>
            <p className="font-dancing text-xl text-foreground/80 leading-relaxed">
              Ki log poori duniya dekhte hain...
            </p>
            <p className="font-dancing text-2xl text-primary leading-relaxed font-bold">
              Aur meri poori duniya... sirf aap... ♥
            </p>
          </div>
        </OrnamentedCard>
      </motion.div>

      {/* Romantic Popup */}
      <AnimatePresence>
        {showPopup && <RomanticPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </section>
  );
}
