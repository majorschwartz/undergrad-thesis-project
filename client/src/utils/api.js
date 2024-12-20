const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const models = {
    "GPT-4o-mini": "gpt-4o-mini",
    "Claude 3.5 Sonnet": "claude-3-sonnet-20240229",
    "Llama 3.1 8B (Local)": "llama-3-1-8b",
    "Knowledge Graph": "knowledge-graph",
};

export const modelNames = Object.fromEntries(
    Object.entries(models).map(([key, value]) => [value, key])
);

export const createRun = async (selectedModels, questions, answers, context) => {
    const response = await fetch(`${apiUrl}/create-run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            models: selectedModels.map(model => models[model]),
            prompts: questions,
            eval_answers: answers,
            context: context
        }),
    });
    const data = await response.json();
    return data;
};

export const deleteAllRuns = async () => {
    const response = await fetch(`${apiUrl}/delete-all-runs`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete all runs');
    }
    const data = await response.json();
    return data;
};

export const getRuns = async () => {
    const response = await fetch(`${apiUrl}/runs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

export const getRun = async (run_id) => {
    const response = await fetch(`${apiUrl}/run/${run_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

export const editRunName = async (run_id, new_name) => {
    const response = await fetch(`${apiUrl}/edit-run-name`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ run_id, new_name }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update run name");
    }
    const data = await response.json();
    return data;
};

export const downloadResults = async (run_id) => {
    const response = await fetch(`${apiUrl}/download/${run_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/csv',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to download results');
    }
    return await response.text();
};
