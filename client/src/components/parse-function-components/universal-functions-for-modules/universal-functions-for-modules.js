export const cleanDoubleQuotes = (text) => {
    // This function gets rid of double quotes that aren't: "
    // Used BEFORE validation of text - before previews and submissions
    while (text.indexOf("“") !== -1) {
        text = text.replace("“", "\"");
    }
    while (text.indexOf("”") !== -1) {
        text = text.replace("”", "\"");
    }
    return text
}