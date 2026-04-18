import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Secret console command to access admin without UI links
window.goToAdmin = () => {
  const event = new CustomEvent('navigate', { detail: 'admin-login' });
  window.dispatchEvent(event);
};
