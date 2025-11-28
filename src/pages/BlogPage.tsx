import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, FileText } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';

export default function BlogPage() {
  const { posts, loading, error } = useBlog();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error loading posts: {error}</div>;
  }

  return (
    <section className="w-full flex justify-center py-32 px-6 bg-[var(--background)] min-h-screen">
      <div className="w-full max-w-5xl">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-[var(--foreground)] mb-6 leading-tight">
            Discover Our <br />
            <span className="text-[var(--primary)]">Fresh Content</span>
          </h1>
          <p className="text-[var(--secondary)] text-lg max-w-2xl">
            Thoughts, tutorials, and insights about development and design.
          </p>
        </div>

        {/* List Artikel */}
        <div className="flex flex-col gap-12">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[var(--nav-border)] rounded-3xl bg-[var(--card)]">
               <div className="p-4 rounded-full bg-[var(--background)] text-[var(--secondary)] mb-4">
                 <FileText size={32} />
               </div>
               <p className="text-[var(--secondary)] text-xl font-medium">No articles found yet.</p>
               <p className="text-sm text-[var(--secondary)] opacity-70">Check back later for updates!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="group flex flex-col md:flex-row gap-8 items-center border-b border-[var(--nav-border)] pb-12 last:border-none">
                
                {/* Thumbnail */}
                <Link to={`/blog/${post.slug}`} className="w-full md:w-1/3 aspect-video md:aspect-square rounded-3xl overflow-hidden bg-[var(--card)] cursor-pointer shadow-sm">
                  <img 
                    src={post.image || "https://via.placeholder.com/800x800?text=No+Image"} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </Link>

                {/* Content */}
                <div className="w-full md:w-2/3 flex flex-col justify-between h-full gap-6">
                  <div>
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4 group-hover:text-[var(--primary)] transition-colors cursor-pointer leading-tight">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-[var(--secondary)] text-lg leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-xs font-bold tracking-widest text-[var(--secondary)] uppercase">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    
                    <Link to={`/blog/${post.slug}`} className="flex items-center gap-2 text-[var(--foreground)] font-bold group/btn hover:text-[var(--primary)] transition-colors">
                      Read Article
                      <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}