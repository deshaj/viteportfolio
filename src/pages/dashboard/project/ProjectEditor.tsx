import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Github, Globe } from 'lucide-react';

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [techInput, setTechInput] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      const fetchProject = async () => {
        const { data } = await supabase.from('projects').select('*').eq('id', id).single();
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setDescription(data.description);
          setImage(data.image);
          setTechInput(data.technologies ? data.technologies.join(', ') : '');
          setLiveUrl(data.live_url || '');
          setGithubUrl(data.github_url || '');
        }
        setLoading(false);
      };
      fetchProject();
    }
  }, [id, isEditMode]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditMode) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSave = async () => {
    if (!title || !slug) return alert("Title and Slug required!");
    setSaving(true);

    const technologiesArray = techInput.split(',').map(t => t.trim()).filter(t => t !== '');

    const payload = {
      title,
      slug,
      description,
      image,
      technologies: technologiesArray,
      live_url: liveUrl,
      github_url: githubUrl,
    };

    try {
      if (isEditMode) {
        await supabase.from('projects').update(payload).eq('id', id);
      } else {
        await supabase.from('projects').insert([payload]);
      }
      navigate('/dashboard/projects');
    } catch (error: any) {
      alert('Error saving: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" /></div>;

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/dashboard/projects')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-2xl font-bold text-white">{isEditMode ? 'Edit Project' : 'New Project'}</h1>
      </div>

      {/* Form Card */}
      <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
        
        {/* Title & Slug */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Project Name</label>
            <input 
              type="text" 
              value={title}
              onChange={handleTitleChange}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-xl p-4 text-xl font-bold text-white focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="e.g. Moonveil Bot"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Slug</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
                />
             </div>
             <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Image URL</label>
                <div className="relative">
                  <ImageIcon size={16} className="absolute left-3 top-3.5 text-zinc-500" />
                  <input 
                    type="text" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-lg pl-10 p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
             </div>
          </div>
        </div>

        {/* Description */}
        <div>
           <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Description</label>
           <textarea 
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             rows={4}
             className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none resize-none"
             placeholder="Describe what this project does..."
           />
        </div>

        {/* Tech Stack */}
        <div>
           <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Technologies (Comma separated)</label>
           <input 
             type="text" 
             value={techInput}
             onChange={(e) => setTechInput(e.target.value)}
             className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
             placeholder="React, TypeScript, Tailwind, Supabase"
           />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
           <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Globe size={14}/> Live URL</label>
              <input 
                type="text" 
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
                placeholder="https://myproject.com"
              />
           </div>
           <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Github size={14}/> Github URL</label>
              <input 
                type="text" 
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
                placeholder="https://github.com/username/repo"
              />
           </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 py-4 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Saving Project...' : 'Save Project'}
        </button>

      </div>
    </div>
  );
}