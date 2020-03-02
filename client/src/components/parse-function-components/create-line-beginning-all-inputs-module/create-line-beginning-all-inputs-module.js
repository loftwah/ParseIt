import React, { Component } from 'react';
import { connect } from 'react-redux';

import './create-line-beginning-all-inputs-module.css';
import * as actions from '../../../actions';

class CreateLineBeginningAllInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charsToAdd: '',
            getNameToggle: false,
            errorMsg: '',
        };
    }

    handleCharLineDelete = e => {
        this.setState({
            charsToAdd: e.target.value
        })
    }

    handleGetNameToggle = e => {
        this.setState({
            getNameToggle: !this.state.getNameToggle
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
        const { charsToAdd, getNameToggle } = this.state;

        const finalizedChars = getNameToggle === true ? "$$GetName$$" : charsToAdd;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "CreateLineBeginningAllInputs" + " \"(" + finalizedChars + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });
        completeModule(id, finalizedChars);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview } = this.props;
        const { charsToAdd, getNameToggle } = this.state;

        let additionPreviews = [];
        let deletionPreviews = [];

        // What characters do we add in this additional line?
        // The user input: charsToAdd, or the name of the input, which is noted as "$$GetName$$"?

        const finalizedChars = getNameToggle === true ? "$$GetName$$" : charsToAdd;

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let addIdx = 0;
            let deleteIdx = 0;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            // Add the new line to the containerSplitNewLine array
            if (finalizedChars === "$$GetName$$") {
                containerSplitNewLine.unshift(outputText[inputContainer].name);
            } else {
                containerSplitNewLine.unshift(charsToAdd);
            }

            for (let i = 0; i < containerSplitNewLine.length; i++) {
                addIdx++;
                deleteIdx++;

                let line = containerSplitNewLine[i];

                // We need to show that we are adding lines at index of 0
                switch (i === 0) {
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
                        console.log('index is undefined')
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
        const { charsToAdd, getNameToggle, errorMsg } = this.state;

        // Display -- disabled -- inside char input if getNameToggle is true
        const charInputValue = getNameToggle === true ? "-- disabled --" : charsToAdd;

        return (
            <div className="create-line-beginning-all-inputs-function">
                <div className="create-line-beginning-all-inputs-card card white">
                    <div className="create-line-beginning-all-inputs-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Create a line at the beginning of all inputs</p>
                    </div>
                    <div className="row">
                        <div className="create-line-beginning-all-inputs-module-introduction">
                            <p>Create a line at the beginning of all inputs.</p>
                            <p>You may create a custom line, or you may check the box to use the textbox/PDF name at the top of each input.</p>
                        </div>
                        <form action="#" className="form-add-text-to-beginning-line-multiple col s12">

                            <div className="row character-line-input">
                                <div className="create-line-beginning-all-inputs-characters col s12 m12 l12">
                                    <span>Characters:</span>
                                    <div className="create-line-beginning-all-inputs-user-input-character insert input-field inline">
                                        <input
                                            type="text"
                                            id="character-input"
                                            onChange={this.handleCharLineDelete}
                                            disabled={previewToggle || getNameToggle}
                                            value={charInputValue}
                                        />
                                        <label htmlFor="character-input"></label>
                                    </div>

                                    <p>
                                        <label>
                                            <input type="checkbox" className="filled-in" checked={getNameToggle} onChange={this.handleGetNameToggle} />
                                            <span>The line created will be the name of each input </span>
                                        </label>
                                    </p>
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

export default connect(mapStateToProps, actions)(CreateLineBeginningAllInputs);