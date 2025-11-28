import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTitleHandler() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = 'Gaeuly'; // Default Title

    if (path === '/') {
      title = 'Home | Gaeuly';
    } else if (path === '/blog') {
      title = 'Blog | Gaeuly';
    } else if (path === '/projects') {
      title = 'Projects | Gaeuly';
    } else if (path === '/login') {
      title = 'Login | Gaeuly';
    } else if (path.startsWith('/dashboard')) {
      title = 'Dashboard | Gaeuly CMS';
    } 
    else if (path.startsWith('/blog/')) {
      const slug = path.split('/')[2]; 
      if (slug) {
        const formattedSlug = slug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
        
        title = `${formattedSlug} | Gaeuly`;
      }
    }

    document.title = title;
  }, [location]);

  return null;
}