import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BsClock, BsCodeSlash, BsLightning, BsTrophy } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const BattleTimer = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-center space-x-3">
        <BsClock className="text-white text-2xl" />
        <span className="text-white font-mono text-3xl font-bold">{formatTime(timeLeft)}</span>
      </div>
    </motion.div>
  );
};

const UserProgress = ({ user, score, problemsSolved }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold">{user[0]}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{user}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <BsLightning className="text-yellow-400" />
          <span className="text-yellow-400 font-bold text-xl">{score}</span>
        </div>
      </div>
      <div className="space-y-3">
        {problemsSolved.map((problem, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/30"
          >
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-gray-600/50 flex items-center justify-center text-gray-300">
                {index + 1}
              </span>
              <span className="text-gray-300">{problem.name}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              problem.solved 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : "bg-gray-600/20 text-gray-400 border border-gray-600/30"
            }`}>
              {problem.solved ? "Solved" : "In Progress"}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Battle = () => {
  const { roomId } = useParams();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [battleStarted, setBattleStarted] = useState(false);
  const [users, setUsers] = useState({
    user1: {
      name: "Player 1",
      score: 0,
      problems: [
        { name: "Binary Search Challenge", solved: false },
        { name: "Dynamic Programming Task", solved: false },
        { name: "Graph Theory Problem", solved: false }
      ]
    },
    user2: {
      name: "Player 2",
      score: 0,
      problems: [
        { name: "Binary Search Challenge", solved: false },
        { name: "Dynamic Programming Task", solved: false },
        { name: "Graph Theory Problem", solved: false }
      ]
    }
  });

  useEffect(() => {
    console.log("Connected to battle room:", roomId);
    const timer = setTimeout(() => {
      setBattleStarted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [roomId]);

  useEffect(() => {
    let timer;
    if (battleStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [battleStarted, timeLeft]);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Animated Background */}
      <div className="absolute inset-0 pt-20 pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Code symbols animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-500/10 text-3xl font-mono"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Battle Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center space-x-3"
          >
            <BsTrophy className="text-yellow-400 text-3xl" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Battle Room #{roomId}
            </h1>
          </motion.div>
          {battleStarted && <BattleTimer timeLeft={timeLeft} />}
        </div>

        {/* Battle Arena */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <UserProgress
            user={users.user1.name}
            score={users.user1.score}
            problemsSolved={users.user1.problems}
          />
          <UserProgress
            user={users.user2.name}
            score={users.user2.score}
            problemsSolved={users.user2.problems}
          />
        </div>

        {/* Problem Workspace */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center mb-6">
            <BsCodeSlash className="text-blue-400 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-white">Coding Workspace</h2>
          </div>
          <div className="h-[500px] bg-gray-900/50 rounded-lg p-6 border border-gray-700/30">
            <div className="text-gray-400 text-lg">
              Code editor will be integrated here...
            </div>
          </div>
        </motion.div>

        {/* Battle Status */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div className="text-xl font-semibold text-white">
              {battleStarted ? "Battle in Progress" : "Waiting for Players"}
            </div>
          </div>
          <div className="text-gray-400 mt-2">
            {battleStarted
              ? `Time Remaining: ${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`
              : "Preparing battle arena..."}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Battle;