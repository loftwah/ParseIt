export const validateCode = (moduleCode, lineNum) => {

    let moduleType = moduleCode.split(' ')[0];
    // the slice takes off the 2 ending quotations and ending parenthesis off of the 2nd param
    let moduleParams = moduleCode.slice(0, moduleCode.length - 2)
        .replace(moduleType + ' \"(', '').split(")\" \"(");

    // For all modules with parameters, the last 2 characters MUST be the following: ")
    const moduleWithParamsValidEnding = (moduleCode) => {
        return moduleCode.slice(moduleCode.length - 2) === ")\"";
    };

    const validParamEnding = moduleWithParamsValidEnding(moduleCode);

    let validationObj;
    validationObj = {
        valid: true
    };

    let charToSplit;

    switch (moduleType) {
        case "ReplaceCharacters":
            // Cannot have more than 2 parameters
            if (moduleParams.length !== 2) {
                validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ReplaceCharacters\nReason: This module takes 2 parameters\nStructure: ReplaceCharacters \"(replace characters)\" \"(insert characters)\"`
                };
            } else if (validParamEnding !== true) {
                validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ReplaceCharacters\nReason: Code must end with \")`
                };
            }
            break;
        case "DeleteBeginningUntilPhrase":
            break;
        case "DeleteLastPhraseUntilEnd":
            break;
        case "SaveText":
            break;
        case "Concatenate":
            break;
        case "RemoveBlankLines":
            break;
        case "RemoveExcessSpaces":
            break;
        case "SplitLinesBeforeWord":
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at SplitLinesBeforeWord\nReason: This module does not take spaces at the beginning or end of characters`
                };
            }
            break;
        case "SplitLinesAfterWord":
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at SplitLinesBeforeWord\nReason: This module does not take spaces at the beginning or end of characters`
                };
            }
            break
        case "MultipleSplitLinesAfterWord":
            break;
        case "MultipleSplitLinesBeforeWord":
            break;
        case "MultipleAddTextToBeginning":
            break;
        case "MultipleDeleteLine":
            break;
        case "DeleteCertainLines":
            break;
        case "DeleteBetweenPhrases":
            break;
        case "DeleteLineIfHasPhrase":
            break;
        case "DeleteLineIfDoesntHavePhrase":
            break;
        case "CreateLineBeginningAllInputs":
            break;
        case "CreateLineBeginningFirstInput":
            break;
        case "CreateLineEndAllInputs":
            break;
        case "CreateLineEndLastInput":
            break;
        case "":
            break;
        default:
            console.log("module doesn't exist");
            validationObj = {
                valid: false,
                message: `Error: Line Number ${lineNum}\nReason: "${moduleType}" module does not exist`
            }
    }

    return validationObj;
}