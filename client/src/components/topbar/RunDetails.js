import React, { useState, useEffect } from "react";
import Download from "./Download";

const RunDetails = ({ run_id, start_time, end_time, running }) => {
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		let interval;
		if (running && start_time && !end_time) {
			interval = setInterval(() => {
				const now = Date.now();
				const elapsed = (now - start_time) / 1000;
				setElapsedTime(elapsed);
			}, 20);
		} else if (end_time) {
			setElapsedTime((end_time - start_time) / 1000);
		}
		return () => clearInterval(interval);
	}, [running, start_time, end_time]);

	const formatTime = (seconds) => {
		if (seconds < 0) return "00:00.00";
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		const ms = Math.floor((seconds % 1) * 100);
		return `${minutes.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
	};

	return (
		<div className="run-details">
			<div className="details running">
				<button className={`running-btn ${running ? "running" : "finished"}`} />
				<div className="running-text">{running ? "Running" : "Finished"}</div>
			</div>
			<div className="details elapsed">
				<div className="elapsed-text">Elapsed Time:</div>
				<div className="elapsed-time">{formatTime(elapsedTime)}</div>
			</div>
			<Download run_id={run_id} running={running} />
		</div>
	);
};

export default RunDetails;
