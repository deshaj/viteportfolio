import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Github, ExternalLink, Loader2, Code } from 'lucide-react';
import { FollowerPointerCard } from '../components/ui/FollowingPointer';
import { Highlighter } from '../components/ui/TextHighlighter';


const PointerTitle = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-2 p-2 bg-zinc-900 rounded-full border border-zinc-700">
    <p className="text-xs font-bold text-white px-2">{title}</p>
  </div>
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );
  }

  return (
    <section className="w-full flex justify-center py-32 px-6 bg-[var(--background)] min-h-screen">
      <div className="w-full max-w-6xl">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold text-[var(--foreground)] mb-6 leading-tight">
            Explore My <br />
            <span className="relative inline-block">
                <Highlighter action="highlight" color="var(--primary)" padding={4}>
                    <span className="text-[var(--foreground)]">Creations</span>
                </Highlighter>
            </span>
          </h1>
          <p className="text-[var(--secondary)] text-xl max-w-2xl leading-relaxed">
            A curated list of projects I've worked on, ranging from Discord bots to full-stack web applications.
          </p>
        </div>

        {/* Grid Projects */}
        {projects.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-[var(--nav-border)] rounded-3xl bg-[var(--card)]">
                <Code size={48} className="mx-auto text-[var(--secondary)] mb-4"/>
                <p className="text-[var(--secondary)] text-xl">No projects showcase yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <FollowerPointerCard key={project.id} title={<PointerTitle title={project.title} />}>
                <div className="group relative h-full bg-[var(--card)] border border-[var(--nav-border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                    
                    {/* Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=No+Image";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold">No Preview</div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 line-clamp-1">
                            {project.title}
                        </h3>
                        <p className="text-[var(--secondary)] mb-6 line-clamp-3 flex-grow leading-relaxed">
                            {project.description}
                        </p>

                        {/* Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.technologies?.map((tech: string, idx: number) => (
                            <span 
                                key={idx} 
                                className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[var(--primary)] bg-[var(--primary)]/10 rounded-full"
                            >
                                {tech}
                            </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 pt-6 border-t border-[var(--nav-border)] mt-auto">
                            {project.live_url && (
                                <a 
                                href={project.live_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors z-20"
                                >
                                <ExternalLink size={18} />
                                Live Demo
                                </a>
                            )}
                            {project.github_url && (
                                <a 
                                href={project.github_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors z-20"
                                >
                                <Github size={18} />
                                Source
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                </FollowerPointerCard>
            ))}
            </div>
        )}
      </div>
    </section>
  );
}