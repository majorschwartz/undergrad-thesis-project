import React from "react";
import "./topbar.css";
import ModelSelect from "./ModelSelect";
import ModelControls from "./ModelControls";

const ModelBar = ({ modelState, setModelState }) => {
	return (
		<div className="model-bar">
			<ModelSelect modelState={modelState} setModelState={setModelState} />
			<ModelControls modelState={modelState} setModelState={setModelState} />
		</div>
	);
}

export default ModelBar;