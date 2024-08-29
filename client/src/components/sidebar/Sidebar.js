import React from "react";
import "./sidebar.css";
import StartNew from "./StartNew";
import ResultNav from "./ResultNav";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<StartNew />
			<ResultNav />
		</div>
	);
}

export default Sidebar;