import React from "react";
import "./bottombar.css";
import FileUpload from "./FileUpload";
import Run from "./Run";
import ResultDownload from "./ResultDownload";

const BottomBar = ({ modelState, setModelState, fileData, setFileData }) => {
	return (
		<div className="bottom-bar">
			<FileUpload fileData={fileData} setFileData={setFileData} />
			<Run modelState={modelState} setModelState={setModelState} fileData={fileData} setFileData={setFileData} />
			<ResultDownload modelState={modelState} />
		</div>
	);
}

export default BottomBar;