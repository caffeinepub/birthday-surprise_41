import { Music, Music2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const triedAutoplay = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      if (triedAutoplay.current) return;
      triedAutoplay.current = true;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const playOnInteraction = () => {
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
                cleanup();
              })
              .catch(() => {});
          };
          const cleanup = () => {
            window.removeEventListener("click", playOnInteraction);
            window.removeEventListener("scroll", playOnInteraction);
            window.removeEventListener("keydown", playOnInteraction);
            window.removeEventListener("touchstart", playOnInteraction);
          };
          window.addEventListener("click", playOnInteraction, { once: true });
          window.addEventListener("scroll", playOnInteraction, { once: true });
          window.addEventListener("keydown", playOnInteraction, { once: true });
          window.addEventListener("touchstart", playOnInteraction, {
            once: true,
          });
        });
    };

    const timer = setTimeout(tryPlay, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStop = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      setIsPlaying(false);
    };
    window.addEventListener("stopBackgroundMusic", handleStop);
    return () => window.removeEventListener("stopBackgroundMusic", handleStop);
  }, []);

  useEffect(() => {
    const handleResume = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };
    window.addEventListener("resumeBackgroundMusic", handleResume);
    return () =>
      window.removeEventListener("resumeBackgroundMusic", handleResume);
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: background music */}
      <audio
        ref={audioRef}
        src="/assets/uploads/rehna_hai_tere_dil_me-019d29e6-2186-769d-ba35-859c2e51894a-1.mp3"
        loop
        preload="auto"
      />
      <div
        data-ocid="music_player.toggle"
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              key="pulse"
              className="absolute inset-0 rounded-full bg-rose-400"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
          )}
        </AnimatePresence>
        <motion.button
          onClick={toggleMusic}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={[
            "relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
            "text-white transition-colors duration-300",
            isPlaying
              ? "bg-gradient-to-br from-rose-500 to-pink-600"
              : "bg-gradient-to-br from-rose-400 to-pink-500",
          ].join(" ")}
          aria-label={isPlaying ? "Pause music" : "Play romantic music"}
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Music2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <Music className="w-6 h-6" />
          )}
        </motion.button>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
        >
          <span className="bg-white/90 text-rose-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-rose-100">
            {isPlaying ? "♫ Playing..." : "🎵 Play Music"}
          </span>
        </motion.div>
      </div>
    </>
  );
}
