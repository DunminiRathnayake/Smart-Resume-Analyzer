import { Target, CheckCircle2, XCircle } from 'lucide-react';

const JobMatchCard = ({ matchPercentage, matchedKeywords, missingKeywords, jobFitSummary }) => {
  // Determine color based on match percentage
  let progressColor = 'bg-red-500';
  let textColor = 'text-red-700';
  let bgColor = 'bg-red-50';
  let borderColor = 'border-red-100';

  if (matchPercentage >= 75) {
    progressColor = 'bg-emerald-500';
    textColor = 'text-emerald-700';
    bgColor = 'bg-emerald-50';
    borderColor = 'border-emerald-100';
  } else if (matchPercentage >= 50) {
    progressColor = 'bg-amber-500';
    textColor = 'text-amber-700';
    bgColor = 'bg-amber-50';
    borderColor = 'border-amber-100';
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold text-gray-900">Job Match Analysis</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Match Percentage */}
        <div className={`p-5 rounded-xl border ${borderColor} ${bgColor} flex flex-col justify-center`}>
          <p className="text-sm font-medium text-gray-600 mb-2">Overall Match</p>
          <div className="flex items-end gap-2 mb-3">
            <span className={`text-4xl font-bold ${textColor}`}>{matchPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full ${progressColor}`} style={{ width: `${matchPercentage}%` }}></div>
          </div>
        </div>

        {/* Job Fit Summary */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Fit Summary</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {jobFitSummary || 'No detailed fit summary provided.'}
          </p>
        </div>
      </div>

      {/* Keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Matched Keywords
          </h4>
          {matchedKeywords && matchedKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No matched keywords found.</p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            Missing Keywords
          </h4>
          {missingKeywords && missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No missing keywords identified.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatchCard;
