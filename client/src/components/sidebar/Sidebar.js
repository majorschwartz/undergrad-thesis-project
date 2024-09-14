import React from "react";
import "./sidebar.css";
import StartNew from "./StartNew";
import ResultNav from "./ResultNav";

const Sidebar = ({ triggerRefetch }) => {
	return (
		<div className="sidebar">
			<StartNew />
			<ResultNav triggerRefetch={triggerRefetch} />
		</div>
	);
}

export default Sidebar;