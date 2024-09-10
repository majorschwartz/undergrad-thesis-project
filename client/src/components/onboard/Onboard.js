import "./onboard.css";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ModelSelect from "./ModelSelect";
import { parseCSV } from "../../utils/helpers";
import { createRun } from "../../utils/api";

const Onboard = () => {
	const [fileData, setFileData] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const models = ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1 405B", "Knowledge Graph"];
	const [selectedModels, setSelectedModels] = useState([]);

	const handleFileUpload = (data) => {
		setFileData(data);
		const { questions, answers } = parseCSV(data);
		setQuestions(questions);
		setAnswers(answers);
	};

	const handleCreateRun = async () => {
		if (!createAllowed) {
			console.log("Run creation not allowed. Please select a file and at least one model.");
			return;
		}
		try {
			const response = await createRun(selectedModels, questions, answers);
			if (response.ok) {
				console.log("Run created successfully");
				// Handle successful run creation (e.g., show a success message, redirect to run page)
			} else {
				console.error("Failed to create run");
				// Handle error (e.g., show error message to user)
			}
		} catch (error) {
			console.error("Error creating run:", error);
			// Handle error (e.g., show error message to user)
		}
	};

	const createAllowed = fileData && selectedModels.length > 0;

	return (
		<div className="onboard">
			<h1>Create a new run.</h1>
			<FileUpload handleFileUpload={handleFileUpload} />
			<ModelSelect models={models} selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
			<button className={`create-run-button ${createAllowed ? "allowed" : "disabled"}`} onClick={handleCreateRun}>Create Run</button>
		</div>
	);
}

export default Onboard;