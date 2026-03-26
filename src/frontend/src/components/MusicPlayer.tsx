import { Music, Music2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      {/* Hidden YouTube iframe — visually hidden but not display:none so audio plays */}
      {isPlaying && (
        <iframe
          src="https://www.youtube.com/embed/q0SzJKdXBFo?autoplay=1&loop=1&playlist=q0SzJKdXBFo"
          allow="autoplay"
          width="1"
          height="1"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
          title="Rehna Hai Tere Dil Mein Instrumental"
        />
      )}

      {/* Floating music button */}
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

        {/* Tooltip label */}
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
