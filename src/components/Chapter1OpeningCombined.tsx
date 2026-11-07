import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Infinity as InfinityIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveStoryConfig } from '../config/loveStory';
import { useMusic } from './MusicPlayer';

interface Chapter1OpeningCombinedProps {
  onNext: () => void;
}

export const Chapter1OpeningCombined: React.FC<Chapter1OpeningCombinedProps> = ({ onNext }) => {
  const c1 = loveStoryConfig.chapter1;
  const { startMusic } = useMusic();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ignited, setIgnited] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);

  const startHold = () => {
    if (ignited) return;
    setHolding(true);
    const duration = 1600; // 1.6s touch and hold
    const interval = 20;
    const step = (interval / duration) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          triggerIgnition();
          return 100;
        }
        return prev + step;
      });
    }, interval);
  };

  const endHold = () => {
    if (ignited) return;
    setHolding(false);
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const triggerIgnition = () => {
    setIgnited(true);
    setHolding(false);

    // Start Visiri playback right when the heart ignites
    startMusic();

    // Heart Fireworks & Golden Confetti burst
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f43f5e', '#fb7185', '#fbbf24', '#f59e0b', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fbbf24', '#fda4af'],
      });
    }, 300);
  };

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 py-6 text-center select-none">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial from-rose-950/25 via-[#09030c] to-[#040106] -z-10" />

      <AnimatePresence mode="wait">
        {!ignited ? (
          <motion.div
            key="holding-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center max-w-md w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-serif tracking-[0.2em] text-white uppercase font-bold mb-10"
            >
              THE MOMENT WE CHOOSE FOREVER
            </motion.h1>

            {/* Glowing Interactive Heart with SVG ring */}
            <div
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className="relative p-8 cursor-pointer select-none touch-none group"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping opacity-30" />

              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="74"
                  className="stroke-rose-950/40"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="74"
                  className="stroke-amber-400 transition-all duration-75"
                  strokeWidth="6"
                  strokeDasharray={465}
                  strokeDashoffset={465 - (465 * progress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <motion.div
                animate={{
                  scale: holding ? 1.25 : [1, 1.08, 1],
                  boxShadow: holding
                    ? '0 0 75px rgba(244, 63, 94, 0.95)'
                    : '0 0 40px rgba(244, 63, 94, 0.55)',
                }}
                transition={{
                  scale: holding ? { duration: 0.2 } : { repeat: Infinity, duration: 2.2 },
                }}
                className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#f43f5e] via-[#e11d48] to-[#fb7185] flex items-center justify-center shadow-2xl relative z-10"
              >
                <Heart className="w-16 h-16 text-white fill-white" />
              </motion.div>
            </div>

            <p className="font-handwriting text-2xl text-rose-200 mt-8 tracking-wide">
              {holding ? 'Igniting our love & Visiri...' : 'Touch and Hold the Heart to Ignite Our Fireworks'}
            </p>

            <div className="text-xs text-rose-400/80 uppercase tracking-widest mt-2 flex items-center gap-1.5 font-cinzel">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" /> Hold for 2 seconds
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed-state"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="w-full max-w-lg mx-auto flex flex-col items-center"
          >
            {/* Romantic Forever Bond Illustration Card with Glowing Butterflies & Twin Souls */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative p-5 sm:p-6 bg-gradient-to-b from-[#260f1e]/95 via-[#180713]/95 to-[#0b030b]/95 rounded-3xl border border-rose-500/40 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(244,63,94,0.35)] backdrop-blur-md max-w-sm sm:max-w-md w-full overflow-hidden text-center"
            >
              {/* Atmospheric background glow */}
              <div className="absolute -top-12 -left-12 w-36 h-36 bg-rose-600/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Animated Fluttering Butterflies (SVG) */}
              <div className="absolute top-3 left-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <svg className="w-7 h-7 text-pink-300 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C10.5 2 7 1 4 3s-3.5 6-1 9c1.8 2.2 4.5 3.5 7 3.5v2c-2.5 0-5 1.5-6.5 3.5-1.5 2-1 4.5.5 5.5s4 .5 6-1.5c1.5-1.5 2-3.5 2-5.5 0 2 .5 4 2 5.5 2 2 4.5 2.5 6 1.5s2-3.5.5-5.5c-1.5-2-4-3.5-6.5-3.5v-2c2.5 0 5.2-1.3 7-3.5 2.5-3 2-7-1-9s-6.5-1-8 1.5z"/>
                </svg>
              </div>

              <div className="absolute top-4 right-4 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
                <svg className="w-6 h-6 text-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C10.5 2 7 1 4 3s-3.5 6-1 9c1.8 2.2 4.5 3.5 7 3.5v2c-2.5 0-5 1.5-6.5 3.5-1.5 2-1 4.5.5 5.5s4 .5 6-1.5c1.5-1.5 2-3.5 2-5.5 0 2 .5 4 2 5.5 2 2 4.5 2.5 6 1.5s2-3.5.5-5.5c-1.5-2-4-3.5-6.5-3.5v-2c2.5 0 5.2-1.3 7-3.5 2.5-3 2-7-1-9s-6.5-1-8 1.5z"/>
                </svg>
              </div>

              {/* Milestone Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-[11px] font-cinzel tracking-widest text-amber-300 mb-3">
                <Sparkles className="w-3 h-3 text-amber-300" />
                SIX MONTHS ANNIVERSARY
              </div>

              {/* Glowing Twin Souls Connected by Infinity */}
              <div className="my-2 flex items-center justify-center gap-3">
                {/* Her Soul */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 p-0.5 shadow-[0_0_20px_rgba(244,114,182,0.6)]">
                    <div className="w-full h-full rounded-full bg-[#1b0817] flex items-center justify-center">
                      <Heart className="w-7 h-7 text-pink-400 fill-pink-400 animate-pulse" />
                    </div>
                  </div>
                  <span className="font-handwriting text-sm text-pink-200 mt-1">Prani</span>
                </div>

                {/* Golden Infinity Bond */}
                <div className="flex flex-col items-center px-1">
                  <InfinityIcon className="w-8 h-8 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  <span className="text-[10px] font-cinzel text-amber-300/80 tracking-wider">Soulmates</span>
                </div>

                {/* His Soul */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-[0_0_20px_rgba(244,63,94,0.6)]">
                    <div className="w-full h-full rounded-full bg-[#1b0817] flex items-center justify-center">
                      <Heart className="w-7 h-7 text-rose-400 fill-rose-400 animate-pulse" />
                    </div>
                  </div>
                  <span className="font-handwriting text-sm text-rose-200 mt-1">Mitran</span>
                </div>
              </div>

              {/* Milestone Details: 6 Months, 26 Weeks, 182 Days, 4368 Hours */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-rose-500/20">
                <div className="bg-black/40 rounded-xl p-2 border border-rose-500/20">
                  <div className="font-cinzel text-base font-bold text-amber-300">182</div>
                  <div className="text-[10px] text-rose-200/70 tracking-wider uppercase">Days</div>
                </div>
                <div className="bg-black/40 rounded-xl p-2 border border-rose-500/20">
                  <div className="font-cinzel text-base font-bold text-rose-300">26</div>
                  <div className="text-[10px] text-rose-200/70 tracking-wider uppercase">Weeks</div>
                </div>
                <div className="bg-black/40 rounded-xl p-2 border border-rose-500/20">
                  <div className="font-cinzel text-base font-bold text-pink-300">4,368</div>
                  <div className="text-[10px] text-rose-200/70 tracking-wider uppercase">Hours</div>
                </div>
              </div>

              {/* Crystal Clear High-Contrast Ribbon */}
              <div className="mt-3.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-rose-950/70 via-black to-rose-950/70 border border-amber-400/40 text-center">
                <p className="font-serif font-semibold text-xs sm:text-sm text-amber-300 tracking-wider drop-shadow-sm">
                  Half a Year Down • An Eternity Still Counting... ♾️
                </p>
              </div>
            </motion.div>

            {/* Personalized First Message */}
            <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#180914]/95 to-[#0e040c]/95 border border-rose-500/30 shadow-2xl backdrop-blur-md w-full text-left">
              <div className="font-handwriting text-2xl sm:text-3xl text-rose-300 mb-3 text-center">
                {c1.messageLines[0]}
              </div>

              <div className="space-y-2.5 font-serif text-rose-100/95 text-xs sm:text-sm leading-relaxed tracking-wide">
                {c1.messageLines.slice(1).map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
                    className="border-l-2 border-rose-500/40 pl-3 py-0.5"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <div className="mt-3 pt-2.5 border-t border-rose-500/20 text-right font-script text-xl sm:text-2xl text-amber-300">
                Forever Your Love ♾️
              </div>
            </div>

            {/* Touch to Move to Next Chapter */}
            <motion.button
              onClick={onNext}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 px-8 py-2.5 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 text-white font-medium text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(244,63,94,0.4)] flex items-center gap-2 cursor-pointer"
            >
              Enter Our Memories
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
