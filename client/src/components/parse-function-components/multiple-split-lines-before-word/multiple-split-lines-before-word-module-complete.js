import React, { Component } from 'react';
import { connect } from 'react-redux';

import './multiple-split-lines-before-word-module.css';
import * as actions from '../../../actions';

class MultipleSplitLinesBeforeWordComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineNumBegin: '',
            lineMultiple: '',
            charToSplit: '',
            direction: '',
            instance: '',
        };
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, updateOutputText } = this.props;
        const { lineMultiple, charToSplit, direction, instance } = this.props;
        let { lineNumBegin } = this.props;
        this.setState({
            lineNumBegin,
            lineMultiple,
            charToSplit,
            direction,
            instance
        })
        console.log('multiple-split-lines-before-break-module component mounted');

        // convert lineNumBegin into a number
        lineNumBegin = Number(lineNumBegin);

        const finalText = [];
        let beginsWithSpace = charToSplit[0] === ' ' ? true : false;

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let newText = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {

                // number of instances
                let instanceIter = Number(instance);

                // Line segment splits
                let firstSegment;
                let lastSegment;

                // if the charToSplit instance was found
                let found = true;

                let line = containerSplitNewLine[i];

                // NEW FOR COMPLETED
                let isAMultiple = false;

                // NEW FOR COMPLETED
                if (lineNumBegin > i + 1) {
                    isAMultiple = false;
                } else if (lineNumBegin === i + 1) {
                    isAMultiple = true;
                } else if (lineNumBegin < i + 1) {
                    isAMultiple = (i - lineNumBegin + 1) % lineMultiple === 0 ? true : false;
                }

                // index number for split
                let idx = direction === "forward" ? -1 : line.length;

                // Find the location to split the line segment, and use it if isAMultiple is true

                if (direction === "forward" && beginsWithSpace === false) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx++ < line.length) {
                        idx = line.indexOf(charToSplit, idx);
                        if (idx === - 1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }

                    // If found is still true, we will iterate back until we find a space or the beginning of a line
                    while (found === true && line[idx] !== ' ' && idx !== -1) {
                        idx--;
                    }

                } else if (direction === "forward" && beginsWithSpace === true) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx++ < line.length) {
                        idx = line.indexOf(charToSplit, idx);
                        if (idx === - 1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }
                    // If the user enters a space, we will assume that the user doesn't care about word-rules
                    // use the idx from the while loop
                } else if (direction === "backward" && beginsWithSpace === false) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx-- > -1) {
                        idx = line.lastIndexOf(charToSplit, idx);
                        if (idx === -1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }

                    // If found is still true, we will iterate back until we find a space or the beginning of a line
                    while (found === true && line[idx] !== ' ' && idx !== -1) {
                        idx--;
                    }

                } else if (direction === "backward" && beginsWithSpace === true) {
                    // Search through the line at the particular instance where charToSplit is found
                    while (instanceIter !== 0 && found === true && idx-- > -1) {
                        idx = line.lastIndexOf(charToSplit, idx);
                        if (idx === -1) {
                            found = false;
                        } else {
                            instanceIter--;
                        }
                    }
                    // If the user enters a space, we will assume that the user doesn't care about word-rules
                    // use the idx from the while loop
                }

                if (line === "") {
                    // NOTHING SHOULD GO HERE - THIS IS JUST A BLANK LINE
                    // Keeping the below switch statement to reflect the edited module
                    switch (isAMultiple) {
                        case true:
                            newText.push("");
                            break;
                        case false:
                            newText.push("")
                            break;
                        default:
                            console.log("isAMultiple is not defined");
                    }

                } else {
                    switch (isAMultiple) {
                        case true:
                            // We are at a line multiple, what do we do with it?
                            if (found === true && beginsWithSpace === false && idx !== -1) {

                                firstSegment = line.slice(0, idx);
                                lastSegment = line.slice(idx + 1);
                                // If firstSegment is just a space or empty, don't bother making another line
                                if (firstSegment !== " " && firstSegment !== "") {
                                    newText.push(firstSegment);
                                }

                                newText.push(lastSegment);

                            } else if (found === true && idx === -1) {
                                // If we are at the beginning of the line, simply return the line
                                // This goes for "beginsWithSpace" true and false
                                newText.push(line)

                            } else if (found === true && beginsWithSpace === true && idx !== -1) {
                                // begins with a space
                                firstSegment = line.slice(0, idx);
                                lastSegment = line.slice(idx);

                                // Case: first segment isn't empty
                                if (firstSegment !== "") {
                                    newText.push(firstSegment);
                                    newText.push(lastSegment);

                                } else if (firstSegment === "") {
                                    // If firstSegment is empty, don't bother making another line
                                    newText.push(lastSegment);
                                }

                            } else if (found === false) {
                                newText.push(line);
                            }
                            break;

                        case false:
                            newText.push(line)
                            break;
                        default:
                            console.log("isAMultiple is not defined");
                    }

                }

            }

            const finalTextContainer = newText.join('\n');

            finalText.push({
                inputContainer: outputText[inputContainer].inputContainer,
                text: finalTextContainer,
                name: outputText[inputContainer].name
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
        const { lineNumBegin, lineMultiple, charToSplit, direction, instance } = this.props;
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        let instancePlural = instance > 1 ? 'instances' : 'instance';

        return (
            <div className="multiple-split-lines-before-word-function">
                <div className="multiple-split-lines-before-word-card card white">
                    <div className="multiple-split-lines-before-word-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Split a Multiple Into Two Lines If a Word Contains a Phrase:</p>
                        <p className="card-title center">Before Word</p>
                    </div>
                    <div className="row">
                        <div className="multiple-split-lines-before-word-description-complete col s12">
                            <p>Starting at line number <b>"{lineNumBegin}"</b>, at each line multiple of <b>"{lineMultiple}"</b>, split into two lines if a word contains the characters: <b>"{charToSplit}"</b>. Analyzing the line going <b>"{direction}"</b>, the line will be split when the characters are spotted at <b>"{instance}"</b> {instancePlural} in this direction in the line. </p>
                            <p>The line will be split *before* the word that contains a phrase.</p>
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

export default connect(mapStateToProps, actions)(MultipleSplitLinesBeforeWordComplete);