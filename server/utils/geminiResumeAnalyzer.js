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
        "detectedSkills": ["skill1", "skill2"],
        "missingSkills": ["missingSkill1", "missingSkill2"],
        "strengths": ["strength1", "strength2"],
        "weaknesses": ["weakness1", "weakness2"],
        "suggestions": ["suggestion1", "suggestion2"],
        "jobMatchSummary": "A brief summary of how well the resume matches the job description.",
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
      detectedSkills: analysisData.detectedSkills || [],
      missingSkills: analysisData.missingSkills || [],
      strengths: analysisData.strengths || [],
      weaknesses: analysisData.weaknesses || [],
      suggestions: analysisData.suggestions || [],
      jobMatchSummary: analysisData.jobMatchSummary || 'No summary provided.',
      analysisStatus: 'completed'
    };
  } catch (error) {
    console.error('Gemini Analysis Error:', error.message);
    throw error; // Throw error to trigger the fallback in the controller
  }
};

export default analyzeResumeWithGemini;
