import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../utils/axiosConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const { setUserData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Processing');
    setMessage('Đang xử lý...');
    
    try {
      // Gọi API login để nhận sessionId
      const response = await axios.post('/login', {
        username,
        password
      });

      console.log('Login response:', response.data);

      // Kiểm tra response và lấy sessionId từ response data
      const { sessionId, status, message } = response.data;
      
      if (sessionId) {
        console.log('Received sessionId:', sessionId);
        setSessionId(sessionId);
        setStatus(status || 'PENDING');
        setMessage(message || 'Login request is being processed...');
        toast.info(message || 'Login request is being processed...');
      } else {
        throw new Error('No session ID received from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      toast.error(errorMessage);
      setLoading(false);
      setSessionId(null);
      setStatus('Failed');
      setMessage(errorMessage);
    }
  };

  // Hàm kiểm tra kết quả login
  const checkLoginResult = useCallback(async (sessionId) => {
    try {
      const response = await axios.get(`/login/result/${sessionId}`);
      console.log('Poll result:', response.data);

      const result = response.data;
      
      // Cập nhật status và message từ response
      setStatus(result.status);
      setMessage(result.message || '');

      if (result.status === 'SUCCESS') {
        // Lưu token và thông tin user
        localStorage.setItem('token', result.token);
        const userData = {
          id: result.id,
          username: result.username,
          role: result.role
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Cập nhật context
        setUserData(userData);
        
        // Hiển thị animation thành công
        setShowSuccess(true);
        toast.success(result.message || 'Login successful!');
        
        // Chờ animation hoàn thành rồi chuyển trang
        setTimeout(() => {
          navigate('/');
        }, 1500);
        
        return true; // Dừng polling
      } else if (result.status === 'FAIL') {
        toast.error(result.message || 'Login failed');
        setLoading(false);
        return true; // Dừng polling
      } else if (result.status === 'PENDING') {
        // Tiếp tục polling
        return false;
      }
      return false;
    } catch (error) {
      console.error('Poll error:', error);
      toast.error('Error checking login status');
      setLoading(false);
      setStatus('ERROR');
      setMessage(error.response?.data?.message || 'Error checking login status');
      return true; // Dừng polling khi có lỗi
    }
  }, [setUserData, navigate]);

  // Polling effect
  useEffect(() => {
    let intervalId;

    const startPolling = async () => {
      if (sessionId && loading) {
        // Kiểm tra ngay lập tức khi có sessionId
        const finished = await checkLoginResult(sessionId);
        if (!finished) {
          // Nếu chưa hoàn thành, bắt đầu polling
          intervalId = setInterval(async () => {
            const finished = await checkLoginResult(sessionId);
            if (finished) {
              clearInterval(intervalId);
              setSessionId(null);
            }
          }, 1000); // Poll mỗi giây
        }
      }
    };

    startPolling();

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sessionId, loading, checkLoginResult]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-lg p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Successful!</h3>
              <p className="text-gray-600">Redirecting to home page...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <p className="text-white">Processing login...</p>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-10 -left-10 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute w-96 h-96 bottom-0 right-0 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Binary Rain Effect */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-sm text-blue-500 whitespace-nowrap animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            >
              {[...Array(20)].map(() => Math.round(Math.random())).join('')}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Tech Circuit Lines */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-500/30 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-500/30 rounded-br-2xl"></div>
          </div>

          <div className="relative">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-white">
                Welcome Back
              </h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto mt-2 rounded-full"></div>
              <p className="mt-2 text-sm text-blue-200">
                Sign in to your account to continue
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div className="group">
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-600 bg-gray-800/50 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="group">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-600 bg-gray-800/50 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800/50"
                    disabled={loading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {loading ? 'Processing...' : 'Sign in'}
                </button>
              </div>
            </form>

            {status && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-300">Status: {status}</p>
                {message && <p className="text-sm text-gray-300">{message}</p>}
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
