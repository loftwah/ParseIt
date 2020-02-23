// Below is a template of what a "multiple" split-lines-before-break would look like
// MUST ADD IN THE LINE MULTIPLE PARAMETER FOR THE USER AS WELL


import React, { Component } from 'react';
import { connect } from 'react-redux';

import './multiple-split-lines-before-break-module.css';
import * as actions from '../../../actions';

class MultipleSplitLinesBeforeBreak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replaceCharacter: '',
            insertCharacter: '',
        };
    }

    handleReplaceCharacter = e => {
        this.setState({
            replaceCharacter: e.target.value
        })
    }

    handleInsertCharacter = e => {
        this.setState({
            insertCharacter: e.target.value
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
        const { replaceCharacter, insertCharacter } = this.state;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "MultipleSplitLinesBeforeBreak" + " \"(" + replaceCharacter + ")\" \"(" + insertCharacter + ")\"";
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
            outputText, updateDeletionsPreview, updateAdditionsPreview } = this.props;
        const { replaceCharacter, insertCharacter } = this.state;

        updateDeletionsPreview('test'); // replace this an array of ALL deletion previews
        updateAdditionsPreview('test'); // replace this an array of ALL addition previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();
    }

    render() {
        const { previewToggle } = this.props;
        const { insertCharacter, replaceCharacter } = this.state;
        return (
            <div className="multiple-split-lines-before-break-function">
                <div className="multiple-split-lines-before-break-card card white">
                    <div className="multiple-split-lines-before-break-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center"> *****MULTIPLE****** Module: Split Into Two Lines if a Word Contains a Phrase: Before Line Break</span>
                    </div>
                    <div className="row">
                        <div className="multiple-split-lines-before-break-module-introduction">
                            <p>If a line contains a phrase, the line will be split into two</p>
                            <p>The line will be split *before* the word that contains a phrase.</p>
                        </div>
                        <form action="#" className="radio-button-form col s12">

                            <div className="multiple-split-lines-before-break characters col s12 m12 l4">
                                <h5>Split Before Characters</h5>
                                <span>Characters:</span>
                                <div className="multiple-split-lines-before-break-user-input-character insert input-field inline">
                                    <input
                                        className = "center"
                                        type="text"
                                        id="character-input"
                                        onChange={this.handleInsertCharacter}
                                        disabled={previewToggle}
                                        value={insertCharacter}
                                    />
                                    <label htmlFor="character-input"></label>
                                </div>
                            </div>

                            
                            <div className="input-container-toggle col s12 m12 l2 offset-l1">
                                <h5>Direction</h5>
                                <div className="radio-button-container">
                                    <p>
                                        <label>
                                            <input name="direction-group" type="radio" defaultChecked={true} // on change
                                                value="forward"
                                            />
                                            <span>Forward</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="direction-group" type="radio" // on change
                                                value="backward"
                                            />
                                            <span>Backward</span>
                                        </label>
                                    </p>
                                </div>
                            </div>

                            <div className="multiple-split-lines-before-break instance col s12 m12 l4 offset-l1">
                                <h5>Instance</h5>
                                <span>Instance #:</span>
                                <div className="multiple-split-lines-before-break-user-input-instance insert input-field inline">
                                    <input
                                        className = "center"
                                        type="number"
                                        id="instance-input"
                                        onChange={this.handleInsertCharacter}
                                        disabled={previewToggle}
                                        value={insertCharacter}
                                    />
                                    <label htmlFor="instance-input"></label>
                                </div>
                            </div>

                        </form>



                        {/* <div className="multiple-split-lines-before-break-delete col s12">
                            <span>Replace the characters: </span>
                            <div className="multiple-split-lines-before-break-user-input replace input-field inline">
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
                            <div className="multiple-split-lines-before-break-user-input insert input-field inline">
                                <input
                                    type="text"
                                    id="replace-insert-input"
                                    onChange={this.handleInsertCharacter}
                                    disabled={previewToggle}
                                    value={insertCharacter}
                                />
                                <label htmlFor="replace-insert-input"></label>
                            </div>
                        </div> */}
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

export default connect(mapStateToProps, actions)(MultipleSplitLinesBeforeBreak);