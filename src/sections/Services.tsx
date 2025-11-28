import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Highlighter } from '../components/ui/TextHighlighter';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      category: 'Design & Development',
      description: 'Modern, responsive, and high-performance websites built with React, Next.js, and Tailwind CSS.',
      image: '/services/website.webp',
    },
    {
      id: 2,
      title: 'Discord Bot',
      category: 'Automation & Community',
      description: 'Advanced Discord bots with moderation, music, economy, and custom features using Discord.js.',
      image: '/services/discord.webp',
    }
  ];

  return (
    <section id="services" className="w-full flex justify-center py-24 px-6 bg-[var(--background)]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="md:col-span-5 flex flex-col gap-8 text-center md:text-left items-center md:items-start">
          <div>
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                <p className="text-sm font-bold tracking-wider text-[var(--secondary)] uppercase">My Services</p>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] leading-tight mb-6">
              Creative <br />
              <Highlighter action="highlight" color="var(--primary)" padding={2}>
                <span className="text-[var(--foreground)]">Solutions</span>
              </Highlighter>
            </h2>
            
            <p className="text-[var(--secondary)] text-lg leading-relaxed">
              Elevate your digital presence with tailored strategies. I help you build robust applications and automate your community workflow.
            </p>
          </div>

          {/* Bullet Points */}
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3 text-[var(--foreground)] font-medium justify-center md:justify-start">
                <div className="p-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Check size={16} />
                </div>
                <span>High Performance & Scalable</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--foreground)] font-medium justify-center md:justify-start">
                <div className="p-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Check size={16} />
                </div>
                <span>Custom & Tailored Features</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--foreground)] font-medium justify-center md:justify-start">
                <div className="p-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Check size={16} />
                </div>
                <span>Modern UI/UX Design</span>
            </div>
          </div>

          {/* Button CTA */}
          <div className="w-full md:w-auto">
            <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-bold hover:opacity-90 transition-all hover:gap-4 w-full md:w-auto"
            >
                Get Started
                <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col gap-4">
            {services.map((service) => (
                <div 
                    key={service.id}
                    className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 bg-[var(--card)] border border-[var(--nav-border)] rounded-3xl hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg text-center sm:text-left"
                >
                    {/* Image Wrapper */}
                    <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-[var(--nav-border)] relative">
                        <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        {/* Fallback Icon */}
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--card)] -z-10">
                            <Sparkles className="text-[var(--secondary)]" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-center py-2 w-full">
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-xs font-bold tracking-wider text-[var(--secondary)] uppercase mb-2">
                            {service.category}
                        </p>
                        <p className="text-sm text-[var(--secondary)] line-clamp-2 sm:line-clamp-none pr-0 sm:pr-8">
                            {service.description}
                        </p>
                    </div>

                    {/* Action Icon (Desktop/Tablet only visual) */}
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-[var(--nav-border)] text-[var(--secondary)] group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-[var(--primary)] transition-all opacity-0 group-hover:opacity-100 mr-4 flex-shrink-0">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}