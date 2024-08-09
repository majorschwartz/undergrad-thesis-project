import React from "react";

const ModelSelect = ({ modelState, setModelState }) => {
    return (
        <div className="model-selection">
            {modelState.map((model, index) => (
                <div key={index} className="model-select">
                    <button
                        className={`${model.selected ? "selected" : ""}`}
                        onClick={() => {
                            const newModelState = [...modelState];
                            newModelState[index].selected = !newModelState[index].selected;
                            setModelState(newModelState);
                        }}
                    >
                        {model.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ModelSelect;