import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import API_URL from './config';
import './AdminDashboard.css';

const AdminDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    await Promise.all([
      fetchCurrentUser(),
      fetchPosts(),
      fetchCategories()
    ]);
    setLoading(false);
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
      }
    } catch (err) {
      console.error('Failed to fetch user');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog/posts`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data.data);
      } else {
        setError('Failed to load posts');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog/categories`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/blog/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    if (activeTab === 'editors') {
      fetchUsers();
    }
  }, [activeTab]);

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== postId));
        alert('Post deleted successfully');
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      alert('Error deleting post');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this editor?')) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/blog/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId));
        alert('Editor removed successfully');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to remove editor');
      }
    } catch (err) {
      alert('Error removing editor');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/blog/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== categoryId));
        alert('Category deleted successfully');
      } else {
        alert('Failed to delete category');
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const canManageEditors = currentUser?.role === 'admin' || currentUser?.email === 'admin@taxlegal.com';

  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editorFormData, setEditorFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor'
  });

  const handleEditorSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!editingUser;
    const url = isEdit 
      ? `${API_URL}/api/admin/blog/users/${editingUser.id}`
      : `${API_URL}/api/admin/blog/users`;
    
    try {
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(editorFormData)
      });

      const data = await response.json();
      if (response.ok) {
        alert(isEdit ? 'Editor updated' : 'Editor created');
        setShowEditorModal(false);
        fetchUsers();
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (err) {
      alert('Error saving editor');
    }
  };

  const openAddEditor = () => {
    setEditingUser(null);
    setEditorFormData({ name: '', email: '', password: '', role: 'editor' });
    setShowEditorModal(true);
  };

  const openEditEditor = (user) => {
    setEditingUser(user);
    setEditorFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setShowEditorModal(true);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#1a3b6d',
    is_active: true,
    sort_order: 0
  });

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!editingCategory;
    const url = isEdit 
      ? `${API_URL}/api/admin/blog/categories/${editingCategory.id}`
      : `${API_URL}/api/admin/blog/categories`;
    
    try {
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(categoryFormData)
      });

      const data = await response.json();
      if (response.ok) {
        alert(isEdit ? 'Category updated' : 'Category created');
        setShowCategoryModal(false);
        fetchCategories();
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (err) {
      alert('Error saving category');
    }
  };

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', slug: '', description: '', color: '#1a3b6d', is_active: true, sort_order: 0 });
    setShowCategoryModal(true);
  };

  const openEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color || '#1a3b6d',
      is_active: category.is_active,
      sort_order: category.sort_order
    });
    setShowCategoryModal(true);
  };

  return (
    <div className={`admin-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <span className="material-symbols-outlined">{isSidebarOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Editor Modal */}
      {showEditorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingUser ? 'Edit Editor' : 'Add New Editor'}</h2>
            <form onSubmit={handleEditorSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={editorFormData.name}
                  onChange={e => setEditorFormData({...editorFormData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={editorFormData.email}
                  onChange={e => setEditorFormData({...editorFormData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password {editingUser && '(Leave blank to keep current)'}</label>
                <input 
                  type="password" 
                  value={editorFormData.password}
                  onChange={e => setEditorFormData({...editorFormData, password: e.target.value})}
                  required={!editingUser}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={editorFormData.role}
                  onChange={e => setEditorFormData({...editorFormData, role: e.target.value})}
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditorModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Editor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src="assets/images/team/logo.png" alt="TaxLegal Logo" className="admin-logo" />
          {currentUser && <div className="user-badge">{currentUser.name} ({currentUser.role})</div>}
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <span className="material-symbols-outlined">article</span>
            Blog Posts
          </button>
          <button 
            className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <span className="material-symbols-outlined">category</span>
            Categories
          </button>
          {canManageEditors && (
            <button 
              className={`nav-item ${activeTab === 'editors' ? 'active' : ''}`}
              onClick={() => setActiveTab('editors')}
            >
              <span className="material-symbols-outlined">group</span>
              Manage Editors
            </button>
          )}
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => alert('Settings coming soon!')}
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '18px' }}>logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleCategorySubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={categoryFormData.name}
                  onChange={e => setCategoryFormData({...categoryFormData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Slug (Optional)</label>
                <input 
                  type="text" 
                  value={categoryFormData.slug}
                  onChange={e => setCategoryFormData({...categoryFormData, slug: e.target.value})}
                  placeholder="auto-generated-if-blank"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={categoryFormData.description}
                  onChange={e => setCategoryFormData({...categoryFormData, description: e.target.value})}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Color</label>
                  <input 
                    type="color" 
                    value={categoryFormData.color}
                    onChange={e => setCategoryFormData({...categoryFormData, color: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Sort Order</label>
                  <input 
                    type="number" 
                    value={categoryFormData.sort_order}
                    onChange={e => setCategoryFormData({...categoryFormData, sort_order: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={categoryFormData.is_active}
                    onChange={e => setCategoryFormData({...categoryFormData, is_active: e.target.checked})}
                  />
                  Active
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCategoryModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="admin-main">
        {activeTab === 'posts' && (
          <>
            <header className="main-header">
              <h1>Blog Management</h1>
              <button onClick={() => onNavigate('create-post')} className="add-post-btn">
                + Add New Post
              </button>
            </header>

            <section className="posts-section">
              {loading ? (
                <div className="admin-loader">Loading posts...</div>
              ) : error ? (
                <div className="admin-error">{error}</div>
              ) : (
                <div className="posts-table-container">
                  <table className="posts-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map(post => (
                        <tr key={post.id}>
                          <td className="post-title-cell">
                            <strong>{post.title}</strong>
                            <span className="post-slug">{post.slug}</span>
                          </td>
                          <td>{post.category?.name || 'Uncategorized'}</td>
                          <td>
                            <span className={`status-badge ${post.status}`}>
                              {post.status}
                            </span>
                          </td>
                          <td>{new Date(post.published_at).toLocaleDateString()}</td>
                          <td className="actions-cell">
                            <button className="btn-edit" onClick={() => onNavigate('create-post', post.id)}>Edit</button>
                            {currentUser?.role === 'admin' && (
                              <button className="btn-delete" onClick={() => handleDeletePost(post.id)}>Delete</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === 'categories' && (
          <>
            <header className="main-header">
              <h1>Category Management</h1>
              <button onClick={openAddCategory} className="add-post-btn">
                + Add New Category
              </button>
            </header>

            <section className="posts-section">
              <div className="posts-table-container">
                <table className="posts-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category.id}>
                        <td><strong>{category.name}</strong></td>
                        <td><code>{category.slug}</code></td>
                        <td>
                          <span className={`status-badge ${category.is_active ? 'active' : 'inactive'}`}>
                            {category.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button className="btn-edit" onClick={() => openEditCategory(category)}>Edit</button>
                          {currentUser?.role === 'admin' && (
                            <button className="btn-delete" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activeTab === 'editors' && (
          <>
            <header className="main-header">
              <h1>Editor Management</h1>
              <button onClick={openAddEditor} className="add-post-btn">
                + Add New Editor
              </button>
            </header>

            <section className="posts-section">
              <div className="posts-table-container">
                <table className="posts-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td><strong>{user.name}</strong></td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`status-badge ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className="actions-cell">
                          <button className="btn-edit" onClick={() => openEditEditor(user)}>Edit</button>
                          {user.email !== 'admin@taxlegal.com' && (
                            <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>Remove</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
