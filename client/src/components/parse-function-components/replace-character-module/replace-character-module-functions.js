export const escapeRegExp = (stringToGoIntoTheRegex) => {
    // escape character: \/ is NOT a useless escape
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const replaceAndInsertChar = (text, replaceChar, insertChar) => {
    function escapeRegExp(stringToGoIntoTheRegex) {
        // escape character: \/ is NOT a useless escape
        return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    const stringToGoIntoTheRegex = escapeRegExp(replaceChar);
    const regex = new RegExp(stringToGoIntoTheRegex, "g");

    // handle the case where the user wants to replace a whole entire line with nothing
    // The solution would be a DELETED ROW

    const textLines = text.split('\n');
    let newText = [];
    for (let i = 0; i < textLines.length; i++) {
        if (textLines[i] === replaceChar && insertChar === "") {
            continue;
        }
        newText.push(textLines[i]);
    }

    // join the resulting text
    newText = newText.join('\n');

    // 2nd param is a function to handle the "$$" case for character insert
    return newText.replace(regex, () => { return insertChar });
}