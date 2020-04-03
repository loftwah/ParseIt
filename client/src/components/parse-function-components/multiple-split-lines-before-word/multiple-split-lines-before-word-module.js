import React, { Component } from 'react';
import { connect } from 'react-redux';

import './multiple-split-lines-before-word-module.css';
import * as actions from '../../../actions';
import { multipleSplitLinesBeforeWordValidation } from './multiple-split-lines-before-word-module-validation';
import { cleanQuotationMarks } from '../universal-functions-for-modules/universal-functions-for-modules';

class MultipleSplitLinesBeforeWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineNumBegin: '',
            lineMultiple: '',
            charToSplit: '',
            direction: 'forward',
            instance: '',
            errorMsg: '',
        };
    }

    handleLineNumberBegin = e => {
        this.setState({
            lineNumBegin: e.target.value,
            errorMsg: ''
        })
    }

    handleLineMultiple = e => {
        this.setState({
            lineMultiple: e.target.value,
            errorMsg: ''
        })
    }

    handleCharToSplit = e => {
        this.setState({
            charToSplit: e.target.value,
            errorMsg: ''
        })
    }

    handleDirection = e => {
        this.setState({
            direction: e.target.value,
            errorMsg: ''
        })
    }

    handleInstance = e => {
        this.setState({
            instance: e.target.value,
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
        // Future: be able to delete a certain number of instances?
        const { handleModuleCode,
            togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;
        const { lineNumBegin, lineMultiple, direction, instance } = this.state;
        let { charToSplit } = this.state;

        charToSplit = cleanQuotationMarks(charToSplit);
        const validationTest = multipleSplitLinesBeforeWordValidation(lineNumBegin, lineMultiple, charToSplit, instance);

        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "MultipleSplitLinesBeforeWord \"(" + lineNumBegin + ")\" \"(" + lineMultiple + ")\" \"(" + charToSplit + ")\" \"(" + direction + ")\" \"(" + instance + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });
        completeModule(id, lineNumBegin, lineMultiple, charToSplit, direction, instance);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        const { lineMultiple, direction, instance } = this.state;
        let { charToSplit, lineNumBegin } = this.state;

        charToSplit = cleanQuotationMarks(charToSplit);
        const validationTest = multipleSplitLinesBeforeWordValidation(lineNumBegin, lineMultiple, charToSplit, instance);

        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        // convert lineNumBegin into a number
        lineNumBegin = Number(lineNumBegin);

        let additionPreviews = [];
        let deletionPreviews = [];
        let beginsWithSpace = charToSplit[0] === ' ' ? true : false;

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let addIdx = 0;
            let deleteIdx = 0;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {

                // number of instances
                let instanceIter = Number(instance);

                addIdx++;
                deleteIdx++;

                // Line segment splits
                let firstSegment;
                let lastSegment;

                // if the charToSplit instance was found
                let found = true;

                let line = containerSplitNewLine[i];
                let isAMultiple = false;

                if (lineNumBegin > i + 1) {
                    isAMultiple = false;
                } else if (lineNumBegin === i + 1) {
                    isAMultiple = true;
                } else if (lineNumBegin < i + 1) {
                    isAMultiple = (i - lineNumBegin + 1) % lineMultiple === 0 ? true : false;
                }

                // index number for split
                let idx = direction === "forward" ? -1 : line.length;

                // Find the location to split the line segment, and use it if isAMultiple is true

                if (direction === "forward" && beginsWithSpace === false) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx++ < line.length) {
                        idx = line.indexOf(charToSplit, idx);
                        if (idx === - 1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }

                    // If found is still true, we will iterate back until we find a space or the beginning of a line
                    while (found === true && line[idx] !== ' ' && idx !== -1) {
                        idx--;
                    }

                } else if (direction === "forward" && beginsWithSpace === true) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx++ < line.length) {
                        idx = line.indexOf(charToSplit, idx);
                        if (idx === - 1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }
                    // If the user enters a space, we will assume that the user doesn't care about word-rules
                    // use the idx from the while loop
                } else if (direction === "backward" && beginsWithSpace === false) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx-- > -1) {
                        idx = line.lastIndexOf(charToSplit, idx);
                        if (idx === -1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }

                    // If found is still true, we will iterate back until we find a space or the beginning of a line
                    while (found === true && line[idx] !== ' ' && idx !== -1) {
                        idx--;
                    }

                } else if (direction === "backward" && beginsWithSpace === true) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx-- > -1) {
                        idx = line.lastIndexOf(charToSplit, idx);
                        if (idx === -1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }
                    // If the user enters a space, we will assume that the user doesn't care about word-rules
                    // use the idx from the while loop
                }

                if (line === "") {
                    // NOTHING SHOULD GO HERE - THIS IS JUST A BLANK LINE
                    switch (isAMultiple) {
                        case true:
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number" style={{ background: "yellow" }} >[{deleteIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);
                            break;

                        case false:
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number">[{addIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);
                            break;

                        default:
                            console.log("isAMultiple is not defined");
                    }

                } else {
                    switch (isAMultiple) {
                        case true:
                            // We are at a line multiple, what do we do with it?
                            if (found === true && beginsWithSpace === false && idx !== -1) {

                                firstSegment = line.slice(0, idx);
                                lastSegment = line.slice(idx + 1);
                                // If firstSegment is just a space or empty, don't bother making another line
                                if (firstSegment !== " " && firstSegment !== "") {
                                    createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                        <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                        <p className="line-text">{firstSegment}</p>
                                    </div>);
                                    addIdx++;
                                }

                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text" style={{ background: "orange" }}>{lastSegment}</p>
                                </div>);

                                createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                    <span className="line-number" style={{ background: "yellow" }} >[{deleteIdx}]&#160;</span>
                                    <span className="line-text">{firstSegment}</span>
                                    <span className="line-text" style={{ background: "red" }}>&#160;</span>
                                    <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                    <span className="line-text" style={{ background: "orange" }}>{lastSegment}</span>
                                </div>);

                            } else if (found === true && idx === -1) {
                                // If we are at the beginning of the line, simply return the line
                                // This goes for "beginsWithSpace" true and false
                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text">{line}</p>
                                </div>);

                                createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                    <span className="line-number" style={{ background: "yellow" }} >[{deleteIdx}]&#160;</span>
                                    <p className="line-text">{line}</p>
                                </div>);

                            } else if (found === true && beginsWithSpace === true && idx !== -1) {
                                // begins with a space
                                firstSegment = line.slice(0, idx);
                                lastSegment = line.slice(idx);

                                // Case: first segment isn't empty
                                if (firstSegment !== "") {
                                    createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                        <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                        <p className="line-text">{firstSegment}</p>
                                    </div>)
                                    addIdx++;

                                    createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                        <span className="line-number" style={{ background: "rgb(250, 217, 155)" }}>[{addIdx}]&#160;</span>
                                        <p className="line-text" style={{ background: "orange" }}>{lastSegment}</p>
                                    </div>);

                                    createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                        <span className="line-number" style={{ background: "yellow" }} >[{deleteIdx}]&#160;</span>
                                        <span className="line-text">{firstSegment}</span>
                                        <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                        <span className="line-text" style={{ background: "orange" }}>{lastSegment}</span>
                                    </div>);

                                } else if (firstSegment === "") {
                                    // If firstSegment is empty, don't bother making another line
                                    createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                        <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                        <p className="line-text">{lastSegment}</p>
                                    </div>);

                                    createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                        <span className="line-number" style={{ background: "yellow" }} >[{deleteIdx}]&#160;</span>
                                        <span className="line-text">{firstSegment}</span>
                                        <span className="line-text">{lastSegment}</span>
                                    </div>);
                                }

                            } else if (found === false) {
                                createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                    <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                    <p className="line-text">{line}</p>
                                </div>);

                                createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                    <span className="line-number" style={{ background: "yellow" }} >[{deleteIdx}]&#160;</span>
                                    <p className="line-text">{line}</p>
                                </div>);
                            }
                            break;

                        case false:
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number">[{addIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);

                            break;
                        default:
                            console.log("isAMultiple is not defined");
                    }

                }

            }
            additionPreviews.push(createSingleAdditionPreview);
            deletionPreviews.push(createSingleDeletionPreview);
        }

        updateDeletionsPreview(deletionPreviews); // replace this an array of ALL deletion previews
        updateAdditionsPreview(additionPreviews); // replace this an array of ALL addition previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();

        if (previewToggle === true) {
            toggleOutputTextOn();
            toggleSavedTextOff();
        }
    }

    render() {

        const { previewToggle } = this.props;
        const { lineNumBegin, lineMultiple, charToSplit, instance } = this.state;
        let { errorMsg } = this.state;
        let errorMsgJSX;
        if (errorMsg !== "") {
            errorMsg = errorMsg.split('\n');
            errorMsgJSX = errorMsg.map((errLine, idx) => {
                return <p key={idx}>{errLine}</p>
            });
        }

        return (
            <div className="multiple-split-lines-before-word-function">
                <div className="multiple-split-lines-before-word-card card white">
                    <div className="multiple-split-lines-before-word-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Split a Multiple Into Two Lines If a Word Contains a Phrase:</p>
                        <p className="card-title center">Before Word</p>
                    </div>
                    <div className="row">
                        <div className="multiple-split-lines-before-word-module-introduction">
                            <p>If a line contains a phrase at an instance, the line will be split into two</p>
                            <p>The line will be split *before* the word that contains a phrase.</p>
                            <p>You may use spaces.</p>
                        </div>
                        <form action="#" className="radio-button-form col s12">
                            <div className="begin-at-line-number row">
                                <div className="multiple-split-lines-before-word-line-multiple col s12 m6 l3">
                                    <h5>Begin At Line Number</h5>
                                    <span>Begin Line #:</span>
                                    <div className="multiple-split-lines-before-word-user-input-begin-line-number insert input-field inline">
                                        <input
                                            className="center"
                                            type="number"
                                            id="begin-line-number-input"
                                            onChange={this.handleLineNumberBegin}
                                            disabled={previewToggle}
                                            value={lineNumBegin}
                                        />
                                        <label htmlFor="multiple-input"></label>
                                    </div>
                                </div>

                            </div>

                            <div className="rest-of-inputs row"></div>
                            <div className="multiple-split-lines-before-word-line-multiple col s12 m6 l3">
                                <h5>Line Multiple</h5>
                                <span>Line Multiple #:</span>
                                <div className="multiple-split-lines-before-word-user-input-multiple-number insert input-field inline">
                                    <input
                                        className="center"
                                        type="number"
                                        id="multiple-input"
                                        onChange={this.handleLineMultiple}
                                        disabled={previewToggle}
                                        value={lineMultiple}
                                    />
                                    <label htmlFor="multiple-input"></label>
                                </div>
                            </div>

                            <div className="multiple-split-lines-before-word-characters col s12 m6 l4">
                                <h5>Split Before Characters</h5>
                                <span>Characters:</span>
                                <div className="multiple-split-lines-before-word-user-input-character insert input-field inline">
                                    <input
                                        type="text"
                                        id="character-input"
                                        onChange={this.handleCharToSplit}
                                        disabled={previewToggle}
                                        value={charToSplit}
                                    />
                                    <label htmlFor="character-input"></label>
                                </div>
                            </div>

                            <div className="input-container-toggle col s12 m6 l2">
                                <h5>Direction</h5>
                                <div className="radio-button-container">
                                    <p>
                                        <label>
                                            <input name="direction-group" type="radio" defaultChecked={true} onChange={this.handleDirection}
                                                value="forward"
                                                disabled={previewToggle}
                                            />
                                            <span>Forward</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="direction-group" type="radio" onChange={this.handleDirection}
                                                value="backward"
                                                disabled={previewToggle}
                                            />
                                            <span>Backward</span>
                                        </label>
                                    </p>
                                </div>
                            </div>

                            <div className="multiple-split-lines-before-word-instance col s12 m6 l3">
                                <h5>Instance</h5>
                                <span>Instance #:</span>
                                <div className="multiple-split-lines-before-word-user-input-instance insert input-field inline">
                                    <input
                                        className="center"
                                        type="number"
                                        id="instance-input"
                                        onChange={this.handleInstance}
                                        disabled={previewToggle}
                                        value={instance}
                                    />
                                    <label htmlFor="instance-input"></label>
                                </div>
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

export default connect(mapStateToProps, actions)(MultipleSplitLinesBeforeWord);