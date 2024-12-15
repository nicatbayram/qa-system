import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; 

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    
    const onFileUpload = async () => {
        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Upload a PDF File</h2>
            <input type="file" accept=".pdf" onChange={onFileChange} />
            <button  onClick={onFileUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default FileUpload;
