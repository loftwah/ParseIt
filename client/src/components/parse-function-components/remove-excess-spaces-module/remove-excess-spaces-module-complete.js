import React, { Component } from 'react';
import { connect } from 'react-redux';

import './remove-excess-spaces-module.css';
import * as actions from '../../../actions';

class RemoveExcessSpacesComplete extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { outputText, updateOutputText } = this.props;
        console.log('remove excess spaces complete mounted!')

        let removeExcessSpacesOutput = [];
        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let inputTextArr = outputText[inputContainer].text.split('\n');
            let newInputText = [];

            for (let i = 0; i < inputTextArr.length; i++) {
                let line = inputTextArr[i];

                // array of all line spaces to remove
                let lineSpaceRemove = []
                let lineSpaceBegin = 0
                let lineSpaceEnd = 0;
                let spaceFound = false;

                // The below is an interesting space character, different from a regular space character - found inside a few PDFs
                let strangeSpace = " ";

                // Create a list of the locations of spaces that we want to delete
                for (let idx = 0; idx < line.length; idx++) {
                    if (line[idx] === " " || line[idx] === strangeSpace) {
                        if (spaceFound === true) {
                            lineSpaceEnd = idx;
                        } else if (spaceFound === false) {
                            lineSpaceBegin = idx;
                            spaceFound = true;
                        }
                    } else if ((line[idx] !== " " || line[idx] !== strangeSpace) && spaceFound === true) {
                        lineSpaceEnd = idx
                        spaceFound = false
                        if (lineSpaceBegin === 0) {
                            lineSpaceRemove.push({
                                begin: lineSpaceBegin,
                                end: lineSpaceEnd
                            })
                        }
                        else if (lineSpaceEnd - lineSpaceBegin > 1) {
                            lineSpaceRemove.push({
                                begin: lineSpaceBegin,
                                end: lineSpaceEnd
                            })
                        }
                    }
                }

                // handle case where there are spaces at the end - spaceFound is STILL true
                if (spaceFound === true) {
                    lineSpaceRemove.push({
                        begin: lineSpaceBegin,
                        end: line.length
                    })
                }

                if (line === "") {
                    // The line is empty
                    newInputText.push(line);
                } else if (lineSpaceRemove.length > 0 && lineSpaceRemove[0].begin === 0
                    && lineSpaceRemove[0].end === line.length) {

                    // The line is full of empty spaces
                    newInputText.push("");
                }
                else if (line !== "" && lineSpaceRemove.length !== 0) {
                    // Inside this line, there are spaces we want to remove
                    // We may have spaces in the beginning, the end, or consecutive ones in the middle

                    let lineNoExcessSpaces = '';

                    // begin output display of ONE line
                    let keepChars;

                    for (let j = 0; j < lineSpaceRemove.length; j++) {

                        // Case: If there is a space to remove in the beginning
                        if (lineSpaceRemove[0].begin === 0 && j === 0) {
                            continue;
                        }

                        // Case: If there is no space to remove in the beginning
                        if (lineSpaceRemove[0].begin !== 0 && j === 0) {
                            keepChars = line.slice(0, lineSpaceRemove[0].begin);
                            lineNoExcessSpaces += keepChars;
                            continue;
                        }

                        keepChars = line.slice(lineSpaceRemove[j - 1].end, lineSpaceRemove[j].begin);

                        // Case: this is the first addition to lineNoExcessSpaces - do not start with spaces
                        if (lineNoExcessSpaces === '') {
                            lineNoExcessSpaces += keepChars;
                        } else {
                            // Case: this is not the first addition to lineNoExcessSpaces
                            lineNoExcessSpaces += ' ' + keepChars;
                        }
                    }

                    // Edge Case: There is extra text we need to keep at the end
                    let lastEndSpace = lineSpaceRemove[lineSpaceRemove.length - 1].end
                    if (lastEndSpace !== line.length) {

                        keepChars = line.slice(lastEndSpace, line.length);

                        // Case: this is the first addition to lineNoSpaces
                        if (lineNoExcessSpaces === '') {
                            lineNoExcessSpaces += keepChars;
                        } else {
                            // this is NOT the first addition to lineNoSpaces
                            lineNoExcessSpaces += ' ' + keepChars;
                        }
                    }
                    // The resulting lineNoExcessSpaces is a line that will be displayed in the current input we are working on
                    newInputText.push(lineNoExcessSpaces);

                }
                else if (lineSpaceRemove.length === 0) {
                    // if there are no excess spaces in a line, return the standard addition and deletion preview for the line
                    newInputText.push(line)
                }

            }

            newInputText = newInputText.join('\n');

            let newInputContainer = {
                inputContainer: outputText[inputContainer].inputContainer,
                text: newInputText,
                name: outputText[inputContainer].name
            };

            removeExcessSpacesOutput.push(newInputContainer);
        }

        updateOutputText(removeExcessSpacesOutput);

    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id } = this.props;
        handleDeleteModule(id);
    }

    render() {
        return (
            <div className="remove-excess-spaces-function">
                <div className="remove-excess-spaces-card card white">
                    <div className="remove-excess-spaces-card-content card-content black-character">
                        <button
                            className="waves-effect waves-light btn #42a5f5 red lighten-1 submit-form-button"
                            onClick={this.handleDelete}
                        >Delete</button>
                        <span className="card-title center">Module: Remove Excess Spaces</span>
                    </div>
                    <div className="row">
                        <div className="remove-excess-spaces-description-complete col s12">
                            <p>This module will convert multiple spaces (2 or more consecutive spaces) into one space.</p>
                            <p>All spaces at the beginning of lines will be removed.</p>
                            <p>All spaces at the end of lines will be removed.</p>
                        </div>
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
        additionsPreview: state.textRed.additionsPreview,
        savedText: state.textRed.savedText
    };
};

export default connect(mapStateToProps, actions)(RemoveExcessSpacesComplete);