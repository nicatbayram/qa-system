const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const dotenv = require('dotenv');
const fs = require('fs');
const { Pinecone } = require('@pinecone-database/pinecone');
const cors = require('cors');  

dotenv.config();
require('dotenv').config();
console.log(process.env.PINECONE_API_KEY);  

const app = express();


app.use(cors({
    origin: 'http://localhost:3000', }));

app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });


const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});


app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded');

        
        const dataBuffer = fs.readFileSync(req.file.path);
        const text = await pdfParse(dataBuffer);

        
        res.status(200).send('File processed successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/ask', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).send('Question is required');
    }

    try {
     
        const queryEmbedding = await generateEmbedding(question);

       
        const results = await retrieveEmbeddings(queryEmbedding);

        
        const context = results.map(match => match.metadata.text).join('\n');
        const prompt = `Use the following context to answer the question:\n${context}\nQuestion: ${question}`;

        
        const answer = await generateAnswer(prompt);

        res.status(200).send({ answer });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


async function generateEmbedding(text) {
   
    const response = await axios.post(
        'https://api.openai.com/v1/embeddings',
        { model: 'text-embedding-ada-002', input: text },
        { headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` } }
    );
    return response.data.data[0].embedding;
}


async function retrieveEmbeddings(queryEmbedding) {
    const index = pinecone.Index('documents');
    const results = await index.query({
        vector: queryEmbedding,
        topK: 5,
        includeMetadata: true,
    });
    return results.matches;
}


async function generateAnswer(prompt) {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        },
        { headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` } }
    );
    return response.data.choices[0].message.content;
}


const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  
});
