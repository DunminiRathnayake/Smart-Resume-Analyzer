import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ResumeUploadForm from '../components/ResumeUploadForm';
import api from '../api/axios';

const UploadResume = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (file, jobDescription) => {
    setIsLoading(true);
    setErrorMsg('');
    
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const res = await api.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Navigate to results page
      navigate(`/analysis/${res.data.analysisId}`);
    } catch (error) {
      console.error('Upload error', error);
      setErrorMsg(error.response?.data?.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-grow bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Upload Resume</h1>
            <p className="text-gray-600 mt-2">Get an AI-powered analysis of your resume tailored to your target job.</p>
          </div>
          
          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <ResumeUploadForm onSubmit={handleUpload} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
