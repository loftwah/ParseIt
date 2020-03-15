export const deleteLineIfDoesntHaveCharsValidation = (chars) => {
    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    const charHasSep = chars.indexOf(seperatorString) !== -1;

    if (charHasSep === true) {
        // chars uses the seperator string in its parameter
        return { valid: false, error: "The use of the exact characters )\" \"( as an input is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else if (chars.length === 0) {
        return { valid: false, error: "Please fill the Characters input" };
    } else {
        return { valid: true, error: undefined };
    }

}