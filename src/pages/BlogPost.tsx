import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import MDEditor from '@uiw/react-md-editor';
import { ArrowLeft, Calendar, Clock, User, Share2, Type, Moon, Sun } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface PostDetail {
  title: string;
  content: string;
  image: string;
  created_at: string;
  excerpt: string;
}

type FontFamily = 'sans' | 'serif' | 'mono';
type ThemeMode = 'system' | 'light' | 'dark' | 'sepia';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [fontFamily, setFontFamily] = useState<FontFamily>('sans');
  const [readerTheme, setReaderTheme] = useState<ThemeMode>('system');

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const getContainerClass = () => {
    let classes = "min-h-screen transition-colors duration-300 font-sans selection:bg-[var(--primary)] selection:text-white ";
    if (fontFamily === 'serif') classes += "font-serif ";
    if (fontFamily === 'mono') classes += "font-mono ";

    if (readerTheme === 'system') {
      classes += "bg-[var(--background)] text-[var(--foreground)]";
    } else if (readerTheme === 'light') {
      classes += "bg-white text-zinc-900";
    } else if (readerTheme === 'dark') {
      classes += "bg-[#09090b] text-zinc-100";
    } else if (readerTheme === 'sepia') {
      classes += "bg-[#f4ecd8] text-[#433422]";
    }
    return classes;
  };

  const getMarkdownStyle = () => {
    if (readerTheme === 'dark' || (readerTheme === 'system')) { 
        return { backgroundColor: 'transparent', color: 'inherit' };
    }
    if (readerTheme === 'sepia') {
        return { backgroundColor: 'transparent', color: '#433422' };
    }
    return { backgroundColor: 'transparent', color: '#18181b' };
  };


  const getColorMode = () => {
      if (readerTheme === 'dark') return 'dark';
      if (readerTheme === 'light') return 'light';
      return 'dark';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center text-[var(--foreground)]">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-[var(--secondary)] mb-8">Article not found.</p>
        <Link to="/blog" className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium transition-opacity hover:opacity-80">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className={getContainerClass()}>
      
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 py-4 transition-colors duration-300
        ${readerTheme === 'system' ? 'bg-[var(--background)]/80 border-[var(--nav-border)]' : 
          readerTheme === 'dark' ? 'bg-[#09090b]/80 border-zinc-800' : 
          readerTheme === 'sepia' ? 'bg-[#f4ecd8]/80 border-[#e6dbb8]' : 
          'bg-white/80 border-zinc-100'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            to="/blog" 
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
          
          <div className="flex items-center gap-2">
             <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title="Reader Settings"
                >
                   <Type size={18} />
                </button>

                {showSettings && (
                   <>
                     <div className="fixed inset-0 z-10" onClick={() => setShowSettings(false)}/>
                     <div className="absolute right-0 top-full mt-2 w-64 p-4 rounded-xl shadow-2xl border z-20 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                        <div className="mb-4">
                           <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Font Style</p>
                           <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                              {(['sans', 'serif', 'mono'] as FontFamily[]).map((f) => (
                                <button
                                  key={f}
                                  onClick={() => setFontFamily(f)}
                                  className={`flex-1 py-1.5 text-sm rounded-md capitalize transition-all ${fontFamily === f ? 'bg-white dark:bg-zinc-700 shadow-sm font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
                                >
                                  {f}
                                </button>
                              ))}
                           </div>
                        </div>

                        <div>
                           <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Theme</p>
                           <div className="grid grid-cols-4 gap-2">
                              <ThemeBtn mode="system" active={readerTheme} onClick={() => setReaderTheme('system')} label="Auto" icon={<span className="text-xs font-bold">A</span>}/>
                              <ThemeBtn mode="light" active={readerTheme} onClick={() => setReaderTheme('light')} label="Light" icon={<Sun size={14}/>}/>
                              <ThemeBtn mode="dark" active={readerTheme} onClick={() => setReaderTheme('dark')} label="Dark" icon={<Moon size={14}/>}/>
                              <ThemeBtn mode="sepia" active={readerTheme} onClick={() => setReaderTheme('sepia')} label="Sepia" icon={<div className="w-3 h-3 rounded-full bg-[#f4ecd8] border border-[#433422]"/>}/>
                           </div>
                        </div>
                     </div>
                   </>
                )}
             </div>

             <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <Share2 size={18} />
             </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        <header className="mb-12 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold tracking-widest text-[var(--primary)] uppercase mb-6">
            <span>Blog</span>
            <span>•</span>
            <span>Article</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className={`flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm border-y py-6 opacity-80
             ${readerTheme === 'system' ? 'border-[var(--nav-border)]' : 
               readerTheme === 'dark' ? 'border-zinc-800' : 
               'border-zinc-200'}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-current/10 flex items-center justify-center">
                 <User size={14} />
              </div>
              <span className="font-medium">Author</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read</span>
            </div>
          </div>
        </header>

        {post.image && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-16 shadow-lg bg-zinc-100 dark:bg-zinc-800">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div data-color-mode={getColorMode()} className="blog-content">
          <MDEditor.Markdown 
            source={post.content} 
            style={{ 
              backgroundColor: 'transparent', 
              color: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 1.8,
              fontSize: '1.125rem' 
            }} 
          />
        </div>

        <div className={`mt-20 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6
            ${readerTheme === 'system' ? 'border-[var(--nav-border)]' : 
              readerTheme === 'dark' ? 'border-zinc-800' : 
              'border-zinc-200'}`}
        >
          <div className="opacity-60 italic">
            Thanks for reading!
          </div>
        </div>

      </div>
    </article>
  );
}

function ThemeBtn({ mode, active, onClick, label, icon }: any) {
    const isActive = active === mode;
    return (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border transition-all
            ${isActive 
                ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' 
                : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500'}`}
            title={label}
        >
            {icon}
            <span className="text-[10px] font-bold uppercase">{label}</span>
        </button>
    )
}