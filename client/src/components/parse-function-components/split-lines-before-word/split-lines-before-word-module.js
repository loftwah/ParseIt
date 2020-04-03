import React, { Component } from 'react';
import { connect } from 'react-redux';

import './split-lines-before-word-module.css';
import * as actions from '../../../actions';
import { splitBeforeWordValidation } from './split-lines-before-word-module-validation';
import { cleanQuotationMarks } from '../universal-functions-for-modules/universal-functions-for-modules';

class SplitLinesBeforeWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charToSplit: '',
            errorMsg: '',
        };
    }

    handleCharToSplit = e => {
        this.setState({
            charToSplit: e.target.value,
            errorMsg: '',
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id, moduleActiveOff } = this.props;
        handleDeleteModule(id);
        moduleActiveOff();
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('submitted character!');
        const { handleModuleCode,
            togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;
        let { charToSplit } = this.state;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();

        charToSplit = cleanQuotationMarks(charToSplit);
        const validationTest = splitBeforeWordValidation(charToSplit);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        const moduleCode = "SplitLinesBeforeWord \"(" + charToSplit + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });
        completeModule(id, charToSplit);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        let { charToSplit } = this.state;

        charToSplit = cleanQuotationMarks(charToSplit);
        const validationTest = splitBeforeWordValidation(charToSplit);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        let additionPreviews = [];
        let deletionPreviews = [];

        // If a character begins with a space, it will eliminate all of the "word" property rules we have set
        // In the above case, no space will be subtracted from the line being split
        const charBeginsWithSpace = charToSplit[0] === " " ? true : false;

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let addIdx = 0;
            let deleteIdx = 0;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {
                deleteIdx++;

                let line = containerSplitNewLine[i];
                let charLocationIdx = line.lastIndexOf(charToSplit);
                let found = (charLocationIdx !== -1 && charToSplit !== "") ? true : false;

                if (line === "" && found === false) {
                    addIdx++;
                    createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">&#x200B;</p>
                    </div>);

                    createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                        <span className="line-number">[{deleteIdx}]&#160;</span>
                        <p className="line-text">&#x200B;</p>
                    </div>);

                } else if (line !== "" && found === false) {
                    addIdx++;
                    createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>);

                    createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                        <span className="line-number">[{deleteIdx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>);

                } else if (line !== "" && found === true) {
                    // the phrase is found inside this line
                    // there can be multiple instances of this phrase

                    // we will while-loop through the line, chopping it off into segments, until there is no more instances of charToSplit
                    let lineSegment = line;

                    let deletionPreviewLineJSX = [];
                    let additionPreviewLines = [];

                    let findSpacePointer;

                    // Below var handles case for:
                    // If the line starts with a space, followed by the affected word
                    // Why we need this? We want to indicate that the first word should have orange highlight, and that it is NOT part of the original line (we cut off the beginning space of the line)
                    let affectedBySpace = false;

                    while (lineSegment.lastIndexOf(charToSplit) !== -1) {
                        findSpacePointer = lineSegment.lastIndexOf(charToSplit);

                        if (charBeginsWithSpace === false) {
                            while (lineSegment[findSpacePointer] !== " " && findSpacePointer !== -1) {
                                findSpacePointer--;
                            }
                        }
                        // If the user inputs a space to begin the input, we will not care about the locations of spaces - WORK IN PROGRESS

                        // if findSpacePointer is at index 0, the line is affected by a space
                        if (findSpacePointer === 0) {
                            affectedBySpace = true;
                        }

                        // check to make sure findSpacePointer is -1, if it is LEAVE THE LOOP
                        if (findSpacePointer === -1) {
                            break;
                        } else {
                            // otherwise, we will split the entire line and generate a brand new line

                            let lastSegment = lineSegment.slice(findSpacePointer + 1);

                            // Chopped off the current line into a smaller segment
                            // This is one of the ways we are able to leave the while loop - by ending the while-loop condition
                            lineSegment = lineSegment.slice(0, findSpacePointer);

                            if (charBeginsWithSpace === false) {
                                // If a line doesn't begin with a space, we assume that the user is looking to split on a word
                                // Therefore, we will delete a space before the split to a new line
                                deletionPreviewLineJSX.push(<span className="line" key={findSpacePointer}>
                                    <span className="line-text" style={{ background: "red" }}>&#160;</span>
                                    <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                    <span className="line-text" style={{ background: "orange" }}>{lastSegment}</span>
                                </span>);

                                additionPreviewLines.push(lastSegment);

                            } else if (charBeginsWithSpace === true) {
                                // WORK IN PROGRESS

                                // If a line DOES begin with a space, we assume that the user does not care about any rules regarding words
                                // Therefore, we will simply move things to a new line, as long as the pointer is not at index 0
                                if (findSpacePointer !== 0) {
                                    deletionPreviewLineJSX.push(<span className="line" key={findSpacePointer}>
                                        <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                        <span className="line-text" style={{ background: "orange" }}>&#160;</span>
                                        <span className="line-text" style={{ background: "orange" }}>{lastSegment}</span>
                                    </span>);

                                    additionPreviewLines.push(' ' + lastSegment);

                                } else {
                                    // If we are at index 0, we want to indicate to the user that nothing will happen to this segment
                                    deletionPreviewLineJSX.push(<span className="line" key={findSpacePointer}>
                                        <span className="line-text" >&#160;</span>
                                        <span className="line-text" >{lastSegment}</span>
                                    </span>);

                                    additionPreviewLines.push(' ' + lastSegment);
                                }
                            }
                        }
                    }

                    let remainingSegment = lineSegment;

                    // Tack on the index and remaining segment at the end (remember, this array is in reverse)
                    deletionPreviewLineJSX.push(<span className="line" key={"deletion-index"}>
                        <span className="line-number" >[{deleteIdx}]&#160;</span>
                        <span className="line-text">{remainingSegment}</span>
                    </span>);

                    // Do not push any segements into addition if it doesn't contain anything
                    // Reason: If a segment doesn't contain anything, it will typically be in the beginning of a line, and this it will ruin the CSS for the addition preview of what is considered the "actual beginning"
                    // the actual beginning is the only segment that recieves no special highlights/backgrounds
                    if (remainingSegment !== "") {
                        additionPreviewLines.push(remainingSegment);
                    }

                    // Handling Addition Previews

                    additionPreviewLines.reverse();

                    // if additionPreviewLines.length === 1, output orange text

                    // The below if statement solves the case:
                    // We begin with a space followed by the affecting word - we would like to output orange highlight in the addition preview to indicate psuedo-movement (in reality, it eliminated a space)

                    const additionPreviewLinesJSX = additionPreviewLines.map((line, idx) => {
                        addIdx++;

                        if (line === "" && idx === 0) {
                            return (
                                <div className="line" key={addIdx}>
                                    <span className="line-number">[{addIdx}]&#160;</span>
                                    <p className="line-text">&#x200B;</p>
                                </div>
                            );
                        } else if (line === "" && idx !== 0) {
                            return (
                                <div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>&#x200B;</p>
                                </div>
                            );
                        } else if (line !== "" && idx === 0 && affectedBySpace === true) {
                            // Handle the case where the line starts with a space, and we end up deleting that space due to the affected word being right after the space
                            return (
                                <div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>{line}</p>
                                </div>
                            );

                        } else if (line !== "" && idx === 0) {
                            return (
                                <div className="line" key={addIdx}>
                                    <span className="line-number">[{addIdx}]&#160;</span>
                                    <p className="line-text">{line}</p>
                                </div>
                            );
                        } else if (line !== "" && idx !== 0) {
                            return (
                                <div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>{line}</p>
                                </div>
                            );
                        }
                    })


                    createSingleAdditionPreview.push(additionPreviewLinesJSX);

                    // Handling Deletion Previews

                    deletionPreviewLineJSX = deletionPreviewLineJSX.reverse();

                    createSingleDeletionPreview.push(
                        <div className="line" key={deleteIdx}>
                            {[...deletionPreviewLineJSX]}
                        </div>
                    );
                }
            }
            additionPreviews.push(createSingleAdditionPreview);
            deletionPreviews.push(createSingleDeletionPreview);
        }

        updateDeletionsPreview(deletionPreviews); // array of ALL deletion previews
        updateAdditionsPreview(additionPreviews); // array of ALL addition previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();

        if (previewToggle === true) {
            toggleOutputTextOn();
            toggleSavedTextOff();
        }
    }

    render() {
        const { previewToggle } = this.props;
        const { charToSplit } = this.state;
        let { errorMsg } = this.state;
        let errorMsgJSX;
        if (errorMsg !== "") {
            errorMsg = errorMsg.split('\n');
            errorMsgJSX = errorMsg.map((errLine, idx) => {
                return <p key={idx}>{errLine}</p>
            });
        }

        return (
            <div className="split-lines-before-word-function">
                <div className="split-lines-before-word-card card white">
                    <div className="split-lines-before-word-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Split Into Two Lines if a Word Contains a Phrase:</p>
                        <p className="card-title center">Before Word</p>
                    </div>
                    <div className="row">
                        <div className="split-lines-before-word-module-introduction">
                            <p>If a line contains a phrase of characters, the line will be split into two.</p>
                            <p>The line will be split *before* the word that contains a phrase.</p>
                            <p>Multiple phrase instances yields multiple splits.</p>
                        </div>
                        <form action="#" className="radio-button-form col s12">
                            <span>Characters:</span>
                            <div className="split-lines-before-word-user-input-character insert input-field inline">
                                <input
                                    type="text"
                                    id="character-input"
                                    onChange={this.handleCharToSplit}
                                    disabled={previewToggle}
                                    value={charToSplit}
                                />
                                <label htmlFor="character-input"></label>
                            </div>

                            {errorMsg === "" ? (
                                <div className="no-error-msg">
                                </div>
                            ) : (
                                    <div className="error-msg">
                                        {errorMsgJSX}
                                    </div>
                                )}

                        </form>

                    </div>

                    <div className="card-action preview-submit">
                        {previewToggle === true ? (
                            <a
                                href="!#"
                                onClick={this.handlePreview}>
                                Edit Module</a>
                        ) : (
                                <a
                                    href="!#"
                                    onClick={this.handlePreview}>
                                    Preview Changes
                                </a>
                            )}
                        <a
                            href="!#"
                            onClick={this.handleSubmit}
                        >Submit</a>
                    </div>

                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        inputText: state.textRed.inputText,
        outputText: state.textRed.outputText,
        previewToggle: state.textRed.previewToggle,
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview
    };
};

export default connect(mapStateToProps, actions)(SplitLinesBeforeWord);