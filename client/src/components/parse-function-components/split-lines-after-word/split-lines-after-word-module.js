import React, { Component } from 'react';
import { connect } from 'react-redux';

import './split-lines-after-word-module.css';
import * as actions from '../../../actions';

class SplitLinesAfterWord extends Component {
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
            errorMsg: ''
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
        const { charToSplit } = this.state;

        // Handle errors: spaces
        if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
            this.setState({
                errorMsg: "Do not begin or end with spaces in your set of characters"
            })
            return;
        }

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "SplitLinesAfterWord" + " \"(" + charToSplit + ")\"";
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
        const { charToSplit } = this.state;

        // Handle errors: spaces
        if (charToSplit[0] === " " || charToSplit[charToSplit.length - 1] === " ") {
            this.setState({
                errorMsg: "Do not begin or end with spaces in your set of characters"
            })
            return;
        }

        let additionPreviews = [];
        let deletionPreviews = [];

        // If a character begins with a space, it will eliminate all of the "word" property rules we have set
        // In the above case, no space will be subtracted from the line being split
        const charBeginsWithSpace = charToSplit[0] === " " ? true : false;
        const charEndsWithSpace = charToSplit[charToSplit] === " " ? true : false;
        const charHasSpaceOnEnd = (charBeginsWithSpace || charEndsWithSpace) === true ? true : false;

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
                    let JSXkey = lineSegment.length;

                    let deletionPreviewLineJSX = [];

                    let findSpacePointer;

                    while (lineSegment.lastIndexOf(charToSplit) !== -1) {
                        // where editing begins

                        findSpacePointer = lineSegment.indexOf(charToSplit) + charToSplit.length;

                        while (charEndsWithSpace === false
                            && lineSegment[findSpacePointer] !== " "
                            && findSpacePointer !== lineSegment.length) {
                            findSpacePointer++;
                        }

                        // If the user inputs a space to begin the input, we will not care about the locations of spaces

                        // check to see if findSpacePointer is at the end of the line, if it is LEAVE THE LOOP
                        if (findSpacePointer === lineSegment.length) {
                            if (deletionPreviewLineJSX.length === 0) {
                                addIdx++
                                // If we made it to the end of the line with nothing inside the deletion JSX array, simply return the whole line untouched
                                deletionPreviewLineJSX.push(<span className="line" key={"deletion-index"}>
                                    <span className="line-number" >[{deleteIdx}]&#160;</span>
                                    <span className="line-text">{lineSegment}</span>
                                </span>);

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" >[{addIdx}]&#160;</span>
                                    <p className="line-text">{lineSegment}</p>
                                </div>);
                            } else {
                                addIdx++;
                                // otherwise, return the line indicating that it will be moved
                                switch (charHasSpaceOnEnd) {
                                    case false:
                                        deletionPreviewLineJSX.push((<span className="line" key={JSXkey}>
                                            <span className="line-text" style={{ background: "red" }}>&#160;</span>
                                            <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                            <span className="line-text" style={{ background: "orange" }}>{lineSegment}</span>
                                        </span>));
                                        break;
                                    case true:
                                        deletionPreviewLineJSX.push((<span className="line" key={JSXkey}>
                                            <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                            <span className="line-text" style={{ background: "orange" }}>{lineSegment}</span>
                                        </span>));
                                        break;
                                    default:
                                        console.log("findSpacePointer is not defined");
                                }

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>{lineSegment}</p>
                                </div>);
                            }

                            break;
                        } else {
                            // we are not at the end of the line, we will split the entire line and generate a brand new line
                            let firstSegment = lineSegment.slice(0, findSpacePointer);

                            // Chopped off the current line into a smaller segment
                            // This is one of the ways we are able to leave the while loop - by ending the while-loop condition

                            switch (charHasSpaceOnEnd) {
                                case false:
                                    // we segment the line so we can insert a red space
                                    lineSegment = lineSegment.slice(findSpacePointer + 1);
                                    break;
                                case true:
                                    // we do not need to show any space deletion, words don't matter to the user
                                    lineSegment = lineSegment.slice(findSpacePointer);
                                    break;
                                default:
                                    console.log("CharHasSpaceOnEnd is not defined")
                            }

                            JSXkey = lineSegment.length;

                            if (charHasSpaceOnEnd === false && deletionPreviewLineJSX.length === 0) {
                                addIdx++;
                                // User is looking to split on a word
                                // This is the first line segment of all splits
                                // Therefore, we will be pushing the index of the line and the un-touched line segment
                                deletionPreviewLineJSX.push(<span className="line" key={"deletion-index"}>
                                    <span className="line-number" >[{deleteIdx}]&#160;</span>
                                    <span className="line-text">{firstSegment}</span>
                                </span>);

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number">[{addIdx}]&#160;</span>
                                    <p className="line-text">{firstSegment}</p>
                                </div>);

                            } else if (charHasSpaceOnEnd === false && deletionPreviewLineJSX.length !== 0) {
                                addIdx++;
                                // User is looking to split on a word
                                // This is NOT the first line segment of all splits
                                // Therefore, we will display that these segments will be split to a new line
                                deletionPreviewLineJSX.push(<span className="line" key={JSXkey}>
                                    <span className="line-text" style={{ background: "red" }}>&#160;</span>
                                    <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                    <span className="line-text" style={{ background: "orange" }}>{firstSegment}</span>
                                </span>);

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>{firstSegment}</p>
                                </div>);

                            } else if (charHasSpaceOnEnd === true && deletionPreviewLineJSX.length === 0) {
                                // WORK IN PROGRESS
                                addIdx++;
                                // If a line DOES begin with a space, we assume that the user does not care about any rules regarding words
                                // In this case, we are analyzing the first segment to split

                                deletionPreviewLineJSX.push(<span className="line" key={"deletion-index"}>
                                    <span className="line-number" >[{deleteIdx}]&#160;</span>
                                    <span className="line-text">{firstSegment}</span>
                                </span>);

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number">[{addIdx}]&#160;</span>
                                    <p className="line-text">{firstSegment}</p>
                                </div>);

                            } else if (charHasSpaceOnEnd === true && findSpacePointer !== 0) {
                                // WORK IN PROGRESS

                                addIdx++;
                                // If a line DOES begin with a space, we assume that the user does not care about any rules regarding words
                                // Therefore, we will simply move things to a new line, as long as the pointer is not at index 0

                                deletionPreviewLineJSX.push(<span className="line" key={JSXkey}>
                                    <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                    <span className="line-text" style={{ background: "orange" }}>{firstSegment}</span>
                                </span>);

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>{firstSegment}</p>
                                </div>);

                            } else if (charHasSpaceOnEnd === true && findSpacePointer === 0 && firstSegment !== "") {
                                // WORK IN PROGRESS

                                addIdx++;
                                // If we are at index 0 and the segment we want to incorporate is not blank, we want to indicate to the user that nothing will happen to this segment
                                deletionPreviewLineJSX.push(<span className="line" key={JSXkey}>
                                    <span className="line-text" >&#160;</span>
                                    <span className="line-text" >{firstSegment}</span>
                                </span>);

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number">[{addIdx}]&#160;</span>
                                    <p className="line-text">{firstSegment}</p>
                                </div>);

                            } else if (charHasSpaceOnEnd === true && findSpacePointer === 0 && firstSegment === "") {
                                // WORK IN PROGRESS

                                addIdx++;
                                // If we are at index 0 and the segment we want to incorporate IS blank, we are dealing with a space

                                deletionPreviewLineJSX.push(<span className="line" key={JSXkey}>
                                    <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                    <span className="line-text" style={{ background: "orange" }}>{firstSegment}</span>
                                    <span className="line-text" style={{ background: "orange" }}>&#160;</span>
                                </span>);

                                // The addition will have a line with a space in it
                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>&#160;</p>
                                </div>);
                            }
                        }
                    }

                    // Handle remaining characters
                    if (findSpacePointer !== lineSegment.length) {
                        addIdx++;

                        switch (charHasSpaceOnEnd) {
                            case false:
                                deletionPreviewLineJSX.push(<span className="line" key={"remaining-line-segment"}>
                                    <span className="line-text" style={{ background: "red" }}>&#160;</span>
                                    <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                    <span className="line-text" style={{ background: "orange" }}>{lineSegment}</span>
                                </span>);
                                break;
                            case true:
                                deletionPreviewLineJSX.push(<span className="line" key={"remaining-line-segment"}>
                                    <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                    <span className="line-text" style={{ background: "orange" }}>{lineSegment}</span>
                                </span>);
                                break;
                            default:
                                console.log("charHasSpaceOnEnd is undefined");
                        }

                        createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                            <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                            <p className="line-text" style={{ background: "orange" }}>{lineSegment}</p>
                        </div>);
                    }

                    // Handling Deletion Previews

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

        updateAdditionsPreview(additionPreviews); // array of ALL addition previews
        updateDeletionsPreview(deletionPreviews); // array of ALL deletion previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();

        if (previewToggle === true) {
            toggleOutputTextOn();
            toggleSavedTextOff();
        }
    }

    render() {
        const { previewToggle } = this.props;
        const { charToSplit, errorMsg } = this.state;
        return (
            <div className="split-lines-after-word-function">
                <div className="split-lines-after-word-card card white">
                    <div className="split-lines-after-word-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Split Into Two Lines if a Word Contains a Phrase:</p>
                        <p className="card-title center">After Word</p>
                    </div>
                    <div className="row">
                        <div className="split-lines-after-word-module-introduction">
                            <p>If a line contains a phrase of characters, the line will be split into two</p>
                            <p>The line will be split *after* the word that contains a phrase.</p>
                            <p>Multiple phrase instances yields multiple splits.</p>
                        </div>
                        <form action="#" className="radio-button-form col s12">
                            <span>Characters:</span>
                            <div className="split-lines-after-word-user-input-character insert input-field inline">
                                <input
                                    type="text"
                                    id="character-input"
                                    onChange={this.handleCharToSplit}
                                    disabled={previewToggle}
                                    value={charToSplit}
                                />
                                <label htmlFor="character-input"></label>
                            </div>
                            <p className="error-msg">{errorMsg}</p>
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

export default connect(mapStateToProps, actions)(SplitLinesAfterWord);