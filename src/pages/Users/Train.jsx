import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Train = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    { id: 1, title: 'Two Sum', category: 'algorithms', difficulty: 'easy' },
    { id: 2, title: 'Add Two Numbers', category: 'data-structures', difficulty: 'medium' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', category: 'strings', difficulty: 'medium' },
    { id: 4, title: 'Median of Two Sorted Arrays', category: 'arrays', difficulty: 'hard' },
    { id: 5, title: 'Longest Palindromic Substring', category: 'strings', difficulty: 'medium' },
    { id: 6, title: 'Zigzag Conversion', category: 'strings', difficulty: 'medium' },
    { id: 7, title: 'Reverse Integer', category: 'algorithms', difficulty: 'easy' },
    { id: 8, title: 'String to Integer (atoi)', category: 'strings', difficulty: 'medium' },
    { id: 9, title: 'Palindrome Number', category: 'algorithms', difficulty: 'easy' },
    { id: 10, title: 'Regular Expression Matching', category: 'strings', difficulty: 'hard' },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating code symbols */}
        <motion.div 
          className="absolute top-20 left-20 text-blue-400/10 text-6xl font-mono"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {`{ }`}
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20 text-purple-400/10 text-5xl font-mono"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {`[ ]`}
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-1/3 text-green-400/10 text-7xl font-mono"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {`( )`}
        </motion.div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Glowing orbs with parallax effect */}
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          style={{
            left: `${mousePosition.x * -0.03}px`,
            top: `${mousePosition.y * -0.03}px`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
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
            className="w-80 bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 h-fit sticky top-24 border border-slate-700/30"
          >
            <div className="text-center mb-6">
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-4xl">👤</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-white">User Name</h3>
              <p className="text-slate-400">Rank: {userStats.rank}</p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 mb-6"
            >
              <motion.div 
                variants={itemVariants}
                className="bg-slate-700/30 p-4 rounded-xl shadow-sm border border-slate-600/30"
              >
                <p className="text-slate-400">Total Problems</p>
                <p className="text-2xl font-bold text-blue-400">{userStats.totalProblems}</p>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="bg-slate-700/30 p-4 rounded-xl shadow-sm border border-slate-600/30"
              >
                <p className="text-slate-400">Solved Problems</p>
                <p className="text-2xl font-bold text-purple-400">{userStats.solvedProblems}</p>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="bg-slate-700/30 p-4 rounded-xl shadow-sm border border-slate-600/30"
              >
                <p className="text-slate-400">Accuracy</p>
                <p className="text-2xl font-bold text-green-400">{userStats.accuracy}%</p>
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
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-slate-700/30">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Training Center</h1>
              
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-600/30 bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-3 text-slate-400">🔍</span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-8">
                {/* Category Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-600/30 bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-600/30 bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        backgroundColor: "rgba(30, 41, 59, 0.7)",
                        transition: { duration: 0.2 }
                      }}
                      className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/30 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
                          <div className="flex gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              problem.difficulty === 'easy' ? 'bg-green-900/30 text-green-400' :
                              problem.difficulty === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                              'bg-red-900/30 text-red-400'
                            }`}>
                              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                              {problem.category.replace('-', ' ').split(' ').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
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
                    <p className="text-slate-400 text-lg">No problems found matching your criteria.</p>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-700/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">User Profile</h2>
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <p className="text-slate-400">Username</p>
                  <p className="text-lg font-semibold text-white">User Name</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-slate-400">Email</p>
                  <p className="text-lg font-semibold text-white">user@example.com</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-slate-400">Member Since</p>
                  <p className="text-lg font-semibold text-white">January 2024</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="text-slate-400">Current Rank</p>
                  <p className="text-lg font-semibold text-white">{userStats.rank}</p>
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
