import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { useMusic } from './MusicPlayer';

interface Chapter1Props {
  onNext: () => void;
}

export const Chapter1: React.FC<Chapter1Props> = ({ onNext }) => {
  const [opened, setOpened] = useState(false);
  const { startMusic } = useMusic();
  const c1 = loveStoryConfig.chapter1;

  const handleHeartClick = () => {
    startMusic();
    setOpened(true);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 text-center select-none">
      <div className="absolute inset-0 bg-radial from-rose-950/20 via-[#0a050d] to-[#040206] -z-10" />

      {/* Atmospheric glow behind header */}
      <div className="absolute top-1/4 h-72 w-72 rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mb-8"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-rose-400/80 font-cinzel">
          {c1.title}
        </span>
        <h2 className="text-sm font-light text-rose-200/60 tracking-widest mt-1">
          {c1.subtitle}
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="unopened"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center cursor-pointer group"
            onClick={handleHeartClick}
          >
            <div className="relative p-8">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping opacity-30" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-rose-600/20 to-amber-500/20 blur-xl group-hover:scale-125 transition-transform duration-700" />

              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.6)] cursor-pointer"
              >
                <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
              </motion.div>
            </div>

            <p className="mt-6 font-handwriting text-2xl text-rose-200 tracking-wide">
              Touch to hear our song & open my message...
            </p>
            <span className="mt-2 text-xs text-rose-400/60 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" /> Tap the heart
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-xl mx-auto flex flex-col items-center"
          >
            {/* Opening Special Photo with romantic Polaroid style */}
            <motion.div
              initial={{ rotate: -2, y: 20 }}
              animate={{ rotate: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative p-3 bg-gradient-to-b from-rose-950/40 via-stone-900/60 to-black/80 rounded-2xl border border-rose-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(244,63,94,0.25)] backdrop-blur-md max-w-sm sm:max-w-md w-full"
            >
              <div className="overflow-hidden rounded-xl bg-black aspect-square flex items-center justify-center">
                <img
                  src={c1.openingPhoto}
                  alt="Our 6-Month Anniversary Card"
                  className="w-full h-full object-contain filter contrast-[1.03] transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="pt-3 pb-1 text-center font-script text-2xl text-rose-300">
                {loveStoryConfig.couple.milestone}
              </div>
            </motion.div>

            {/* Personalized Letter Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#180914]/90 to-[#0e040c]/90 border border-rose-500/30 shadow-2xl backdrop-blur-md w-full text-left"
            >
              <div className="font-handwriting text-3xl sm:text-4xl text-rose-300 mb-4 text-center">
                {c1.messageLines[0]}
              </div>

              <div className="space-y-4 font-serif text-rose-100/90 text-sm sm:text-base leading-relaxed tracking-wide">
                {c1.messageLines.slice(1).map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.25, duration: 0.6 }}
                    className="border-l-2 border-rose-500/40 pl-3.5 py-0.5"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-rose-500/20 text-right font-script text-2xl text-amber-300">
                Forever Your Love ♾️
              </div>
            </motion.div>

            {/* Continue to Chapter 2 Button */}
            <motion.button
              onClick={onNext}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 text-white font-medium text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(244,63,94,0.4)] flex items-center gap-2 group cursor-pointer"
            >
              Explore Our Memories
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

