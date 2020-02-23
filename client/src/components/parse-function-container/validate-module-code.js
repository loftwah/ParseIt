export const validateCode = (moduleType, moduleParams) => {

    let validationObj;
    validationObj = {
        valid: true
    };
    let charToSplit;

    switch (moduleType) {
        case "SplitLinesBeforeBreak":
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                validationObj = {
                    valid: false,
                    message: "SplitLinesBeforeBreak: Do not have spaces at the beginning or end of characters"
                };
            }
            break
        case "SplitLinesAfterBreak":
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                validationObj = {
                    valid: false,
                    message: "SplitLinesAfterBreak: Do not have spaces at the beginning or end of characters"
                };
            }
            break
        default:
            console.log("module doesn't exist (at the moment");
    }

    return validationObj;
}