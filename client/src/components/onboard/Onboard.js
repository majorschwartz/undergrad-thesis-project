import "./onboard.css";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ModelSelect from "./ModelSelect";

const Onboard = () => {
	const [fileData, setFileData] = useState(null);
	const models = ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1 405B", "Knowledge Graph"];
	const [selectedModels, setSelectedModels] = useState([]);

	return (
		<div className="onboard">
			<h1>Create a new run.</h1>
			<FileUpload fileData={fileData} setFileData={setFileData} />
			<ModelSelect models={models} selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
		</div>
	);
}

export default Onboard;