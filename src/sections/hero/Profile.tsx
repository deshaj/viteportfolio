import { Download, Code2, Terminal } from 'lucide-react';
import Card from '../../components/ui/Card';
import { useLanyard } from '../../hooks/useLanyard';

export default function ProfileCard() {
  const { data, status } = useLanyard();
  const getStatusIcon = () => {
    switch (status) {
      case 'online': return '/status/online.svg';
      case 'idle': return '/status/idle.svg';
      case 'dnd': return '/status/dnd.svg';
      default: return '/status/offline.svg';
    }
  };

  const badges = [
    { name: 'Early Verified Bot Developer', src: '/badges/early-verified-bot-developer.svg' },
    { name: 'Early Supporter', src: '/badges/early-supporter.svg' },
    { name: 'Nitro', src: '/badges/nitro.svg' },
    { name: 'Booster', src: '/badges/boost-24-month.svg' },
  ];

  return (
    <Card className="h-full relative overflow-hidden group p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="relative flex-shrink-0">
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          
          <img 
            src="/hero/avatar.webp" 
            alt={`${data?.discord_user?.username || 'Gaeuly'}'s Avatar`} 
            className="w-full h-full rounded-full object-cover border-4 border-[var(--card)] relative z-0"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-10 pointer-events-none scale-[1.25]">
             <img 
               src="/hero/border.webp" 
               alt="Avatar Decoration" 
               className="max-w-none w-full h-full object-contain"
             />
          </div>
          <div className="absolute bottom-1 right-1 z-20 bg-[var(--card)] rounded-full p-1 shadow-sm">
             <img 
               src={getStatusIcon()} 
               alt={`Status: ${status}`} 
               className="w-6 h-6 md:w-8 md:h-8"
             />
          </div>
        </div>
      </div>
      <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center">
        
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            {data?.discord_user?.display_name || 'Gaeuly'}
          </h1>
          <p className="text-[var(--secondary)] font-mono text-sm md:text-base">
            @{data?.discord_user?.username || 'gaeuly'}
          </p>
        </div>

        {/* Badges Area */}
        <div className="w-full overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <div className="flex items-center justify-center md:justify-start gap-2 min-w-max px-1">
             <div className="bg-[var(--background)]/50 p-2 rounded-xl border border-[var(--nav-border)] flex gap-2 backdrop-blur-sm">
                {badges.map((badge, index) => (
                  <div key={index} className="tooltip relative group/badge cursor-pointer">
                    <img 
                      src={badge.src} 
                      alt={badge.name} 
                      className="w-6 h-6 hover:scale-110 transition-transform"
                      title={badge.name} 
                    />
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="h-px w-full bg-[var(--nav-border)] mb-4" />

        <div className="space-y-4 mb-6">
          <div className="flex flex-col gap-2 text-[var(--secondary)] font-medium text-sm md:text-base">
            <span className="flex items-center justify-center md:justify-start gap-2">
              <Code2 size={16} className="text-[var(--primary)]" aria-hidden="true" /> Fullstack Developer
            </span>
            <span className="flex items-center justify-center md:justify-start gap-2">
              <Terminal size={16} className="text-[var(--primary)]" aria-hidden="true" /> Discord Bot Developer
            </span>
          </div>
          
          <p className="text-[var(--foreground)]/80 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
            Hi, I'm Gaeuly. A developer focusing on Discord Bot and Web Development. I enjoy exploring new technologies!
          </p>
        </div>

        <div className="w-full md:w-auto">
          <button 
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[var(--primary)] hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-[var(--primary)]/20"
            onClick={() => window.open('/cv.pdf', '_blank')}
            aria-label="Download my CV"
          >
            <Download size={18} aria-hidden="true" />
            <span>Download CV</span>
          </button>
        </div>

      </div>
    </Card>
  );
}