import React, { Component } from 'react';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';

import './replace-character-module.css';
import * as actions from '../../../actions';
import { escapeRegExp } from './replace-character-module-functions';
import { replaceCharacterValidation } from './replace-character-module-validation';
import { cleanDoubleQuotes } from '../universal-functions-for-modules/universal-functions-for-modules';

class ReplaceCharacterModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replaceCharacter: '',
            insertCharacter: '',
            errorMsg: '',
        };
    }

    handleReplaceCharacter = e => {
        this.setState({
            replaceCharacter: e.target.value,
            errorMsg: ''
        })
    }

    handleInsertCharacter = e => {
        this.setState({
            insertCharacter: e.target.value,
            errorMsg: ''
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id, moduleActiveOff } = this.props;
        handleDeleteModule(id);
        moduleActiveOff();
    }

    createCode = (replaceCharacter, insertCharacter) => {
        return "ReplaceCharacters \"(" + replaceCharacter + ")\" \"(" + insertCharacter + ")\"";
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('submitted character!');
        // Future: be able to delete a certain number of instances?
        const { handleModuleCode,
            togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;
        let { replaceCharacter, insertCharacter } = this.state;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();

        replaceCharacter = cleanDoubleQuotes(replaceCharacter);
        insertCharacter = cleanDoubleQuotes(insertCharacter);

        const moduleCode = this.createCode(replaceCharacter, insertCharacter);
        const validationTest = replaceCharacterValidation(replaceCharacter, insertCharacter);
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
        completeModule(id, replaceCharacter, insertCharacter);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        let { replaceCharacter, insertCharacter } = this.state;

        replaceCharacter = cleanDoubleQuotes(replaceCharacter);
        insertCharacter = cleanDoubleQuotes(insertCharacter);

        // validate the inputs
        const validationTest = replaceCharacterValidation(replaceCharacter, insertCharacter);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        // preview deletion + preview addition

        const stringToGoIntoTheRegex = escapeRegExp(replaceCharacter);
        let regexDelete = new RegExp('(' + stringToGoIntoTheRegex + ')', "g");

        let additionPreviews = [];
        let deletionPreviews = [];

        for (let i = 0; i < outputText.length; i++) {
            let addIdx = 0;
            let createSingleAdditionPreview = []
            let deletionSplitNewLine = outputText[i].text.split('\n');
            let createSingleDeletionPreview = deletionSplitNewLine.map((line, idx) => {
                idx = idx + 1
                if (line === "") {
                    addIdx = addIdx + 1;
                    // addition preview
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
                else if (line.indexOf(replaceCharacter) !== -1) {
                    // addition preview
                    const matchedLineAddition = reactStringReplace(line, regexDelete, (match, i) => (
                        <span style={{ background: "rgb(74, 255, 83)" }} key={i}><b>{insertCharacter}</b></span>
                    ));
                    if (line !== replaceCharacter || insertCharacter !== "") {
                        // If the whole line is not equal to replace character, and the insert character is not nothing, we will show the line in the "additions preview"
                        addIdx = addIdx + 1;
                        createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                            <span className="line-number">[{addIdx}]&#160;</span>
                            <p className="line-text">{matchedLineAddition}</p>
                        </div>)
                    }

                    // deletion preview
                    // responsible for finding the characters that are being deleted
                    const matchedLineDelete = reactStringReplace(line, regexDelete, (match, i) => (
                        <span style={{ background: "red" }} key={i}><b>{match}</b></span>
                    ));
                    // deletion preview
                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">{matchedLineDelete}</p>
                    </div>)
                }
                else {
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
        const { insertCharacter, replaceCharacter } = this.state;
        let { errorMsg } = this.state;
        let errorMsgJSX;
        if (errorMsg !== "") {
            errorMsg = errorMsg.split('\n');
            errorMsgJSX = errorMsg.map((errLine, idx) => {
                return <p key={idx}>{errLine}</p>
            });
        }

        return (
            <div className="replace-character-function">
                <div className="replace-character-card card white">
                    <div className="replace-character-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Replace Characters</span>
                    </div>
                    <div className="row">
                        <div className="replace-character-delete col s12">
                            <span>Replace the characters: </span>
                            <div className="replace-character-user-input replace input-field inline">
                                <input
                                    type="text"
                                    id="replace-delete-input"
                                    onChange={this.handleReplaceCharacter}
                                    value={replaceCharacter}
                                    disabled={previewToggle}
                                />
                                <label htmlFor="replace-delete-input"></label>
                            </div>
                            <br />
                            <span>With the characters: </span>
                            <div className="replace-character-user-input insert input-field inline">
                                <input
                                    type="text"
                                    id="replace-insert-input"
                                    onChange={this.handleInsertCharacter}
                                    disabled={previewToggle}
                                    value={insertCharacter}
                                />
                                <label htmlFor="replace-insert-input"></label>
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

export default connect(mapStateToProps, actions)(ReplaceCharacterModule);