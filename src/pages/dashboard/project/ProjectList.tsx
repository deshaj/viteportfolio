import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Search, Loader2, Globe, Github, Layers } from 'lucide-react';

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this project permanently?")) return;
    
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setProjects(projects.filter(p => p.id !== id));
    } else {
      alert("Failed to delete project.");
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">My Projects</h1>
          <p className="text-zinc-400">Showcase your best work to the world.</p>
        </div>
        <Link 
          to="/dashboard/projects/new" 
          className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          <Plus size={18} />
          Add Project
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-2 flex items-center">
        <div className="h-10 w-10 flex items-center justify-center text-zinc-500">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Search projects..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none text-white placeholder:text-zinc-600 focus:ring-0 flex-1 h-full text-sm"
        />
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" /></div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-32 bg-[#111113] rounded-3xl border border-zinc-800 border-dashed">
           <p className="text-zinc-500">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-[#111113] border border-zinc-800 hover:border-zinc-700 rounded-3xl overflow-hidden transition-all flex flex-col hover:shadow-xl">
               {/* Thumbnail */}
               <div className="relative h-48 bg-zinc-900 overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold">NO IMAGE</div>
                  )}
               </div>
               
               {/* Body */}
               <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 uppercase">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-zinc-800/50 flex gap-2">
                     <Link to={`/dashboard/projects/edit/${project.id}`} className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 rounded-lg text-xs font-bold transition-colors">
                        <Edit2 size={14} /> Edit
                     </Link>
                     <button onClick={() => handleDelete(project.id)} className="p-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 rounded-lg transition-colors">
                        <Trash2 size={16} />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

