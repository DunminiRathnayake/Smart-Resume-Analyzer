import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { FileText, Loader2, Calendar } from 'lucide-react';

const ResumeHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/resumes/history');
        setHistory(res.data.analyses || []);
      } catch (error) {
        console.error('Failed to fetch history', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-grow bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Scan History</h1>
            <p className="text-gray-600 mt-2">View all your previous resume analyses.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No History Found</h3>
                <p className="text-gray-500 mb-6">You haven't scanned any resumes yet.</p>
                <Link to="/upload" className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Upload Your First Resume
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {history.map((item) => (
                  <Link 
                    key={item._id} 
                    to={`/analysis/${item._id}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-5 mb-4 sm:mb-0">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shrink-0
                        ${item.atsScore >= 75 ? 'bg-emerald-100 text-emerald-700' : 
                          item.atsScore >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {item.atsScore}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">{item.fileName}</h3>
                        <div className="flex items-center text-sm text-gray-500 gap-4 mt-1">
                          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                          {item.jobDescription && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">Tailored</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-48">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{item.skillsFound?.length || 0} Skills</p>
                        <p className="text-xs text-gray-500">Matched</p>
                      </div>
                      <span className="text-primary font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View <span className="hidden sm:inline">Details</span> →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHistory;
