import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ATSScoreCard from '../components/ATSScoreCard';
import SkillTags from '../components/SkillTags';
import SuggestionCard from '../components/SuggestionCard';
import api from '../api/axios';
import { ArrowLeft, Loader2, Calendar, FileText } from 'lucide-react';

const AnalysisResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/resumes/${id}`);
        setResult(res.data);
      } catch (err) {
        setError('Failed to load analysis result');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-grow bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex flex-grow bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
            <p className="text-gray-600 mb-4">{error || 'Result not found'}</p>
            <Link to="/dashboard" className="text-primary hover:underline">Return to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" /> {result.fileName}
                </h1>
                <div className="flex items-center text-gray-500 text-sm gap-4">
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(result.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="bg-primary/5 px-4 py-2 rounded-lg border border-primary/10">
                <p className="text-sm text-primary font-semibold">AI Scan Complete</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Score & Skills */}
            <div className="lg:col-span-1 space-y-6">
              <ATSScoreCard score={result.atsScore} />
              <SkillTags title="Matching Skills" skills={result.skillsFound} type="found" />
              <SkillTags title="Missing Skills to Add" skills={result.skillsMissing} type="missing" />
            </div>

            {/* Right Column - Feedback & Suggestions */}
            <div className="lg:col-span-2 space-y-6">
              {result.jobDescription && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Target Job Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 max-h-40 overflow-y-auto whitespace-pre-wrap">
                    {result.jobDescription}
                  </div>
                </div>
              )}
              
              <SuggestionCard suggestions={result.suggestions} feedback={result.feedback} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
