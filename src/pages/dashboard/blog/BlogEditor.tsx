import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import MDEditor from '@uiw/react-md-editor';
import { ArrowLeft, Save, Loader2, Eye, Image as ImageIcon } from 'lucide-react';


function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-[#111113] border border-zinc-800 rounded-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('**Hello world!**');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (isEditMode) {
      setLoadingData(true);
      const fetchData = async () => {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
        if (error) {
          console.error("Error fetching post:", error);
          alert("Gagal mengambil data post.");
        } else if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt);
          setContent(data.content || '');
          setImage(data.image);
        }
        setLoadingData(false);
      };
      fetchData();
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
    if (!title || !slug) return alert("Wajib isi Title dan Slug bro!");
    
    setSaving(true);
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) {
        alert("Sesi habis, login lagi bro.");
        setSaving(false);
        return navigate('/login');
    }

    const payload = {
      title,
      slug,
      excerpt,
      content,
      image,
      is_published: true,
      updated_at: new Date().toISOString(),
    };

    try {
      let error;
      if (isEditMode) {
        const { error: updateError } = await supabase
            .from('posts')
            .update(payload)
            .eq('id', id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
            .from('posts')
            .insert([{ ...payload, created_at: new Date().toISOString() }]);
        error = insertError;
      }

      if (error) throw error;
      
      alert('Berhasil disimpan!');
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Save Error:", err);
      alert('Gagal menyimpan: ' + err.message + "\n\nCek RLS Policy Supabase lu bro!");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* 1. Header Action */}
      <div className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl py-4 border-b border-zinc-800 flex items-center justify-between -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
             <ArrowLeft size={20} />
           </button>
           <div>
             <h1 className="text-lg font-bold text-white leading-none">{isEditMode ? 'Edit Post' : 'Create New Post'}</h1>
             <p className="text-xs text-zinc-500 mt-1 font-mono">{slug ? `/${slug}` : 'Untitled'}</p>
           </div>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-purple-500/20"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Publish'}
        </button>
      </div>

      {/* 2. Metadata Form */}
      <Card className="p-6 md:p-8">
         <div className="space-y-6">
           <div>
             <input 
               type="text" 
               value={title}
               onChange={handleTitleChange}
               placeholder="Enter Title Here..."
               className="w-full bg-transparent border-none text-3xl md:text-4xl font-bold text-white placeholder:text-zinc-700 focus:ring-0 px-0 py-2"
             />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/50">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Slug (URL)</label>
                 <input 
                   type="text" 
                   value={slug}
                   onChange={(e) => setSlug(e.target.value)}
                   className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none transition-colors"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    Cover Image URL <ImageIcon size={12}/>
                 </label>
                 <input 
                   type="text" 
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
                   placeholder="https://..."
                   className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none transition-colors"
                 />
              </div>
              <div className="md:col-span-2 space-y-2">
                 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Excerpt (Short Description)</label>
                 <textarea 
                   value={excerpt}
                   onChange={(e) => setExcerpt(e.target.value)}
                   rows={2}
                   className="w-full bg-[#18181b] border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                 />
              </div>
           </div>
         </div>
      </Card>

      {/* 3. The New Pro Markdown Editor */}
      <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl" data-color-mode="dark">
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || '')}
          height={500}
          preview="edit"
          textareaProps={{
            placeholder: 'Start writing your amazing story...'
          }}
        />
      </div>

      {/* 4. Real-time Preview (User View Simulator) */}
      <div>
         <div className="flex items-center gap-2 mb-4 text-zinc-400 pl-2">
            <Eye size={20} />
            <h3 className="text-sm font-bold uppercase tracking-wider">Live Visitor Preview</h3>
         </div>
         <div className="bg-white text-zinc-900 rounded-3xl p-8 md:p-16 shadow-2xl min-h-[400px]" data-color-mode="light">
            <div className="max-w-3xl mx-auto">
              {image && (
                <img src={image} alt="Cover" className="w-full h-64 md:h-96 object-cover rounded-2xl mb-10 shadow-lg bg-zinc-100" />
              )}
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 mb-8 leading-tight tracking-tight">
                {title || "Untitled Post"}
              </h1>
              
              {/* Render Markdown */}
              <div className="blog-preview-content">
                 <MDEditor.Markdown 
                    source={content} 
                    style={{ 
                        backgroundColor: 'transparent', 
                        color: '#18181b',
                        minHeight: '200px'
                    }} 
                 />
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}