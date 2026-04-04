import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const questions = [
  {
    id: "q1",
    question: "Are you happy to have me as your wife?",
    isSpecial: true,
  },
  {
    id: "q2",
    question: "What was your first impression of me, and how has it changed?",
    isSpecial: false,
  },
  {
    id: "q3",
    question: "When did you first realize you were falling in love with me?",
    isSpecial: false,
  },
  {
    id: "q4",
    question: "What is your favorite romantic gesture I have done for you?",
    isSpecial: false,
  },
  {
    id: "q5",
    question: "How can I best support you in your goals?",
    isSpecial: false,
  },
  {
    id: "q6",
    question: "How do you think we can keep the passion alive in our marriage?",
    isSpecial: false,
  },
  {
    id: "q7",
    question: "Is there anything I can do to make you feel more appreciated?",
    isSpecial: false,
  },
  {
    id: "q8",
    question:
      "How do you think we can best communicate our emotions to each other?",
    isSpecial: false,
  },
  {
    id: "q9",
    question: "How sure are you that you should get married to me, out of 100?",
    isSpecial: true,
  },
];

const POSITIVE_KEYWORDS = [
  "haan",
  "hah",
  "yes",
  "ha",
  "bilkul",
  "zaroor",
  "of course",
  "definitely",
  "sure",
  "absolutely",
  "always",
  "hamesha",
  "100",
  "99",
  "98",
  "97",
  "96",
  "95",
  "90",
  "80",
  "70",
  "love",
  "pyaar",
  "happy",
  "khush",
  "perfect",
  "great",
  "amazing",
  "wonderful",
  "best",
  "beautiful",
];

function isPositiveAnswer(text: string): boolean {
  const lower = text.toLowerCase();
  return POSITIVE_KEYWORDS.some((kw) => lower.includes(kw));
}

const floatingEmojis = ["♥", "✨", "🌹", "💫", "🌸", "💕", "✦"];

function RomanticDecor({ show }: { show: boolean }) {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: floatingEmojis[i % floatingEmojis.length],
    left: `${5 + Math.floor((i * 89) % 90)}%`,
    delay: (i * 0.12) % 1.8,
    duration: 2.2 + (i % 5) * 0.4,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="decor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 overflow-hidden z-20"
        >
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-rose-400 text-lg select-none"
              style={{ left: p.left, bottom: 0 }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: ["-10px", "-220px"],
                opacity: [0, 1, 0.8, 0],
                scale: [0.7, 1.2, 0.9, 0.6],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: 4,
                repeatDelay: 0.5,
                ease: "easeOut",
              }}
            >
              {p.emoji}
            </motion.span>
          ))}

          {/* Glowing ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.6, 0] }}
            transition={{ duration: 2.5, repeat: 2, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.82 0.14 10 / 0.18) 0%, transparent 70%)",
              boxShadow: "0 0 40px 8px oklch(0.72 0.2 10 / 0.25)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuestionCard({ q }: { q: (typeof questions)[0] }) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showDecor, setShowDecor] = useState(false);
  const [isPositive, setIsPositive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleSubmit() {
    if (!answer.trim()) return;
    const positive = isPositiveAnswer(answer);
    setIsPositive(positive);
    setSubmitted(true);
    if (positive) {
      setShowDecor(true);
      timerRef.current = setTimeout(() => setShowDecor(false), 6000);
    }
  }

  function handleEdit() {
    setSubmitted(false);
    setShowDecor(false);
    setIsPositive(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-rose-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-sm overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,245,248,0.95) 100%)",
        boxShadow:
          isPositive && submitted
            ? "0 0 0 2px oklch(0.72 0.2 10 / 0.35), 0 8px 32px oklch(0.72 0.2 10 / 0.18)"
            : "0 2px 16px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.5s ease",
      }}
    >
      <RomanticDecor show={showDecor} />

      {/* Question */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-rose-400 text-xl mt-0.5 flex-shrink-0">♥</span>
        <p className="font-playfair text-lg text-gray-800 leading-snug">
          {q.question}
        </p>
      </div>

      {/* Answer area */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Apna jawab yahan likhein..."
              rows={3}
              className="w-full rounded-xl border border-rose-200 bg-white/70 px-4 py-3 text-sm font-dancing text-xl text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg, #e83e5a 0%, #c0256e 100%)",
                boxShadow: answer.trim()
                  ? "0 4px 14px rgba(200,40,100,0.35)"
                  : "none",
              }}
            >
              Submit ♥
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div
              className="rounded-xl px-5 py-4 mb-3 relative"
              style={{
                background: isPositive
                  ? "linear-gradient(135deg, rgba(255,240,246,0.95) 0%, rgba(255,220,235,0.9) 100%)"
                  : "rgba(248,248,248,0.95)",
                border: isPositive
                  ? "1.5px solid rgba(220,80,120,0.3)"
                  : "1px solid rgba(200,200,200,0.4)",
              }}
            >
              {isPositive && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl"
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.2, repeat: 3, ease: "easeInOut" }}
                >
                  💕
                </motion.div>
              )}
              <p className="font-dancing text-xl text-gray-700 leading-relaxed whitespace-pre-wrap mt-2">
                {answer}
              </p>
              {isPositive && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-sm font-playfair italic text-rose-500 text-center"
                >
                  ✨ Yeh jawab sun kar dil khush ho gaya... ♥
                </motion.p>
              )}
            </div>
            <button
              type="button"
              onClick={handleEdit}
              className="text-xs text-gray-400 hover:text-rose-400 transition underline"
            >
              Edit jawab
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function QuestionAnswer() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <p className="font-dancing text-2xl text-rose-400 mb-1">✨ 🌹 ✨</p>
          <h2 className="font-playfair text-3xl font-semibold text-foreground mb-1">
            Questions for My Love
          </h2>
          <div className="w-16 h-0.5 bg-rose-300 mx-auto mb-3" />
          <p className="font-dancing text-xl text-gray-500">
            Yeh sawal dil se hain... jawab bhi dil se dena ♥
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {questions.map((q) => (
          <QuestionCard key={q.id} q={q} />
        ))}
      </div>
    </section>
  );
}
