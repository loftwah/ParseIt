import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-beginning-module.css';
import * as actions from '../../../actions';
import { deleteBeginningValidation } from './delete-beginning-module-validation';
import { cleanQuotationMarks } from '../universal-functions-for-modules/universal-functions-for-modules';

class DeleteBeginningModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stoppingCharacters: '',
            errorMsg: '',
        };
    }

    charactersToStopAt = e => {
        this.setState({
            stoppingCharacters: e.target.value,
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
        let { stoppingCharacters } = this.state;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        stoppingCharacters = cleanQuotationMarks(stoppingCharacters);
        const moduleCode = "DeleteBeginningUntilPhrase \"(" + stoppingCharacters + ")\"";

        const validationTest = deleteBeginningValidation(stoppingCharacters);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        handleModuleCode({
            code: moduleCode,
            id: id
        });

        completeModule(id, stoppingCharacters);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        let { stoppingCharacters } = this.state;

        stoppingCharacters = cleanQuotationMarks(stoppingCharacters);

        // Validate the inputs
        const validationTest = deleteBeginningValidation(stoppingCharacters);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        let additionPreviews = [];
        let deletionPreviews = [];

        // find the index of the first instance of "stoppingCharacters"

        let inputContainerText
        for (let i = 0; i < outputText.length; i++) {
            inputContainerText = outputText[i].text;
            let outputTextSplitNewLine = inputContainerText.split('\n');
            let found = false;

            // will a deletion ever be found?
            let willBeFound;
            if (inputContainerText.indexOf(stoppingCharacters) === -1) {
                willBeFound = false; // We will never find stopping characters
                // In this situation: we want to output a preview that is unchanged
            } else {
                willBeFound = true; // We will find stopping characters
            }

            let createSingleAdditionPreview = [];
            let addIdx = 0;
            let createSingleDeletionPreview = outputTextSplitNewLine.map((line, idx) => {

                let stoppingCharIdx = line.indexOf(stoppingCharacters);
                idx = idx + 1;

                if (line === "" && found === false && willBeFound === true) {
                    // If line is empty and characters aren't found

                    // no addition preview
                    //deletion preview
                    return (<div className="line" key={idx}>
                        <span className="line-number"
                            style={{ background: "rgb(255, 210, 217)", float: "left" }}>[{idx}]&#160;</span>
                        <p className="line-text" style={{ background: "red" }}>&#160;</p>
                    </div>)
                }
                else if (line === "" && (found === true || willBeFound === false)) {
                    // If line is empty and characters ARE found
                    // addition preview
                    addIdx = addIdx + 1;
                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">&#160;</p>
                    </div>))
                    //deletion preview
                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">&#160;</p>
                    </div>)
                }
                else if (found === false && stoppingCharIdx === -1 && willBeFound === true) {
                    // If found is false, and line does not contain the stopping characters:
                    // The whole line will be deleted
                    return (<div className="line" key={idx}>
                        <span className="line-number" style={{ background: "rgb(255, 210, 217)" }}>[{idx}]&#160;</span>
                        <span className="line-text" style={{ background: "red" }}><b>{line}</b></span>
                    </div>)

                } else if (found === false && stoppingCharIdx !== -1 && willBeFound === true) {
                    // We have found the first instance of the stopping character
                    // we will not delete anymore
                    found = true;
                    addIdx = addIdx + 1;

                    let sliceDelete = line.slice(0, stoppingCharIdx);
                    let sliceKeep = line.slice(stoppingCharIdx);

                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">{sliceKeep}</p>
                    </div>))

                    return (<div className="line" key={idx}>
                        <span className="line-number" style={{ background: "rgb(255, 210, 217)", float: "left" }}>[{idx}]&#160;</span>
                        <span className="line-text-remove"
                            style={{ background: "red" }}><b>{sliceDelete}</b></span>
                        <span className="line-text-keep">{sliceKeep}</span>
                    </div>)

                } else if (found === true || willBeFound === false) {
                    // show the remaining text inside deletions and additions previews

                    addIdx = addIdx + 1;

                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>))

                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>)
                }
            })

            additionPreviews.push(createSingleAdditionPreview);
            deletionPreviews.push(createSingleDeletionPreview);
        }
        updateDeletionsPreview(deletionPreviews); //  An array of ALL deletion previews
        updateAdditionsPreview(additionPreviews); // An array of ALL addition previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();

        if (previewToggle === true) {
            toggleOutputTextOn();
            toggleSavedTextOff();
        }

    }

    render() {
        const { previewToggle } = this.props;
        const { stoppingCharacters } = this.state;
        let { errorMsg } = this.state;
        let errorMsgJSX;
        if (errorMsg !== "") {
            errorMsg = errorMsg.split('\n');
            errorMsgJSX = errorMsg.map((errLine, idx) => {
                return <p key={idx}>{errLine}</p>
            });
        }

        return (
            <div className="delete-beginning-function">
                <div className="delete-beginning-card card white">
                    <div className="delete-beginning-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Delete Beginning Until a Phrase</span>
                    </div>
                    <div className="row">
                        <div className="delete-beginning-delete col s12">
                            <span>Delete beginning until the characters: </span>
                            <div className="delete-beginning-user-input replace input-field inline">
                                <input
                                    type="text"
                                    id="replace-delete-input"
                                    onChange={this.charactersToStopAt}
                                    value={stoppingCharacters}
                                    disabled={previewToggle}
                                />
                                <label htmlFor="replace-delete-input"></label>
                            </div>
                            {errorMsg === "" ? (
                                <div className="no-error-msg">
                                </div>
                            ) : (
                                    <div className="error-msg">
                                        {errorMsgJSX}
                                    </div>
                                )}
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

export default connect(mapStateToProps, actions)(DeleteBeginningModule);