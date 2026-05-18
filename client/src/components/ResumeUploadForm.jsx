import { useState } from 'react';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';

const ResumeUploadForm = ({ onSubmit, isLoading }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    onSubmit(file, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Job Description (Optional but recommended)
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
          placeholder="Paste the job description here to get tailored ATS feedback..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF only)</label>
        
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer
              ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <UploadCloud className={`h-12 w-12 mb-4 ${dragActive ? 'text-primary' : 'text-gray-400'}`} />
            <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-gray-500 text-sm">PDF (max. 5MB)</p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <File className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <p className="mt-3 text-sm text-gray-500">
          <span className="font-medium">Note:</span> Best results with text-based PDFs exported from Microsoft Word or Google Docs. Scanned/image-based PDFs may not be supported.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !file}
        className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing Resume...
          </>
        ) : (
          'Analyze Resume'
        )}
      </button>
    </form>
  );
};

export default ResumeUploadForm;
