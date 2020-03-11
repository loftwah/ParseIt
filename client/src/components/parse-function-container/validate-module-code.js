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

    // If a module has no parameters, return out of this function
    switch (moduleType) {
        case "ReplaceCharacters":
            // Must only have 2 parameters
            if (moduleParams.length !== 2) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes 2 parameters\nStructure: ReplaceCharacters \"(replace characters)\" \"(insert characters)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }
            break;
        case "DeleteBeginningUntilPhrase":
            // Must only have 1 parameter
            if (moduleParams.length !== 1) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes only 1 parameter\nStructure: DeleteBeginningUntilPhrase \"(delete beginning until these characters)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }
            break;
        case "DeleteLastPhraseUntilEnd":
            break;
        case "SaveText":
            break;
        case "Concatenate":
            // If 100% invalid, return out of the function
            // If 100% valid, return out of the function
            break;
        case "RemoveBlankLines":
            // If 100% invalid, return out of the function
            // If 100% valid, return out of the function
            break;
        case "RemoveExcessSpaces":
            // If 100% invalid, return out of the function
            // If 100% valid, return out of the function
            break;
        case "SplitLinesBeforeWord":
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at SplitLinesBeforeWord\nReason: This module does not take spaces at the beginning or end of characters`
                };
            }
            break;
        case "SplitLinesAfterWord":
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                return validationObj = {
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
            if (moduleCode !== "") {
                // If the user DID NOT input an empty line, send an error
                if (moduleCode[0] === " ") {
                    return validationObj = {
                        valid: false,
                        message: `Error: Line Number ${lineNum}\nReason: Do not begin module names with spaces`
                    };
                } else {
                    return validationObj = {
                        valid: false,
                        message: `Error: Line Number ${lineNum}\nReason: "${moduleCode}" module does not exist`
                    };
                }
            }
            break;
        default:
            console.log("module doesn't exist");
            return validationObj = {
                valid: false,
                message: `Error: Line Number ${lineNum}\nReason: "${moduleType}" module does not exist`
            };
    }

    // If a module has params, validate to make sure that after moduleType the correct struture is a space followed by the characters ("
    // In the future: modules that take no parameters (ie: concatenate) should be handled and returned out of the function at this point
    if (moduleType !== "") {
        let eliminateModType = moduleCode.slice(moduleType.length);
        let beginParamValid = eliminateModType.indexOf(' \"(') === 0 ? true : false;;
        if (beginParamValid === false) {
            validationObj = {
                valid: false,
                message: `Error: Line Number ${lineNum}\nReason: "Following the module name should be a space and the characters \"(`
            };
        }
    }

    return validationObj;
}