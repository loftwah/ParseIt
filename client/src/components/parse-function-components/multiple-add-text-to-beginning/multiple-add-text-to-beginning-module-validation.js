export const multipleAddTextToBeginningValidation = (lineNumBegin, lineMultiple, charToAdd) => {
    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    const charToAddHasSep = charToAdd.indexOf(seperatorString) !== -1;

    if (lineNumBegin.length === 0) {
        return { valid: false, error: 'Begin At Line Number: Please fill the input' };
    } else if (Number(lineNumBegin) === 0) {
        return { valid: false, error: 'Begin At Line Number: Number cannot be zero' };
    } else if (Number(lineNumBegin) < 0) {
        return { valid: false, error: 'Begin At Line Number: Number cannot be negative' };
    } else if (lineNumBegin.indexOf('e') !== -1) {
        return { valid: false, error: 'Begin At Line Number: The letter "e" is not valid' };
    } else if (lineNumBegin.indexOf('.') !== -1) {
        return { valid: false, error: 'Begin At Line Number: The decimal symbol "." is not valid' };
    }

    if (lineMultiple.length === 0) {
        return { valid: false, error: 'Line Multiple: Please fill the input' };
    } else if (Number(lineMultiple) === 0) {
        return { valid: false, error: 'Line Multiple: Number cannot be zero' };
    } else if (Number(lineMultiple) < 0) {
        return { valid: false, error: 'Line Multiple: Number cannot be negative' };
    } else if (lineMultiple.indexOf('e') !== -1) {
        return { valid: false, error: 'Line Multiple: The letter "e" is not valid' };
    } else if (lineMultiple.indexOf('.') !== -1) {
        return { valid: false, error: 'Line Multiple: The decimal symbol "." is not valid' };
    }

    if (charToAdd.length === 0) {
        return { valid: false, error: 'Text to Be Added Before Line: Please fill the input' };
    } else if (charToAddHasSep === true) {
        return { valid: false, error: 'Text to Be Added Before Line: The use of the exact characters )" "( as characters to add before lines is forbidden.\nAs a workaround, use more modules to get your intended result.' };
    }

    return { valid: true, error: undefined };

}