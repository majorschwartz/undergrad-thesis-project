import "./main.css";
import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Onboard from "./onboard/Onboard";

const CreateRun = () => {
	const [triggerRefetch, setTriggerRefetch] = useState(0);

	const handleTriggerRefetch = () => {
		setTriggerRefetch(prev => prev + 1);
	};

	return (
		<div className="main">
			<Sidebar triggerRefetch={triggerRefetch} handleTriggerRefetch={handleTriggerRefetch} />
			<Onboard />
		</div>
	);
}

export default CreateRun;