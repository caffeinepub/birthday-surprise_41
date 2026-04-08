import { useGetAllReplies, useSaveReply } from "@/hooks/useQueries";
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

// ─── Surprise Blast ──────────────────────────────────────────────────────────
const CONFETTI_COUNT = 55;
const SPARKLE_COUNT = 22;
const HEART_COUNT = 14;

const CONFETTI_COLORS = [
  "#ff3d6e",
  "#ff9bcb",
  "#ffd700",
  "#ff6eb4",
  "#fff0f5",
  "#ff4fa0",
  "#ffe066",
  "#d946ef",
  "#fb7185",
  "#f9a8d4",
  "#fbbf24",
  "#e879f9",
];
const CONFETTI_SHAPES = ["rect", "circle", "strip"] as const;

interface BlastParticle {
  id: number;
  type: "confetti" | "sparkle" | "heart";
  x: number; // vw % from center
  y: number; // vh % from center
  color: string;
  angle: number; // deg
  dist: number; // travel distance in vw
  size: number;
  rot: number; // end rotation deg
  dur: number; // seconds
  delay: number;
  shape?: (typeof CONFETTI_SHAPES)[number];
  symbol?: string;
}

function buildBlastParticles(): BlastParticle[] {
  const particles: BlastParticle[] = [];
  let id = 0;

  // Confetti pieces — scatter in all directions
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const angle = Math.random() * 360;
    const dist = 18 + Math.random() * 42; // 18–60 vw
    const rad = (angle * Math.PI) / 180;
    particles.push({
      id: id++,
      type: "confetti",
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      angle,
      dist,
      size: 6 + Math.random() * 10,
      rot:
        360 *
        (1 + Math.floor(Math.random() * 3)) *
        (Math.random() > 0.5 ? 1 : -1),
      dur: 1.4 + Math.random() * 1.2,
      delay: Math.random() * 0.15,
      shape:
        CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
    });
  }

  // Sparkle stars
  for (let i = 0; i < SPARKLE_COUNT; i++) {
    const angle = Math.random() * 360;
    const dist = 8 + Math.random() * 30;
    const rad = (angle * Math.PI) / 180;
    particles.push({
      id: id++,
      type: "sparkle",
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      color: i % 3 === 0 ? "#fff7ae" : i % 3 === 1 ? "#ffd700" : "#fffbe6",
      angle,
      dist,
      size: 10 + Math.random() * 14,
      rot: 0,
      dur: 0.9 + Math.random() * 0.8,
      delay: Math.random() * 0.2,
      symbol: ["✦", "✧", "★", "✨", "⭐"][Math.floor(Math.random() * 5)],
    });
  }

  // Hearts
  for (let i = 0; i < HEART_COUNT; i++) {
    const angle = Math.random() * 360;
    const dist = 10 + Math.random() * 25;
    const rad = (angle * Math.PI) / 180;
    particles.push({
      id: id++,
      type: "heart",
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      color: ["#ff3d6e", "#ff6eb4", "#ffd700", "#d946ef", "#fb7185"][
        Math.floor(Math.random() * 5)
      ],
      angle,
      dist,
      size: 14 + Math.random() * 16,
      rot: (Math.random() - 0.5) * 60,
      dur: 1.2 + Math.random() * 1.0,
      delay: Math.random() * 0.18,
      symbol: "♥",
    });
  }

  return particles;
}

function ConfettiShape({ p }: { p: BlastParticle }) {
  if (p.shape === "circle") {
    return (
      <div
        style={{
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: p.color,
        }}
      />
    );
  }
  if (p.shape === "strip") {
    return (
      <div
        style={{
          width: p.size * 0.35,
          height: p.size * 2.2,
          borderRadius: 2,
          background: p.color,
        }}
      />
    );
  }
  // rect (default)
  return (
    <div
      style={{
        width: p.size,
        height: p.size * 0.6,
        borderRadius: 2,
        background: p.color,
      }}
    />
  );
}

