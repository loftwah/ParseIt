export const deleteBetweenCharsValidation = (startCharacters, endCharacters) => {
    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    // make sure startCharacters and endCharacters exists

    if (startCharacters === "") {
        return { valid: false, error: "The first phrase cannot be blank" };
    } else if (endCharacters === "") {
        return { valid: false, error: "The second phrase cannot be blank" };
    }

    const replaceCharHasSep = startCharacters.indexOf(seperatorString) !== -1;
    const insertCharHasSep = endCharacters.indexOf(seperatorString) !== -1;

    if (replaceCharHasSep === true || insertCharHasSep === true) {
        return { valid: false, error: "The use of the exact characters )\" \"( as an input is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else {
        return { valid: true, error: undefined };
    }

}