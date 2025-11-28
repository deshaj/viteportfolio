import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePageTitle } from './hooks/usePageTitle';
import PageTitleHandler from './components/PageTitleHandler';

// Pages Import
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ProjectsPage from './pages/ProjectsPage';
import Login from './pages/Login';

// Dashboard Imports
import DashboardPage from './pages/DashboardPage';
import BlogList from './pages/dashboard/blog/BlogList';
import BlogEditor from './pages/dashboard/blog/BlogEditor';
import ProjectList from './pages/dashboard/project/ProjectList'; 
import ProjectEditor from './pages/dashboard/project/ProjectEditor';

function PublicLayout() {
  const location = useLocation();
  const isReaderMode = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden flex flex-col">
      {!isReaderMode && <Navbar />}
      
      <main className="relative flex-grow flex flex-col w-full"> 
        <Outlet /> 
      </main>
      {!isReaderMode && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
    <PageTitleHandler />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<BlogList />} />
          <Route path="blog/new" element={<BlogEditor />} />
          <Route path="blog/edit/:id" element={<BlogEditor />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectEditor />} />
          <Route path="projects/edit/:id" element={<ProjectEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;