function SurpriseBlast({ active }: { active: boolean }) {
  const [particles] = useState<BlastParticle[]>(() => buildBlastParticles());
  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 99999 }}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: "-50%",
            y: "-50%",
            opacity: 1,
            scale: 0.4,
            rotate: 0,
          }}
          animate={{
            x: `calc(-50% + ${p.x}vw)`,
            y: `calc(-50% + ${p.y}vh)`,
            opacity: 0,
            scale: p.type === "confetti" ? [0.4, 1.2, 0.8] : [0.4, 1.4, 0.6],
            rotate: p.rot,
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: [0.2, 0.8, 0.4, 1],
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {p.type === "confetti" ? (
            <ConfettiShape p={p} />
          ) : (
            <span
              style={{
                fontSize: p.size,
                color: p.color,
                lineHeight: 1,
                textShadow:
                  p.type === "sparkle"
                    ? `0 0 8px ${p.color}, 0 0 16px ${p.color}`
                    : `0 0 6px ${p.color}`,
                display: "block",
                userSelect: "none",
              }}
            >
              {p.symbol}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

const BG_SONG_SRC =
  "/assets/videoplayback-019d6dc8-71e3-747d-a040-f95e58145707.mp4";
const BG_SONG_VOLUME = 0.3;
const VOICE_SRC = "/assets/my_voice-019d6dee-e1d7-72f2-a626-4108f4b0e457.mp4";

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

// ─── Piano Melody via Web Audio API ─────────────────────────────────────────
// Gentle romantic chord progression: C maj → A min → F maj → G maj
// Each chord plays as soft overlapping sine/triangle tones at low volume
const PIANO_CHORDS: number[][] = [
  [261.63, 329.63, 392.0], // C major  (C4, E4, G4)
  [220.0, 261.63, 329.63], // A minor  (A3, C4, E4)
  [174.61, 220.0, 261.63], // F major  (F3, A3, C4)
  [196.0, 246.94, 293.66], // G major  (G3, B3, D4)
];
const PIANO_CHORD_DURATION = 1.8; // seconds per chord
const PIANO_GAIN = 0.09; // gentle background volume

function startPianoMelody(ctx: AudioContext) {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(PIANO_GAIN, ctx.currentTime + 0.5);
  masterGain.connect(ctx.destination);

  const totalChords = PIANO_CHORDS.length;
  const loopDuration = totalChords * PIANO_CHORD_DURATION;

  const scheduleLoop = (startAt: number) => {
    for (let ci = 0; ci < totalChords; ci++) {
      const chordStart = startAt + ci * PIANO_CHORD_DURATION;
      const chord = PIANO_CHORDS[ci];
      for (let ni = 0; ni < chord.length; ni++) {
        const freq = chord[ni];
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        // Alternate sine/triangle for softer, blended tone
        osc.type = ni === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, chordStart);
        // Soft attack/release envelope per note
        noteGain.gain.setValueAtTime(0, chordStart);
        noteGain.gain.linearRampToValueAtTime(1.0, chordStart + 0.18);
        noteGain.gain.setValueAtTime(
          1.0,
          chordStart + PIANO_CHORD_DURATION * 0.55,
        );
        noteGain.gain.linearRampToValueAtTime(
          0,
          chordStart + PIANO_CHORD_DURATION * 0.95,
        );
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start(chordStart);
        osc.stop(chordStart + PIANO_CHORD_DURATION);
      }
    }
  };

  // Schedule two loops ahead so melody continues seamlessly
  scheduleLoop(ctx.currentTime);
  scheduleLoop(ctx.currentTime + loopDuration);

  // Re-schedule every loopDuration to keep it going
  const intervalId = window.setInterval(() => {
    if (ctx.state === "closed") {
      window.clearInterval(intervalId);
      return;
    }
    scheduleLoop(ctx.currentTime + loopDuration);
  }, loopDuration * 1000);

  return () => window.clearInterval(intervalId);
}

function RomanticPopup({ onClose }: { onClose: () => void }) {
  const [surprisePlaying, setSurprisePlaying] = useState(false);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [showSurpriseBlast, setShowSurpriseBlast] = useState(false);
  const [blastKey, setBlastKey] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [replySaved, setReplySaved] = useState(false);
  const surpriseAudioRef = useRef<HTMLAudioElement>(null);
  const bgSongRef = useRef<HTMLAudioElement>(null);
  const voiceAudioRef = useRef<HTMLAudioElement>(null);
  const pianoCtxRef = useRef<AudioContext | null>(null);
  const pianoCleanupRef = useRef<(() => void) | null>(null);

  const { data: replies = [] } = useGetAllReplies();
  const saveReply = useSaveReply();

  // Set background song volume on mount
  useEffect(() => {
    if (bgSongRef.current) {
      bgSongRef.current.volume = BG_SONG_VOLUME;
    }
    if (voiceAudioRef.current) {
      voiceAudioRef.current.volume = 1.0;
      voiceAudioRef.current.loop = false;
    }
  }, []);

  // Cleanup on unmount — stop all audio including piano
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
      const va = voiceAudioRef.current;
      if (va) {
        va.pause();
        va.currentTime = 0;
      }
      if (pianoCleanupRef.current) pianoCleanupRef.current();
      if (pianoCtxRef.current && pianoCtxRef.current.state !== "closed") {
        pianoCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const stopPiano = () => {
    if (pianoCleanupRef.current) {
      pianoCleanupRef.current();
      pianoCleanupRef.current = null;
    }
    if (pianoCtxRef.current && pianoCtxRef.current.state !== "closed") {
      pianoCtxRef.current.close().catch(() => {});
      pianoCtxRef.current = null;
    }
  };

  const handleSaveReply = async () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;
    try {
      await saveReply.mutateAsync(trimmed);
      setReplyText("");
      setReplySaved(true);
      setTimeout(() => setReplySaved(false), 4000);
    } catch {
      // fail silently — romantic UX, no error toast
    }
  };

  const handleSurprise = () => {
    const audio = surpriseAudioRef.current;
    const bgSong = bgSongRef.current;
    const voice = voiceAudioRef.current;
    if (!audio) return;
    setSurpriseRevealed(true);
    if (!surprisePlaying) {
      // Fire the confetti + sparkle blast (one-shot)
      setBlastKey((k) => k + 1);
      setShowSurpriseBlast(true);
      setTimeout(() => setShowSurpriseBlast(false), 3000);
      // Stop background music
      window.dispatchEvent(new CustomEvent("stopBackgroundMusic"));
      // Start surprise audio
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => setSurprisePlaying(true)).catch(() => {});
      } else {
        setSurprisePlaying(true);
      }
      // Start Kanchan's voice message at full volume
      if (voice) {
        voice.volume = 1.0;
        voice.currentTime = 0;
        voice.play().catch(() => {});
      }
      // Start background MP4 song at low volume
      if (bgSong) {
        bgSong.volume = BG_SONG_VOLUME;
        bgSong.currentTime = 0;
        bgSong.play().catch(() => {});
      }
      // ✨ Start soft romantic piano melody via Web Audio API
      stopPiano(); // clear any previous instance
      try {
        const ctx = new AudioContext();
        pianoCtxRef.current = ctx;
        const cleanup = startPianoMelody(ctx);
        pianoCleanupRef.current = cleanup;
      } catch (_e) {
        // Web Audio not available — fail silently
      }
    } else {
      // Pause surprise audio
      audio.pause();
      audio.currentTime = 0;
      setSurprisePlaying(false);
      // Stop voice
      if (voice) {
        voice.pause();
        voice.currentTime = 0;
      }
      // Stop bg song
      if (bgSong) {
        bgSong.pause();
        bgSong.currentTime = 0;
      }
      // Stop piano melody
      stopPiano();
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
    // Stop voice
    const voice = voiceAudioRef.current;
    if (voice) {
      voice.pause();
      voice.currentTime = 0;
    }
    // Stop bg song
    const bgSong = bgSongRef.current;
    if (bgSong) {
      bgSong.pause();
      bgSong.currentTime = 0;
    }
    // Stop piano melody
    stopPiano();
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
      {/* Hidden voice message from Kanchan */}
      {/* biome-ignore lint/a11y/useMediaCaption: personal voice message */}
      <audio ref={voiceAudioRef} src={VOICE_SRC} preload="auto" playsInline />

      {/* Confetti + sparkle blast on Surprise click */}
      <AnimatePresence>
        {showSurpriseBlast && (
          <SurpriseBlast key={blastKey} active={showSurpriseBlast} />
        )}
      </AnimatePresence>

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
        className="relative max-w-md w-full rounded-3xl text-center overflow-hidden overflow-y-auto"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.18 0.06 5), oklch(0.14 0.04 340))",
          border: "1.5px solid oklch(0.72 0.18 40 / 0.5)",
          boxShadow:
            "0 0 60px oklch(0.65 0.28 5 / 0.35), 0 0 120px oklch(0.55 0.22 5 / 0.15), inset 0 0 40px oklch(0.72 0.18 40 / 0.07)",
          padding: "2.5rem 2rem",
          maxHeight: "90vh",
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
          className="mt-6 flex flex-col items-center gap-3"
        >
          {/* Separator before surprise button */}
          <div className="flex items-center gap-2 w-full">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.72 0.18 40 / 0.4))",
              }}
            />
            <span className="text-yellow-400 text-xs">✦</span>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to left, transparent, oklch(0.72 0.18 40 / 0.4))",
              }}
            />
          </div>

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
                : {
                    boxShadow: [
                      "0 0 8px oklch(0.72 0.22 40 / 0.3)",
                      "0 0 20px oklch(0.72 0.22 40 / 0.6)",
                      "0 0 8px oklch(0.72 0.22 40 / 0.3)",
                    ],
                  }
            }
            transition={{
              duration: surprisePlaying ? 1.4 : 2.0,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="px-8 py-3 rounded-full font-dancing text-xl font-bold transition-all duration-200"
            style={{
              background: surprisePlaying
                ? "linear-gradient(135deg, oklch(0.55 0.22 40), oklch(0.45 0.18 60))"
                : "linear-gradient(135deg, oklch(0.78 0.24 45), oklch(0.65 0.22 55))",
              color: "oklch(0.08 0.02 5)",
              border: "2px solid oklch(0.85 0.20 50 / 0.7)",
              letterSpacing: "0.02em",
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
                className="font-dancing text-base mt-1"
                style={{ color: "oklch(0.82 0.14 45)" }}
              >
                ✨ Yeh sirf aap ke liye hai, Sumit... ♥
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Reply Box (shown after Surprise is clicked) ── */}
        <AnimatePresence>
          {surpriseRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 w-full"
              data-ocid="surprise_reply.section"
            >
              {/* Separator */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, oklch(0.72 0.18 40 / 0.35))",
                  }}
                />
                <span className="text-pink-300 text-xs">✦ ♥ ✦</span>
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, oklch(0.72 0.18 40 / 0.35))",
                  }}
                />
              </div>

              {/* Heading */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-dancing text-xl mb-3"
                style={{ color: "oklch(0.88 0.16 5)" }}
              >
                💌 Aap ka jawab mera tohfa hai...
              </motion.p>

              {/* Textarea */}
              <motion.textarea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                data-ocid="surprise_reply.textarea"
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Yahan aap apna dil ki baat likhein... ♥"
                className="w-full rounded-2xl resize-none text-base font-dancing placeholder:text-pink-300/50 focus:outline-none transition-all duration-200"
                style={{
                  background: "oklch(0.12 0.04 5 / 0.85)",
                  border: "1.5px solid oklch(0.72 0.20 5 / 0.45)",
                  color: "oklch(0.92 0.10 5)",
                  padding: "0.875rem 1.1rem",
                  boxShadow: "0 0 0 0 transparent",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "oklch(0.72 0.20 5 / 0.85)";
                  e.currentTarget.style.boxShadow =
                    "0 0 12px oklch(0.65 0.22 5 / 0.3)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "oklch(0.72 0.20 5 / 0.45)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              {/* Save button + confirmation */}
              <div className="flex items-center justify-between mt-3 gap-3">
                <AnimatePresence>
                  {replySaved && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="font-dancing text-sm flex-1"
                      style={{ color: "oklch(0.82 0.16 140)" }}
                    >
                      ✓ Aap ka jawab save ho gaya... ♥ Kanchan padh legi!
                    </motion.p>
                  )}
                </AnimatePresence>
                <motion.button
                  type="button"
                  data-ocid="surprise_reply.save_button"
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  disabled={saveReply.isPending || !replyText.trim()}
                  onClick={handleSaveReply}
                  className="ml-auto px-6 py-2 rounded-full font-dancing text-base font-semibold transition-all duration-200 disabled:opacity-50"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.22 5), oklch(0.52 0.20 340))",
                    color: "oklch(0.97 0.02 5)",
                    border: "1.5px solid oklch(0.72 0.18 5 / 0.5)",
                    boxShadow: "0 4px 18px oklch(0.55 0.22 5 / 0.35)",
                    flexShrink: 0,
                  }}
                >
                  {saveReply.isPending ? "Saving..." : "Save ♥"}
                </motion.button>
              </div>

              {/* Previously saved replies */}
              {replies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-5 space-y-3 max-h-48 overflow-y-auto pr-1"
                  data-ocid="surprise_reply.replies_list"
                >
                  <p
                    className="font-dancing text-sm mb-2"
                    style={{ color: "oklch(0.72 0.14 40)" }}
                  >
                    ✦ Aap ke baad ke jawaab ✦
                  </p>
                  {[...replies].reverse().map((reply, i) => (
                    <motion.div
                      key={reply.id.toString()}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="rounded-xl px-4 py-3 text-left"
                      style={{
                        background: "oklch(0.14 0.05 5 / 0.7)",
                        border: "1px solid oklch(0.72 0.18 40 / 0.3)",
                      }}
                      data-ocid={`surprise_reply.reply.${i + 1}`}
                    >
                      <p
                        className="font-dancing text-base leading-snug"
                        style={{ color: "oklch(0.88 0.10 5)" }}
                      >
                        "{reply.message}"
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
