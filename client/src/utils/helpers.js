export const parseCSV = (csvText) => {
    if (!csvText) return { questions: [], answers: [] };

    // Regular expression to handle fields that are either quoted or unquoted
    const csvRegex = /("([^"]*)")|([^,]+)/g;

    // Split into rows based on newline character
    const rows = csvText.trim().split(/\r?\n/);

    const questions = [];
    const answers = [];

    rows.forEach((row) => {
        let matches = [...row.matchAll(csvRegex)];
        let columns = [];

        matches.forEach((match) => {
            if (match[2] !== undefined) {
                // This is a quoted field
                columns.push(match[2]);
            } else if (match[3] !== undefined) {
                // This is an unquoted field
                columns.push(match[3]);
            }
        });

        // Push question and answer to respective arrays
        questions.push(columns[0] || "");
        answers.push(columns[1] || null);
    });

    return { questions, answers };
}
