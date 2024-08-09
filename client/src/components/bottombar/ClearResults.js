import React from "react";

const ClearResults = ({ modelState, setModelState }) => {
	return (
		<button className="bottom-button" onClick={() => {
			const newModelState = modelState.map((state) => {
				return {
					...state,
					results: []
				};
			});
			setModelState(newModelState);
		}}>Clear Results</button>
	);
}

export default ClearResults;