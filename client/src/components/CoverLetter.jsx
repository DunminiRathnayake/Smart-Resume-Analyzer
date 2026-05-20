import { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

/**
 * Displays the AI-generated Cover Letter with option to copy to clipboard.
 */
const CoverLetter = ({ coverLetter }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!coverLetter) return;
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI-Generated Cover Letter</h3>
            <p className="text-sm text-gray-500">A tailored, professional cover letter matching your profile with the job description.</p>
          </div>
        </div>

        {coverLetter && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/50 text-xs font-semibold transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500 animate-bounce" />
                <span className="text-emerald-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Cover Letter</span>
              </>
            )}
          </button>
        )}
      </div>

      {!coverLetter || coverLetter.trim().length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 italic">No cover letter generated yet.</p>
        </div>
      ) : (
        <div className="bg-slate-50 p-6 rounded-xl border border-gray-100 font-sans text-gray-800 leading-relaxed text-sm whitespace-pre-wrap max-h-[500px] overflow-y-auto shadow-inner">
          {coverLetter}
        </div>
      )}
    </div>
  );
};

export default CoverLetter;
