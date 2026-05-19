import { CheckCircle2, XCircle } from 'lucide-react';

const SkillTags = ({ title, skills, type = 'found' }) => {
  const isFound = type === 'found';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        {isFound ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {(!skills || skills.length === 0) ? (
          <p className="text-gray-500 text-sm italic">No {isFound ? 'matching' : 'missing'} skills identified.</p>
        ) : (
          skills.map((skill, index) => (
            <span 
              key={index}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                isFound 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              {skill}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillTags;
