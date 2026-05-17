import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ResumeUploadForm from '../components/ResumeUploadForm';
import api from '../api/axios';

const UploadResume = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (file, jobDescription) => {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const res = await api.post('/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Navigate to results page
      navigate(`/analysis/${res.data.data._id}`);
    } catch (error) {
      console.error('Upload error', error);
      alert('Failed to analyze resume. Please try again.');
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
          
          <ResumeUploadForm onSubmit={handleUpload} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
