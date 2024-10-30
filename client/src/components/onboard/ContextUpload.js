import React, { useState } from "react";
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const ContextUpload = ({ handleContextUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState(null);

    const handleFileChange = async (file) => {
        if (file) {
            try {
                let text;
                switch (file.type) {
                    case 'application/pdf':
                        const pdfData = await file.arrayBuffer();
                        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                        const textContent = [];
                        
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const content = await page.getTextContent();
                            textContent.push(content.items.map(item => item.str).join(' '));
                        }
                        
                        text = textContent.join('\n');
                        break;
                    
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        const docxData = await file.arrayBuffer();
                        const docxResult = await mammoth.extractRawText({ arrayBuffer: docxData });
                        text = docxResult.value;
                        break;
                    
                    case 'text/plain':
                        text = await file.text();
                        break;
                    
                    default:
                        throw new Error('Unsupported file type');
                }
                
                handleContextUpload(text);
                setFileName(file.name);
            } catch (error) {
                console.error('Error processing file:', error);
                alert('Error processing file. Please try again.');
            }
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = () => {
        setIsDragging(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        const allowedTypes = [
            'text/plain',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (file && allowedTypes.includes(file.type)) {
            handleFileChange(file);
        } else {
            alert('Please upload a TXT, PDF, or DOCX file.');
        }
    }

    const handleFileSelect = () => {
        document.getElementById("context-file").click();
    }

    const handleRemove = () => {
        setFileName(null);
        handleContextUpload(null);
    }

    return (
        <div
            className={`upload-area context ${isDragging ? 'dragging' : ''} ${fileName ? 'file-uploaded' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileSelect}
        >
            <input
                type="file"
                id="context-file"
                accept=".txt,.pdf,.docx"
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: "none" }}
            />
            {fileName ? (
                <>
                    <p>Context file uploaded:</p>
                    <p>{fileName}</p>
                    <button className="remove-button" onClick={handleRemove}>Remove and select new file</button>
                </>
            ) : (
                <>
                    <p>Select Context File (Optional)</p>
                    <p>or drag and drop a TXT, PDF, or DOCX file here</p>
                </>
            )}
        </div>
    );
};

export default ContextUpload;
