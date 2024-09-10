const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const createRun = async (fileData, selectedModels) => {
    const response = await fetch(`${apiUrl}/create_run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileData, selectedModels }),
    });
    return response;
};
