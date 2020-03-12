export const splitBeforeWordValidation = (charToSplit) => {
    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    const stoppingCharHasSep = charToSplit.indexOf(seperatorString) !== -1;

    // Handle errors: spaces
    if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
        return { valid: false, error: "Do not begin or end with spaces in your set of characters.\nAs a workaround, use more modules to get your intended result." };
    }

    if (stoppingCharHasSep === true) {
        // replaceCharacter uses the seperator string in its parameter
        return { valid: false, error: "The use of the exact characters )\" \"( as an input is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else {
        return { valid: true, error: undefined };
    }

}