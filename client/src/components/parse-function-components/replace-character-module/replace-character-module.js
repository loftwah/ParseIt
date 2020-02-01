import React, { Component } from 'react';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';

import './replace-character-module.css';
import * as actions from '../../../actions';
import { escapeRegExp, replaceAndInsertChar } from './replace-character-module-functions';

class ReplaceCharacterModule extends Component {
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
        const { handleDeleteModule, id } = this.props;
        handleDeleteModule(id);
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('submitted character!');
        // Future: be able to delete a certain number of instances?
        const { outputText, updateOutputText, handleModuleCode, togglePreviewOff, id } = this.props;
        const { replaceCharacter, insertCharacter } = this.state;
        const finalText = replaceAndInsertChar(outputText, replaceCharacter, insertCharacter);
        updateOutputText(finalText);
        togglePreviewOff();
        const moduleCode = "ReplaceCharacterModule" + " \"" + replaceCharacter + "\" \"" + insertCharacter + "\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });
        this.props.completeModule(id, replaceCharacter, insertCharacter);
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview } = this.props;
        const { replaceCharacter, insertCharacter } = this.state;

        // preview deletion + preview addition

        const stringToGoIntoTheRegex = escapeRegExp(replaceCharacter);
        let regexDelete = new RegExp('(' + stringToGoIntoTheRegex + ')', "g");

        let createAdditionPreview = []
        const deletionSplitNewLine = outputText.split('\n');
        const createDeletionPreview = deletionSplitNewLine.map((line, idx) => {
            idx = idx + 1
            if (line === "") {
                // addition preview
                createAdditionPreview.push((<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
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
                createAdditionPreview.push(<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">{matchedLineAddition}</p>
                </div>)

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
                createAdditionPreview.push(<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">{line}</p>
                </div>)
                return (<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">{line}</p>
                </div>)
            }
        })
        updateDeletionsPreview(createDeletionPreview);
        updateAdditionsPreview(createAdditionPreview)

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();
    }

    render() {
        const { previewToggle } = this.props;
        const { insertCharacter, replaceCharacter } = this.state;
        return (
            <div className="replace-character-function">
                <h4 className="black-character"><b>REPLACE TEXT</b></h4>
                <div className="replace-character-card card white">
                    <div className="replace-character-card-content card-content black-character">
                        <button
                            className="waves-effect waves-light btn #42a5f5 red lighten-1 submit-form-button"
                            onClick={this.handleDelete}
                        >Delete</button>
                        <span className="card-title center">Module: Replace Characters</span>
                    </div>
                    <div className="row">
                        <div className="replace-character-delete col s12">
                            <span>Replace the characters: </span>
                            <div className="replace-character-user-input input-field inline">
                                <input
                                    type="text"
                                    id="replace-delete-input"
                                    onChange={this.handleReplaceCharacter}
                                    value={replaceCharacter}
                                    disabled={false}
                                />
                                <label htmlFor="replace-delete-input"></label>
                            </div>
                            <span>With the characters: </span>
                            <div className="replace-character-user-input input-field inline">
                                <input
                                    type="text"
                                    id="replace-insert-input"
                                    onChange={this.handleInsertCharacter}
                                    disabled={false}
                                    value={insertCharacter}
                                />
                                <label htmlFor="replace-insert-input"></label>
                            </div>
                        </div>
                    </div>

                    {/* <div className="card-action instances">
                        <span>Instances: </span>
                        <span>Every Instance</span>
                    </div> */}

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