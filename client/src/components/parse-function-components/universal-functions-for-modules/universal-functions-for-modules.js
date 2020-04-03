export const cleanQuotationMarks = (text) => {
    // cleans all quotation marks

    // This function gets rid of double quotes that aren't: "
    // This function also gets rid of single quotes that aren't: '
    // Used BEFORE validation of text - before previews and submissions
    while (text.indexOf("“") !== -1) {
        text = text.replace("“", "\"");
    }
    while (text.indexOf("”") !== -1) {
        text = text.replace("”", "\"");
    }

    while (text.indexOf("‘") !== -1) {
        text = text.replace("‘", "'");
    }
    while (text.indexOf("’") !== -1) {
        text = text.replace("’", "'");
    }

    return text
}