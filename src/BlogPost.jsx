import React, { useState, useEffect } from 'react';
import API_URL from './config';
import './BlogPost.css';

const BlogPost = ({ onNavigate, postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blog/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Unable to load the article.');
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="blog-status">
          <div className="loader"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <div className="blog-status error">
          <p>{error || 'Article not found.'}</p>
          <button onClick={() => onNavigate('blog')} className="retry-btn">Back to Blog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <header className="home-header">
        <div className="header-container">
          <div className="header-content">
            <a onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="logo-link">
              <img src="assets/images/team/logo.png" alt="TaxLegal Logo" className="logo-img-header" />
            </a>
            <nav className="main-nav">
              <a onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="nav-link">Home</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="nav-link">Blog</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="nav-link">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="post-main">
        <article className="post-article">
          <div className="post-header">
            <div className="post-category-tag">{post.category?.name}</div>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <div className="post-author-info">
                <div className="author-avatar">{post.author?.name?.charAt(0)}</div>
                <div>
                  <div className="author-name">{post.author?.name}</div>
                  <div className="post-date">{formatDate(post.published_at)} • {post.reading_time || 5} min read</div>
                </div>
              </div>
            </div>
          </div>

          <div className="post-featured-image">
            <img src={post.featured_image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop'} alt={post.title} />
          </div>

          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          
          <div className="post-footer">
            <div className="post-tags">
              {post.tags?.map(tag => (
                <span key={tag.id} className="post-tag">#{tag.name}</span>
              ))}
            </div>
            <hr />
            <button className="back-btn" onClick={() => onNavigate('blog')}>
              ← Back to Blog
            </button>
          </div>
        </article>
      </main>

      <footer className="footer-home">
        <div className="footer-container">
          <div className="footer-bottom-home">
            <div className="footer-copyright">
              <p>&copy; 2024 TaxLegal. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
