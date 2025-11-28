import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Search, Loader2, Calendar, CheckCircle, XCircle, ExternalLink, File } from 'lucide-react';

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, created_at, is_published, image, excerpt')
      .order('created_at', { ascending: false });
    
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
    
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) {
      setPosts(posts.filter(p => p.id !== id));
    } else {
      alert("Failed to delete post.");
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Blog Management</h1>
          <p className="text-zinc-400">Create, edit, and manage your content efficiently.</p>
        </div>
        <Link 
          to="/dashboard/blog/new" 
          className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          <Plus size={18} />
          Create New Post
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-2 flex items-center">
        <div className="h-10 w-10 flex items-center justify-center text-zinc-500">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none text-white placeholder:text-zinc-600 focus:ring-0 flex-1 h-full text-sm"
        />
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
           <Loader2 className="animate-spin text-purple-500" size={32} />
           <p className="text-zinc-500 text-sm animate-pulse">Loading content...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-32 bg-[#111113] rounded-3xl border border-zinc-800 border-dashed">
           <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600">
              <File size={24} />
           </div>
           <h3 className="text-lg font-bold text-white mb-1">No posts found</h3>
           <p className="text-zinc-500 mb-6">Get started by creating your first blog post.</p>
           <Link to="/dashboard/blog/new" className="text-purple-400 hover:text-purple-300 font-bold text-sm">
             + Create Post
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="group flex flex-col bg-[#111113] border border-zinc-800 hover:border-zinc-700 rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-black/50">
               
               {/* Thumbnail Area */}
               <div className="relative h-52 bg-zinc-900 overflow-hidden">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 bg-[#151518]">
                       <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-700 mb-2" />
                       <span className="text-xs font-bold uppercase tracking-wider">No Image</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                        post.is_published 
                        ? "bg-green-500/10 text-green-400 border-green-500/20" 
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                     }`}>
                        {post.is_published ? <CheckCircle size={10} /> : <XCircle size={10} />}
                        {post.is_published ? 'Published' : 'Draft'}
                     </span>
                  </div>
               </div>

               {/* Card Body */}
               <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                      {post.excerpt || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-zinc-800/50 flex items-center justify-between gap-3">
                     <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-medium">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString()}
                     </div>

                     <div className="flex items-center gap-2">
                        <a 
                           href={`/blog/${post.slug}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                           title="View Live"
                        >
                           <ExternalLink size={16} />
                        </a>
                        <Link 
                           to={`/dashboard/blog/edit/${post.id}`} 
                           className="p-2 text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                           title="Edit"
                        >
                           <Edit2 size={16} />
                        </Link>
                        <button 
                           onClick={() => handleDelete(post.id)} 
                           className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                           title="Delete"
                        >
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}