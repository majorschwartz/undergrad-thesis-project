import "./topbar.css";
import React from "react";
import NameEntry from "./NameEntry";
import RunDetails from "./RunDetails";
import ListModels from "./ListModels";

const Topbar = ({ run_name, setRunName, run_tag, start_time, end_time, running, selectedModels }) => {
	return (
		<div className="topbar">
			<div className="bar first">
				<NameEntry run_name={run_name} setRunName={setRunName} />
				<RunDetails run_tag={run_tag} start_time={start_time} end_time={end_time} running={running} />
			</div>
			<div className="bar second">
				<ListModels selectedModels={selectedModels} />
			</div>
		</div>
	);
}

export default Topbar;