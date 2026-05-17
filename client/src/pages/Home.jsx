import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
          >
            Optimize Your Resume with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">AI Power</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            Get instant feedback, ATS compatibility scores, and actionable suggestions to land your dream job faster.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg flex items-center justify-center gap-2">
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/login" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-sm flex items-center justify-center">
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose Smart Resume AI?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our advanced algorithms analyze your resume against industry standards and specific job descriptions to give you the competitive edge.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ATS Optimization</h3>
              <p className="text-gray-600 leading-relaxed">Ensure your resume passes through Applicant Tracking Systems with our comprehensive scoring and keyword analysis.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant AI Feedback</h3>
              <p className="text-gray-600 leading-relaxed">Receive detailed, actionable suggestions to improve your resume's impact, formatting, and content within seconds.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">Your data is yours. We process your resume securely and never share your personal information with third parties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
