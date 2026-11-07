import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface Chapter3Props {
  onNext: () => void;
}

export const Chapter3: React.FC<Chapter3Props> = ({ onNext }) => {
  const c3 = loveStoryConfig.chapter3;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-amber-400 font-cinzel">
          {c3.title}
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wider mt-1">
          {c3.subtitle}
        </h2>
        <p className="font-handwriting text-lg text-rose-300/80 mt-0.5">
          A personal envelope addressed to you... 💌
        </p>
      </motion.div>

      {/* Interactive Floating Golden Envelope */}
      <div className="relative max-w-lg w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer group relative w-72 sm:w-84 aspect-[4/3] rounded-2xl bg-gradient-to-tr from-amber-700 via-yellow-600 to-amber-500 p-1 shadow-[0_0_40px_rgba(245,158,11,0.35)]"
            >
              <div className="relative h-full w-full rounded-xl bg-gradient-to-b from-[#24120a] to-[#120703] border border-amber-400/40 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/50 mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-black" />
                </div>

                <div className="relative z-10 font-script text-2xl text-amber-200">
                  {c3.envelopeTitle}
                </div>

                <div className="relative z-10 text-xs text-amber-400/80 uppercase tracking-widest mt-2 flex items-center gap-1.5 font-cinzel">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" /> Touch to break seal
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="open-letter"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-gradient-to-b from-[#241318]/95 to-[#13070d]/95 p-6 rounded-3xl border border-rose-500/40 shadow-2xl backdrop-blur-md text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-4">
                <div className="font-handwriting text-2xl sm:text-3xl text-rose-300">
                  Dearest Prani...
                </div>
                <div className="p-1.5 rounded-full bg-rose-950/60 text-amber-300 border border-amber-500/30">
                  <Heart className="w-4 h-4 fill-amber-300" />
                </div>
              </div>

              <div className="space-y-3">
                {c3.loveReasons.map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.15, duration: 0.5 }}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-black/40 border border-rose-500/20"
                  >
                    <span className="font-cinzel text-amber-400 text-xs mt-0.5 font-bold">
                      0{idx + 1}.
                    </span>
                    <p className="font-serif text-sm text-rose-100/95 leading-relaxed">
                      {reason}
                    </p>
                  </motion.div>
                ))}
              </div>

              {c3.specialCheekMessage && (
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-rose-950/60 to-pink-950/40 border border-pink-500/30 text-center font-handwriting text-lg text-pink-200">
                  {c3.specialCheekMessage}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 text-white font-medium text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(244,63,94,0.4)] flex items-center gap-2 cursor-pointer"
      >
        Three Dreams, One Future
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
