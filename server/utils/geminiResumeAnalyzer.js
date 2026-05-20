import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes a resume using Google Gemini AI.
 * @param {string} extractedText - The raw text extracted from the PDF resume.
 * @param {string} targetJobDescription - The target job description (optional).
 * @returns {Promise<Object>} The structured JSON analysis result.
 */
export const analyzeResumeWithGemini = async (extractedText, targetJobDescription = '') => {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key is missing or invalid.');
    }

    // Use the gemini-1.5-flash model for fast and efficient text generation
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construct the prompt enforcing strict JSON output
    const prompt = `
      You are an expert ATS (Applicant Tracking System) and technical recruiter.
      Analyze the following resume text against the target job description (if provided).
      
      Resume Text:
      "${extractedText}"
      
      Target Job Description:
      "${targetJobDescription || 'General Tech Role'}"
      
      You must respond with ONLY a valid JSON object. Do not include any markdown formatting like \`\`\`json or \`\`\`. 
      The JSON must exactly match this structure:
      {
        "atsScore": <number between 0 and 100>,
        "matchPercentage": <number between 0 and 100 representing how well the resume matches the job>,
        "detectedSkills": ["skill1", "skill2"],
        "matchedKeywords": ["keyword1", "keyword2"],
        "missingKeywords": ["keyword1", "keyword2"],
        "missingSkills": ["missingSkill1", "missingSkill2"],
        "strengths": ["strength1", "strength2"],
        "weaknesses": ["weakness1", "weakness2"],
        "suggestions": ["suggestion1", "suggestion2"],
        "jobMatchSummary": "A brief summary of how well the resume matches the job description.",
        "jobFitSummary": "A detailed explanation of why the candidate is or isn't a good fit for this specific role.",
        "shortFeedbackSummary": "A short overall AI summary explaining the quality of the resume, ATS readiness, job relevance, and main improvement area.",
        "interviewQuestions": [
          "Technical Question 1 (based on detected skills)",
          "Technical Question 2 (based on detected skills)",
          "Technical Question 3 (based on detected skills)",
          "Project Question 1 (based on projects listed in resume)",
          "Project Question 2 (based on projects listed in resume)",
          "Job Description Question 1 (related to target job description)",
          "Job Description Question 2 (related to target job description)",
          "Behavioral Question 1"
        ],
        "coverLetter": "A professional cover letter of 3 to 4 short paragraphs. Keep a professional tone, tailor it specifically to the target job description using the candidate's skills and projects from their resume. Ensure it is highly suitable for internship or junior software engineer applications. Do not invent fake company names if they are not explicitly specified in the job description (use [Company Name] or a similar placeholder instead).",
        "linkedInSuggestions": [
          "Suggestion 1 (If resume does not mention LinkedIn, first suggestion MUST be: 'Add your LinkedIn profile URL to the contact section of your resume.' otherwise target LinkedIn headline optimization using target job description keywords)",
          "Suggestion 2 (About section hook / elevator pitch optimization tips)",
          "Suggestion 3 (Skills list alignment tips for LinkedIn profile searchability)",
          "Suggestion 4 (Featured projects presentation suggestions)",
          "Suggestion 5 (Keyword optimization for high-demand skills mentioned in job description)"
        ],
        "analysisStatus": "completed"
      }
    `;

    // Request content generation from Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean the response text to remove any potential markdown JSON wrappers
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse the JSON result
    const analysisData = JSON.parse(text);

    // Ensure all required fields exist
    return {
      atsScore: analysisData.atsScore || 0,
      matchPercentage: analysisData.matchPercentage || 0,
      detectedSkills: analysisData.detectedSkills || [],
      matchedKeywords: analysisData.matchedKeywords || [],
      missingKeywords: analysisData.missingKeywords || [],
      missingSkills: analysisData.missingSkills || [],
      strengths: analysisData.strengths || [],
      weaknesses: analysisData.weaknesses || [],
      suggestions: analysisData.suggestions || [],
      jobMatchSummary: analysisData.jobMatchSummary || 'No summary provided.',
      jobFitSummary: analysisData.jobFitSummary || 'No job fit summary provided.',
      shortFeedbackSummary: analysisData.shortFeedbackSummary || 'No feedback summary available yet.',
      interviewQuestions: analysisData.interviewQuestions || [],
      coverLetter: analysisData.coverLetter || '',
      linkedInSuggestions: analysisData.linkedInSuggestions || [],
      analysisStatus: 'completed'
    };
  } catch (error) {
    console.error('Gemini Analysis Error:', error.message);
    throw error; // Throw error to trigger the fallback in the controller
  }
};

export default analyzeResumeWithGemini;
