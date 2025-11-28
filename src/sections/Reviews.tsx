import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Star, Quote, Plus, Loader2, Send } from 'lucide-react';
import { Highlighter } from '../components/ui/TextHighlighter';

// --- DATA PLACEHOLDER
const PLACEHOLDERS = [
  {
    id: 'dummy-1',
    name: "Alex Chen",
    role: "Tech Lead",
    content: "The Discord bot features are insane. It handles thousands of users without lag. Highly recommended for complex projects.",
    rating: 5,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: 'dummy-2',
    name: "Sarah Jones",
    role: "Community Manager",
    content: "The website UI is so smooth! The animations and dark mode implementation are perfect. Love the attention to detail.",
    rating: 5,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 'dummy-3',
    name: "Mike Ross",
    role: "Freelancer",
    content: "Professional, fast, and talented. The admin dashboard saves me hours of work every week.",
    rating: 5,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
  },
  {
    id: 'dummy-4',
    name: "Emily White",
    role: "Designer",
    content: "Clean code and pixel-perfect implementation. Exactly what I was looking for!",
    rating: 5,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  }
];

const ReviewCard = ({ review }: { review: any }) => (
  <div className="w-[350px] md:w-[400px] flex-shrink-0 bg-[var(--card)] border border-[var(--nav-border)] p-6 rounded-3xl relative overflow-hidden group hover:border-[var(--primary)] transition-colors">
    <Quote className="absolute top-4 right-6 text-[var(--primary)] opacity-10 w-12 h-12 rotate-180" />
    
    <div className="flex flex-col h-full justify-between gap-4">
      <div>
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-300 dark:text-zinc-700"} 
            />
          ))}
        </div>
        <p className="text-[var(--secondary)] text-sm leading-relaxed mb-6 font-medium line-clamp-4">
          "{review.content}"
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-[var(--nav-border)] pt-4">
        <img 
          src={review.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`} 
          alt={review.name} 
          className="w-10 h-10 rounded-full bg-zinc-800 object-cover"
        />
        <div>
          <h4 className="font-bold text-[var(--foreground)] text-sm">{review.name}</h4>
          <p className="text-xs text-[var(--primary)] font-bold">{review.role || 'Client'}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [role, setRole] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      const realReviews = data || [];
      
      if (realReviews.length < 4) {
        setReviews([...realReviews, ...PLACEHOLDERS.slice(0, 4 - realReviews.length)]);
      } else {
        setReviews(realReviews);
      }
      
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (!content) return alert("Review content cannot be empty!");

    setSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert([
        {
          user_id: user.id,
          name: user.user_metadata.full_name || user.email?.split('@')[0],
          avatar_url: user.user_metadata.avatar_url,
          role: role || 'Client',
          content,
          rating
        }
      ]);

      if (error) throw error;

      alert("Review submitted successfully! Thank you.");
      setShowForm(false);
      setContent('');
      window.location.reload(); 
    } catch (err: any) {
      alert("Failed to submit review: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <section id="reviews" className="w-full py-24 bg-[var(--background)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--foreground)]">
            Client{' '}
            <Highlighter action="highlight" color="var(--primary)" padding={2}>
              <span className="text-[var(--foreground)]">Testimonials</span>
            </Highlighter>
          </h2>
          <p className="text-[var(--secondary)] text-lg">
            See what others are saying about my work.
          </p>
        </div>

        <button 
          onClick={() => user ? setShowForm(!showForm) : navigate('/login')}
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-[var(--primary)]/20"
        >
          {showForm ? 'Cancel' : <><Plus size={18} /> Leave a Review</>}
        </button>
      </div>

      {showForm && (
        <div className="max-w-2xl mx-auto px-6 mb-16 animate-in slide-in-from-top-4 fade-in duration-300">
           <div className="bg-[var(--card)] border border-[var(--nav-border)] p-6 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">Share your experience</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="flex gap-2 mb-2">
                    {[1,2,3,4,5].map((star) => (
                       <button 
                         key={star} 
                         type="button"
                         onClick={() => setRating(star)}
                         className={`transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-500' : 'text-zinc-300 dark:text-zinc-700'}`}
                       >
                          <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                       </button>
                    ))}
                 </div>
                 
                 <input 
                   type="text" 
                   placeholder="Your Role / Company (e.g. CEO of Tech)" 
                   value={role}
                   onChange={(e) => setRole(e.target.value)}
                   className="w-full bg-[var(--background)] border border-[var(--nav-border)] rounded-xl p-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
                 />

                 <textarea 
                   placeholder="Share your thoughts..." 
                   value={content}
                   onChange={(e) => setContent(e.target.value)}
                   rows={4}
                   className="w-full bg-[var(--background)] border border-[var(--nav-border)] rounded-xl p-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none resize-none"
                 />

                 <button 
                   type="submit" 
                   disabled={submitting}
                   className="w-full flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] py-3 rounded-xl font-bold hover:opacity-80 transition-opacity disabled:opacity-50"
                 >
                    {submitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    Submit Review
                 </button>
              </form>
           </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="relative w-full mask-gradient">
          <div className="flex w-max gap-6 animate-scroll py-4 px-4 hover:pause">
            {[...reviews, ...reviews].map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}