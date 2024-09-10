import "./onboard.css";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ModelSelect from "./ModelSelect";

const Onboard = () => {
	const [fileData, setFileData] = useState(null);
	const models = ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1 405B", "Knowledge Graph"];
	const [selectedModels, setSelectedModels] = useState([]);

	const handleCreateRun = () => {
		if (!createAllowed) {
			console.log("Run creation not allowed. Please select a file and at least one model.");
			return;
		}
		console.log("Creating run...");
		console.log("File data:", fileData);
		console.log("Selected models:", selectedModels);
	}

	const createAllowed = fileData && selectedModels.length > 0;

	return (
		<div className="onboard">
			<h1>Create a new run.</h1>
			<FileUpload fileData={fileData} setFileData={setFileData} />
			<ModelSelect models={models} selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
			<button className={`create-run-button ${createAllowed ? "allowed" : "disabled"}`} onClick={handleCreateRun}>Create Run</button>
		</div>
	);
}

export default Onboard;