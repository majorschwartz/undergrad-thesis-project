import React from "react";

const ModelSelect = ({ models, selectedModels, setSelectedModels }) => {
    const toggleModel = (model) => {
        if (selectedModels.includes(model)) {
            setSelectedModels(selectedModels.filter(m => m !== model));
        } else {
            setSelectedModels([...selectedModels, model]);
        }
    };

    return (
        <div className="model-selection">
            {models.map((model, index) => (
                <button
                    key={index}
                    className={`model-select ${selectedModels.includes(model) ? "selected" : ""}`}
                    onClick={() => toggleModel(model)}
                >
                    {model}
                </button>
            ))}
        </div>
    );
}

export default ModelSelect;