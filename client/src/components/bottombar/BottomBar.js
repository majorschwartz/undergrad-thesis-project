import React from "react";
import "./bottombar.css";
import ResultDownload from "./ResultDownload";

const BottomBar = ({ modelState, setModelState, fileData, setFileData }) => {
	return (
		<div className="bottom-bar">
			<ResultDownload modelState={modelState} />
		</div>
	);
}

export default BottomBar;