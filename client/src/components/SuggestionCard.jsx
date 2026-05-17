import { Lightbulb, MessageSquare } from 'lucide-react';

const SuggestionCard = ({ suggestions, feedback }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">Overall Feedback</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{feedback}</p>
      </div>
      
      {suggestions && suggestions.length > 0 && (
        <div className="p-6 bg-gray-50/50">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-gray-800">Actionable Suggestions</h3>
          </div>
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex gap-3 text-gray-700 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <span className="text-primary font-bold">{index + 1}.</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;
