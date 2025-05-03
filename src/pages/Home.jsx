import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Tech background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Corner animations */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <motion.div
          key={corner}
          className="absolute w-32 h-32 border-2 border-blue-500"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          style={{
            top: corner.includes('top') ? '0' : 'auto',
            left: corner.includes('left') ? '0' : 'auto',
            right: corner.includes('right') ? '0' : 'auto',
            bottom: corner.includes('bottom') ? '0' : 'auto',
            transform: `rotate(${corner.includes('right') ? '90' : '0'}deg)`
          }}
        />
      ))}

      {/* Central loading bar */}
      <div className="relative w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute h-full bg-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-blue-500 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        </div>
      </div>

      {/* Binary rain effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 font-mono text-sm"
            initial={{ y: -100, x: `${Math.random() * 100}%` }}
            animate={{ y: '100vh' }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Math.random().toString(2).substring(2, 10)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CodeSnippet = ({ code, delay }) => (
  <motion.div
    className="absolute text-gray-400 font-mono text-xs bg-gray-900/50 p-2 rounded-lg"
    initial={{ opacity: 0, y: -100, x: `${Math.random() * 100}%` }}
    animate={{ opacity: 1, y: '100vh' }}
    transition={{
      duration: Math.random() * 3 + 2,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {code}
  </motion.div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Tech background with algorithm visualization */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}></div>
          
          {/* Floating code snippets */}
          {[
            "function binarySearch(arr, target) {",
            "const graph = new Map();",
            "class Node { constructor(value) {",
            "def quickSort(arr):",
            "interface DataStructure {",
            "const dp = new Array(n).fill(0);"
          ].map((code, i) => (
            <CodeSnippet key={i} code={code} delay={i * 0.5} />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Master <span className="text-blue-400">Algorithms</span> with Ease
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Learn, practice, and master algorithms and data structures through interactive tutorials and challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/train"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold shadow-lg shadow-blue-500/20"
              >
                Start Learning
              </Link>
              <Link
                to="/contests"
                className="px-8 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors text-lg font-semibold"
              >
                Join Contests
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Learners" },
              { number: "500+", label: "Problems Solved" },
              { number: "50+", label: "Data Structures" },
              { number: "30+", label: "Algorithms" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Learning Paths</h2>
            <p className="text-xl text-gray-300">Choose your journey to mastery</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Beginner",
                description: "Start with the basics of algorithms and data structures",
                topics: ["Arrays", "Strings", "Basic Sorting", "Time Complexity"],
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Intermediate",
                description: "Dive deeper into complex algorithms and problem-solving",
                topics: ["Graphs", "Dynamic Programming", "Trees", "Advanced Sorting"],
                color: "from-blue-500 to-indigo-600"
              },
              {
                title: "Advanced",
                description: "Master competitive programming and system design",
                topics: ["Advanced DP", "Segment Trees", "System Design", "Competitive Programming"],
                color: "from-purple-500 to-pink-600"
              }
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-8 rounded-xl bg-gradient-to-br ${path.color} text-white`}
              >
                <h3 className="text-2xl font-semibold mb-4">{path.title}</h3>
                <p className="mb-6">{path.description}</p>
                <ul className="space-y-2">
                  {path.topics.map((topic, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300">Hear from our successful learners</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer at Google",
                quote: "The interactive learning platform helped me master complex algorithms and land my dream job at Google.",
                image: "👩‍💻"
              },
              {
                name: "Michael Chen",
                role: "Competitive Programmer",
                quote: "Thanks to the comprehensive problem sets, I improved my competitive programming ranking significantly.",
                image: "👨‍💻"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-8 rounded-xl bg-gray-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{story.image}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{story.name}</h3>
                    <p className="text-gray-300">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{story.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Latest Updates</h2>
            <p className="text-xl text-gray-300">Stay updated with new content and features</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "New Problem Set",
                description: "Added 50 new problems on Dynamic Programming",
                date: "March 15, 2024",
                type: "📚"
              },
              {
                title: "Feature Update",
                description: "Interactive code editor with real-time feedback",
                date: "March 10, 2024",
                type: "✨"
              },
              {
                title: "Community Event",
                description: "Weekly coding challenge starting next week",
                date: "March 5, 2024",
                type: "🎯"
              }
            ].map((update, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <div className="text-3xl mb-4">{update.type}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{update.title}</h3>
                <p className="text-gray-300 mb-4">{update.description}</p>
                <p className="text-sm text-gray-400">{update.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-300">Connect with fellow learners and experts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-xl bg-gray-700/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Discussion Forums</h3>
              <p className="text-gray-300 mb-6">Join discussions, ask questions, and share knowledge with our growing community of learners.</p>
              <Link
                to="/community"
                className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Join Discussions
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-xl bg-gray-700/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Weekly Challenges</h3>
              <p className="text-gray-300 mb-6">Participate in weekly coding challenges and compete with other learners.</p>
              <Link
                to="/challenges"
                className="inline-block px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                View Challenges
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Master Algorithms?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have improved their problem-solving skills with us.
            </p>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold shadow-lg shadow-white/20"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home; 