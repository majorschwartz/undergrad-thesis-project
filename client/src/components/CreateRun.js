import "./main.css";
import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Onboard from "./onboard/Onboard";

const CreateRun = () => {
	return (
		<div className="main">
			<Sidebar />
			<Onboard />
		</div>
	);
}

export default CreateRun;