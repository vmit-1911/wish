import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, ArrowRight, Heart } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface Chapter5Props {
  onNext: () => void;
}

export const Chapter5: React.FC<Chapter5Props> = ({ onNext }) => {
  const c5 = loveStoryConfig.chapter5;
  const [litCandles, setLitCandles] = useState<boolean[]>([true, false, false, false, false, false]);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const handleCandleClick = (index: number) => {
    const updated = [...litCandles];
    updated[index] = true;
    setLitCandles(updated);
    setSelectedMonth(index);
  };

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-rose-400 font-cinzel">
          {c5.title}
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wider mt-1">
          {c5.subtitle}
        </h2>
        <p className="font-handwriting text-lg text-rose-300/80 mt-0.5">
          Touch each candle to ignite that month's flame 🕯️
        </p>
      </motion.div>

      {/* Six Interactive Candles Row */}
      <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-5 max-w-lg w-full mb-6">
        {c5.months.map((m, idx) => {
          const isLit = litCandles[idx];
          const isSelected = selectedMonth === idx;

          return (
            <motion.div
              key={m.monthNumber}
              onClick={() => handleCandleClick(idx)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`flex flex-col items-center cursor-pointer p-1.5 rounded-2xl transition-all ${
                isSelected ? 'bg-rose-950/40 border border-amber-500/40' : ''
              }`}
            >
              <div className="h-8 flex items-center justify-center relative">
                {isLit ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 0.95, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="absolute w-5 h-5 rounded-full bg-amber-400/40 blur-md animate-pulse" />
                    <Flame className="w-5 h-5 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                  </motion.div>
                ) : (
                  <div className="w-1 h-2.5 bg-stone-500 rounded-full" />
                )}
              </div>

              <div
                className={`w-9 sm:w-10 rounded-t-lg rounded-b-md border transition-all flex flex-col justify-end items-center pb-1.5 ${
                  isLit
                    ? 'h-20 sm:h-24 bg-gradient-to-b from-rose-800 via-rose-900 to-amber-950 border-amber-400/50 shadow-[0_0_18px_rgba(245,158,11,0.35)]'
                    : 'h-20 sm:h-24 bg-stone-900 border-stone-800 opacity-60'
                }`}
              >
                <span className="text-xs font-cinzel font-bold text-amber-200">
                  M{m.monthNumber}
                </span>
              </div>

              <span className="text-[10px] text-rose-300/70 font-cinzel mt-1.5">
                Month {m.monthNumber}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Lit Message Card */}
      <div className="max-w-lg w-full min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMonth}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#220d18]/95 to-[#12050e]/95 border border-rose-500/30 shadow-2xl backdrop-blur-md text-left"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-rose-500/20 mb-2.5">
              <h3 className="font-serif text-base sm:text-lg font-bold text-amber-300">
                {c5.months[selectedMonth].title}
              </h3>
              <span className="text-xs text-rose-300 font-cinzel flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                {litCandles[selectedMonth] ? 'Flame Ignited' : 'Tap candle to light'}
              </span>
            </div>

            <p className="font-serif text-sm text-rose-100 leading-relaxed mb-2.5">
              {c5.months[selectedMonth].reflection}
            </p>

            <div className="text-xs text-amber-300/90 font-serif italic flex items-center gap-1.5 pt-2 border-t border-rose-500/15">
              <Sparkles className="w-3 h-3" />
              Highlight: {c5.months[selectedMonth].highlight}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 text-white font-medium text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(244,63,94,0.4)] flex items-center gap-2 cursor-pointer"
      >
        Our Forever Celebration
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
