const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const createRun = async (selectedModels, questions, answers) => {
    const response = await fetch(`${apiUrl}/create-run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ models: selectedModels, prompts: questions, eval_answers: answers }),
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
