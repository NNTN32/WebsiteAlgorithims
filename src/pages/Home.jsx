import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

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

const LearningPathCard = ({ path, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: isActive ? 1 : 0,
      scale: isActive ? 1 : 0.8,
      x: isActive ? 0 : '100%'
    }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="absolute top-0 left-0 w-full"
  >
    <div className="relative h-[600px] w-full rounded-3xl overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: isActive ? 1 : 1.1 }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img 
          src={path.image} 
          alt={path.title}
          className="w-full h-full object-cover"
        />
        {/* Custom Gradient Overlay based on path type */}
        <div className={`absolute inset-0 ${path.gradient}`} />
      </motion.div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {path.backgroundElements}
      </div>
      
      {/* Content */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-12 text-white"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: isActive ? 0 : 100, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-5xl font-bold mb-6">{path.title}</h3>
        <p className="text-xl mb-8 text-gray-200 max-w-2xl">{path.description}</p>
        <Link 
          to={path.link}
          className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all transform hover:scale-105 hover:shadow-lg shadow-purple-500/50 group"
        >
          Learn more
          <motion.span 
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

// Optimize background animations with useCallback and useMemo
const BackgroundAnimation = ({ count, className, animationProps }) => {
  const elements = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }));
  }, [count]);

  return elements.map(({ id, left, top, delay, duration }) => (
    <motion.div
      key={id}
      className={`absolute ${className}`}
      style={{
        left,
        top,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
      initial={animationProps.initial}
      animate={animationProps.animate}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop"
      }}
    />
  ));
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activePathIndex, setActivePathIndex] = useState(0);

  const learningPaths = [
    {
      title: "Beginner's Path",
      description: "Start with the basics of algorithms and data structures. Master fundamental concepts like arrays, strings, and basic sorting algorithms.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop",
      link: "/paths/beginner",
      gradient: "bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent",
      backgroundElements: (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500/20 text-4xl font-mono"
              initial={{ y: Math.random() * 100, x: Math.random() * 100 + '%' }}
              animate={{ y: ['0%', '100%'] }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            >
              {['[]', '{}', '()', '&lt;&gt;'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Algorithm Mastery",
      description: "Dive deeper into complex algorithms and problem-solving techniques. Learn advanced data structures and optimization strategies.",
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2940&auto=format&fit=crop",
      link: "/paths/intermediate",
      gradient: "bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent",
      backgroundElements: (
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-blue-500/30"
              style={{
                width: Math.random() * 100 + 50,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                scaleX: [1, 2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "Competitive Programming",
      description: "Take your skills to the next level with advanced algorithms and system design concepts. Prepare for coding competitions.",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2874&auto=format&fit=crop",
      link: "/paths/advanced",
      gradient: "bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent",
      backgroundElements: (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "System Design",
      description: "Learn how to design scalable systems and optimize complex algorithms for real-world applications.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop",
      link: "/paths/system-design",
      gradient: "bg-gradient-to-t from-indigo-900/90 via-indigo-900/50 to-transparent",
      backgroundElements: (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-indigo-500/30"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                scale: [1, 30, 1],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )
    }
  ];

  const nextPath = useCallback(() => {
    setActivePathIndex((prev) => (prev + 1) % learningPaths.length);
  }, [learningPaths.length]);

  const prevPath = useCallback(() => {
    setActivePathIndex((prev) => (prev - 1 + learningPaths.length) % learningPaths.length);
  }, [learningPaths.length]);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(nextPath, 5000);
    return () => clearInterval(timer);
  }, [nextPath]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Optimize scroll-based animations
  const scrollVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
            <h2 className="text-5xl font-bold text-white mb-4">Learning Paths</h2>
            <p className="text-xl text-gray-300">Choose your journey to mastery</p>
          </motion.div>

          <div className="relative">
            {/* Slider Navigation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPath}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <BsArrowLeft size={24} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPath}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <BsArrowRight size={24} />
            </motion.button>

            {/* Slider */}
            <div className="relative h-[600px] overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                {learningPaths.map((path, index) => (
                  index === activePathIndex && (
                    <LearningPathCard
                      key={path.title}
                      path={path}
                      isActive={true}
                    />
                  )
                ))}
              </AnimatePresence>
            </div>

            {/* Slider Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {learningPaths.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePathIndex(index)}
                  className={`w-16 h-1.5 rounded-full transition-all duration-300 ${
                    index === activePathIndex 
                      ? 'bg-purple-600 w-24' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Optimized background animation */}
        <div className="absolute inset-0 pointer-events-none">
          <BackgroundAnimation
            count={20} // Reduced from 50
            className="bg-blue-500"
            animationProps={{
              initial: { scale: 1, opacity: 0.3 },
              animate: { scale: 1.5, opacity: 0.8 }
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300">Hear from our successful learners</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer at Google",
                quote: "The interactive learning platform helped me master complex algorithms and land my dream job at Google.",
                image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=2940&auto=format&fit=crop",
                metrics: { problems: "500+", contests: "50+", rank: "Top 1%" }
              },
              {
                name: "Michael Chen",
                role: "Competitive Programmer",
                quote: "Thanks to the comprehensive problem sets, I improved my competitive programming ranking significantly.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
                metrics: { problems: "1000+", contests: "100+", rank: "Top 0.1%" }
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-700/50 backdrop-blur-sm rounded-2xl overflow-hidden transform-gpu hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover transform-gpu hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{story.name}</h3>
                      <p className="text-blue-400">{story.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic mb-6">"{story.quote}"</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(story.metrics).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-blue-400 font-bold">{value}</div>
                        <div className="text-gray-400 text-sm capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Optimized animated lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => ( // Reduced from 20
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform-gpu"
              style={{
                width: '100%',
                top: `${(i / 10) * 100}%`,
                willChange: 'transform',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: i * -1.5
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Latest Updates</h2>
            <p className="text-xl text-gray-300">Stay updated with new content and features</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "New Problem Set",
                description: "Added 50 new problems on Dynamic Programming with interactive visualizations and step-by-step solutions.",
                date: "March 15, 2024",
                type: "📚",
                color: "from-green-500/20 to-green-500/5"
              },
              {
                title: "Feature Update",
                description: "Introducing AI-powered code review and real-time collaboration features for better learning experience.",
                date: "March 10, 2024",
                type: "✨",
                color: "from-blue-500/20 to-blue-500/5"
              },
              {
                title: "Community Event",
                description: "Join our weekly coding challenge with prizes and learn from top competitive programmers.",
                date: "March 5, 2024",
                type: "🎯",
                color: "from-purple-500/20 to-purple-500/5"
              }
            ].map((update, index) => (
              <motion.div
                key={index}
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`p-6 rounded-2xl bg-gradient-to-b ${update.color} backdrop-blur-sm border border-gray-700 transform-gpu hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="text-4xl mb-4">{update.type}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{update.title}</h3>
                <p className="text-gray-300 mb-4">{update.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">{update.date}</p>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors transform-gpu hover:scale-105 duration-300">
                    Learn more →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Optimized network background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <BackgroundAnimation
            count={5} // Reduced from 10
            className="w-2 h-2 bg-blue-500/30 rounded-full"
            animationProps={{
              initial: { scale: 1, opacity: 0.3, x: 0, y: 0 },
              animate: { scale: 1.5, opacity: 0.6, x: 50, y: 50 }
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-300">Connect with fellow learners and experts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Discussion Forums",
                description: "Join discussions, ask questions, and share knowledge with our growing community of learners.",
                features: ['Real-time problem discussions', 'Expert guidance', 'Code reviews', 'Learning resources'],
                buttonText: "Join Discussions",
                buttonClass: "bg-blue-500 hover:bg-blue-600",
                gradient: "from-blue-500/10 to-purple-500/10"
              },
              {
                title: "Weekly Challenges",
                description: "Participate in weekly coding challenges and compete with other learners.",
                stats: [
                  { label: 'Active Participants', value: '5,000+' },
                  { label: 'Weekly Prizes', value: '$500' },
                  { label: 'Success Rate', value: '85%' },
                  { label: 'Global Ranking', value: 'Available' }
                ],
                buttonText: "View Challenges",
                buttonClass: "bg-purple-500 hover:bg-purple-600",
                gradient: "from-purple-500/10 to-pink-500/10"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-gray-700 transform-gpu hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${item.gradient}`} />
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 mb-6">{item.description}</p>
                  {item.features && (
                    <ul className="space-y-4 mb-8">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <span className="mr-2 text-blue-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.stats && (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {item.stats.map((stat, i) => (
                        <div key={i} className="text-center p-3 rounded-lg bg-gray-800/30">
                          <div className="text-purple-400 font-bold">{stat.value}</div>
                          <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className={`px-8 py-3 ${item.buttonClass} text-white rounded-xl transform-gpu hover:scale-105 transition-all duration-300`}>
                    {item.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
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