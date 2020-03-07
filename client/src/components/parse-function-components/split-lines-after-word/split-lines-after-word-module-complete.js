import React, { Component } from 'react';
import { connect } from 'react-redux';

import './split-lines-after-word-module.css';
import * as actions from '../../../actions';

class SplitLinesAfterWordComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charToSplit: ''
        }
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, charToSplit, updateOutputText } = this.props;
        this.setState({
            charToSplit: charToSplit,
        })
        console.log('split-lines-after-word-module component mounted');

        const finalText = [];
        const charBeginsWithSpace = charToSplit[0] === " " ? true : false;
        const charEndsWithSpace = charToSplit[charToSplit] === " " ? true : false;
        const charHasSpaceOnEnd = (charBeginsWithSpace || charEndsWithSpace) === true ? true : false;

        for (let inputContainerNum = 0; inputContainerNum < outputText.length; inputContainerNum++) {

            let containerSplitNewLine = outputText[inputContainerNum].text.split('\n');
            let newText = [];

            for (let i = 0; i < containerSplitNewLine.length; i++) {

                let line = containerSplitNewLine[i];
                let charLocationIdx = line.lastIndexOf(charToSplit);
                let found = (charLocationIdx !== -1 && charToSplit !== "") ? true : false;

                if (line === "" && found === false) {
                    newText.push("");

                } else if (line !== "" && found === false) {
                    newText.push(line);

                } else if (line !== "" && found === true) {
                    // the phrase is found inside this line
                    // there can be multiple instances of this phrase

                    // we will while-loop through the line, chopping it off into segments, until there is no more instances of charToSplit
                    let lineSegment = line;

                    let findSpacePointer;

                    while (lineSegment.lastIndexOf(charToSplit) !== -1) {
                        // where editing begins

                        findSpacePointer = lineSegment.indexOf(charToSplit) + charToSplit.length;

                        while (charEndsWithSpace === false
                            && lineSegment[findSpacePointer] !== " "
                            && findSpacePointer !== lineSegment.length) {
                            findSpacePointer++;
                        }

                        // If the user inputs a space to begin the input, we will not care about the locations of spaces

                        // check to see if findSpacePointer is at the end of the line, if it is LEAVE THE LOOP
                        if (findSpacePointer === lineSegment.length) {
                            // If we made it to the end of the line with nothing inside the deletion JSX array, simply return the whole line untouched
                            newText.push(lineSegment);
                            break;
                        } else {
                            // we are not at the end of the line, we will split the entire line and generate a brand new line
                            let firstSegment = lineSegment.slice(0, findSpacePointer);

                            // Chopped off the current line into a smaller segment
                            // This is one of the ways we are able to leave the while loop - by ending the while-loop condition

                            switch (charHasSpaceOnEnd) {
                                case false:
                                    // we segment the line so we can insert a red space
                                    lineSegment = lineSegment.slice(findSpacePointer + 1);
                                    break;
                                case true:
                                    // we do not need to show any space deletion, words don't matter to the user
                                    lineSegment = lineSegment.slice(findSpacePointer);
                                    break;
                            }
                            newText.push(firstSegment);
                        }
                    }

                    // Handle remaining characters
                    if (findSpacePointer !== lineSegment.length) {
                        newText.push(lineSegment);
                    }
                }
            }

            const finalTextContainer = newText.join('\n');

            finalText.push({
                inputContainer: outputText[inputContainerNum].inputContainer,
                text: finalTextContainer,
                name: outputText[inputContainerNum].name
            })
        }

        updateOutputText(finalText);

    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id } = this.props;
        handleDeleteModule(id);
    }

    render() {
        const { charToSplit } = this.props;
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="split-lines-after-word-function">
                <div className="split-lines-after-word-card card white">
                    <div className="split-lines-after-word-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Split Into Two Lines if a Word Contains a Phrase:</p>
                        <p className="card-title center">After Word</p>
                    </div>
                    <div className="row">
                        <div className="split-lines-after-word-description-complete col s12">
                            <p>Split into two lines if a word contains the characters: "{charToSplit}"</p>
                            <p>The line will be split *after* the word that contains a phrase.</p>
                            <p>Multiple phrase instances yields multiple splits.</p>
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
        moduleActiveToggle: state.textRed.moduleActiveToggle,
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview,
        savedText: state.textRed.savedText
    };
};

export default connect(mapStateToProps, actions)(SplitLinesAfterWordComplete);