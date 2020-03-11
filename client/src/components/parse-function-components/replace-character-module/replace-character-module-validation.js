export const replaceCharacterValidation = (replaceCharacter, insertCharacter) => {
    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    const replaceCharHasSep = replaceCharacter.indexOf(seperatorString) !== -1;
    const insertCharHasSep = insertCharacter.indexOf(seperatorString) !== -1;

    if (replaceCharHasSep === true && insertCharHasSep === true) {
        return { valid: false, error: "The use of the exact characters )\" \"( as characters to replace and insert is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else if (replaceCharHasSep === true) {
        // replaceCharacter uses the seperator string in its parameter
        return { valid: false, error: "The use of the exact characters )\" \"( as characters to replace is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else if (insertCharHasSep === true) {
        return { valid: false, error: "The use of the exact characters )\" \"( as characters to insert is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else {
        return { valid: true, error: undefined };
    }

}