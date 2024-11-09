# Data Extractor ~By Ritesh Sharma

## Overview
This web application allows users to upload documents (e.g., scanned IDs or forms) and extracts relevant information such as name, document number, and expiration date using Optical Character Recognition (OCR) technology powered by Tesseract.js. The extracted data is displayed on the web interface, along with the complete text recognized from the document.

## Features
- **File Upload**: Users can upload a document file for processing.
- **OCR Processing**: The server processes the uploaded file using Tesseract.js and extracts relevant text.
- **Data Extraction**: The server extracts specific fields like name, document number, and expiration date using regular expressions.
- **Full OCR Result**: The complete text from the document is displayed for user reference.
- **User-Friendly Interface**: A clean and simple frontend for easy interaction.

## Technologies Used
- **Backend**: Node.js, Express.js, Tesseract.js, Multer for file handling
- **Frontend**: React.js, Axios for HTTP requests
- **Additional Tools**: dotenv for environment variable management, CORS for cross-origin resource sharing


## Installation and Setup
### Prerequisites
- Node.js (v14 or higher)
- npm or Yarn
- React.js (for the frontend)

### Steps to Run the Application
**Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

Install Backend & Frontend Dependencie swith :

npm install

Set Up Environment Variables: Create a .env file in the root directory and specify the port number if needed:
PORT=5000


Run the Server:

node server.js

Run the Frontend: Open a new terminal and run:

npm start
