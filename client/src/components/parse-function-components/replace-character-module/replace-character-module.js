import React, { Component } from 'react';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';

import './replace-character-module.css';
import * as actions from '../../../actions';

class ReplaceCharacterModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replaceCharacter: '',
            insertCharacter: ''
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

    replaceAndInsertChar = (text, replaceChar, insertChar) => {
        function escapeRegExp(stringToGoIntoTheRegex) {
            // escape character: \/ is NOT a useless escape
            return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        const stringToGoIntoTheRegex = escapeRegExp(replaceChar);
        const regex = new RegExp(stringToGoIntoTheRegex, "g");
        // 2nd param is a function to handle the "$$" case for character insert
        return text.replace(regex, () => { return insertChar });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('submitted character!');
        // Future: be able to delete a certain number of instances?
        const { inputText, updateOutputText } = this.props;
        const { replaceCharacter, insertCharacter } = this.state;
        const finalText = this.replaceAndInsertChar(inputText, replaceCharacter, insertCharacter);
        updateOutputText(finalText);
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            inputText, updateDeletionsPreview } = this.props;
        const { replaceCharacter, insertCharacter } = this.state;

        // preview deletion

        const deletionSplitNewLine = inputText.split('\n');
        const createDeletionPreview = deletionSplitNewLine.map((line, idx) => {
            idx = idx + 1
            if (line === "") {
                return (<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">&#160;</p>
                </div>)
            }
            else if (line.indexOf(replaceCharacter) !== -1) {
                // responsible for finding the characters that are being deleted
                const matchedLine = reactStringReplace(line, replaceCharacter, (match, i) => (
                    <span style={{ background: "red" }}><b>{match}</b></span>
                ));
                return (<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">{matchedLine}</p>
                </div>)
            }
            else {
                return (<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">{line}</p>
                </div>)
            }
        })
        updateDeletionsPreview(createDeletionPreview);

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();
    }

    render() {
        const { previewToggle } = this.props;
        return (
            <div className="replace-character-function">
                <h4 className="black-character"><b>REPLACE TEXT</b></h4>
                <div className="replace-character-card card white">
                    <div className="replace-character-card-content card-content black-character">
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
                                />
                                <label htmlFor="replace-delete-input"></label>
                            </div>
                            <span>With the characters: </span>
                            <div className="replace-character-user-input input-field inline">
                                <input
                                    type="text"
                                    id="replace-insert-input"
                                    onChange={this.handleInsertCharacter}
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