import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Home, Baby, Infinity as InfinityIcon } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface Chapter4Props {
  onNext: () => void;
}

export const Chapter4: React.FC<Chapter4Props> = ({ onNext }) => {
  const c4 = loveStoryConfig.chapter4;
  const [activeDreamIndex, setActiveDreamIndex] = useState<number>(0);

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
        return <InfinityIcon className="w-5 h-5 text-amber-300" />;
      case 2:
        return <Baby className="w-5 h-5 text-pink-300" />;
      case 3:
        return <Home className="w-5 h-5 text-rose-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-purple-300 font-cinzel">
          {c4.title}
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wider mt-1">
          {c4.subtitle}
        </h2>
        <p className="font-handwriting text-lg text-rose-300/80 mt-0.5">
          Touch each glowing star to reveal what we are building together 💫
        </p>
      </motion.div>

      {/* Interactive Three Glowing Constellation Stars */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
        {c4.dreams.map((dream, idx) => {
          const isActive = activeDreamIndex === idx;
          return (
            <motion.button
              key={dream.id}
              onClick={() => setActiveDreamIndex(idx)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`relative flex flex-col items-center p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-purple-950/80 to-rose-950/80 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)]'
                  : 'bg-black/50 border-purple-500/30'
              }`}
            >
              {isActive && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              )}
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1.5">
                {getIcon(dream.id)}
              </div>
              <span className="text-xs font-cinzel tracking-wider text-rose-200">
                Dream {idx + 1}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Dream Cinematic Card */}
      <div className="max-w-lg w-full min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDreamIndex}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4 }}
            className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#1c0926]/95 to-[#0e0417]/95 border border-purple-500/40 shadow-2xl backdrop-blur-md text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-xl bg-purple-900/50 border border-purple-400/40">
                {getIcon(c4.dreams[activeDreamIndex].id)}
              </span>
              <div>
                <h3 className="font-serif text-base sm:text-lg text-amber-200 font-semibold">
                  {c4.dreams[activeDreamIndex].title}
                </h3>
                <p className="text-[11px] text-purple-300 font-cinzel tracking-widest">
                  OUR PROMISE
                </p>
              </div>
            </div>

            <p className="font-serif text-sm sm:text-base text-rose-100 leading-relaxed pl-3 border-l-2 border-amber-400/60">
              "{c4.dreams[activeDreamIndex].description}"
            </p>

            <div className="mt-3 pt-2.5 border-t border-purple-500/20 flex items-center gap-2 text-xs text-rose-300/80 font-serif italic">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {c4.dreams[activeDreamIndex].wish}
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
        Six Months Of Us
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
