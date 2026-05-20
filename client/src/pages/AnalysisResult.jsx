import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ATSScoreCard from '../components/ATSScoreCard';
import SkillTags from '../components/SkillTags';
import SuggestionCard from '../components/SuggestionCard';
import JobMatchCard from '../components/JobMatchCard';
import AIFeedbackSummary from '../components/AIFeedbackSummary';
import InterviewQuestions from '../components/InterviewQuestions';
import CoverLetter from '../components/CoverLetter';
import api from '../api/axios';
import { ArrowLeft, Loader2, Calendar, FileText, Download } from 'lucide-react';

const AnalysisResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await api.get(`/resumes/${id}/report`, {
        responseType: 'blob', // Important for downloading files
      });

      // Create a blob from the PDF stream
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Resume_Analysis_Report_${result.originalFileName || 'resume'}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download report:', err);
      // Optional: show a toast or error message for download failure
    } finally {
      setIsDownloading(false);
    }
  };

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
                  <FileText className="h-6 w-6 text-primary" /> {result.originalFileName}
                </h1>
                <div className="flex items-center text-gray-500 text-sm gap-4">
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(result.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 hidden sm:block">
                  <p className="text-sm text-primary font-semibold">AI Scan Complete</p>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl opacity-100 transition-all flex items-center gap-2 disabled:bg-none disabled:bg-slate-300 disabled:text-slate-700 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  {isDownloading ? 'Downloading...' : 'Download PDF Report'}
                </button>
              </div>
            </div>
          </div>

          {/* AI Feedback Summary - shown at the top of results */}
          <div className="mb-6">
            <AIFeedbackSummary summary={result.shortFeedbackSummary} />
          </div>

          {/* AI-Generated Interview Questions */}
          <div className="mb-6">
            <InterviewQuestions questions={result.interviewQuestions} />
          </div>

          {/* AI-Generated Cover Letter */}
          <div className="mb-8">
            <CoverLetter coverLetter={result.coverLetter} />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Score & Skills */}
            <div className="lg:col-span-1 space-y-6">
              <ATSScoreCard score={result.atsScore} />
              <SkillTags title="Matching Skills" skills={result.detectedSkills} type="found" />
              <SkillTags title="Missing Skills to Add" skills={result.missingSkills} type="missing" />
            </div>

            {/* Right Column - Feedback & Suggestions */}
            <div className="lg:col-span-2 space-y-6">
              {result.targetJobDescription && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Target Job Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 max-h-40 overflow-y-auto whitespace-pre-wrap">
                    {result.targetJobDescription}
                  </div>
                </div>
              )}

              {result.targetJobDescription && (
                <JobMatchCard 
                  matchPercentage={result.matchPercentage}
                  matchedKeywords={result.matchedKeywords}
                  missingKeywords={result.missingKeywords}
                  jobFitSummary={result.jobFitSummary}
                />
              )}
              
              <SuggestionCard 
                suggestions={result.suggestions} 
                feedback={result.jobMatchSummary || "Based on the analysis, here are some actionable suggestions to improve your ATS score."} 
                strengths={result.strengths}
                weaknesses={result.weaknesses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
