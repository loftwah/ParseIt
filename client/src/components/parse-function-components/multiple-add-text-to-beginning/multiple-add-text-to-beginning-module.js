import React, { Component } from 'react';
import { connect } from 'react-redux';

import './multiple-add-text-to-beginning-module.css';
import * as actions from '../../../actions';
import { multipleAddTextToBeginningValidation } from './multiple-add-text-to-beginning-module-validation';
import { cleanQuotationMarks } from '../universal-functions-for-modules/universal-functions-for-modules';

class MultipleAddTextToBeginning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineNumBegin: '',
            lineMultiple: '',
            charToAdd: '',
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
            charToAdd: e.target.value,
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
        const { lineNumBegin, lineMultiple } = this.state;
        let { charToAdd } = this.state;

        charToAdd = cleanQuotationMarks(charToAdd);
        const validationTest = multipleAddTextToBeginningValidation(lineNumBegin, lineMultiple, charToAdd);
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
        const moduleCode = "MultipleAddTextToBeginning \"(" + lineNumBegin + ")\" \"(" + lineMultiple + ")\" \"(" + charToAdd + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });
        completeModule(id, lineNumBegin, lineMultiple, charToAdd);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        const { lineMultiple } = this.state;
        let { charToAdd, lineNumBegin } = this.state;

        charToAdd = cleanQuotationMarks(charToAdd);
        const validationTest = multipleAddTextToBeginningValidation(lineNumBegin, lineMultiple, charToAdd);
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

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let addIdx = 0;
            let deleteIdx = 0;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {

                addIdx++;
                deleteIdx++;

                let line = containerSplitNewLine[i];
                let isAMultiple = false;

                if (lineNumBegin > i + 1) {
                    isAMultiple = false;
                } else if (lineNumBegin === i + 1) {
                    isAMultiple = true;
                } else if (lineNumBegin < i + 1) {
                    isAMultiple = (i - lineNumBegin + 1) % lineMultiple === 0 ? true : false;
                }

                if (line === "") {
                    // WE HAVE A SIMPLE BLANK LINE
                    switch (isAMultiple) {
                        case true:
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                <span className="line-text" style={{ background: "rgb(74, 255, 83)" }}><b>{charToAdd}</b></span>
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
                            // Return charToAdd + the original line
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number" style={{ background: "yellow" }}>[{addIdx}]&#160;</span>
                                <span className="line-text" style={{ background: "rgb(74, 255, 83)" }}><b>{charToAdd}</b></span>
                                <span className="line-text">{line}</span>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number" style={{ background: "yellow" }}>[{deleteIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);
                            break;
                        case false:
                            // Return the original line
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
                            console.log('isAMultiple is not defined')
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
        const { lineNumBegin, lineMultiple, charToAdd } = this.state;

        let { errorMsg } = this.state;
        let errorMsgJSX;
        if (errorMsg !== "") {
            errorMsg = errorMsg.split('\n');
            errorMsgJSX = errorMsg.map((errLine, idx) => {
                return <p key={idx}>{errLine}</p>
            });
        }

        return (
            <div className="multiple-add-text-to-beginning-function">
                <div className="multiple-add-text-to-beginning-card card white">
                    <div className="multiple-add-text-to-beginning-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Add Text to the Beginning of a Multiple</p>
                    </div>
                    <div className="row">
                        <form action="#" className="form-add-text-to-beginning-line-multiple col s12">
                            <div className="row line-information-input">
                                <div className="multiple-add-text-to-beginning-line-multiple col s12 m6 l6">
                                    <h5>Begin At Line Number</h5>
                                    <span>Begin Line #:</span>
                                    <div className="multiple-add-text-to-beginning-user-input-begin-line-number insert input-field inline">
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

                                <div className="multiple-add-text-to-beginning-line-multiple col s12 m6 l6">
                                    <h5>Line Multiple</h5>
                                    <span>Line Multiple #:</span>
                                    <div className="multiple-add-text-to-beginning-user-input-multiple-number insert input-field inline">
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
                            </div>

                            <div className="row character-line-input">
                                <div className="multiple-add-text-to-beginning-characters col s12 m12 l12">
                                    <h5>Text to Be Added Before Line</h5>
                                    <span>Characters:</span>
                                    <div className="multiple-add-text-to-beginning-user-input-character insert input-field inline">
                                        <input
                                            type="text"
                                            id="character-input"
                                            onChange={this.handleCharToSplit}
                                            disabled={previewToggle}
                                            value={charToAdd}
                                        />
                                        <label htmlFor="character-input"></label>
                                    </div>
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

export default connect(mapStateToProps, actions)(MultipleAddTextToBeginning);