import React from 'react';
import FileUpload from './components/FileUpload';
import QuestionAnswer from './components/QuestionAnswer';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI-Enhanced Document QA System</h1>
        <p>Upload your documents and get instant AI-powered answers to your questions</p>
      </header>

      <div className="grid-container">
        <div className="grid-item">
          <FileUpload />
        </div>
        <div className="grid-item">
          <QuestionAnswer />
        </div>
      </div>
    </div>
  );
}

export default App;
