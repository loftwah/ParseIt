import React, { Component } from 'react';
import { connect } from 'react-redux';

import './concatenate-module.css';
import * as actions from '../../../actions';

class ConcatenateModule extends Component {
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
        const { handleModuleCode, togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;

        togglePreviewOff();
        const moduleCode = "Concatenate";
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
            outputText, updateDeletionsPreview, updateAdditionsPreview, toggleOutputTextOn, toggleSavedTextOff } = this.props;

        let additionPreviews = [];
        let deletionPreviews = [];

        let inputContainerText
        for (let i = 0; i < outputText.length; i++) {
            inputContainerText = outputText[i].text;
            let outputTextSplitNewLine = inputContainerText.split('\n');

            let createSingleAdditionPreview = outputTextSplitNewLine.map((line, idx) => {

                if (idx === 0) {
                    // Addition: first index will be plain
                    return (<span className="line" key={idx}>
                        <span className="line-number">[1]&#160;</span>
                        <span className="line-text" style={{ "whiteSpace": "pre-wrap" }}>{line}</span>
                    </span>)

                } else {
                    // Addition: concatenate all lines with a green space, followed by orange text denoting a "merge"
                    return (<span className="line" key={idx}>
                        <span className="line-text" style={{ background: "rgb(74, 255, 83)", "whiteSpace": "pre-wrap" }}> </span>
                        <span className="line-text" style={{ "whiteSpace": "pre-wrap", background: "orange" }}>{line}</span>
                    </span>)
                }
            })

            let createSingleDeletionPreview = outputTextSplitNewLine.map((line, idx) => {

                idx = idx + 1;

                if (idx === 1) {
                    // Deletion: The first index will be plain
                    return (<div className="line" style={{ "wordWrap": "break-word" }} key={idx}>
                        <span className="line-number" style={{ float: "left" }}>[{idx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>)

                } else if (line === "") {
                    // Deletion: If line is empty, just display the concatenate-symbol and orange idx
                    return (<div className="line" key={idx}>
                        <span className="line-number"
                            style={{ background: "rgb(250, 217, 155)" }}>[{idx}]&#160;</span>
                        <span className="concatenate-char" style={{ background: "lightblue" }}><b>⤻</b></span>
                    </div>)
                } else {
                    // Deletion: If line contains text, display concatenate-symbol at the end and orange idx
                    return (<div className="line" style={{ "wordWrap": "break-word" }} key={idx}>
                        <span className="line-number" style={{ background: "rgb(250, 217, 155)", float: "left" }}>[{idx}]&#160;</span>
                        <span className="concatenate-char" style={{ background: "lightblue", float: "left" }}><b>⤻</b></span>
                        <p className="line-text" style={{ background: "orange" }} >{line}</p>
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
        return (
            <div className="concatenate-function">
                <div className="concatenate-card card white">
                    <div className="concatenate-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Concatenate On One Line</span>
                    </div>
                    <div className="row">
                        <div className="concatenate-description col s12">
                            <p>All lines of an input will be concatenated into one line.</p>
                            <p>Each concatenated line will be separated by a space.</p>
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

export default connect(mapStateToProps, actions)(ConcatenateModule);