import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import API_URL from './config';
import './CreatePost.css';

const CreatePost = ({ onNavigate, editingPostId }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const editorRef = React.useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'published',
    is_featured: false,
    category_id: '',
    featured_image: null,
  });

  useEffect(() => {
    fetchCategories();
    if (editingPostId) {
      fetchPostData();
    }
  }, [editingPostId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog/categories`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.data);
        if (!editingPostId && data.data.length > 0) {
          setFormData(prev => ({ ...prev, category_id: data.data[0].id }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/blog/posts/${editingPostId}`);
      const data = await response.json();
      if (response.ok) {
        const post = data.data;
        setFormData({
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          status: post.status || 'published',
          is_featured: post.is_featured || false,
          category_id: post.category?.id || '',
          featured_image: null, // Don't reset image unless changed
        });
        if (editorRef.current) {
          editorRef.current.innerHTML = post.content || '';
        }
      }
    } catch (err) {
      alert('Failed to load post data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        formatText('outdent');
      } else {
        formatText('indent');
      }
    }
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === 'featured_image' && !formData[key]) return;
          
          if (typeof formData[key] === 'boolean') {
             submitData.append(key, formData[key] ? '1' : '0');
          } else {
             submitData.append(key, formData[key]);
          }
        }
      });

      if (editingPostId) {
        submitData.append('_method', 'PUT');
      }

      const url = editingPostId 
        ? `${API_URL}/api/admin/blog/posts/${editingPostId}`
        : `${API_URL}/api/admin/blog/posts`;

      const response = await fetch(url, {
        method: 'POST', // Use POST with _method=PUT for FormData support in Laravel
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: submitData
      });

      const data = await response.json();

      if (response.ok) {
        alert(editingPostId ? 'Post updated successfully!' : 'Post created successfully!');
        onNavigate('admin-dashboard');
      } else {
        alert(data.message || 'Error saving post');
      }
    } catch (err) {
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>TaxLegal Admin</h3>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active" onClick={() => onNavigate('admin-dashboard')}>← Back to Posts</button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="main-header">
          <h1>{editingPostId ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
        </header>

        <section className="form-section">
          <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-grid">
              <div className="form-main-col">
                <div className="form-field">
                  <label>Post Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter an engaging title"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Excerpt (Short Summary)</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Briefly describe what this post is about..."
                    rows="3"
                  />
                </div>

                <div className="form-field">
                  <label>Upload Cover Image</label>
                  <input
                    type="file"
                    name="featured_image"
                    onChange={handleChange}
                    className="file-input"
                  />
                  <div className="image-guidelines">
                    <div className="guideline-item">
                      <span className="material-symbols-outlined">straighten</span>
                      <span><strong>Cover:</strong> 1200×600 px (2:1 ratio)</span>
                    </div>
                    <div className="guideline-item">
                      <span className="material-symbols-outlined">aspect_ratio</span>
                      <span><strong>Article:</strong> 800 px wide preferred</span>
                    </div>
                    <div className="guideline-item">
                      <span className="material-symbols-outlined">data_usage</span>
                      <span><strong>Size:</strong> Max 2 MB per file</span>
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label>Article Content</label>
                  <div className="rich-text-editor">
                    <div className="editor-toolbar">
                      <button type="button" className="toolbar-btn" style={{ fontWeight: 'bold' }} onClick={() => formatText('bold')}>B</button>
                      <button type="button" className="toolbar-btn" style={{ fontStyle: 'italic' }} onClick={() => formatText('italic')}>I</button>
                      <button type="button" className="toolbar-btn" style={{ textDecoration: 'underline' }} onClick={() => formatText('underline')}>U</button>
                      <button type="button" className="toolbar-btn" style={{ textDecoration: 'line-through' }} onClick={() => formatText('strikeThrough')}>S</button>
                      
                      <div className="toolbar-separator"></div>
                      
                      <button type="button" className="toolbar-btn" style={{ fontWeight: 'bold' }} onClick={() => formatText('formatBlock', 'H1')}>H1</button>
                      <button type="button" className="toolbar-btn" style={{ fontWeight: 'bold' }} onClick={() => formatText('formatBlock', 'H2')}>H2</button>
                      
                      <div className="toolbar-separator"></div>
                      
                      <button type="button" className="toolbar-btn" title="Bullet List" onClick={() => formatText('insertUnorderedList')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                      </button>
                      <button type="button" className="toolbar-btn" title="Numbered List" onClick={() => formatText('insertOrderedList')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
                      </button>
                      
                      <div className="toolbar-separator"></div>
                      
                      <button type="button" className="toolbar-btn" title="Align Left" onClick={() => formatText('justifyLeft')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="15" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                      </button>
                      <button type="button" className="toolbar-btn" title="Align Center" onClick={() => formatText('justifyCenter')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                      </button>
                      <button type="button" className="toolbar-btn" title="Align Right" onClick={() => formatText('justifyRight')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="9" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                      </button>

                      <div className="toolbar-separator"></div>

                      <button type="button" className="toolbar-btn" title="Decrease Indent" onClick={() => formatText('outdent')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="11" y1="6" x2="21" y2="6"></line><line x1="11" y1="12" x2="21" y2="12"></line><line x1="11" y1="18" x2="21" y2="18"></line><polyline points="7 8 3 12 7 16"></polyline></svg>
                      </button>
                      <button type="button" className="toolbar-btn" title="Increase Indent" onClick={() => formatText('indent')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="13" y1="6" x2="21" y2="6"></line><line x1="13" y1="12" x2="21" y2="12"></line><line x1="13" y1="18" x2="21" y2="18"></line><polyline points="7 8 11 12 7 16"></polyline></svg>
                      </button>
                      
                      <div className="toolbar-separator"></div>

                      <div className="color-picker-wrapper" title="Text Color" style={{ display: 'flex', alignItems: 'center', margin: '0 4px' }}>
                        <input 
                          type="color" 
                          onChange={(e) => formatText('foreColor', e.target.value)}
                          style={{ width: '24px', height: '24px', padding: '0', border: 'none', cursor: 'pointer', background: 'transparent' }}
                        />
                      </div>
                      
                      <div className="toolbar-separator"></div>
                      
                      <button type="button" className="toolbar-btn" title="Clear Formatting" onClick={() => formatText('removeFormat')}>
                        <span style={{ fontStyle: 'italic', position: 'relative' }}>
                          T<sub style={{ fontSize: '0.6em', textDecoration: 'underline' }}>x</sub>
                        </span>
                      </button>
                    </div>
                    <div
                      ref={editorRef}
                      className="editor-content"
                      contentEditable="true"
                      onInput={handleEditorInput}
                      onBlur={handleEditorInput}
                      onKeyDown={handleKeyDown}
                      suppressContentEditableWarning={true}
                      style={{
                        minHeight: '300px',
                        padding: '16px',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: '#fff',
                        fontSize: '15px',
                        lineHeight: '1.6'
                      }}
                      data-placeholder="Write your article here..."
                    ></div>
                  </div>
                </div>
              </div>

              <div className="form-sidebar-col">
                <div className="form-field">
                  <label>URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="my-awesome-post"
                  />
                  <small>Leave empty to auto-generate from title</small>
                </div>

                <div className="form-field">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Category</label>
                  <select 
                    name="category_id" 
                    value={formData.category_id} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field checkbox-field">
                  <label>
                    <input
                      type="checkbox"
                      name="is_featured"
                      checked={formData.is_featured}
                      onChange={handleChange}
                    />
                    Featured Post
                  </label>
                </div>

                <button type="submit" disabled={loading} className="save-btn">
                  {loading ? 'Saving...' : (editingPostId ? 'Update Post' : 'Publish Post')}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreatePost;
