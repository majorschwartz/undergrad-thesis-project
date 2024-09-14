import React from "react";
import { modelNames } from "../../utils/api";
import "./feed.css";

const Feed = ({ run }) => {
	if (!run) return <div>Loading...</div>;

	const getQuestionStatus = (questionIndex) => {
		const responses = run.results[questionIndex].responses;
		const statuses = responses.map(response => response.status);
		
		if (statuses.every(status => status === "complete")) {
			return "complete";
		} else if (statuses.every(status => status === "idle")) {
			return "idle";
		} else {
			return "pending";
		}
	};

	return (
		<div className="feed">
			<div className="feed-header">
				<div className="header-item"></div>
				{run.models.map((model, mIndex) => (
					<div key={mIndex} className="model-header-cell">
						<div className="model-name">
							{modelNames[model] || model}
						</div>
						<div className="sub-header">
							<div>Time</div>
							<div>Eval</div>
						</div>
					</div>
				))}
			</div>
			<div className="feed-body">
				{run.questions.map((question, qIndex) => (
					<div key={qIndex} className="feed-row">
						<div className="question-cell">
							<div className="question-status">
								<button className={`q-status-btn ${getQuestionStatus(qIndex)}`} />
							</div>
							<div className="question-text">{question.question}</div>
						</div>
						{run.models.map((_, mIndex) => {
							const response =
								run.results[qIndex].responses[mIndex];
							return (
								<div className="response-cell" key={mIndex}>
									<div className="flex-wrap">
										<div>
											{(
												response.time_elapsed / 1000
											).toFixed(2)}
											s
										</div>
										<div>
											<span
												className={`eval-status ${response.evaluation}`}
											>
												{response.evaluation ||
													"\u2013"}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};

export default Feed;
