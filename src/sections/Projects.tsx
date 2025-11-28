import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Github, ExternalLink, ArrowRight, FolderGit2 } from 'lucide-react';
import { FollowerPointerCard } from '../components/ui/FollowingPointer';
import { Highlighter } from '../components/ui/TextHighlighter';


const PointerTitle = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-2 p-2 bg-zinc-900 rounded-full border border-zinc-700">
    <p className="text-xs font-bold text-white px-2">{title}</p>
  </div>
);

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(2);
        
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProjects();
  }, []);

  if (!loading && projects.length === 0) return null;

  return (
    <section id="projects" className="w-full flex justify-center py-24 px-6 bg-[var(--background)]">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight mb-4">
              Featured{' '}
              <Highlighter action="highlight" color="var(--primary)" padding={2}>
                <span className="text-[var(--foreground)]">Projects</span>
              </Highlighter>
            </h2>
            <p className="text-[var(--secondary)] text-lg max-w-md">
              A glimpse of my recent work. Check out the full portfolio for more.
            </p>
          </div>

          {/* Desktop View More */}
          <Link 
            to="/projects" 
            className="hidden md:flex items-center gap-2 text-[var(--foreground)] font-bold group hover:text-[var(--primary)] transition-colors"
          >
            View All Projects
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid 2 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=No+Preview";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold">No Preview</div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[var(--secondary)] mb-6 line-clamp-2 flex-grow leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack (Limit 3) */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies?.slice(0, 3).map((tech: string, idx: number) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-[var(--primary)] bg-[var(--primary)]/10 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="px-2.5 py-1 text-[10px] font-bold text-[var(--secondary)] bg-[var(--nav-border)] rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--nav-border)] mt-auto">
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors z-20 relative"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors z-20 relative"
                      >
                        <Github size={16} />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FollowerPointerCard>
          ))}
        </div>

        {/* Mobile View More Button */}
        <div className="md:hidden mt-8">
           <Link 
            to="/projects" 
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-[var(--nav-border)] text-[var(--foreground)] font-bold hover:bg-[var(--card)] transition-colors"
          >
            <FolderGit2 size={18} />
            Explore All Projects
          </Link>
        </div>

      </div>
    </section>
  );
}