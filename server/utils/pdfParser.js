import fs from 'fs';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

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

    // Return the extracted plain text
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error.message);
    throw new Error('Failed to extract text from PDF. The file may be corrupted or password protected.');
  }
};

export default extractTextFromPDF;
