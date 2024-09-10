export const parseCSV = (fileData) => {
    if (!fileData) {
        return { questions: [], answers: [] };
    }
    const rows = fileData.split("\n");
    const questions = [];
    const answers = [];

    rows.forEach((row) => {
        if (row.trim() !== "") {
            const [question, answer = null] = row
                .split(",")
                .map((item) => item.trim());
            questions.push(question);
            answers.push(answer);
        }
    });

    return { questions, answers };
};
