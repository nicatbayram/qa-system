import React, { useState } from 'react';
import axios from 'axios';
import './QuestionAnswer.css'; 

const QuestionAnswer = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    
    const onQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    
    const onAskQuestion = async () => {
        if (!question) {
            alert('Please enter a question');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/ask', { question });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error fetching answer:', error);
            setAnswer('Sorry, something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="qa-container">
            <h2>Ask a Question</h2>
            <input 
                type="text" 
                value={question} 
                onChange={onQuestionChange} 
                placeholder="Ask a question..." 
            />
            <button onClick={onAskQuestion} disabled={loading}>
                {loading ? 'Processing...' : 'Ask'}
            </button>
            {answer && (
                <div className="answer-box">
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionAnswer;
