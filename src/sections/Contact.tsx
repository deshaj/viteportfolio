import { Mail } from 'lucide-react';
import GithubIcon from '../components/icons/Github';
import DiscordIcon from '../components/icons/Discord';

export default function Contact() {
  return (
    <section id="contact" className="w-full flex justify-center pt-24 pb-16 px-6 border-t border-[var(--nav-border)] bg-[var(--background)]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--nav-border)]">
              <img 
                src="/hero/avatar.webp" 
                alt="Gaeuly" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-[var(--foreground)]">Gaeuly</span>
          </div>

          {/* Deskripsi */}
          <p className="text-[var(--secondary)] text-sm leading-relaxed max-w-sm">
            A Fullstack & Discord Bot Developer passionate about building scalable applications and automation tools.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Gaeuly" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[var(--card)] border border-[var(--nav-border)] text-[var(--secondary)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://discord.gg/FnEe7xcYZQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[var(--card)] border border-[var(--nav-border)] text-[var(--secondary)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
              aria-label="Discord"
            >
              <DiscordIcon className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@gaeuly.my.id"
              className="p-2 rounded-full bg-[var(--card)] border border-[var(--nav-border)] text-[var(--secondary)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-8 md:pl-20">
          
          {/* Navigation */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-[var(--secondary)]">
              <li><a href="#home" className="hover:text-[var(--primary)] transition-colors">Home</a></li>
              <li><a href="#journey" className="hover:text-[var(--primary)] transition-colors">Journey</a></li>
              <li><a href="#skills" className="hover:text-[var(--primary)] transition-colors">Skills</a></li>
              <li><a href="#projects" className="hover:text-[var(--primary)] transition-colors">Projects</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-[var(--secondary)]">
              <li><a href="https://github.com/Gaeuly" target="_blank" className="hover:text-[var(--primary)] transition-colors">GitHub Profile</a></li>
              <li><a href="https://discord.gg/FnEe7xcYZQ" target="_blank" className="hover:text-[var(--primary)] transition-colors">Discord Community</a></li>
              <li><a href="mailto:contact@gaeuly.my.id" className="hover:text-[var(--primary)] transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}