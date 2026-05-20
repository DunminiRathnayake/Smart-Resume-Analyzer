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

  const matchPercentage = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
  
  const matchedKeywords = detectedSkills.slice(0, 3);
  const missingKws = missingSkills.slice(0, 3);
  
  const jobFitSummary = "This is a mock job fit summary. Based on the matched keywords, the candidate shows potential, but could improve by adding missing required skills.";

  return {
    atsScore,
    matchPercentage,
    detectedSkills,
    matchedKeywords,
    missingKeywords: missingKws,
    missingSkills,
    strengths: ['Mock Strength 1', 'Mock Strength 2'],
    weaknesses: ['Mock Weakness 1', 'Mock Weakness 2'],
    suggestions,
    jobMatchSummary: "Mock summary of job match.",
    jobFitSummary,
    shortFeedbackSummary: "Your resume shows strong mock experience, but it should include more measurable achievements and job-specific keywords to improve ATS performance.",
    interviewQuestions: [
      "Can you explain your experience with React and how you manage state in larger applications?",
      "How do you optimize Express.js APIs to ensure high performance and low latency?",
      "What are the key advantages of using MongoDB compared to traditional relational databases in your project?",
      "In your recent portfolio project, what was the most challenging technical roadblock and how did you resolve it?",
      "Could you walk me through the system design of your most complex web application?",
      "Based on our job description, how would you approach implementing user authentication securely?",
      "How would you optimize the performance of our existing dashboard if you noticed query load times were sluggish?",
      "Tell me about a time you worked in a team and had to resolve a technical disagreement with a peer."
    ],
    coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your esteemed company. As a passionate developer with practical experience in building full-stack web applications using JavaScript, React, and Node.js, I am excited about the opportunity to contribute to your engineering team's success.

Throughout my personal and academic projects, I have designed and deployed responsive frontend user interfaces as well as robust REST APIs. My experience leveraging MongoDB and Express.js has allowed me to build scalable systems, and I am always looking for ways to refine my coding practices and learn new technologies, including TypeScript and Docker.

I am particularly drawn to your company's innovative culture and commitment to technological excellence. I am confident that my technical skills, proactive problem-solving mindset, and dedication to writing clean, maintainable code make me an excellent fit for this junior engineering role.

Thank you for your time and consideration. I look forward to the possibility of discussing how my background and enthusiasm align with your team's goals.

Sincerely,
[Your Name]`,
    linkedInSuggestions: [
      "Optimize your LinkedIn headline to target the Software Engineer role (e.g., 'Aspiring Software Engineer | Full Stack Developer | React & Node.js').",
      "Draft a compelling 'About' section that serves as an elevator pitch highlighting your key full-stack projects.",
      "Ensure JavaScript, React, Node.js, and MongoDB are listed as top skills in your LinkedIn Skills section.",
      "Feature your Smart Resume Analyzer project at the top of your LinkedIn 'Featured' section with a link to the GitHub repository.",
      "Integrate keywords like 'REST APIs', 'System Architecture', and 'Agile Methodologies' to increase your search visibility."
    ],
    analysisStatus: 'completed'
  };
};

export default analyzeResumeMock;
