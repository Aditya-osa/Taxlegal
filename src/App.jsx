import React, { useState, useEffect } from 'react'
import Home from './Home'
import About from './About'
import Services from './Services'
import Contact from './Contact'
import Blog from './Blog'
import BlogPost from './BlogPost'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import CreatePost from './CreatePost'
import { AuthProvider, useAuth } from './context/AuthContext'

const PrivatePage = ({ children, onNavigate }) => {
  const { token, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!token) return <AdminLogin onNavigate={onNavigate} />;
  
  return children;
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedPostId, setSelectedPostId] = useState(null)

  useEffect(() => {
    // URL Parameter check (?admin=true)
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      navigateTo('admin-login');
      // Clean up URL to keep it hidden
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Keyboard shortcut (Ctrl + Shift + A)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateTo('admin-login');
      }
    };

    const handleNavigation = (e) => {
      setCurrentPage(e.detail);
    };

    window.addEventListener('navigate', handleNavigation);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('navigate', handleNavigation);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const navigateTo = (page, data = null) => {
    setCurrentPage(page)
    if ((page === 'blog-post' || page === 'create-post') && data) {
      setSelectedPostId(data)
    } else if (page === 'create-post' && !data) {
      setSelectedPostId(null)
    }
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigateTo} />
      case 'about': return <About onNavigate={navigateTo} />
      case 'services': return <Services onNavigate={navigateTo} />
      case 'contact': return <Contact onNavigate={navigateTo} />
      case 'blog': return <Blog onNavigate={navigateTo} />
      case 'blog-post': return <BlogPost onNavigate={navigateTo} postId={selectedPostId} />
      case 'admin-login': return <AdminLogin onNavigate={navigateTo} />
      case 'admin-dashboard': 
        return (
          <PrivatePage onNavigate={navigateTo}>
            <AdminDashboard onNavigate={navigateTo} />
          </PrivatePage>
        )
      case 'create-post': 
        return (
          <PrivatePage onNavigate={navigateTo}>
            <CreatePost onNavigate={navigateTo} editingPostId={selectedPostId} />
          </PrivatePage>
        )
      default: return <Home onNavigate={navigateTo} />
    }
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
