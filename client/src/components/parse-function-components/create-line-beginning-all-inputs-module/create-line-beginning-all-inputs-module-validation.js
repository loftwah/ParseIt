export const createLineBeginningAllInputsValidation = (finalizedChars, getNameToggle) => {
    // If the checkbox is toggled on, there is no need to validate anything
    if (getNameToggle === true) {
        return { valid: true, error: undefined };
    }

    // Handle characters given by the user

    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    const finalizedCharsHasSep = finalizedChars.indexOf(seperatorString) !== -1;

    if (finalizedCharsHasSep === true) {
        // finalizedChars uses the seperator string in its parameter
        return { valid: false, error: "The use of the exact characters )\" \"( as an input is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else if (finalizedChars === "$$GetName$$") {
        return { valid: false, error: "The parameter $$GetName$$ is used to gather input names for the beginning of all inputs, and is forbidden to be used as an input.\nAs a workaround, use more modules to get your intended result.\nIf you want to get the names of all inputs, toggle the checkbox on." };
    } else {
        return { valid: true, error: undefined };
    }

}