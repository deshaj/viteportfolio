import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LayoutDashboard, FileText, LogOut, Menu, X, ChevronRight, User, Loader2, Folder } from 'lucide-react';

// Change with your email supabase account for admin
const ADMIN_EMAIL = 'admin@test.com'; 

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }

        if (session.user.email !== ADMIN_EMAIL) {
            alert("Access Denied: You are not an admin.");
            await supabase.auth.signOut();
            navigate('/');
            return;
        }

        setUser(session.user);
      } catch (error) {
        console.error("Auth Check Error:", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Blog Posts', path: '/dashboard', icon: <FileText size={18} /> },
    { name: 'Projects', path: '/dashboard/projects', icon: <Folder size={18} /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-purple-600" />
          <p className="text-zinc-500 text-sm font-medium animate-pulse">Checking Admin Access...</p>
        </div>
      </div>
    );
  }

  const displayName = user?.email?.split('@')[0] || 'Administrator';

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans selection:bg-purple-500/30">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-[#111113] border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/20">
               <LayoutDashboard size={18} />
            </div>
            <span>Gaeuly<span className="text-zinc-500">CMS</span></span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Main Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            const activeClass = isActive
              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-sm" 
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 border border-transparent";

            return (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group ${activeClass}`}
              >
                <span className={isActive ? "text-purple-400" : "text-zinc-500 group-hover:text-zinc-300"}>
                    {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 px-2 mb-4">
             <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 ring-2 ring-zinc-800 uppercase font-bold text-xs">
                {displayName.substring(0, 2)}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate capitalize">{displayName}</p>
                <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-500/10 text-zinc-300 hover:text-red-500 py-2.5 rounded-lg text-xs font-bold transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="md:hidden h-16 flex items-center px-4 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30">
           <button onClick={() => setSidebarOpen(true)} className="text-zinc-400 p-2 -ml-2 hover:text-white rounded-lg active:bg-zinc-800">
             <Menu size={24} />
           </button>
           <span className="ml-3 font-bold text-lg text-white">Dashboard</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
           <div className="max-w-6xl mx-auto pb-20">
              <Outlet />
           </div>
        </div>
      </main>

    </div>
  );
}