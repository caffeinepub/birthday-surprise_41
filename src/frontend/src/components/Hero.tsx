import { useGetBirthdayDate } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-playfair text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-white/80 text-xs uppercase tracking-widest mt-1 font-cormorant">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const { data: birthdayDate } = useGetBirthdayDate();
  const targetDate =
    birthdayDate && birthdayDate !== "" ? birthdayDate : "2026-04-10";
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-romantic.dim_1200x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      <div className="absolute inset-4 border border-white/20 pointer-events-none" />
      <div className="absolute inset-[18px] border border-white/10 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16 w-full">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-dancing text-gold text-2xl mb-2"
          >
            A Special Day for a Special Man
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            Happy Birthday,
            <br />
            <span className="italic">Sumit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-cormorant text-white/85 text-xl leading-relaxed mb-8"
          >
            Every moment with you is a treasure I hold dear. Today, I celebrate
            the most wonderful person in my world. — With love, Kanchan
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex gap-6 mb-8"
            data-ocid="hero.countdown.panel"
          >
            <CountdownUnit value={timeLeft.days} label="Days" />
            <div className="text-white/50 text-3xl font-light self-start pt-2">
              :
            </div>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <div className="text-white/50 text-3xl font-light self-start pt-2">
              :
            </div>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <div className="text-white/50 text-3xl font-light self-start pt-2">
              :
            </div>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </motion.div>
          <motion.a
            href="#wishes"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            data-ocid="hero.cta.button"
            className="inline-block bg-primary text-primary-foreground font-cormorant tracking-widest uppercase text-sm px-8 py-3 border border-white/20 hover:bg-primary/90 transition-colors"
          >
            Send a Birthday Wish
          </motion.a>
        </div>
      </div>
    </section>
  );
}
