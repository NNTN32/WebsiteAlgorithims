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
              
              {/* Category Tabs */}
              <div className="flex gap-4 mb-8 flex-wrap">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Content Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="wait">
                  {selectedCategory === 'algorithms' && (
                    <motion.div
                      key="algorithms"
                      className="grid gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {algorithms.map((algo, index) => (
                        <motion.div
                          key={algo.name}
                          variants={itemVariants}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            transition: { duration: 0.2 }
                          }}
                          className="bg-white/50 p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <h3 className="text-lg font-semibold text-gray-800">{algo.name}</h3>
                          <p className="text-gray-600 mt-2">{algo.problems} problems</p>
                          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(algo.problems / 50) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {selectedCategory === 'data-structures' && (
                    <motion.div
                      key="data-structures"
                      className="grid gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {dataStructures.map((ds, index) => (
                        <motion.div
                          key={ds.name}
                          variants={itemVariants}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            transition: { duration: 0.2 }
                          }}
                          className="bg-white/50 p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <h3 className="text-lg font-semibold text-gray-800">{ds.name}</h3>
                          <p className="text-gray-600 mt-2">{ds.problems} problems</p>
                          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(ds.problems / 50) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {selectedCategory === 'languages' && (
                    <motion.div
                      key="languages"
                      className="grid gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {languages.map((lang, index) => (
                        <motion.div
                          key={lang.name}
                          variants={itemVariants}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            transition: { duration: 0.2 }
                          }}
                          className="bg-white/50 p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <h3 className="text-lg font-semibold text-gray-800">{lang.name}</h3>
                          <p className="text-gray-600 mt-2">{lang.problems} problems</p>
                          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(lang.problems / 50) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
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
