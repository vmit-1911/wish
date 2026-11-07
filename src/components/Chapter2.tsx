import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface Chapter2Props {
  onNext: () => void;
}

export const Chapter2: React.FC<Chapter2Props> = ({ onNext }) => {
  const c2 = loveStoryConfig.chapter2;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev === null ? null : (prev - 1 + c2.memories.length) % c2.memories.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev === null ? null : (prev + 1) % c2.memories.length
    );
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
          {c2.title}
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wider mt-1">
          {c2.subtitle}
        </h2>
        <p className="font-handwriting text-lg text-rose-300/80 mt-0.5">
          Tap each moment to re-live it together ✨
        </p>
      </motion.div>

      {/* Grid of Floating Polaroid Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-xl sm:max-w-3xl w-full">
        {c2.memories.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="cursor-pointer group relative bg-gradient-to-b from-stone-900/90 to-stone-950/90 p-2.5 sm:p-3.5 rounded-2xl border border-rose-500/20 shadow-lg backdrop-blur-md hover:border-rose-400/50 transition-all text-left"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-black">
                <img
                  src={item.photo}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[11px] text-rose-200 flex items-center gap-1 font-medium">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-300" /> Tap to view
                  </span>
                </div>
                {item.tag && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-medium tracking-wide text-rose-200 border border-rose-500/30">
                    {item.tag}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <p className="font-serif text-xs sm:text-sm text-rose-100/90 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Expanded Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-gradient-to-b from-[#190815] to-[#0d030b] rounded-3xl p-5 border border-rose-500/30 shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-rose-300 hover:text-white border border-rose-500/30 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[60vh] w-full overflow-hidden rounded-2xl bg-black/40 flex items-center justify-center">
                <img
                  src={c2.memories[selectedPhotoIndex].photo}
                  alt={c2.memories[selectedPhotoIndex].caption}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl"
                />

                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-rose-950/80 border border-rose-500/40 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-rose-950/80 border border-rose-500/40 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 text-center w-full px-2">
                <div className="text-xs uppercase tracking-widest text-amber-300 font-cinzel mb-1 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {c2.memories[selectedPhotoIndex].tag || 'Memory'} ({selectedPhotoIndex + 1}/{c2.memories.length})
                </div>
                <p className="font-serif text-sm sm:text-base text-rose-100 leading-relaxed">
                  {c2.memories[selectedPhotoIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Next Button */}
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 text-white font-medium text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(244,63,94,0.4)] flex items-center gap-2 cursor-pointer"
      >
        Little Things I Love
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
