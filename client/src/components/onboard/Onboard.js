import "./onboard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import ModelSelect from "./ModelSelect";
import { parseCSV } from "../../utils/helpers";
import { createRun } from "../../utils/api";

const Onboard = () => {
	const models = ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1 8B (Local)", "Knowledge Graph"];
	const [selectedModels, setSelectedModels] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const handleFileUpload = (data) => {
		const { questions, answers } = parseCSV(data);
		setQuestions(questions);
		setAnswers(answers);
	};

	const handleCreateRun = async () => {
		if (!createAllowed || isLoading) {
			console.log("Run creation not allowed or already loading. Please select a file and at least one model.");
			return;
		}
		try {
			setIsLoading(true);
			const response = await createRun(selectedModels, questions, answers);
			setIsLoading(false);
			if (response !== null) {
				navigate(`/run/${response.run_id}`);
			} else {
				console.error("Failed to create run");
				setError("Failed to create run");
			}
		} catch (error) {
			console.error("Error creating run:", error);
			setError("Error creating run");
		}
	};

	const createAllowed = questions.length > 0 && selectedModels.length > 0;

	return (
		<div className="onboard">
			<h1>Create a new run.</h1>
			<FileUpload handleFileUpload={handleFileUpload} />
			<ModelSelect models={models} selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
			{error && <p className="error">{error}</p>}
			<button className={`create-run-button ${isLoading ? "loading" : createAllowed ? "allowed" : "disabled"}`} onClick={handleCreateRun}>{isLoading ? "Loading..." : "Create Run"}</button>
		</div>
	);
}

export default Onboard;