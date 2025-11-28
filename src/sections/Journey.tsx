import { BadgeCheck, Server, FileCode, Zap, LayoutTemplate } from "lucide-react";
import { Timeline } from "../components/ui/Timeline";
import { Highlighter } from "../components/ui/TextHighlighter";

export default function Journey() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <div className="md:hidden mb-2">
             <Highlighter action="circle" color="var(--primary)">
                <span className="text-2xl font-bold text-[var(--foreground)]">2024</span>
             </Highlighter>
          </div>

          <p className="text-[var(--secondary)] text-sm md:text-base font-normal mb-8">
            Expanding my skills into Fullstack Development and modern UI/UX design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--nav-border)] shadow-sm hover:border-[var(--primary)] transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                    <LayoutTemplate className="text-[var(--primary)] w-5 h-5 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-[var(--foreground)]">Modern Portfolio</h4>
                </div>
                <p className="text-xs text-[var(--secondary)]">Built with React, Tailwind, and Framer Motion.</p>
            </div>
            <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--nav-border)] shadow-sm hover:border-[var(--primary)] transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-[var(--primary)] w-5 h-5 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-[var(--foreground)]">Advanced Bots</h4>
                </div>
                <p className="text-xs text-[var(--secondary)]">Developing complex Discord bots with dashboard integration.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <div className="md:hidden mb-2">
             <Highlighter action="underline" color="var(--primary)">
                <span className="text-2xl font-bold text-[var(--foreground)]">2023</span>
             </Highlighter>
          </div>

          <p className="text-[var(--secondary)] text-sm md:text-base font-normal mb-8">
            Deep dived into Discord API and verified my first bot. Started gaining traction in the community.
          </p>
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-3 text-sm text-[var(--foreground)] bg-[var(--card)]/50 p-2 rounded-lg border border-transparent hover:border-[var(--nav-border)] transition-colors w-fit">
               <BadgeCheck className="w-5 h-5 text-blue-500" />
               <span>Verified Bot Developer Badge</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-[var(--foreground)] bg-[var(--card)]/50 p-2 rounded-lg border border-transparent hover:border-[var(--nav-border)] transition-colors w-fit">
               <Server className="w-5 h-5 text-green-500" />
               <span>Reached 100+ Server Installs</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-[var(--foreground)] bg-[var(--card)]/50 p-2 rounded-lg border border-transparent hover:border-[var(--nav-border)] transition-colors w-fit">
               <FileCode className="w-5 h-5 text-yellow-500" />
               <span>Learned TypeScript & Node.js</span>
             </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <div className="md:hidden mb-2">
             <Highlighter action="box" color="var(--primary)">
                <span className="text-2xl font-bold text-[var(--foreground)]">2022</span>
             </Highlighter>
          </div>

          <p className="text-[var(--secondary)] text-sm md:text-base font-normal mb-4">
            The beginning of my coding journey. Started with simple scripts and Minecraft plugins.
          </p>
          <div className="grid grid-cols-1 gap-4">
             <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--nav-border)] border-dashed">
                <p className="text-sm italic text-[var(--secondary)] flex items-center gap-2">
                  <span className="text-2xl">❝</span>
                  "Hello World" was just the start.
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="journey" className="w-full">
      <Timeline data={data} />
    </section>
  );
}