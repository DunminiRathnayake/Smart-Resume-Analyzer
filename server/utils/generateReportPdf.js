import PDFDocument from 'pdfkit';

/**
 * Generates a PDF report for the resume analysis and pipes it to the provided stream.
 * @param {Object} analysis - The resume analysis data from MongoDB.
 * @param {Stream} stream - The writable stream to pipe the PDF into (usually `res`).
 */
export const generateReportPdf = (analysis, stream) => {
  // Create a new PDF document
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  // Pipe the document to the response stream
  doc.pipe(stream);

  // Helper function to draw a section title
  const drawSectionTitle = (title) => {
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#4F46E5').text(title);
    doc.moveDown(0.5);
  };

  // Helper function to draw a list of items
  const drawList = (items, emptyMsg) => {
    doc.font('Helvetica').fontSize(11).fillColor('#374151');
    if (!items || items.length === 0) {
      doc.text(emptyMsg, { italic: true });
    } else {
      items.forEach((item) => {
        doc.text(`• ${item}`, { indent: 20 });
      });
    }
  };

  // --- PDF Header ---
  doc
    .font('Helvetica-Bold')
    .fontSize(24)
    .fillColor('#111827')
    .text('Smart Resume Analyzer Report', { align: 'center' });

  doc.moveDown(0.5);

  doc
    .font('Helvetica')
    .fontSize(12)
    .fillColor('#6B7280')
    .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });

  doc.moveDown(2);

  // --- Basic Info Section ---
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#111827').text('File Info');
  doc.font('Helvetica').fontSize(12).fillColor('#374151').text(`Uploaded Resume: ${analysis.originalFileName || 'N/A'}`);
  if (analysis.targetJobDescription) {
    doc.text('Tailored to a specific job description: Yes');
  } else {
    doc.text('Tailored to a specific job description: No');
  }
  doc.moveDown(1.5);

  // --- ATS Score Section ---
  doc.rect(50, doc.y, 495, 80).fillAndStroke('#EEF2FF', '#C7D2FE');
  
  // Need to adjust y to center text inside rectangle
  const scoreY = doc.y + 25; 
  
  doc.fillColor('#4338CA').font('Helvetica-Bold').fontSize(16).text('Overall ATS Score', 70, scoreY);
  
  // Determine color based on score
  let scoreColor = '#DC2626'; // Red
  if (analysis.atsScore >= 75) scoreColor = '#059669'; // Green
  else if (analysis.atsScore >= 50) scoreColor = '#D97706'; // Orange

  doc
    .font('Helvetica-Bold')
    .fontSize(28)
    .fillColor(scoreColor)
    .text(`${analysis.atsScore} / 100`, 50, scoreY - 5, { align: 'right', width: 475 });

  doc.moveDown(4); // Move cursor past the rectangle

  // Restore normal margins and positions
  doc.x = 50;

  // --- Job Match Summary ---
  drawSectionTitle('Job Match Summary');
  doc.font('Helvetica').fontSize(12).fillColor('#374151');
  if (analysis.jobMatchSummary) {
    doc.text(analysis.jobMatchSummary, { align: 'justify' });
  } else {
    doc.text('No summary available.', { italic: true });
  }

  // --- Skills Section ---
  doc.moveDown(1.5);
  // We can do two columns for skills
  const skillsY = doc.y;
  
  // Column 1: Detected Skills
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#111827').text('Detected Skills', 50, skillsY);
  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(11).fillColor('#374151');
  if (!analysis.detectedSkills || analysis.detectedSkills.length === 0) {
    doc.text('No skills detected.', 50, doc.y, { italic: true });
  } else {
    analysis.detectedSkills.forEach((skill) => {
      doc.text(`✓ ${skill}`, 50, doc.y);
    });
  }

  // Column 2: Missing Skills
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#111827').text('Missing Skills', 300, skillsY);
  doc.moveDown(0.5);
  let missingY = skillsY + 20; // approximate
  doc.font('Helvetica').fontSize(11).fillColor('#374151');
  if (!analysis.missingSkills || analysis.missingSkills.length === 0) {
    doc.text('No missing skills identified.', 300, missingY, { italic: true });
  } else {
    analysis.missingSkills.forEach((skill) => {
      doc.text(`✗ ${skill}`, 300, missingY);
      missingY += 15;
    });
  }

  // Ensure cursor is below whichever column is longer
  doc.x = 50;
  doc.y = Math.max(doc.y, missingY) + 30;

  // --- Strengths & Weaknesses ---
  drawSectionTitle('Strengths');
  drawList(analysis.strengths, 'No specific strengths identified.');

  drawSectionTitle('Weaknesses');
  drawList(analysis.weaknesses, 'No specific weaknesses identified.');

  // --- Suggestions ---
  drawSectionTitle('Actionable Suggestions');
  drawList(analysis.suggestions, 'No suggestions available.');

  // --- Footer ---
  const pageCount = doc.bufferedPageRange ? doc.bufferedPageRange().count : 1;
  doc.on('pageAdded', () => {
    // We could add footer to each page if we buffer, but for simplicity, we'll just add it at the end.
  });

  // Finalize the PDF and end the stream
  doc.end();
};

export default generateReportPdf;
