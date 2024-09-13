import React from "react";
import { modelNames } from "../../utils/api";
import "./feed.css";

const Feed = ({ run }) => {

	if (!run) return <div>Loading...</div>;

	return (
		<div className="feed">
			<table className="feed-table">
				<thead>
					<tr>
						<th rowSpan="2">Question</th>
						{run.models.map((model, mIndex) => (
							<th key={mIndex} className="model-header" colSpan="2">
								{modelNames[model] || model}
							</th>
						))}
					</tr>
					<tr>
						{run.models.map((_, mIndex) => (
							<React.Fragment key={mIndex}>
								<th>Time Elapsed</th>
								<th>Evaluation</th>
							</React.Fragment>
						))}
					</tr>
				</thead>
				<tbody>
					{run.questions.map((question, qIndex) => (
						<tr key={qIndex}>
							<td>{question.question}</td>
							{run.models.map((_, mIndex) => {
								const response = run.results[qIndex].responses[mIndex];
								return (
									<React.Fragment key={mIndex}>
										<td>{response.time_elapsed.toFixed(2)}s</td>
										<td>{response.evaluation || "N/A"}</td>
									</React.Fragment>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Feed;