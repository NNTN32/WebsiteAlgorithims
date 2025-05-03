import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsTrophy, BsPeople, BsCodeSlash } from 'react-icons/bs';
import { FaFire, FaCrown, FaMedal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Leaderboard = ({ participants }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <BsTrophy className="mr-2 text-yellow-400" />
        Live Leaderboard
      </h3>
      <div className="space-y-3">
        {participants.map((participant, index) => (
          <motion.div
            key={participant.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg ${
              index < 3 ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/5' : 'bg-gray-700/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {index === 0 && <FaCrown className="text-yellow-400 text-xl" />}
              {index === 1 && <FaMedal className="text-gray-300 text-xl" />}
              {index === 2 && <FaMedal className="text-amber-600 text-xl" />}
              <span className="text-white font-medium">{participant.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{participant.score} pts</span>
              <span className="text-green-400">{participant.solved} solved</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ProblemCard = ({ problem, onJoinBattle }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm shadow-lg transition-all duration-300"
      onClick={() => onJoinBattle(problem.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold text-white">{problem.title}</h4>
        <span className={`px-3 py-1 rounded-full text-sm ${
          problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
          problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {problem.difficulty}
        </span>
      </div>
      <p className="text-gray-300 mb-4">{problem.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BsPeople className="text-gray-400" />
          <span className="text-gray-300">{problem.activeBattles} active battles</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaFire className="text-orange-400" />
          <span className="text-gray-300">{problem.points} points</span>
        </div>
      </div>
    </motion.div>
  );
};

const Contest = () => {
  const navigate = useNavigate();
  const [participants] = useState([
    { id: 1, name: 'John Doe', score: 850, solved: 3 },
    { id: 2, name: 'Jane Smith', score: 750, solved: 2 },
    { id: 3, name: 'Mike Johnson', score: 600, solved: 2 },
    { id: 4, name: 'Sarah Wilson', score: 450, solved: 1 },
    { id: 5, name: 'David Brown', score: 300, solved: 1 },
  ]);

  const [problems] = useState([
    {
      id: 1,
      title: 'Binary Search Battle',
      description: 'Implement an efficient binary search algorithm with custom constraints',
      difficulty: 'Medium',
      points: 300,
      activeBattles: 5,
    },
    {
      id: 2,
      title: 'Dynamic Programming Duel',
      description: 'Solve a complex DP problem with optimal space complexity',
      difficulty: 'Hard',
      points: 500,
      activeBattles: 3,
    },
    {
      id: 3,
      title: 'Graph Theory Challenge',
      description: 'Find the shortest path in a weighted graph with special conditions',
      difficulty: 'Medium',
      points: 400,
      activeBattles: 4,
    },
  ]);

  const handleJoinBattle = useCallback((problemId) => {
    // In a real application, you would:
    // 1. Check if there's an available opponent
    // 2. Create or join a battle room
    // 3. Navigate to the battle page with the room ID
    const roomId = `${problemId}-${Date.now()}`; // Simple room ID generation
    navigate(`/battle/${roomId}`);
  }, [navigate]);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Tech background with algorithm visualization */}
      <div className="absolute inset-0 pt-20 pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-500/10 text-4xl font-mono"
              initial={{ y: Math.random() * 100, x: Math.random() * 100 + '%' }}
              animate={{ y: ['0%', '100%'] }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            >
              {['[]', '{}', '()', '<>'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contest Arena */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Algorithm Battle Arena
          </h1>
          <p className="text-gray-400 text-lg">Choose a problem to start a battle</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Leaderboard */}
          <div className="space-y-8">
            <Leaderboard participants={participants} />
          </div>

          {/* Middle and Right Columns - Problem Cards */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BsCodeSlash className="mr-2 text-blue-400" />
                Available Battles
              </h3>
              {problems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  onJoinBattle={handleJoinBattle}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Battle Statistics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-600/5 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold text-white mb-2">150</div>
            <div className="text-gray-400">Active Battles</div>
          </div>
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-600/5 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold text-white mb-2">2,500</div>
            <div className="text-gray-400">Total Participants</div>
          </div>
          <div className="bg-gradient-to-r from-pink-600/20 to-pink-600/5 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold text-white mb-2">85%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contest;
