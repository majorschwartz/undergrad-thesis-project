import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAllRuns } from "utils/api";

const Actions = ({ handleTriggerRefetch }) => {
	const navigate = useNavigate();
	const [areYouSure, setAreYouSure] = useState(false);

	const handleNewRun = () => {
		navigate("/");
	};

	const handleDeleteRuns = async () => {
		await deleteAllRuns();
		setAreYouSure(false);
		handleTriggerRefetch();
		navigate("/");
	};

	return (
		<div className="sidebar-header">
			<button
				onClick={handleNewRun}
				className="sidebar-btn action-btn new-run-btn"
			>
				<svg
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24px"
					height="24px"
				>
					<path
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 5v14m-7-7h14"
					/>
				</svg>
				<span>New Run</span>
			</button>
			<button
				onClick={() => setAreYouSure(true)}
				className="sidebar-btn action-btn delete-runs-btn"
			>
				<span>
					<svg
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24px"
						height="24px"
					>
						<path
							fill="none"
							stroke="#000000"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
						/>
					</svg>
				</span>
				<span>{areYouSure ? "Are you sure?" : "Delete Runs"}</span>
			</button>
			{areYouSure && (
				<div className="delete-runs-wrapper">
					<button
						onClick={handleDeleteRuns}
						className="sidebar-btn action-btn delete-runs-btn"
					>
						<b>Delete</b>
					</button>
					<button
						onClick={() => setAreYouSure(false)}
						className="sidebar-btn action-btn delete-runs-btn"
					>
						<b>Cancel</b>
					</button>
				</div>
			)}
		</div>
	);
};

export default Actions;
