import React, { Component } from 'react';
import { connect } from 'react-redux';

import './create-line-beginning-first-input-module.css';
import * as actions from '../../../actions';
import { createLineBeginningFirstInputValidation } from './create-line-beginning-first-input-module-validation';
import { cleanQuotationMarks } from '../universal-functions-for-modules/universal-functions-for-modules';

class CreateLineBeginningFirstInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charsToAdd: '',
            errorMsg: '',
        };
    }

    handleCharLineDelete = e => {
        this.setState({
            charsToAdd: e.target.value,
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
        let { charsToAdd } = this.state;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();

        charsToAdd = cleanQuotationMarks(charsToAdd);
        const validationTest = createLineBeginningFirstInputValidation(charsToAdd);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        const moduleCode = "CreateLineBeginningFirstInput \"(" + charsToAdd + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });
        completeModule(id, charsToAdd);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        let { charsToAdd } = this.state;

        charsToAdd = cleanQuotationMarks(charsToAdd);
        const validationTest = createLineBeginningFirstInputValidation(charsToAdd);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        let additionPreviews = [];
        let deletionPreviews = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let addIdx = 0;
            let deleteIdx = 0;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            // Add the new line to the containerSplitNewLine array, if we are on the first input container
            if (inputContainer === 0) {
                containerSplitNewLine.unshift(charsToAdd);
            }

            for (let i = 0; i < containerSplitNewLine.length; i++) {
                addIdx++;
                deleteIdx++;

                let line = containerSplitNewLine[i];

                // We need to show that we are adding lines at index of 0 for the first input container
                switch (i === 0 && inputContainer === 0) {
                    case true:
                        if (line === "") {
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number" style={{ background: "rgb(202, 255, 205)" }}>[{addIdx}]&#160;</span>
                                <p className="line-text" style={{ background: "rgb(74, 255, 83)" }}>&#x200B;</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);
                        } else {
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number" style={{ background: "rgb(202, 255, 205)" }}>[{addIdx}]&#160;</span>
                                <p className="line-text" style={{ background: "rgb(74, 255, 83)" }}><b>{line}</b></p>
                            </div>);
                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);
                        }
                        break;
                    case false:
                        if (line === "") {
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number">[{addIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);
                        } else {
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number">[{addIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);
                        }
                        break;
                    default:
                        console.log('index is undefined');
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
        const { charsToAdd } = this.state;
        let { errorMsg } = this.state;
        let errorMsgJSX;
        if (errorMsg !== "") {
            errorMsg = errorMsg.split('\n');
            errorMsgJSX = errorMsg.map((errLine, idx) => {
                return <p key={idx}>{errLine}</p>
            });
        }

        return (
            <div className="create-line-beginning-first-input-function">
                <div className="create-line-beginning-first-input-card card white">
                    <div className="create-line-beginning-first-input-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Create a Line at the Beginning of the First Input</p>
                    </div>
                    <div className="row">
                        <form action="#" className="form-add-text-to-beginning-line-multiple col s12">

                            <div className="row character-line-input">
                                <div className="create-line-beginning-first-input-characters col s12 m12 l12">
                                    <span>Characters:</span>
                                    <div className="create-line-beginning-first-input-user-input-character insert input-field inline">
                                        <input
                                            type="text"
                                            id="character-input"
                                            onChange={this.handleCharLineDelete}
                                            disabled={previewToggle}
                                            value={charsToAdd}
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

export default connect(mapStateToProps, actions)(CreateLineBeginningFirstInput);