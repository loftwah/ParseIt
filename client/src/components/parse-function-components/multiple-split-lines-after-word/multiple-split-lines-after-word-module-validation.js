export const multipleSplitLinesAfterWordValidation = (lineNumBegin, lineMultiple, charToSplit, instance) => {
    // Exact string is: )" "(
    const seperatorString = ")\" \"(";

    const charToSplitHasSep = charToSplit.indexOf(seperatorString) !== -1;

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

    if (charToSplit.length === 0) {
        return { valid: false, error: 'Split After Characters: Please fill the input' };
    } else if (charToSplitHasSep === true) {
        return { valid: false, error: 'Split After Characters: The use of the exact characters )\" \"( as characters to split lines is forbidden.\nAs a workaround, use more modules to get your intended result.' };
    }

    if (instance.length === 0) {
        return { valid: false, error: 'Instance: Please fill the input' };
    } else if (Number(instance) === 0) {
        return { valid: false, error: 'Instance: Number cannot be zero' };
    } else if (Number(instance) < 0) {
        return { valid: false, error: 'Instance: Number cannot be negative' };
    } else if (instance.indexOf('e') !== -1) {
        return { valid: false, error: 'Instance: The letter "e" is not valid' };
    } else if (instance.indexOf('.') !== -1) {
        return { valid: false, error: 'Instance: The decimal symbol "." is not valid' };
    }

    return { valid: true, error: undefined };

}