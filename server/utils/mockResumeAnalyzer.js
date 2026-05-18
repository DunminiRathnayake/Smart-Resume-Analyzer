const SKILLS_DB = [
  'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB',
  'HTML', 'CSS', 'Tailwind CSS', 'Git', 'GitHub',
  'REST API', 'JWT', 'TypeScript', 'Docker', 'Python', 'Java'
];

/**
 * Generate a mock analysis for the resume
 * @param {string} extractedText - The text extracted from the PDF
 * @param {string} targetJobDescription - The job description to compare against
 * @returns {object} Mock analysis results
 */
export const analyzeResumeMock = (extractedText, targetJobDescription = '') => {
  const textLower = extractedText.toLowerCase();
  const jobLower = targetJobDescription.toLowerCase();

  const detectedSkills = [];
  const missingSkills = [];

  // Detect skills
  SKILLS_DB.forEach(skill => {
    const skillLower = skill.toLowerCase();
    
    // Check if the skill is in the resume
    if (textLower.includes(skillLower)) {
      detectedSkills.push(skill);
    } else {
      // If it's not in the resume, check if it's required in the job description
      if (jobLower.includes(skillLower)) {
        missingSkills.push(skill);
      }
    }
  });

  // Calculate random ATS score between 60 and 95
  const atsScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60;

  // Generate 5 generic but useful suggestions
  const suggestions = [
    'Add more quantifiable achievements to your work experience (e.g., "Increased sales by 20%").',
    'Ensure your job titles and dates of employment are clearly formatted and easy to read.',
    missingSkills.length > 0 
      ? `Include these missing keywords from the job description: ${missingSkills.slice(0, 3).join(', ')}.`
      : 'Tailor your summary section to better align with the specific role you are applying for.',
    'Use strong action verbs like "Developed", "Led", or "Implemented" to start your bullet points.',
    'Review your resume for proper formatting and remove any complex layouts that might confuse ATS parsers.'
  ];

  return {
    atsScore,
    detectedSkills,
    missingSkills,
    suggestions,
    analysisStatus: 'completed'
  };
};

export default analyzeResumeMock;
