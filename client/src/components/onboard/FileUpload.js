import "./onboard.css";
import React, { useState } from "react";

const FileUpload = ({ fileData, setFileData }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileData(e.target.result);
                setFileName(file.name);
            };
            reader.readAsText(file);
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
        if (file && file.type === "text/csv") {
            handleFileChange(file);
        }
    }

    const handleFileSelect = () => {
        document.getElementById("csv-file").click();
    }

    return (
        <div
            className={`upload-area ${isDragging ? 'dragging' : ''} ${fileName ? 'file-uploaded' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileSelect}
        >
            <input
                type="file"
                id="csv-file"
                accept=".csv"
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: "none" }}
            />
            {fileName ? (
                <>
                    <p>File uploaded:</p>
                    <p>{fileName}</p>
                    <button className="remove-button" onClick={() => {setFileName(null); setFileData(null);}}>Remove and select new file</button>
                </>
            ) : (
                <>
                    <p>Select CSV</p>
                    <p>or drag and drop a CSV file here</p>
                </>
            )}
        </div>
    );
};

export default FileUpload;
