const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const createRun = async (selectedModels, questions, answers) => {
    const response = await fetch(`${apiUrl}/create-run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ models: selectedModels, prompts: questions, eval_answers: answers }),
    });
    return response;
};
