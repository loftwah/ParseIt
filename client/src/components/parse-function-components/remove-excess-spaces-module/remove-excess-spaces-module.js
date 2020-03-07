import React, { Component } from 'react';
import { connect } from 'react-redux';

import './remove-excess-spaces-module.css';
import * as actions from '../../../actions';

class RemoveExcessSpacesModule extends Component {
    constructor(props) {
        super(props);
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id, moduleActiveOff } = this.props;
        handleDeleteModule(id);
        moduleActiveOff();
    }

    handleSubmit = e => {
        e.preventDefault();
        const { handleModuleCode,
            togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "RemoveExcessSpacesModule";
        handleModuleCode({
            code: moduleCode,
            id: id
        });

        completeModule(id);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;

        let additionPreviews = [];
        let deletionPreviews = [];

        for (let i = 0; i < outputText.length; i++) {
            let addIdx = 0;

            let createSingleAdditionPreview = [];
            let deletionSplitNewLine = outputText[i].text.split('\n');

            let createSingleDeletionPreview = deletionSplitNewLine.map((line, idx) => {

                // array of all line spaces to remove
                let lineSpaceRemove = [];
                let lineSpaceBegin = 0
                let lineSpaceEnd = 0;
                let spaceFound = false;

                // Some whitespace characters to go through and replace
                // Below makes app too slow
                // const strangeSpaceArr = [" ", "	", "\t", "​", " ", " ", " ", " ", " ", " ",
                //     " ", " ", " ", "⠀"];

                const strangeSpaceArr = [" "];

                // Create a list of the locations of spaces that we want to delete
                for (let i = 0; i < line.length; i++) {
                    // first delete all weird whitespace, and replace it with regular spaces
                    for (let k = 0; k < strangeSpaceArr.length; k++) {
                        line = line.replace(strangeSpaceArr[k], ' ');
                    }

                    if (line[i] === " ") {
                        if (spaceFound === true) {
                            lineSpaceEnd = i
                        } else if (spaceFound === false) {
                            lineSpaceBegin = i
                            spaceFound = true
                        }
                    } else if ((line[i] !== " ") && spaceFound === true) {
                        lineSpaceEnd = i
                        spaceFound = false
                        if (lineSpaceBegin === 0) {
                            lineSpaceRemove.push({
                                begin: lineSpaceBegin,
                                end: lineSpaceEnd
                            })
                        }
                        else if (lineSpaceEnd - lineSpaceBegin > 1) {
                            lineSpaceRemove.push({
                                begin: lineSpaceBegin,
                                end: lineSpaceEnd
                            })
                        }
                    }
                }

                // handle case where there are spaces at the end - spaceFound is STILL true
                if (spaceFound === true) {
                    lineSpaceRemove.push({
                        begin: lineSpaceBegin,
                        end: line.length
                    })
                }

                idx = idx + 1;
                if (line === "") {
                    // the full line is nothing
                    addIdx = addIdx + 1;
                    // addition preview
                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">&#x200B;</p>
                    </div>))
                    //deletion preview
                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">&#160;</p>
                    </div>)
                } else if (lineSpaceRemove.length > 0 && lineSpaceRemove[0].begin === 0
                    && lineSpaceRemove[0].end === line.length) {

                    // The line is full of empty spaces
                    addIdx = addIdx + 1;
                    // addition preview
                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">&#160;</p>
                    </div>))
                    //deletion preview
                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <span className="line-text" style={{ background: "red", "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{line}</span>
                    </div>)
                }
                else if (line !== "" && lineSpaceRemove.length !== 0) {
                    addIdx = addIdx + 1;
                    // Inside this line, there are spaces we want to remove
                    // We may have spaces in the beginning, the end, or consecutive ones in the middle

                    let lineJSXAddition = [];
                    let lineJSXDeletion = [];

                    // Begin by creating the first piece of the line: the line number
                    lineJSXAddition.push(<span className="line" key="line-num">
                        <span className="line-number">[{addIdx}]&#160;</span>
                    </span>)
                    lineJSXDeletion.push(<span className="line" key="line-num">
                        <span className="line-number">[{idx}]&#160;</span>
                    </span>)

                    // begin preview display text of this current line
                    let keepChars;
                    let removeCharSpace;

                    for (let i = 0; i < lineSpaceRemove.length; i++) {

                        // Case: If there is a space to remove in the beginning
                        if (lineSpaceRemove[0].begin === 0 && i === 0) {
                            removeCharSpace = line.slice(0, lineSpaceRemove[0].end);
                            lineJSXDeletion.push(<span className="line" key="beginning-space">
                                <span className="line-text" style={{ background: "red", "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{removeCharSpace}</span>
                            </span>)
                            continue;
                        }
                        // Case: If there is no space to remove in the beginning
                        if (lineSpaceRemove[0].begin !== 0 && i === 0) {
                            keepChars = line.slice(0, lineSpaceRemove[0].begin)
                            lineJSXAddition.push(<span className="line" key="beginning-no-space">
                                <span className="line-text" style={{ "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{keepChars}</span>
                            </span>)
                            lineJSXDeletion.push(<span className="line" key="beginning-no-space">
                                <span className="line-text" style={{ "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{keepChars}</span>
                            </span>)

                            let deleteChars = line.slice(lineSpaceRemove[0].begin, lineSpaceRemove[0].end)

                            // Edge case: Do not add a space if we hit the end of the line
                            if (lineSpaceRemove[0].end !== line.length) {
                                lineJSXAddition.push(<span className="line" key="beginning-no-space-first-space">
                                    <span className="line-text" style={{ background: "rgb(74, 255, 83)", "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>&#160;</span>
                                </span>)
                            }

                            lineJSXDeletion.push(<span className="line" key="beginning-no-space-first-space">
                                <span className="line-text" style={{ background: "red", "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{deleteChars}</span>
                            </span>)
                            continue;
                        }

                        keepChars = line.slice(lineSpaceRemove[i - 1].end, lineSpaceRemove[i].begin);

                        lineJSXAddition.push(<span className="line" key={`keep-${i}`}>
                            <span className="line-text" style={{ "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{keepChars}</span>
                        </span>)
                        lineJSXDeletion.push(<span className="line" key={`keep-${i}`}>
                            <span className="line-text" style={{ "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{keepChars}</span>
                        </span>)

                        removeCharSpace = line.slice(lineSpaceRemove[i].begin, lineSpaceRemove[i].end);

                        // Edge case: Do not add a space if we hit the end of the line
                        if (lineSpaceRemove[i].end !== line.length) {
                            lineJSXAddition.push(<span className="line" key={`delete-${i}`}>
                                <span className="line-text" style={{ background: "rgb(74, 255, 83)", "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>&#160;</span>
                            </span>)
                        }

                        // create &#160; as many times as removeCharSpace number so that text can wrap itself in the addition/deletion preview text container
                        let removeChars = [];
                        for (let i = 0; i < removeCharSpace.length; i++) {
                            removeChars.push(<span className="space" key={i}>
                                &#160;
                            </span>)
                        }

                        lineJSXDeletion.push(<span className="line" key={`delete-${i}`} style={{ "wordWrap": "break-word" }}>
                            <span className="line-text" style={{ background: "red", "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{[...removeChars]}</span>
                        </span>
                        )
                    }

                    // Edge Case: There is extra text we need to keep at the end
                    let lastEndSpace = lineSpaceRemove[lineSpaceRemove.length - 1].end;
                    if (lastEndSpace !== line.length) {
                        keepChars = line.slice(lastEndSpace, line.length);

                        lineJSXAddition.push(<span className="line" key={`keep-${i}-end`}>
                            <span className="line-text" style={{ "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{keepChars}</span>
                        </span>)
                        lineJSXDeletion.push(<span className="line" key={`keep-${i}-end`}>
                            <span className="line-text" style={{ "whiteSpace": "pre-wrap", "wordWrap": "break-word" }}>{keepChars}</span>
                        </span>)
                    }

                    createSingleAdditionPreview.push(
                        <div className="line" key={addIdx}>
                            {[...lineJSXAddition]}
                        </div>
                    )

                    // deletion preview
                    return (<div className="line" key={idx}>
                        <p className="line-text">{[...lineJSXDeletion]}</p>
                    </div>)

                }
                else if (lineSpaceRemove.length === 0) {
                    // if there are no excess spaces in a line, return the standard addition and deletion preview for the line
                    addIdx = addIdx + 1;
                    createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>)
                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>)
                }
            })
            additionPreviews.push(createSingleAdditionPreview);
            deletionPreviews.push(createSingleDeletionPreview);
        }
        updateDeletionsPreview(deletionPreviews); // an array of ALL deletion previews
        updateAdditionsPreview(additionPreviews); // an array of ALL addition previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();

        if (previewToggle === true) {
            toggleOutputTextOn();
            toggleSavedTextOff();
        }
    }

    render() {
        const { previewToggle } = this.props;
        return (
            <div className="remove-excess-spaces-function">
                <div className="remove-excess-spaces-card card white">
                    <div className="remove-excess-spaces-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Remove Excess Spaces</span>
                    </div>
                    <div className="row">
                        <div className="remove-excess-spaces-description col s12">
                            <p>Convert multiple spaces (2 or more consecutive spaces) into one space.</p>
                            <p>All spaces at the beginning of lines will be removed.</p>
                            <p>All spaces at the end of lines will be removed.</p>
                        </div>
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

export default connect(mapStateToProps, actions)(RemoveExcessSpacesModule);