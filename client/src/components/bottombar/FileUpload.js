import React from "react";

const FileUpload = ({ fileData, setFileData }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setFileData(e.target.result);
        };
        reader.readAsText(file);
    }

    const handleFileSelect = () => {
        document.getElementById("csv-file").click();
    }
    
    return (
        <>
            <input
                type="file"
                id="csv-file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <input type="button" className="bottom-button" value={"Select CSV"} onClick={handleFileSelect} />
        </>
    );
};

export default FileUpload;
