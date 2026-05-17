import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ATSScoreCard = ({ score }) => {
  // Determine color based on score
  let pathColor = '#10B981'; // Green
  if (score < 50) pathColor = '#EF4444'; // Red
  else if (score < 75) pathColor = '#F59E0B'; // Yellow

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">ATS Compatibility Score</h3>
      <div className="w-32 h-32">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: pathColor,
            textColor: '#1F2937',
            trailColor: '#F3F4F6',
            textSize: '24px',
            pathTransitionDuration: 1.5,
          })}
        />
      </div>
      <p className="mt-4 text-sm text-gray-500">
        {score >= 75 ? 'Excellent! Your resume is highly optimized.' : 
         score >= 50 ? 'Good, but there is room for improvement.' : 
         'Needs work. Follow the suggestions below.'}
      </p>
    </div>
  );
};

export default ATSScoreCard;
