import { Briefcase } from 'lucide-react';

/**
 * Displays AI-generated LinkedIn Profile Suggestions in a clean card format.
 */
const LinkedInSuggestions = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Briefcase className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">LinkedIn Profile Suggestions</h3>
          <p className="text-sm text-gray-500">AI-powered tips to optimize your LinkedIn presence for your target role.</p>
        </div>
      </div>

      {(!suggestions || suggestions.length === 0) ? (
        <div className="text-center py-6">
          <p className="text-gray-500 italic">No LinkedIn suggestions available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all duration-200"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                {index + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedInSuggestions;
