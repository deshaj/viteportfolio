import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ArrowRight, Calendar, ArrowUpRight } from 'lucide-react';
import { Highlighter } from '../components/ui/TextHighlighter';

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data } = await supabase
          .from('posts')
          .select('id, title, slug, created_at, image, excerpt')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(2);

        setPosts(data || []);
      } catch (error) {
        console.error("Gagal load blog section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);
  if (!loading && posts.length === 0) return null;

  return (
    <section id="blog" className="w-full flex justify-center py-24 px-6 bg-[var(--background)]">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight mb-4">
              Latest{' '}
              <Highlighter action="highlight" color="var(--primary)" padding={2}>
                <span className="text-[var(--foreground)]">Updates</span>
              </Highlighter>
            </h2>
            <p className="text-[var(--secondary)] text-lg max-w-md">
              Insights, thoughts, and tutorials from my development journey.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="hidden md:flex items-center gap-2 text-[var(--foreground)] font-bold group hover:text-[var(--primary)] transition-colors"
          >
            View All Posts
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group flex flex-col h-full bg-[var(--card)] border border-[var(--nav-border)] rounded-3xl overflow-hidden hover:border-[var(--primary)] transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Wrapper */}
              <div className="relative h-64 overflow-hidden bg-zinc-800">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
                    <span className="text-sm font-bold">NO IMAGE</span>
                  </div>
                )}
                
                {/* Overlay Icon Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white text-black p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <ArrowUpRight size={24} />
                   </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--secondary)] uppercase tracking-wider mb-3">
                  <Calendar size={14} />
                  {new Date(post.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>

                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 leading-tight group-hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-[var(--secondary)] line-clamp-2 mb-6 flex-1">
                  {post.excerpt || "Click to read more about this topic..."}
                </p>

                <div className="text-[var(--primary)] font-bold text-sm flex items-center gap-2">
                  Read Article
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="md:hidden mt-4">
           <Link 
            to="/blog" 
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-[var(--nav-border)] text-[var(--foreground)] font-bold hover:bg-[var(--card)] transition-colors"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}