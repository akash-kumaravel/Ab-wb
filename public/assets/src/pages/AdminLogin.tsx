import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = 'Admin';
  const ADMIN_PASSWORD = 'Admin@123';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Store admin auth in localStorage
        localStorage.setItem('adminAuth', JSON.stringify({
          username,
          loginTime: new Date().toISOString(),
        }));
        setLoading(false);
        navigate('/admin-dashboard');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-2">AB TEXTILE MACHINARY</h1>
          <p className="text-gray-400 text-sm uppercase tracking-wider">Admin Panel</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-gray-900 border border-gray-800 rounded-sm p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Admin Login</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-sm text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* USERNAME INPUT */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-sm py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter username"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-sm py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded-sm uppercase tracking-wider transition-colors duration-200"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* DEMO CREDENTIALS */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center uppercase tracking-wider mb-3">Demo Credentials</p>
            <div className="bg-black rounded-sm p-3 space-y-1 text-xs text-gray-400">
              <p><span className="text-gray-500">Username:</span> Admin</p>
              <p><span className="text-gray-500">Password:</span> Admin@123</p>
            </div>
          </div>
        </div>

        {/* BACK LINK */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
