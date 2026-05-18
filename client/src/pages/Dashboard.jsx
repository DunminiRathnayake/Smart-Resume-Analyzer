import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { FileText, Plus, Clock, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/resumes/history');
        // Get only the 3 most recent
        setHistory(res.data.analyses ? res.data.analyses.slice(0, 3) : []);
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-gray-600 mt-2">Ready to optimize your resume for your next dream job?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-4">New Analysis</h2>
              <p className="mb-6 opacity-90">Upload your latest resume and target job description to get instant, actionable feedback.</p>
              <Link to="/upload" className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                <Plus className="h-5 w-5" /> Start New Scan
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-500 mb-3">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-xl font-bold text-gray-800">Pro Tip</h2>
                </div>
                <p className="text-gray-600">Tailoring your resume to specific job descriptions increases your chances of passing ATS systems by up to 40%.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" /> Recent Scans
              </h2>
              {history.length > 0 && (
                <Link to="/history" className="text-primary hover:text-primary/80 font-medium text-sm">
                  View All
                </Link>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No scans yet. Upload a resume to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <Link 
                    key={item._id} 
                    to={`/analysis/${item._id}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                        ${item.atsScore >= 75 ? 'bg-emerald-100 text-emerald-700' : 
                          item.atsScore >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {item.atsScore}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{item.fileName}</h3>
                        <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-primary transition-colors">
                      View Details →
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

export default Dashboard;
