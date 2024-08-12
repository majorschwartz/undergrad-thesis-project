import React, { useState } from "react";
import "./main.css";
import ModelBar from "./topbar/ModelBar";
import Feed from "./feed/Feed";
import BottomBar from "./bottombar/BottomBar";

const Main = () => {
	const models = ["GPT-4o", "Claude 3 Sonnet", "Llama 3.1 8B", "Knowledge Graph"];
	const [fileData, setFileData] = useState(null);
	const [modelState, setModelState] = useState(models.map((model) => ({ name: model, selected: false, temp: 0.1, results: [] })));

	return (
		<div className="main">
			<ModelBar modelState={modelState} setModelState={setModelState} />
			<Feed modelState={modelState} fileData={fileData} />
			<BottomBar modelState={modelState} setModelState={setModelState} fileData={fileData} setFileData={setFileData} />
		</div>
	);
}

export default Main;