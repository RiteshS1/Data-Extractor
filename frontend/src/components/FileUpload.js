import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error processing file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-black'>
      
      <div className="p-6 m-24 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Document for Data Extraction</h1>
      <input type="file" onChange={handleFileChange} className="mb-4 block w-full text-sm" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Upload'}
      </button>

      {extractedData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Extracted Data:</h2>
          <p><strong>Name:</strong> {extractedData.name}</p>
          <p><strong>Document Number:</strong> {extractedData.documentNumber}</p>
          <p><strong>Expiration Date:</strong> {extractedData.expirationDate}</p>

          <h2 className="text-xl font-semibold mt-4">Full OCR Result:</h2>
          <pre className="bg-gray-200 p-4 rounded-md mt-2">{extractedData.fullText}</pre>
        </div>
      )}
    </div>

    </div>
  );
};

export default FileUpload;
