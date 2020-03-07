import React, { Component } from 'react';
import { connect } from 'react-redux';

import './remove-blank-lines-module.css';
import * as actions from '../../../actions';

class RemoveBlankLinesModule extends Component {
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
        console.log('submitted character!');
        // Future: be able to delete a certain number of instances?
        const { handleModuleCode,
            togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "RemoveBlankLinesModule";
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

        let inputContainerText
        for (let i = 0; i < outputText.length; i++) {
            inputContainerText = outputText[i].text;
            let outputTextSplitNewLine = inputContainerText.split('\n');

            let createSingleAdditionPreview = [];
            let addIdx = 0;
            let createSingleDeletionPreview = outputTextSplitNewLine.map((line, idx) => {
                // If a line contains only spaces, we will delete the line
                let lineHasOnlySpaces = true;
                for (let i = 0; i < line.length; i++) {
                    if (line[i] !== " ") {
                        lineHasOnlySpaces = false;
                        break;
                    }
                }

                idx = idx + 1;

                if (line === "" || lineHasOnlySpaces === true) {
                    // If line is empty, we will delete the line

                    // no addition preview
                    //deletion preview
                    return (<div className="line" key={idx}>
                        <span className="line-number"
                            style={{ background: "rgb(255, 210, 217)", float: "left" }}>[{idx}]&#160;</span>
                        <p className="line-text" style={{ background: "red" }}>&#160;</p>
                    </div>);
                }

                else {
                    // If line is not empty, we will show the line
                    addIdx = addIdx + 1;
                    createSingleAdditionPreview.push((<div className="line" key={addIdx}>
                        <span className="line-number">[{addIdx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>));

                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>);
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
        return (
            <div className="remove-blank-lines-function">
                <div className="remove-blank-lines-card card white">
                    <div className="remove-blank-lines-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Remove Blank Lines</span>
                    </div>
                    <div className="row">
                        <div className="remove-blank-lines-description col s12">
                            <p>Remove all blank lines.</p>
                            <p>Lines only containing spaces will be removed as well.</p>
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

export default connect(mapStateToProps, actions)(RemoveBlankLinesModule);