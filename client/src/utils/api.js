const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const models = {
    "GPT-4o": "gpt-4o",
    "Claude 3.5 Sonnet": "claude-3-sonnet-20240229",
    "Llama 3.1 405B": "llama-3-1-405b",
    "Knowledge Graph": "knowledge-graph",
};

export const modelNames = Object.fromEntries(
    Object.entries(models).map(([key, value]) => [value, key])
);

export const createRun = async (selectedModels, questions, answers) => {
    const response = await fetch(`${apiUrl}/create-run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ models: selectedModels.map(model => models[model]), prompts: questions, eval_answers: answers }),
    });
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

export const getRun = async (run_tag) => {
    const response = await fetch(`${apiUrl}/run/${run_tag}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

export const editRunName = async (run_tag, new_name) => {
    const response = await fetch(`${apiUrl}/edit-run-name`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ run_tag: parseInt(run_tag, 10), new_name }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update run name");
    }
    const data = await response.json();
    return data;
};
