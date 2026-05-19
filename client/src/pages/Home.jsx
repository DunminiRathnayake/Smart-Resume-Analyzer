import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col flex-grow">

      {/* ── Hero Section ── */}
      <div className="bg-gradient-to-b from-purple-50 via-white to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10">

          {/* Left – text content */}
          <div className="lg:w-1/2 space-y-6">

            {/* Badge */}
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
              ✨ AI-Powered Resume Analysis
            </div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight"
            >
              Optimize Your Resume{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500">
                with AI Power
              </span>
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-md leading-relaxed"
            >
              Get AI-powered insights, improve your ATS score, and land your
              dream job faster.
            </motion.p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 text-white font-semibold shadow-lg hover:shadow-xl opacity-100 px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
              >
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="bg-white text-slate-900 border border-slate-300 font-semibold hover:bg-slate-50 px-8 py-4 rounded-xl text-base transition-colors flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 pt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                AI-Powered Analysis
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-purple-500" />
                ATS Optimized
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-fuchsia-500" />
                Instant Results
              </div>
            </div>
          </div>

          {/* Right – hero illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">

              {/* Soft purple glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-purple-200 to-fuchsia-200 opacity-40 rounded-3xl blur-3xl scale-110 -z-10" />

              {/* Main resume card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

                {/* Card header bar */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 h-2" />

                <div className="flex">
                  {/* Sidebar accent */}
                  <div className="w-1.5 bg-gradient-to-b from-indigo-400 to-fuchsia-400 rounded-bl-2xl" />

                  {/* Card body */}
                  <div className="flex-1 p-6 space-y-5">

                    {/* Profile header */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center text-indigo-800 font-bold text-lg shadow-inner flex-shrink-0">
                        JD
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                      </div>
                    </div>

                    {/* Body text lines */}
                    <div className="space-y-2">
                      <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                      <div className="h-2.5 bg-gray-100 rounded-full w-5/6" />
                      <div className="h-2.5 bg-gray-100 rounded-full w-4/6" />
                      <div className="h-2.5 bg-gray-100 rounded-full w-3/4" />
                    </div>

                    {/* Section label */}
                    <div className="h-3 bg-gray-200 rounded-full w-1/4" />
                    <div className="space-y-2">
                      <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                      <div className="h-2.5 bg-gray-100 rounded-full w-4/5" />
                    </div>

                    {/* ATS progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>ATS Score</span>
                        <span className="font-semibold text-purple-600">85 / 100</span>
                      </div>
                      <div className="h-2.5 bg-purple-100 rounded-full">
                        <div className="h-2.5 w-[85%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                      </div>
                    </div>

                    {/* Skills bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Skill Match</span>
                        <span className="font-semibold text-green-600">72%</span>
                      </div>
                      <div className="h-2.5 bg-green-100 rounded-full">
                        <div className="h-2.5 w-[72%] bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                      </div>
                    </div>

                    {/* Keywords bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Keywords</span>
                        <span className="font-semibold text-indigo-600">60%</span>
                      </div>
                      <div className="h-2.5 bg-indigo-100 rounded-full">
                        <div className="h-2.5 w-[60%] bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating ATS Score card */}
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-purple-100">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white font-extrabold text-lg shadow-md">
                  85
                </div>
                <div className="leading-tight">
                  <div className="text-xs text-gray-400">ATS Score</div>
                  <div className="text-sm font-bold text-gray-700">/ 100</div>
                </div>
              </div>

              {/* Floating checklist card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-3 space-y-1.5 border border-green-100">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" /> Keywords matched
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" /> Formatting OK
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" /> ATS ready
                </div>
              </div>

              {/* Floating AI badge */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                AI ✦
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Features Section ── */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose Smart Resume AI?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our AI-driven platform delivers precise ATS scores, actionable suggestions,
              tailored job matches, and top‑grade security.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ATS Score Analysis</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Get a detailed ATS compatibility score and actionable tips to improve your chances.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <Zap className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Suggestions</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                AI‑generated recommendations to refine wording, structure, and keyword usage.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure &amp; Private</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Your data stays confidential; we never share personal information with third parties.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <CheckCircle2 className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Job Matching</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Match your resume against job descriptions and get tailored recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
