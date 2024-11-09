const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/extract', upload.single('document'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.resolve(__dirname, req.file.path);

  try {
    // Run Tesseract OCR on the uploaded file
    const result = await Tesseract.recognize(filePath, 'eng', {
      logger: (m) => console.log(m), // Log progress to console
    });

    const text = result.data.text;

    // Log the full OCR result for debugging
    console.log('Full OCR Result:', text);

    // Enhanced regex patterns to extract name, document number, and expiration date
    const nameMatch = text.match(/Name[:\s]*([\w\s]+)/i);
    const documentNumberMatch = text.match(/Document\s*No[:\s]*([\w-]+)/i);
    const expirationDateMatch = text.match(/Expiration\s*Date[:\s]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i);

    // Construct extracted data response with full OCR result
    const extractedData = {
      fullText: text, // Include full OCR result
      name: nameMatch ? nameMatch[1].trim() : 'Not found',
      documentNumber: documentNumberMatch ? documentNumberMatch[1].trim() : 'Not found',
      expirationDate: expirationDateMatch ? expirationDateMatch[1].trim() : 'Not found',
    };

    // Additional debug logs for individual matches
    console.log('Extracted Name:', nameMatch ? nameMatch[1] : 'No match');
    console.log('Extracted Document Number:', documentNumberMatch ? documentNumberMatch[1] : 'No match');
    console.log('Extracted Expiration Date:', expirationDateMatch ? expirationDateMatch[1] : 'No match');

    // Send extracted data as a JSON response
    res.status(200).json(extractedData);
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({ error: 'Error processing document' });
  } finally {
    // Delete the uploaded file to save disk space
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
