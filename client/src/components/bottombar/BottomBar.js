import React from "react";
import "./bottombar.css";
import ClearResults from "./ClearResults";
import FileUpload from "./FileUpload";
import ManualEntry from "./ManualEntry";
import Run from "./Run";
import ResultDownload from "./ResultDownload";

const BottomBar = ({ modelState, setModelState, fileData, setFileData }) => {
	return (
		<div className="bottom-bar">
			<ClearResults modelState={modelState} setModelState={setModelState} />
			<FileUpload fileData={fileData} setFileData={setFileData} />
			<ManualEntry modelState={modelState} setModelState={setModelState} fileData={fileData} setFileData={setFileData} />
			<Run modelState={modelState} setModelState={setModelState} fileData={fileData} setFileData={setFileData} />
			<ResultDownload modelState={modelState} />
		</div>
	);
}

export default BottomBar;