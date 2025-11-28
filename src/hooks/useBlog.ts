import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  is_published: boolean;
}

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, refetch: fetchPosts };
}