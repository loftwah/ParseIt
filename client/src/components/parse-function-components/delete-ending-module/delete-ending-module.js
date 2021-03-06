import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-ending-module.css';
import * as actions from '../../../actions';
import { deleteEndingValidation } from './delete-ending-module-validation';
import { cleanQuotationMarks } from '../universal-functions-for-modules/universal-functions-for-modules';

class DeleteEndingModule extends Component {
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
        const validationTest = deleteEndingValidation(stoppingCharacters);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        const moduleCode = "DeleteLastPhraseUntilEnd \"(" + stoppingCharacters + ")\"";
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
        const validationTest = deleteEndingValidation(stoppingCharacters);
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
            let outputTextSplitNewLineRev = inputContainerText.split('\n').reverse();
            let found = false;
            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            // variables to help find the index to begin this particular input container's addition indicies
            let addLines = 0;
            let deleteIdx = outputTextSplitNewLineRev.length;

            // will a deletion ever be found?
            let willBeFound;
            if (inputContainerText.indexOf(stoppingCharacters) === -1) {
                willBeFound = false; // We will never find stopping characters
                // In this situation: we want to output a preview that is unchanged
            } else {
                willBeFound = true; // We will find stopping characters

                // find the index to begin this particular input container's addition indicies
                for (let i = 0; i < outputTextSplitNewLineRev.length; i++) {
                    let line = outputTextSplitNewLineRev[i];
                    let stoppingCharIdx = line.lastIndexOf(stoppingCharacters);
                    if (stoppingCharIdx === 0) {
                        // if the stopping character is found right at the beginning,
                        // that means the whole line will be deleted - we add a value to addLines as we plan to subtract the difference at the end
                        addLines++;
                        break;
                    } else if (stoppingCharIdx !== -1) {
                        break;
                    } else {
                        addLines++;
                    }
                }
            }

            let addIdx = outputTextSplitNewLineRev.length - addLines

            for (let i = 0; i < outputTextSplitNewLineRev.length; i++) {

                let line = outputTextSplitNewLineRev[i];
                let stoppingCharIdx = line.lastIndexOf(stoppingCharacters);

                if (line === "" && found === false && willBeFound === true) {
                    // If line is empty and characters aren't found
                    // no addition preview
                    //deletion preview
                    createSingleDeletionPreview.push((<div className="line" key={deleteIdx}>
                        <span className="line-number"
                            style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                        <p className="line-text" style={{ background: "red" }}>&#160;</p>
                    </div>))
                    deleteIdx--;

                }
                else if (line === "" && (found === true || willBeFound === false)) { // If line is empty and characters ARE found
                    // addition preview
                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">&#160;</p>
                    </div>))
                    addIdx--;
                    //deletion preview
                    createSingleDeletionPreview.push((<div className="line" key={deleteIdx}>
                        <span className="line-number">[{deleteIdx}]&#160;</span>
                        <p className="line-text">&#160;</p>
                    </div>))
                    deleteIdx--;
                }
                else if (found === false && stoppingCharIdx === -1 && willBeFound === true) {
                    // If found is false, and line does not contain the stopping characters:
                    // The whole line will be deleted
                    createSingleDeletionPreview.push((<div className="line" key={deleteIdx}>
                        <span className="line-number" style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                        <span className="line-text" style={{ background: "red" }}><b>{line}</b></span>
                    </div>))
                    deleteIdx--;

                } else if (found === false && stoppingCharIdx !== -1 && willBeFound === true) {
                    // We have found the first instance of the stopping character
                    // we will not delete anymore
                    found = true;

                    let sliceKeep = line.slice(0, stoppingCharIdx);
                    let sliceDelete = line.slice(stoppingCharIdx);

                    // If the set of characters that we want to delete begins a line, delete that line
                    if (stoppingCharIdx === 0) {
                        createSingleDeletionPreview.push((
                            <div className="line" key={deleteIdx}>
                                <span className="line-number" style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                                <span className="line-text-keep"
                                    style={{ background: "#f1f1f1" }}>{sliceKeep}</span>
                                <span className="line-text-remove"
                                    style={{ background: "red" }}><b>{sliceDelete}</b></span>

                            </div>))
                        deleteIdx--;
                    } else {
                        createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                            <span className="line-number">[{addIdx}]&#160;</span>
                            <p className="line-text">{sliceKeep}</p>
                        </div>))
                        addIdx--;

                        createSingleDeletionPreview.push((
                            <div className="line" key={deleteIdx}>
                                <span className="line-number" style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                                <span className="line-text-keep"
                                    style={{ background: "#f1f1f1" }}>{sliceKeep}</span>
                                <span className="line-text-remove"
                                    style={{ background: "red" }}><b>{sliceDelete}</b></span>

                            </div>))
                        deleteIdx--;
                    }

                } else if (found === true || willBeFound === false) {
                    // show the remaining text inside deletions and additions previews

                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>))
                    addIdx--;

                    createSingleDeletionPreview.push((<div className="line" key={deleteIdx}>
                        <span className="line-number">[{deleteIdx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>))
                    deleteIdx--;
                }

            }

            additionPreviews.push(createSingleAdditionPreview.reverse());
            deletionPreviews.push(createSingleDeletionPreview.reverse());
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
            <div className="delete-ending-function">
                <div className="delete-ending-card card white">
                    <div className="delete-ending-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Delete From Last Instance of a Phrase Until End</span>
                    </div>
                    <div className="row">
                        <div className="delete-ending-delete col s12">
                            <span>Delete text from the last instance of the characters: </span>
                            <div className="delete-ending-user-input replace input-field inline">
                                <input
                                    type="text"
                                    id="replace-delete-input"
                                    onChange={this.charactersToStopAt}
                                    value={stoppingCharacters}
                                    disabled={previewToggle}
                                />
                                <label htmlFor="replace-delete-input"></label>
                            </div>
                            <span>until the end</span>

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

export default connect(mapStateToProps, actions)(DeleteEndingModule);