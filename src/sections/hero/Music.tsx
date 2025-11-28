import { useState, useRef, useEffect } from 'react';
import { Music as MusicIcon } from 'lucide-react';
import Card from '../../components/ui/Card';
import PlayIcon from '../../components/icons/Play';
import PauseIcon from '../../components/icons/Pause';
import VolumeHighIcon from '../../components/icons/VolumeHigh';
import VolumeMuteIcon from '../../components/icons/VolumeMute';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  return (
    <Card className="h-full flex flex-col justify-between relative overflow-visible group">
      <audio ref={audioRef} src="/music/song.mp3" loop />

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md border border-[var(--nav-border)]">
        <img 
          src="/hero/banner.webp" 
          alt="Music Album Art"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
             (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-purple-900 opacity-80 -z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-0">
             <MusicIcon size={48} className="text-white opacity-50" />
        </div>

        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white border border-white/10">
          {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold truncate pr-4">Coding Lo-Fi</h2>
            <p className="text-[var(--secondary)] text-sm">Chill Vibes Only</p>
          </div>
          <div className="flex gap-1 h-6 items-end">
            {[1,2,3,4].map((i) => (
               <div key={i} className={`w-1 bg-[var(--primary)] rounded-t-sm transition-all duration-300 ${isPlaying ? 'animate-pulse h-full' : 'h-2'}`} style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[var(--background)]/50 p-4 rounded-2xl border border-[var(--nav-border)] relative">
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--primary)] text-white hover:opacity-90 transition-transform active:scale-95 shadow-lg shadow-[var(--primary)]/30"
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-1" />}
          </button>

          <div className="flex-1 flex items-center justify-end relative">
             <button 
               onClick={() => setShowVolumeControl(!showVolumeControl)}
               className="p-2 hover:bg-[var(--background)] rounded-full transition-colors"
               aria-label="Toggle Volume Control"
             >
                {volume === 0 ? <VolumeMuteIcon className="w-6 h-6 text-[var(--secondary)]" /> : <VolumeHighIcon className="w-6 h-6 text-[var(--secondary)]" />}
             </button>

             {showVolumeControl && (
               <div className="absolute bottom-14 right-0 bg-[var(--card)] p-3 rounded-xl border border-[var(--nav-border)] shadow-xl w-48 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 z-50">
                  <VolumeMuteIcon className="w-4 h-4 text-[var(--secondary)]" />
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-[var(--nav-border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                    aria-label="Volume Slider"
                  />
                  <VolumeHighIcon className="w-4 h-4 text-[var(--secondary)]" />
               </div>
             )}
          </div>
        </div>
      </div>
    </Card>
  );
}