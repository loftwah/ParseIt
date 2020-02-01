export const escapeRegExp = (stringToGoIntoTheRegex) => {
    // escape character: \/ is NOT a useless escape
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const replaceAndInsertChar = (text, replaceChar, insertChar) => {
    function escapeRegExp (stringToGoIntoTheRegex) {
        // escape character: \/ is NOT a useless escape
        return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    const stringToGoIntoTheRegex = escapeRegExp(replaceChar);
    const regex = new RegExp(stringToGoIntoTheRegex, "g");
    // 2nd param is a function to handle the "$$" case for character insert
    return text.replace(regex, () => { return insertChar });
}