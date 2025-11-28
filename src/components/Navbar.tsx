import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Home, FolderGit2, BookOpen, LogIn, LogOut, User, LayoutDashboard } from 'lucide-react'; 
import { LimelightNav, NavItem } from './ui/LightNav';
import ThemeToggle from './ThemeToggle';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (target: string, type: 'section' | 'path') => {
    if (type === 'path') {
      navigate(target);
      window.scrollTo(0, 0);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (location.pathname === '/blog') { setActiveTab(2); return; }
    if (location.pathname === '/projects') { setActiveTab(1); return; }

    const handleScroll = () => {
      const sections = ['home']; 
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300; 
        }
        return false;
      });
      if (currentSection) setActiveTab(sections.indexOf(currentSection));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowMenu(false);
    navigate('/');
  };

  const navItems: NavItem[] = [
    { 
      id: 'home', 
      icon: <Home />, 
      label: 'Home',
      href: '/',
      onClick: () => handleNavigation('home', 'section')
    },
    { 
      id: 'projects', 
      icon: <FolderGit2 />, 
      label: 'Projects',
      href: '/projects',
      onClick: () => handleNavigation('/projects', 'path')
    },
    { 
      id: 'blog', 
      icon: <BookOpen />, 
      label: 'Blog',
      href: '/blog',
      onClick: () => handleNavigation('/blog', 'path') 
    }
  ];

  return (
    <>
      {showMenu && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setShowMenu(false)} 
        />
      )}

      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 bg-transparent">
          
          <LimelightNav 
            items={navItems}
            activeIndex={activeTab}
            onTabChange={setActiveTab}
            className="shadow-xl bg-[var(--nav-bg)]"
          />
          
          <div className="flex items-center gap-3 adaptive-nav p-2 rounded-2xl border shadow-xl h-16 bg-[var(--nav-bg)]">
            
            <div className="h-10 w-10 flex items-center justify-center hover:bg-[var(--card)] rounded-xl transition-colors cursor-pointer">
               <ThemeToggle />
            </div>

            <div className="w-px h-8 bg-[var(--nav-border)]" />

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[var(--primary)] transition-all focus:outline-none"
                >
                  <img 
                    src={user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                    alt="User Avatar" 
                    className="h-full w-full object-cover"
                  />
                </button>

                {showMenu && (
                  <div className="absolute top-14 right-0 w-56 bg-[var(--card)] border border-[var(--nav-border)] rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="px-3 py-2 border-b border-[var(--nav-border)] mb-1">
                      <p className="text-xs font-bold text-[var(--secondary)] uppercase">Signed in as</p>
                      <p className="text-sm font-bold text-[var(--foreground)] truncate">{user.email}</p>
                    </div>
                    
                    <button 
                      onClick={() => { setShowMenu(false); navigate('/dashboard'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--primary)] transition-colors text-left"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="h-10 w-10 flex items-center justify-center rounded-xl text-[var(--secondary)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all"
                title="Sign In"
              >
                <LogIn size={20} />
              </button>
            )}

          </div>

        </div>
      </div>
    </>
  );
}