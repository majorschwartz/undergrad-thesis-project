import React, { useState } from "react";

const ModelControls = ({ modelState, setModelState }) => {
    const selectedModels = modelState.filter((model) => model.selected);
	const [showControls, setShowControls] = useState(false);

    return (
        <>
            {selectedModels.length > 0 && (
				<>
					<button
						className="show-controls"
						onClick={() => setShowControls(!showControls)}
					>
						{showControls ? "Hide" : "Show"} Model Controls
					</button>
					{showControls && (
						<div className="model-controls">
							{selectedModels.map((model, index) => (
								<div className="controls">
									<div className="control-name">{model.name}</div>
									<div className="temperature">
										<div className="temp-top">
											<span>Temperature</span>
											<span>{model.temp}</span>
										</div>
										<input
											type="range"
											min="0.0"
											max="1.0"
											step="0.01"
											value={model.temp}
											onChange={(e) => {
												const newModelState = [...modelState];
												newModelState[index].temp =
													e.target.value;
												setModelState(newModelState);
											}}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</>
            )}
        </>
    );
};

export default ModelControls;
