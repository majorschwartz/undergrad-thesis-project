import React from "react";
import { modelNames } from "../../utils/api";

const ListModels = ({ selectedModels }) => {
	return (
		<div className="list-models">
			<h4>Selected Models:</h4>
			<ul>
				{selectedModels.map((model, index) => (
					<li key={index}>{modelNames[model] || model}</li>
				))}
			</ul>
		</div>
	);
}

export default ListModels;