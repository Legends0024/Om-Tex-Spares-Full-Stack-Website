import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Lock } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await axios.post('/auth/login', { username, password });
      login(res.data.access_token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-brandOrange p-4 rounded-3xl shadow-lg shadow-brandOrange/20 transform -rotate-6">
            <Lock className="text-white w-10 h-10" />
          </div>
        </div>
        <h2 className="text-center text-4xl font-black text-gray-900 tracking-tight">
          Admin <span className="text-brandOrange">Portal</span>
        </h2>
        <p className="mt-2 text-center text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Sign in to manage Om Tex Spares
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-6 shadow-2xl border border-gray-100 rounded-3xl sm:px-12">
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
              <p className="text-red-700 text-sm font-bold">{error}</p>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Username</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-4 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandOrange focus:border-brandOrange transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin_user"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-4 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandOrange focus:border-brandOrange transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-xl text-lg font-black text-white bg-brandOrange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandOrange disabled:opacity-70 transition-all transform active:scale-95 shadow-brandOrange/20"
              >
                {loading ? 'Authenticating...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-10 text-center">
            <a href="/" className="text-sm font-bold text-gray-500 hover:text-brandOrange transition-colors">&larr; Back to Website</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
