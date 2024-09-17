import React from "react";
import "./sidebar.css";
import Actions from "./Actions";
import ResultNav from "./ResultNav";

const Sidebar = ({ triggerRefetch, handleTriggerRefetch }) => {
	return (
		<div className="sidebar">
			<Actions handleTriggerRefetch={handleTriggerRefetch} />
			<ResultNav triggerRefetch={triggerRefetch} />
		</div>
	);
}

export default Sidebar;