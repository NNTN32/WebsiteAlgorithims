import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Train = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'data-structures', name: 'Data Structures' },
    { id: 'strings', name: 'Strings' },
    { id: 'arrays', name: 'Arrays' },
    { id: 'trees', name: 'Trees' },
    { id: 'graphs', name: 'Graphs' },
    { id: 'dynamic-programming', name: 'Dynamic Programming' },
  ];

  const difficultyLevels = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const problems = [
    { id: 1, title: 'Two Sum', category: 'algorithms', difficulty: 'easy', status: 'solved' },
    { id: 2, title: 'Add Two Numbers', category: 'data-structures', difficulty: 'medium', status: 'attempted' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', category: 'strings', difficulty: 'medium', status: 'unsolved' },
    { id: 4, title: 'Median of Two Sorted Arrays', category: 'arrays', difficulty: 'hard', status: 'unsolved' },
    { id: 5, title: 'Longest Palindromic Substring', category: 'strings', difficulty: 'medium', status: 'solved' },
    { id: 6, title: 'Zigzag Conversion', category: 'strings', difficulty: 'medium', status: 'unsolved' },
    { id: 7, title: 'Reverse Integer', category: 'algorithms', difficulty: 'easy', status: 'solved' },
    { id: 8, title: 'String to Integer (atoi)', category: 'strings', difficulty: 'medium', status: 'attempted' },
    { id: 9, title: 'Palindrome Number', category: 'algorithms', difficulty: 'easy', status: 'solved' },
    { id: 10, title: 'Regular Expression Matching', category: 'strings', difficulty: 'hard', status: 'unsolved' },
  ];

  const userStats = {
    totalProblems: 150,
    solvedProblems: 75,
    accuracy: 85,
    rank: 'Gold',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Filter problems based on selected category, difficulty, and search query
  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="w-80 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 h-fit sticky top-24 border border-white/20"
          >
            <div className="text-center mb-6">
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-4xl">👤</span>
              </motion.div>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">User Name</h3>
              <p className="text-gray-500">Rank: {userStats.rank}</p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 mb-6"
            >
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl shadow-sm border border-white/50"
              >
                <p className="text-gray-600">Total Problems</p>
                <p className="text-2xl font-bold text-blue-600">{userStats.totalProblems}</p>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl shadow-sm border border-white/50"
              >
                <p className="text-gray-600">Solved Problems</p>
                <p className="text-2xl font-bold text-indigo-600">{userStats.solvedProblems}</p>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl shadow-sm border border-white/50"
              >
                <p className="text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">{userStats.accuracy}%</p>
              </motion.div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowProfileModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
            >
              View Profile
            </motion.button>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Training Center</h1>
              
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-3 text-gray-400">🔍</span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-8">
                {/* Category Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {difficultyLevels.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problems List */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem, index) => (
                    <motion.div
                      key={problem.id}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        transition: { duration: 0.2 }
                      }}
                      className="bg-white/50 p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{problem.title}</h3>
                          <div className="flex gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {problem.category.replace('-', ' ').split(' ').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            problem.status === 'solved' ? 'bg-green-100 text-green-800' :
                            problem.status === 'attempted' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
                          </span>
                          <Link to={`/problem/${problem.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                              Solve
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No problems found matching your criteria.</p>
                  </div>
                )}
              </motion.div>
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">User Profile</h2>
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <p className="text-gray-600">Username</p>
                  <p className="text-lg font-semibold text-gray-800">User Name</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-800">user@example.com</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-gray-600">Member Since</p>
                  <p className="text-lg font-semibold text-gray-800">January 2024</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-gray-600">Current Rank</p>
                  <p className="text-lg font-semibold text-gray-800">{userStats.rank}</p>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowProfileModal(false)}
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Train;
