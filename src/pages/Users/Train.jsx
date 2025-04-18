import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Train = () => {
  const [selectedCategory, setSelectedCategory] = useState('algorithms');
  const [showProfileModal, setShowProfileModal] = useState(false);

  const categories = [
    { id: 'algorithms', name: 'Algorithms', icon: '🧮' },
    { id: 'data-structures', name: 'Data Structures', icon: '📚' },
    { id: 'languages', name: 'Programming Languages', icon: '💻' },
  ];

  const algorithms = [
    { name: 'Sorting Algorithms', problems: 25 },
    { name: 'Searching Algorithms', problems: 15 },
    { name: 'Dynamic Programming', problems: 30 },
    { name: 'Graph Algorithms', problems: 20 },
    { name: 'Greedy Algorithms', problems: 15 },
  ];

  const dataStructures = [
    { name: 'Arrays', problems: 20 },
    { name: 'Linked Lists', problems: 15 },
    { name: 'Trees', problems: 25 },
    { name: 'Graphs', problems: 20 },
    { name: 'Hash Tables', problems: 15 },
  ];

  const languages = [
    { name: 'Python', problems: 50 },
    { name: 'JavaScript', problems: 45 },
    { name: 'Java', problems: 40 },
    { name: 'C++', problems: 35 },
  ];

  const userStats = {
    totalProblems: 150,
    solvedProblems: 75,
    accuracy: 85,
    rank: 'Gold',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-80 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-8"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold">User Name</h3>
              <p className="text-gray-500">Rank: {userStats.rank}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Total Problems</p>
                <p className="text-2xl font-bold">{userStats.totalProblems}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Solved Problems</p>
                <p className="text-2xl font-bold">{userStats.solvedProblems}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold">{userStats.accuracy}%</p>
              </div>
            </div>

            <button
              onClick={() => setShowProfileModal(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Profile
            </button>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h1 className="text-3xl font-bold mb-6">Training Center</h1>
              
              {/* Category Tabs */}
              <div className="flex gap-4 mb-8">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                  {selectedCategory === 'algorithms' && (
                    <motion.div
                      key="algorithms"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {algorithms.map((algo, index) => (
                        <motion.div
                          key={algo.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg mb-4 hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-lg font-semibold">{algo.name}</h3>
                          <p className="text-gray-600">{algo.problems} problems</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {selectedCategory === 'data-structures' && (
                    <motion.div
                      key="data-structures"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {dataStructures.map((ds, index) => (
                        <motion.div
                          key={ds.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg mb-4 hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-lg font-semibold">{ds.name}</h3>
                          <p className="text-gray-600">{ds.problems} problems</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {selectedCategory === 'languages' && (
                    <motion.div
                      key="languages"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {languages.map((lang, index) => (
                        <motion.div
                          key={lang.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg mb-4 hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-lg font-semibold">{lang.name}</h3>
                          <p className="text-gray-600">{lang.problems} problems</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">User Profile</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Username</p>
                  <p className="text-lg font-semibold">User Name</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-lg font-semibold">user@example.com</p>
                </div>
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="text-lg font-semibold">January 2024</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Rank</p>
                  <p className="text-lg font-semibold">{userStats.rank}</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Train;
