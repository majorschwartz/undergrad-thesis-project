import React from "react";
import { downloadResults } from "utils/api";

const Download = ({ run_id, running }) => {
	const handleDownload = async () => {
		try {
			const csvData = await downloadResults(run_id);
			const blob = new Blob([csvData], { type: "text/csv" });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = `run_results.csv`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error downloading results:", error);
		}
	};

	return (
		<button
			onClick={handleDownload}
			disabled={running}
			className="download-button"
		>
			<svg
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="20px"
				height="20px"
			>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12"
				/>
			</svg>
			<span>Download Results</span>
		</button>
	);
};

export default Download;
