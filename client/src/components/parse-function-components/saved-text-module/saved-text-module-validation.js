export const savedTextValidation = (savedTextName) => {
    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    const stoppingCharHasSep = savedTextName.indexOf(seperatorString) !== -1;

    if (stoppingCharHasSep === true) {
        // savedTextName uses the seperator string in its parameter
        return { valid: false, error: "The use of the exact characters )\" \"( as an input is forbidden.\nAs a workaround, use more modules to get your intended result." };
    } else {
        return { valid: true, error: undefined };
    }

}