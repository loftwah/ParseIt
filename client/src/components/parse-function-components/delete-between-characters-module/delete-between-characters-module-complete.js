import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-between-characters-module.css';
import * as actions from '../../../actions';

class DeleteBetweenCharactersModuleComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startCharacters: '',
            endCharacters: '',
        };
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, startCharacters, endCharacters, updateOutputText } = this.props;
        this.setState({
            startCharacters: startCharacters,
            endCharacters: endCharacters
        })
        console.log('delete-specified-lines-module component mounted');
        let finalText = []

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {
            let newText = [];

            // Before creating JSX, we need to analyze each container of text

            function Interval(left, right) {
                this.left = left;
                this.right = right;
            }

            // Begin the search with no deletions found, while searching for the startCharacters
            let deleteToggle = false;
            let charToSearch = startCharacters;

            // initiate interval variables
            let beginInterval, endInterval;

            // lines that have segments to be deleted, or full lines that must be deleted
            let affectedLineInterval = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let lineIdx = 0; lineIdx < containerSplitNewLine.length; lineIdx++) {
                let line = containerSplitNewLine[lineIdx];
                let affectedLineIdx;

                while (line.indexOf(charToSearch) !== -1) {
                    deleteToggle = !deleteToggle;
                    if (deleteToggle === false) {
                        // We have ended a string of deletions, meaning we have found a pair
                        // Let's add this to our list of intervals (indexed at 1)
                        endInterval = lineIdx;
                        affectedLineInterval.push(new Interval(beginInterval + 1, endInterval + 1));
                        // slice the line, so we get closer to escaping the loop
                        affectedLineIdx = line.indexOf(charToSearch);
                        line = line.slice(affectedLineIdx + endCharacters.length);
                        // Are there more pairs?
                        charToSearch = startCharacters;
                    } else if (deleteToggle === true) {
                        // Begin the deletion interval
                        beginInterval = lineIdx;
                        // slice the line, so we get closer to escaping the loop
                        affectedLineIdx = line.indexOf(charToSearch);
                        line = line.slice(affectedLineIdx + startCharacters.length);
                        // We are now hunting for the endCharacters, so that we can end this string of deletions
                        charToSearch = endCharacters;
                    }
                }
            }
            let pairCount = affectedLineInterval.length;

            // CLEAN UP THE INTERVAL

            // First, sort all ranges, where the left is from smallest to largest
            let lineIntervalSorted = affectedLineInterval.sort((a, b) => {
                return a.left - b.left;
            })

            let cleanedLineInterval = [];
            if (lineIntervalSorted.length !== 0) {
                let prevMin = lineIntervalSorted[0].left;
                let prevMax = lineIntervalSorted[0].right;
                let currMin, currMax, interval;

                for (let rangeIdx = 1; rangeIdx < lineIntervalSorted.length; rangeIdx++) {
                    let range = lineIntervalSorted[rangeIdx];
                    currMin = range.left;
                    currMax = range.right;

                    // analyze this sorted range

                    if (prevMax + 1 >= currMin) {
                        // This interval overlaps or it is trailing the previous range
                        // therefore, we will continue finding ranges
                        prevMax = Math.max(prevMax, currMax);
                    } else {
                        // There is no overlapping with this range, push it to the cleanedLineInterval array
                        // The range will be exact to the user's output display: indexed at 1
                        interval = new Interval(prevMin - 1, prevMax - 1);
                        cleanedLineInterval.push(interval);
                        // update prevMin and prevMax
                        prevMin = currMin;
                        prevMax = currMax;
                    }
                }

                // push the last interval into array
                // The range will be exact to the user's output display: indexed at 1
                interval = new Interval(prevMin - 1, prevMax - 1);
                cleanedLineInterval.push(interval);
            }

            // The interval is now cleaned

            let intervalIdx = 0;

            // begin with JSX deletion toggled to false
            let deleteJSXtoggle = false;

            // put charToSearch back to startCharacters
            charToSearch = startCharacters;

            for (let i = 0; i < containerSplitNewLine.length; i++) {
                // If we are outside the range, that means nothing will happen to this particular line
                // Is the line index inside our range?
                let inRange;

                // bump up the rangeIdx if we find that the current max (right) is smaller than the current 'i', if it exists
                if (cleanedLineInterval[intervalIdx + 1] !== undefined
                    && cleanedLineInterval[intervalIdx].right < i) {
                    intervalIdx++;
                }

                // check to see if we are currently in range
                function inRangeCheck(intervalIdx, currIdx) {
                    if (cleanedLineInterval.length !== 0
                        && cleanedLineInterval[intervalIdx].left <= currIdx
                        && cleanedLineInterval[intervalIdx].right >= currIdx) {
                        return true;
                    } else {
                        return false;
                    }
                }

                inRange = inRangeCheck(intervalIdx, i);

                let line = containerSplitNewLine[i];

                switch (inRange) {
                    case true:
                        // This line is affected, we should do something about it
                        let updatedLine = []
                        // If the line has nothing, we will not do anything to the output text
                        if (line !== "") {
                            // This line is affected, and it is not blank
                            // This line can be affected several number of times, or simply throughout the entire line

                            // setting up while loop: loop through affected/unaffected segments

                            let affectedLineIdx;
                            let keepSegment;

                            while (line.indexOf(charToSearch) !== -1) {
                                deleteJSXtoggle = !deleteJSXtoggle;
                                if (deleteJSXtoggle === false) {
                                    // We have ended a string of deletions
                                    // meaning we have completed a pair
                                    pairCount--;

                                    affectedLineIdx = line.indexOf(charToSearch);

                                    // The first line segment IS affected by deletion
                                    // endCharacters IS NOT

                                    updatedLine.push(endCharacters);

                                    // slice the line, so we get closer to escaping the loop
                                    line = line.slice(affectedLineIdx + endCharacters.length);
                                    // Are there more pairs?
                                    charToSearch = startCharacters;
                                } else if (deleteJSXtoggle === true) {
                                    // we are now beginning a string of deletions
                                    affectedLineIdx = line.indexOf(charToSearch);

                                    // The first line segment is not affected by deletion
                                    keepSegment = line.slice(0, affectedLineIdx + startCharacters.length)
                                    updatedLine.push(keepSegment)

                                    // slice the line, so we get closer to escaping the loop
                                    line = line.slice(affectedLineIdx + startCharacters.length);

                                    // We are now hunting for the endCharacters, so that we can end this string of deletions
                                    charToSearch = endCharacters;
                                }
                            }

                            // We are out of the while loop, but we may still have a segment to tack on
                            // if there are no more pairs left, we want to push a segment to output text
                            if (deleteJSXtoggle === false || pairCount === 0) {
                                updatedLine.push(line)
                            }
                        }

                        // If there are no items inside the updatedLine array, and we are on an affected line, that means this whole line is deleted
                        // If the full line is deleted, do not add the join('') into newText
                        if (updatedLine.length !== 0) {
                            newText.push(updatedLine.join(''))
                        }
                        break;
                    case false:
                        // Our analysis tells us that this line is not affected
                        if (line === "") {
                            newText.push("");

                        } else {
                            newText.push(line);
                        }
                        break;
                    default:
                        console.log("inRange doesn't exist");
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
        const { endCharacters, startCharacters } = this.state;
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="delete-between-characters-function">
                <div className="delete-between-characters-card card white">
                    <div className="delete-between-characters-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Delete Everything Between Two Phrases</span>
                    </div>
                    <div className="row">
                        <div className="delete-between-characters-complete col s12">
                            <p>Delete all text between the characters: <b>"{startCharacters}"</b> and the characters: <b>"{endCharacters}"</b></p>
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
        additionsPreview: state.textRed.additionsPreview
    };
};

export default connect(mapStateToProps, actions)(DeleteBetweenCharactersModuleComplete);