Installation & Setup

Prerequisites

Node.js and npm installed

Python 3.8+

Access to Pinecone, Claude 3.5 API, or GPT-4 API

Backend Setup (Node.js)

Install dependencies:

npm install

Configure environment variables:
Create a .env file in the backend folder:

PORT=5000
PINECONE_API_KEY=your-pinecone-api-key
AI_API_KEY=your-ai-api-key

Start the server:

npm start

Frontend Setup (React)

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the development server:

npm start

Python Script Setup

Navigate to the Python script directory:

cd ../scripts

Install dependencies:

pip install -r requirements.txt

Run the topic modeling script:

python topic_modeling.py
