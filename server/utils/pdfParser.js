import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

/**
 * Extracts plain text from a PDF file.
 * @param {string} filePath - Absolute path to the uploaded PDF file
 * @returns {Promise<string>} - The extracted text content
 */
const extractTextFromPDF = async (filePath) => {
  try {
    // Read the PDF file as a buffer
    const dataBuffer = fs.readFileSync(filePath);

    // Use pdf-parse to extract text from the buffer
    const data = await pdfParse(dataBuffer);
    
    const extractedText = data.text ? data.text.trim() : '';
    
    if (!extractedText || extractedText.length < 50) {
      console.warn('PDF parsing yielded empty or very short text.');
      throw new Error('Could not extract readable text from this PDF. Please upload a text-based PDF, not a scanned image PDF.');
    }

    // Return the extracted plain text
    return extractedText;
  } catch (error) {
    console.error('PDF parsing error:', error.message);
    if (error.message.includes('Could not extract readable text')) {
      throw error;
    }
    throw new Error('Failed to extract text from PDF. The file may be corrupted or password protected.');
  }
};

export default extractTextFromPDF;
