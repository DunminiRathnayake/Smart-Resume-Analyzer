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
    console.log(`[pdfParser] Starting text extraction for file: ${filePath}`);
    
    // Read uploaded PDF file using fs.readFileSync
    const dataBuffer = fs.readFileSync(filePath);

    // Pass file buffer into pdfParse()
    const pdfData = await pdfParse(dataBuffer);
    
    const extractedText = pdfData.text ? pdfData.text.trim() : '';
    console.log(`[pdfParser] Extracted text length: ${extractedText.length} characters`);
    
    if (!extractedText || extractedText.length < 50) {
      console.warn('[pdfParser] PDF parsing yielded empty or very short text.');
      throw new Error('Could not extract readable text from PDF.');
    }

    // Return parsed text
    return extractedText;
  } catch (error) {
    console.error('[pdfParser] Parsing errors:', error.message);
    if (error.message.includes('Could not extract readable text')) {
      throw error;
    }
    throw new Error('Could not extract readable text from PDF.');
  }
};

export default extractTextFromPDF;
