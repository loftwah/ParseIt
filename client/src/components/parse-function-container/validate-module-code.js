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

    let stoppingCharacters, charToSplit, lineNumBegin, lineMultiple, direction, instance;
    let charToAdd, linesToDelete, startCharacters, endCharacters, charDeleteLine, charKeepLine;

    // If a module has no parameters, return out of this function
    switch (moduleType) {
        case "ReplaceCharacters":
            // Must only have 2 parameters
            if (moduleParams.length !== 2) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes 2 parameters\nStructure: ${moduleType} \"(replace characters)\" \"(insert characters)\"`
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
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes only 1 parameter\nStructure: ${moduleType} \"(phrase)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }
            break;
        case "DeleteLastPhraseUntilEnd":
            // Must only have 1 parameter
            if (moduleParams.length !== 1) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes only 1 parameter\nStructure: ${moduleType} \"(phrase)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }
            break;
        case "SaveText":
            // Must only have 1 parameter
            if (moduleParams.length !== 1) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes only 1 parameter\nStructure: ${moduleType} \"(name of save)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }
            break;
        case "Concatenate":
            // Concatenate takes no params
            // Therefore, return out of function if the moduleCode is the module
            if (moduleCode === "Concatenate") {
                return validationObj = {
                    valid: true,
                    message: undefined
                };
            } else {
                return validationObj = {
                    valid: false,
                    message: `To use the ${moduleType} module, you must strictly write: ${moduleType}`
                };
            }
            break;
        case "RemoveBlankLines":
            // RemoveBlankLines takes no params
            // Therefore, return out of function if the moduleCode is the module
            if (moduleCode === "RemoveBlankLines") {
                return validationObj = {
                    valid: true,
                    message: undefined
                };
            } else {
                return validationObj = {
                    valid: false,
                    message: `To use the ${moduleType} module, you must strictly write: ${moduleType}`
                };
            }
            break;
        case "RemoveExcessSpaces":
            // RemoveExcessSpaces takes no params
            // Therefore, return out of function if the moduleCode is the module
            if (moduleCode === "RemoveExcessSpaces") {
                return validationObj = {
                    valid: true,
                    message: undefined
                };
            } else {
                return validationObj = {
                    valid: false,
                    message: `To use the ${moduleType} module, you must strictly write: ${moduleType}`
                };
            }
            break;
        case "SplitLinesBeforeWord":
            // Must only have 1 parameter
            if (moduleParams.length !== 1) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes only 1 parameter\nStructure: ${moduleType} \"(phrase)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }

            // Do not have spaces at the beginning or ending of characters
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module does not take spaces at the beginning or end of characters inside Parameter #1`
                };
            }
            break;
        case "SplitLinesAfterWord":
            // Must only have 1 parameter
            if (moduleParams.length !== 1) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes only 1 parameter\nStructure: ${moduleType} \"(phrase)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }

            // Do not have spaces at the beginning or ending of characters
            charToSplit = moduleParams[0];
            if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module does not take spaces at the beginning or end of characters inside Parameter #1`
                };
            }
            break;
        case "MultipleSplitLinesAfterWord":
            // Must have 5 parameters
            // Example: MultipleSplitLinesAfterWord "(1)" "(1)" "(a)" "(forward)" "(1)"
            if (moduleParams.length !== 5) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: This module takes 5 parameters\nStructure: ${moduleType} \"(number: line begin)\" \"(number: line multiple)\" \"(phrase)\" \"(direction: forward/backward)\" \"(number: instance)\"`
                };
            } else if (validParamEnding !== true) {
                return validationObj = {
                    valid: false,
                    message: `Error: Line Number ${lineNum} at ${moduleType}\nReason: Code must end with )\"`
                };
            }

            lineNumBegin = moduleParams[0];
            lineMultiple = moduleParams[1];
            charToSplit = moduleParams[2];
            direction = moduleParams[3];
            instance = moduleParams[4];

            if (lineNumBegin.length === 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #1 Begin At Line Number: Please fill the input` };
            } else if (isNaN(Number(lineNumBegin))) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #1 Begin At Line Number: Input must be a number` };
            } else if (Number(lineNumBegin) === 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #1 Begin At Line Number: Number cannot be zero` };
            } else if (Number(lineNumBegin) < 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #1 Begin At Line Number: Number cannot be negative` };
            } else if (lineNumBegin.indexOf('e') !== -1) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #1 Begin At Line Number: The letter "e" is not valid` };
            } else if (lineNumBegin.indexOf('.') !== -1) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #1 Begin At Line Number: The decimal symbol "." is not valid` };
            }

            if (lineMultiple.length === 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #2 Line Multiple: Please fill the input` };
            } else if (isNaN(Number(lineMultiple))) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #2 Line Multiple: Input must be a number` };
            } else if (Number(lineMultiple) === 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #2 Line Multiple: Number cannot be zero` };
            } else if (Number(lineMultiple) < 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #2 Line Multiple: Number cannot be negative` };
            } else if (lineMultiple.indexOf('e') !== -1) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #2 Line Multiple: The letter "e" is not valid` };
            } else if (lineMultiple.indexOf('.') !== -1) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #2 Line Multiple: The decimal symbol "." is not valid` };
            }

            if (charToSplit.length === 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #3 Split After Characters: Please fill the input` };
            }

            if (direction !== "forward" && direction !== "backward") {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #4 Direction: Direction must either be forward or backward` };
            }

            if (instance.length === 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #5 Instance: Please fill the input` };
            } else if (isNaN(Number(instance))) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #5 Instance: Input must be a number` };
            } else if (Number(instance) === 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #5 Instance: Number cannot be zero` };
            } else if (Number(instance) < 0) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #5 Instance: Number cannot be negative` };
            } else if (instance.indexOf('e') !== -1) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #5 Instance: The letter "e" is not valid` };
            } else if (instance.indexOf('.') !== -1) {
                return { valid: false, message: `Error: Line Number ${lineNum} at ${moduleType}\nParam #5 Instance: The decimal symbol "." is not valid` };
            }
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
    // NOTE: Modules that take no parameters (ie: concatenate) should be handled and returned out of the function at this point
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