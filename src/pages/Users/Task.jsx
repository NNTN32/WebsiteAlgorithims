import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Task = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [problem, setProblem] = useState(null);
  const [testCases, setTestCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        // Kiểm tra user đã login chưa
        if (!user) {
          navigate('/login');
          return;
        }

        // Kiểm tra role
        if (user.role !== 'USER') {
          setError('Access denied: Only users can access problems');
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        setLoading(true);
        const response = await axios.get(`http://localhost:8081/api/problem/${problemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setProblem(response.data.problem);
        setError(null);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        if (err.response?.status === 401) {
          // Token hết hạn hoặc không hợp lệ
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          navigate('/login');
        } else if (err.response?.status === 403) {
          setError('Access denied: You do not have permission to view this problem');
        } else {
          setError('Failed to load problem details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [problemId, navigate, user]);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`http://localhost:8081/api/test/${problemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setTestCases(response.data.testcase);
      } catch (err) {
        console.error('Error fetching test cases:', err);
        // Don't set error state here to avoid disrupting the main UI
      }
    };

    if (problemId) {
      fetchTestCases();
    }
  }, [problemId]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`http://localhost:8081/api/code-template/languages/${problemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setLanguages(response.data.languages);
        if (response.data.languages.length > 0) {
          setSelectedLanguage(response.data.languages[0]);
        }
      } catch (err) {
        console.error('Error fetching languages:', err);
      }
    };

    if (problemId) {
      fetchLanguages();
    }
  }, [problemId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent align-[-0.125em]"></div>
              <p className="mt-4 text-slate-400">Loading problem...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-red-400 text-lg">{error}</p>
              <button
                onClick={() => navigate('/train')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Training
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const LanguageModal = () => (
    <AnimatePresence>
      {isLanguageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setIsLanguageModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Select Language</h3>
            <div className="space-y-2">
              {languages.map((language) => (
                <motion.button
                  key={language}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedLanguage === language
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsLanguageModalOpen(false);
                  }}
                >
                  {language}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 px-4">
      <div className="container mx-auto">
        {problem && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem Description Section */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-slate-700/30">
              <h1 className="text-3xl font-bold text-white mb-4">{problem.title}</h1>
              
              <div className="flex gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  problem.difficulty.toLowerCase() === 'easy' ? 'bg-green-900/30 text-green-400' :
                  problem.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {problem.difficulty}
                </span>
                {problem.topicTags && problem.topicTags.split(',').map((tag, index) => (
                  <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                <div className="text-slate-300 whitespace-pre-wrap">{problem.description}</div>
              </div>

              {/* Test Cases Section */}
              {testCases && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Test Cases</h2>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-white mb-2">Input:</h3>
                      <pre className="bg-slate-800 p-3 rounded text-slate-300 overflow-x-auto">
                        {testCases.input}
                      </pre>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Expected Output:</h3>
                      <pre className="bg-slate-800 p-3 rounded text-slate-300 overflow-x-auto">
                        {testCases.expectedOutput}
                      </pre>
                    </div>
                    {testCases.sample && (
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                          Sample Test Case
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Code Editor Section */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-slate-700/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Code Editor</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLanguageModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedLanguage || 'Select Language'}
                </motion.button>
              </div>

              <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="h-96">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full p-4 text-slate-300 bg-slate-900 font-mono text-sm focus:outline-none resize-none"
                    placeholder="Write your code here..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
      <LanguageModal />
    </div>
  );
};

export default Task;
