import React, { useState, useEffect } from 'react';
import API_URL from './config';
import './Blog.css';

const Blog = ({ onNavigate }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blog/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Unable to load blog posts. Please make sure the backend is running.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-page">
      {/* Top Navigation - Reused from Home */}
      <header className="home-header">
        <div className="header-container">
          <div className="header-content">
            <a onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="logo-link" style={{ cursor: 'pointer' }}>
              <img src="assets/images/team/logo.png" alt="TaxLegal Logo" className="logo-img-header" />
            </a>

            <nav className="main-nav">
              <a onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="nav-link">Home</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="nav-link">Services</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="nav-link">About Us</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="nav-link active">Blog</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="nav-link">Contact Us</a>
            </nav>

            <div className="header-contact">
              <a href="tel:+919869005068" className="contact-link-header">+91-9869005068</a>
            </div>
          </div>
        </div>
      </header>

      <main className="blog-main">
        <section className="blog-hero">
          <div className="blog-hero-overlay"></div>
          <div className="blog-hero-content">
            <h1>Tax & Legal Insights</h1>
            <p>Expert perspectives on taxation, compliance, and corporate law in India.</p>
          </div>
        </section>

        <section className="blog-content-section">
          <div className="blog-container">
            {loading ? (
              <div className="blog-status">
                <div className="loader"></div>
                <p>Loading insights...</p>
              </div>
            ) : error ? (
              <div className="blog-status error">
                <span className="material-symbols-outlined">error</span>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
              </div>
            ) : posts.length === 0 ? (
              <div className="blog-status">
                <p>No posts available at the moment.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map((post) => (
                  <article key={post.id} className="blog-card" onClick={() => onNavigate('blog-post', post.id)}>
                    <div className="blog-card-image">
                      <img 
                        src={post.featured_image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop'} 
                        alt={post.title} 
                      />
                      <div className="blog-card-category">{post.category?.name || 'Uncategorized'}</div>
                    </div>
                    <div className="blog-card-info">
                      <div className="blog-card-meta">
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                        <span className="dot"></span>
                        <span>{post.reading_time || 5} min read</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt || (post.content.substring(0, 120) + '...')}</p>
                      <div className="blog-card-footer">
                        <div className="blog-author">
                          <div className="author-avatar">{post.author?.name?.charAt(0) || 'A'}</div>
                          <span>{post.author?.name || 'TaxLegal Expert'}</span>
                        </div>
                        <span className="read-more-text">Read Article →</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer-home">
        <div className="footer-container">
          <div className="footer-bottom-home">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>&copy; 2024 TaxLegal. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
