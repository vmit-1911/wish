import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Upload } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  hasStarted: boolean;
  audioLoaded: boolean;
  currentSongName: string;
  startMusic: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  loadAudioFile: (file: File) => void;
  promptSelectAudio: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [currentSongName, setCurrentSongName] = useState('Visiri');
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const audio = new Audio(loveStoryConfig.audio.src);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleCanPlay = () => {
      setAudioLoaded(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('loadeddata', handleCanPlay);

    audio.addEventListener('play', () => {
      setIsPlaying(true);
      setAudioLoaded(true);
    });

    audio.addEventListener('pause', () => setIsPlaying(false));

    audio.addEventListener('error', () => {
      setAudioLoaded(false);
    });

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('loadeddata', handleCanPlay);
      audio.pause();
      audio.remove();
    };
  }, []);

  const startMusic = () => {
    setHasStarted(true);
    if (!audioRef.current) return;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioLoaded(true);
          setShowMusicPrompt(false);
        })
        .catch((err) => {
          console.warn('Playback error or file missing:', err);
          setShowMusicPrompt(true);
        });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (!audioLoaded) {
      promptSelectAudio();
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setShowMusicPrompt(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const loadAudioFile = (file: File) => {
    if (!audioRef.current) return;
    const url = URL.createObjectURL(file);
    audioRef.current.src = url;
    audioRef.current.load();
    setCurrentSongName(file.name.replace(/\.[^/.]+$/, ''));
    setAudioLoaded(true);
    setShowMusicPrompt(false);
    
    // Automatically start playing immediately upon selection
    audioRef.current.play().catch(console.error);
    setIsPlaying(true);
  };

  const promptSelectAudio = () => {
    fileInputRef.current?.click();
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        hasStarted,
        audioLoaded,
        currentSongName,
        startMusic,
        togglePlay,
        toggleMute,
        loadAudioFile,
        promptSelectAudio,
      }}
    >
      {children}

      {/* Hidden File Input for instant song loading */}
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*,.mp3,.m4a,.wav,.ogg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            loadAudioFile(e.target.files[0]);
          }
        }}
      />

      {/* Top Floating Music Pill */}
      {hasStarted && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-rose-500/40 bg-black/85 px-3.5 py-1.5 backdrop-blur-md shadow-2xl text-xs">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 text-rose-200 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <Music className={`w-3.5 h-3.5 text-rose-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span className="font-medium tracking-wider max-w-[100px] truncate">{currentSongName}</span>
          </button>

          <div className="h-3 w-px bg-rose-500/30" />

          <button
            onClick={toggleMute}
            className="text-rose-300 hover:text-white transition-colors p-0.5 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-300" /> : <Volume2 className="w-3.5 h-3.5 text-rose-400" />}
          </button>

          {!audioLoaded && (
            <button
              onClick={promptSelectAudio}
              className="ml-1 text-[11px] text-amber-300 hover:text-white flex items-center gap-1 border-l border-rose-500/30 pl-2 cursor-pointer font-medium"
            >
              <Upload className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>Select Audio</span>
            </button>
          )}
        </div>
      )}

      {/* Romantic Modal if audio file has not yet been selected */}
      {showMusicPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-sm w-full bg-gradient-to-b from-[#220d1c] to-[#0f040d] border border-rose-500/50 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(244,63,94,0.4)]">
            <div className="w-14 h-14 rounded-full bg-rose-600/20 border border-rose-500/40 mx-auto flex items-center justify-center mb-3">
              <Music className="w-7 h-7 text-rose-400 animate-pulse" />
            </div>

            <h3 className="font-serif text-lg font-bold text-white mb-1">
              Play Visiri Soundtrack 🎵
            </h3>

            <p className="font-serif text-xs text-rose-200/90 leading-relaxed mb-5">
              The Visiri audio file is not loaded yet. Tap below to pick the <strong>Visiri audio file</strong> from your device once, and it will play continuously throughout her journey!
            </p>

            <button
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white font-medium text-xs tracking-widest uppercase shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-transform"
            >
              <Upload className="w-4 h-4" />
              Choose Visiri Audio File
            </button>

            <button
              onClick={() => setShowMusicPrompt(false)}
              className="mt-3 text-xs text-rose-300/60 hover:text-rose-200 cursor-pointer"
            >
              Continue without sound for now
            </button>
          </div>
        </div>
      )}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
};
