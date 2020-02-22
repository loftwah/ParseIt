import React, { Component } from 'react';
import { connect } from 'react-redux';

import './split-lines-before-break-module.css';
import * as actions from '../../../actions';

class SplitLinesBeforeBreakComplete extends Component {
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
        console.log('split-lines-before-break-module component mounted');

        const finalText = [];
        const charBeginsWithSpace = charToSplit[0] === " " ? true : false;

        for (let inputContainerNum = 0; inputContainerNum < outputText.length; inputContainerNum++) {

            let containerSplitNewLine = outputText[inputContainerNum].text.split('\n');

            // The offical output text for each container
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
                    let newTextLinesFromSplit = [];
                    let findSpacePointer;

                    while (lineSegment.lastIndexOf(charToSplit) !== -1) {
                        findSpacePointer = lineSegment.lastIndexOf(charToSplit);

                        if (charBeginsWithSpace === false) {
                            while (lineSegment[findSpacePointer] !== " " && findSpacePointer !== -1) {
                                findSpacePointer--;
                            }
                        }
                        // If the user inputs a space to begin the input, we will not care about the locations of spaces

                        // check to make sure findSpacePointer is -1, if it is LEAVE THE LOOP
                        if (findSpacePointer === -1) {
                            break;
                        } else {
                            // otherwise, we will split the entire line and generate a brand new line

                            let lastSegment = lineSegment.slice(findSpacePointer + 1);

                            // Chopped off the current line into a smaller segment
                            // This is one of the ways we are able to leave the while loop - by ending the while-loop condition
                            lineSegment = lineSegment.slice(0, findSpacePointer);

                            if (charBeginsWithSpace === false) {
                                newTextLinesFromSplit.push(lastSegment);

                            } else if (charBeginsWithSpace === true) {
                                // If a line DOES begin with a space, we assume that the user does not care about any rules regarding words
                                // Therefore, we will simply move things to a new line, as long as the pointer is not at index 0
                                if (findSpacePointer !== 0) {
                                    newTextLinesFromSplit.push(' ' + lastSegment);
                                } else {
                                    newTextLinesFromSplit.push(' ' + lastSegment);
                                }
                            }
                        }
                    }

                    let remainingSegment = lineSegment;

                    // Tack on the index and remaining segment at the end (remember, this array is in reverse)

                    // Do not push any segments into output text if it doesn't contain anything
                    if (remainingSegment !== "") {
                        newTextLinesFromSplit.push(remainingSegment);
                        // additionPreviewLines.push(remainingSegment)
                    }

                    newTextLinesFromSplit.reverse();

                    for (let j = 0; j < newTextLinesFromSplit.length; j++) {
                        newText.push(newTextLinesFromSplit[j]);
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
        return (
            <div className="split-lines-before-break-function">
                <div className="split-lines-before-break-card card white">
                    <div className="split-lines-before-break-card-content card-content black-character">
                        <button
                            className="waves-effect waves-light btn #42a5f5 red lighten-1 submit-form-button"
                            onClick={this.handleDelete}
                        >Delete</button>
                        <span className="card-title center">Module: Split Into Two Lines if a Word Contains a Phrase: Before Line Break</span>
                    </div>
                    <div className="row">
                        <div className="split-lines-before-break-description-complete col s12">
                            <p>Split into two lines if a word contains the characters: "{charToSplit}"</p>
                            <p>The line will be split *before* the word that contains a phrase.</p>
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
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview,
        savedText: state.textRed.savedText
    };
};

export default connect(mapStateToProps, actions)(SplitLinesBeforeBreakComplete);