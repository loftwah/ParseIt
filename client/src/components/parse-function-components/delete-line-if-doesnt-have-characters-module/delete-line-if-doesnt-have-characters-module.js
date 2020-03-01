import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-line-if-doesnt-have-characters-module.css';
import * as actions from '../../../actions';

class DeleteLineIfDoesntHaveCharacters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chars: '',
            errorMsg: '',
        };
    }

    handleCharLineDelete = e => {
        this.setState({
            chars: e.target.value
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id, moduleActiveOff } = this.props;
        handleDeleteModule(id);
        moduleActiveOff();
    }

    validateUserInput = (chars) => {
        if (chars.length === 0) {
            this.setState({
                errorMsg: 'Please fill the "Text to be added before line" input'
            })
            return false;
        }
        return true;
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('submitted character!');
        const { handleModuleCode,
            togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;
        const { chars } = this.state;

        const validate = this.validateUserInput(chars)
        if (validate === false) {
            return;
        } else if (validate === true) {
            this.setState({
                errorMsg: ""
            });
        }

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "DeleteLineIfDoesntHaveCharacters" + " \"(" + chars + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });
        completeModule(id, chars);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview } = this.props;
        const { chars } = this.state;

        const validate = this.validateUserInput(chars);
        if (validate === false) {
            return;
        } else if (validate === true) {
            this.setState({
                errorMsg: ""
            });
        }
        let additionPreviews = [];
        let deletionPreviews = [];
        let found;

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let addIdx = 0;
            let deleteIdx = 0;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {
                let line = containerSplitNewLine[i];

                // Does the line contain the user input of "chars"?
                found = line.indexOf(chars) !== -1 ? true : false;

                switch (found) {
                    case false:
                        // This line DOES NOT contain the user input of "chars"
                        // we will delete this line
                        deleteIdx++;
                        if (line == "") {
                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number"
                                    style={{ background: "rgb(255, 210, 217)", float: "left" }}>[{deleteIdx}]&#160;</span>
                                <p className="line-text" style={{ background: "red" }}>&#160;</p>
                            </div>);
                        } else {
                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number" style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                                <span className="line-text" style={{ background: "red" }}><b>{line}</b></span>
                            </div>);
                        }
                        break;
                    case true:
                        // This line DOES contain the user input of "chars"
                        // We will NOT delete this line
                        addIdx++;
                        deleteIdx++;
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
                        console.log('found is undefined');
                }

            }
            additionPreviews.push(createSingleAdditionPreview);
            deletionPreviews.push(createSingleDeletionPreview);
        }

        updateDeletionsPreview(deletionPreviews); // replace this an array of ALL deletion previews
        updateAdditionsPreview(additionPreviews); // replace this an array of ALL addition previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();
    }

    render() {

        const { previewToggle } = this.props;
        const { chars, errorMsg } = this.state;
        return (
            <div className="delete-line-if-doesnt-have-characters-function">
                <div className="delete-line-if-doesnt-have-characters-card card white">
                    <div className="delete-line-if-doesnt-have-characters-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Delete Line if it Doesn't Contains a Set of Characters</p>
                    </div>
                    <div className="row">
                        <form action="#" className="form-add-text-to-beginning-line-multiple col s12">

                            <div className="row character-line-input">
                                <div className="delete-line-if-doesnt-have-characters col s12 m12 l12">
                                    <span>Characters:</span>
                                    <div className="delete-line-if-doesnt-have-characters-user-input-character insert input-field inline">
                                        <input
                                            type="text"
                                            id="character-input"
                                            onChange={this.handleCharLineDelete}
                                            disabled={previewToggle}
                                            value={chars}
                                        />
                                        <label htmlFor="character-input"></label>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <p className="error-msg">{errorMsg}</p>
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

export default connect(mapStateToProps, actions)(DeleteLineIfDoesntHaveCharacters);