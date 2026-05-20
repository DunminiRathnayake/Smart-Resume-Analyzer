import { Sparkles } from 'lucide-react';

/**
 * Displays the AI-generated short feedback summary for the resume.
 * Shows an overall quality assessment of the resume at a glance.
 */
const AIFeedbackSummary = ({ summary }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-fuchsia-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-gradient-to-br from-indigo-600 to-fuchsia-500 rounded-lg">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">AI Feedback Summary</h3>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm">
        {summary && summary.trim().length > 0
          ? summary
          : 'No feedback summary available yet.'}
      </p>
    </div>
  );
};

export default AIFeedbackSummary;
