import { HelpCircle, CheckCircle } from 'lucide-react';

/**
 * Renders the AI-Generated Interview Questions divided into Technical, Project,
 * Job Match, and Behavioral categories based on standard indexing.
 */
const InterviewQuestions = ({ questions }) => {
  const getCategoryDetails = (index) => {
    if (index >= 0 && index <= 2) {
      return { label: 'Technical', color: 'bg-blue-50 text-blue-700 border-blue-100' };
    }
    if (index >= 3 && index <= 4) {
      return { label: 'Project', color: 'bg-purple-50 text-purple-700 border-purple-100' };
    }
    if (index >= 5 && index <= 6) {
      return { label: 'Job Match', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    }
    return { label: 'Behavioral', color: 'bg-amber-50 text-amber-700 border-amber-100' };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI-Generated Interview Questions</h3>
          <p className="text-sm text-gray-500">Practice answering these customized questions designed specifically for your profile and target job.</p>
        </div>
      </div>

      {(!questions || questions.length === 0) ? (
        <div className="text-center py-6">
          <p className="text-gray-500 italic">No interview questions generated yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {questions.map((question, index) => {
            const cat = getCategoryDetails(index);
            return (
              <div key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/10 transition-all duration-200">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${cat.color}`}>
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium text-sm leading-relaxed">
                    {question}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InterviewQuestions;
