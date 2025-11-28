import { Github, ArrowRight } from 'lucide-react';
import { Highlighter } from '../components/ui/TextHighlighter';
import JavascriptIcon from '../components/icons/Javascript';
import TypescriptIcon from '../components/icons/Typescript';
import GolangIcon from '../components/icons/Golang';
import DiscordJsIcon from '../components/icons/DiscordJs';
import ReactIcon from '../components/icons/ReactIcon';
import NextJsIcon from '../components/icons/NextJs';
import MongoDbIcon from '../components/icons/MongoDb';

export default function Skills() {
  const skills = [
    { name: 'JavaScript', desc: 'Core Language', yoe: '4 YOE', icon: <JavascriptIcon className="w-8 h-8" /> },
    { name: 'TypeScript', desc: 'Typed Superset', yoe: '3 YOE', icon: <TypescriptIcon className="w-8 h-8" /> },
    { name: 'React', desc: 'Frontend Library', yoe: '4 YOE', icon: <ReactIcon className="w-8 h-8" /> },
    { name: 'Next.js', desc: 'Fullstack Framework', yoe: '3 YOE', icon: <NextJsIcon className="w-8 h-8" /> },
    { name: 'Go (Golang)', desc: 'Backend Performance', yoe: '2 YOE', icon: <GolangIcon className="w-8 h-8" /> },
    { name: 'Discord.js', desc: 'Bot Framework', yoe: '4 YOE', icon: <DiscordJsIcon className="w-8 h-8" /> },
    { name: 'MongoDB', desc: 'NoSQL Database', yoe: '3 YOE', icon: <MongoDbIcon className="w-8 h-8" /> },
  ];

  return (
    <section id="skills" className="w-full flex justify-center py-20 px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        <div className="md:col-span-5 flex flex-col justify-start h-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--foreground)] leading-snug">
            Tools &{' '}
            <Highlighter action="highlight" color="var(--primary)" padding={2}>
              <span className="text-[var(--foreground)]">Stack</span>
            </Highlighter>
          </h2>
          <p className="text-[var(--secondary)] text-lg mb-8 leading-relaxed">
            I specialize in building scalable applications using modern technologies. 
            Here is my preferred stack that I use to bring ideas to life.
          </p>
          <div className="flex flex-row sm:flex-row gap-6 mt-2">
             <a href="https://github.com/Gaeuly" target="_blank" className="group flex items-center gap-2 text-[var(--foreground)] font-medium hover:text-[var(--primary)] transition-colors">
                <Github size={20} />
                <span>Open Github</span>
                <ArrowRight size={16} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
             </a>
             <a href="#contact" className="group flex items-center gap-2 text-[var(--foreground)] font-medium hover:text-[var(--primary)] transition-colors">
                <span>Get in touch</span>
                <ArrowRight size={16} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
             </a>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col gap-4">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-2xl bg-[var(--card)] border border-[var(--nav-border)] hover:border-[var(--primary)] transition-all duration-300 group"
            >
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-[var(--background)] rounded-lg border border-[var(--nav-border)] group-hover:scale-110 transition-transform">
                     {skill.icon}
                  </div>
                  <div>
                     <h3 className="font-bold text-[var(--foreground)]">{skill.name}</h3>
                     <p className="text-xs font-mono text-[var(--secondary)] uppercase tracking-wider">{skill.desc}</p>
                  </div>
               </div>
               
               <div className="bg-[var(--background)] px-3 py-1 rounded-full border border-[var(--nav-border)]">
                  <span className="text-xs font-bold text-[var(--secondary)]">{skill.yoe}</span>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}