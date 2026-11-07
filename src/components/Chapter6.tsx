import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface Chapter6Props {
  onReplay: () => void;
}

export const Chapter6: React.FC<Chapter6Props> = ({ onReplay }) => {
  const c6 = loveStoryConfig.chapter6;

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 py-8 text-center select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg mx-auto flex flex-col items-center"
      >
        <div className="w-full p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-[#250d1a]/95 via-[#160610]/95 to-[#0b0208]/95 border border-rose-500/40 shadow-[0_0_60px_rgba(244,63,94,0.35)] backdrop-blur-md text-center">
          {/* Full circle photo reuse */}
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 shadow-xl mb-5">
            <img
              src={c6.featuredPhoto}
              alt="Us Forever"
              className="w-full h-full object-cover rounded-full filter contrast-105"
            />
          </div>

          <span className="text-xs font-cinzel tracking-[0.3em] text-amber-400 uppercase">
            {loveStoryConfig.couple.anniversaryDate}
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1.5 mb-3">
            {c6.finalHeader}
          </h1>

          <p className="font-serif italic text-rose-200/90 text-sm sm:text-base mb-4">
            "{c6.finalSubheader}"
          </p>

          <div className="space-y-2.5 font-serif text-rose-100 text-sm sm:text-base border-t border-b border-rose-500/20 py-4 my-4 leading-relaxed">
            {c6.finalMessageLines.map((line, idx) => (
              <p key={idx} className="font-medium text-rose-50">
                {line}
              </p>
            ))}
          </div>

          <div className="font-handwriting text-2xl text-pink-300 mb-2">
            {c6.closingQuote}
          </div>

          <div className="font-script text-3xl sm:text-4xl text-amber-300 mt-2">
            {c6.signature}
          </div>
        </div>

        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-7 py-3 rounded-full bg-stone-900/90 border border-rose-500/40 text-rose-200 hover:text-white font-medium text-xs tracking-widest uppercase shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-rose-400" />
          Replay From Beginning
        </motion.button>
      </motion.div>
    </div>
  );
};
