import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingBackground } from './components/FloatingBackground';
import { MusicProvider } from './components/MusicPlayer';
import { Chapter1OpeningCombined } from './components/Chapter1OpeningCombined';
import { Chapter2 } from './components/Chapter2';
import { Chapter3 } from './components/Chapter3';
import { Chapter4 } from './components/Chapter4';
import { Chapter5 } from './components/Chapter5';
import { Chapter6 } from './components/Chapter6';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

export const App: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const totalChapters = 6;

  const nextChapter = () => {
    if (currentChapter < totalChapters) {
      setCurrentChapter((prev) => prev + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
    }
  };

  const handleReplay = () => {
    setCurrentChapter(1);
  };

  return (
    <MusicProvider>
      <div className="relative min-h-screen w-full bg-[#070308] text-rose-50 overflow-hidden flex flex-col justify-between">
        {/* Floating petals and gold dust canvas */}
        <FloatingBackground />

        {/* Top Progress Dots Navigation */}
        <header className="relative z-20 pt-4 px-4 flex items-center justify-between max-w-lg mx-auto w-full">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-cinzel text-xs text-rose-300 font-bold tracking-wider">
              PRANI & MITRAN
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalChapters }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentChapter(i + 1)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentChapter === i + 1
                    ? 'w-6 h-1.5 bg-gradient-to-r from-rose-500 to-amber-400'
                    : 'w-1.5 h-1.5 bg-rose-900/60 hover:bg-rose-600/50'
                }`}
                title={`Go to chapter ${i + 1}`}
              />
            ))}
          </div>
        </header>

        {/* Dynamic Single-Screen Chapter Container with smooth slide transitions */}
        <main className="relative z-10 flex-1 flex items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45 }}
              className="w-full flex items-center justify-center"
            >
              {currentChapter === 1 && (
                <Chapter1OpeningCombined onNext={nextChapter} />
              )}
              {currentChapter === 2 && (
                <Chapter2 onNext={nextChapter} />
              )}
              {currentChapter === 3 && (
                <Chapter3 onNext={nextChapter} />
              )}
              {currentChapter === 4 && (
                <Chapter4 onNext={nextChapter} />
              )}
              {currentChapter === 5 && (
                <Chapter5 onNext={nextChapter} />
              )}
              {currentChapter === 6 && (
                <Chapter6 onReplay={handleReplay} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Subtle Bottom Navigation Controls (Back/Next arrows for touch convenience) */}
        <footer className="relative z-20 pb-4 px-6 flex items-center justify-between max-w-lg mx-auto w-full text-xs text-rose-400/50 font-cinzel">
          {currentChapter > 1 ? (
            <button
              onClick={prevChapter}
              className="flex items-center gap-1 hover:text-rose-200 transition-colors cursor-pointer p-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <span />
          )}

          <span className="tracking-widest">
            {currentChapter} of {totalChapters}
          </span>

          {currentChapter < totalChapters ? (
            <button
              onClick={nextChapter}
              className="flex items-center gap-1 hover:text-rose-200 transition-colors cursor-pointer p-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span />
          )}
        </footer>
      </div>
    </MusicProvider>
  );
};

export default App;
