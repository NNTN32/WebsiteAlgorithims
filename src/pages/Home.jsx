import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 transform -skew-y-6"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Master <span className="text-blue-600">Algorithms</span> with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Learn, practice, and master algorithms and data structures through interactive tutorials and challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/train"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                Start Learning
              </Link>
              <Link
                to="/contests"
                className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold"
              >
                Join Contests
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Learn algorithms the right way</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Interactive Learning",
                description: "Step-by-step tutorials with visualizations and examples",
                icon: "🎯"
              },
              {
                title: "Practice Problems",
                description: "Hundreds of problems with detailed solutions and explanations",
                icon: "💡"
              },
              {
                title: "Progress Tracking",
                description: "Track your learning progress and identify areas for improvement",
                icon: "📊"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
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
              to="/signup"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 