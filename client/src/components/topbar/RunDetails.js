import React, { useState, useEffect } from "react";

const RunDetails = ({ start_time, running }) => {
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		let interval;
		if (running && start_time) {
			interval = setInterval(() => {
				const now = Date.now();
				const elapsed = (now - start_time) / 1000;
				setElapsedTime(elapsed);
			}, 20);
		}
		return () => clearInterval(interval);
	}, [running, start_time]);

	const formatTime = (seconds) => {
		if (seconds < 0) return "00:00.00";
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		const ms = Math.floor((seconds % 1) * 100);
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
	};

	return (
		<div className="run-details">
			<span>{running ? "Running" : "Finished"}</span>
			<span>Elapsed Time: {formatTime(elapsedTime)}</span>
		</div>
	);
}

export default RunDetails;