import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Task = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 px-4">
      <div className="container mx-auto">
        {problem && (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
