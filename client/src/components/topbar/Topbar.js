import "./topbar.css";
import React from "react";
import NameEntry from "./NameEntry";
import RunDetails from "./RunDetails";
import ListModels from "./ListModels";

const Topbar = ({ run_name, start_time, running, selectedModels }) => {
	return (
		<div className="topbar">
			<NameEntry run_name={run_name} />
			<RunDetails start_time={start_time} running={running} />
			<ListModels selectedModels={selectedModels} />
		</div>
	);
}

export default Topbar;