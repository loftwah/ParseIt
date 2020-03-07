import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-between-characters-module.css';
import * as actions from '../../../actions';

class DeleteBetweenCharactersModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startCharacters: '',
            endCharacters: '',
        };
    }

    handleDeleteBetweenCharacters = e => {
        this.setState({
            startCharacters: e.target.value
        })
    }

    handleInsertCharacter = e => {
        this.setState({
            endCharacters: e.target.value
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
        const { startCharacters, endCharacters } = this.state;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "DeleteBetweenPhrases" + " \"(" + startCharacters + ")\" \"(" + endCharacters + ")\"";

        handleModuleCode({
            code: moduleCode,
            id: id
        });
        completeModule(id, startCharacters, endCharacters);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        const { startCharacters, endCharacters } = this.state;

        let additionPreviews = [];
        let deletionPreviews = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            // Before creating JSX, we need to analyze each container of text

            // Why?
            // Case: 1 - endCharacters are not found, we don't want to delete the entire rest of the output
            // Case: 2 - startCharacters and endCharacters match "n-1" number of times, but if the n'th startCharacters doesn't have an endCharacters match, we DON'T want to delete the rest of the output
            // Solution: Analyze before creating JSX, find the number of proper "pairs"

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

            let addIdx = 0;
            let deleteIdx = 0;
            let intervalIdx = 0;

            // begin with JSX deletion toggled to false
            let deleteJSXtoggle = false;

            // put charToSearch back to startCharacters
            charToSearch = startCharacters;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

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
                        let additionPreviewLineJSX = [];
                        let deletionPreviewLineJSX = [];
                        // If the line has nothing, simply push a blank red line to deletions
                        // Do nothing to additions
                        if (line === "") {
                            deleteIdx++;
                            deletionPreviewLineJSX.push(<span className="line" key={"deletion-idx"}>
                                <span className="line-number"
                                    style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                                <p className="line-text" style={{ background: "red" }}>&#160;</p>
                            </span>);
                        } else {
                            // This line is affected
                            // It can be affected several number of times, or simply throughout the entire line
                            addIdx++;
                            deleteIdx++;

                            deletionPreviewLineJSX.push(<span className="line" key={"deletion-idx"}>
                                <span className="line-number"
                                    style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                            </span>);

                            additionPreviewLineJSX.push(<span className="line" key={"addition-idx"}>
                                <span className="line-number">[{addIdx}]&#160;</span>
                            </span>);

                            // setting up while loop: loop through affected/unaffected segments

                            let affectedLineIdx;
                            let keepSegment, deleteSegment;

                            while (line.indexOf(charToSearch) !== -1) {
                                deleteJSXtoggle = !deleteJSXtoggle;
                                if (deleteJSXtoggle === false) {
                                    // We have ended a string of deletions
                                    // meaning we have completed a pair
                                    pairCount--;

                                    affectedLineIdx = line.indexOf(charToSearch);

                                    // The first line segment IS affected by deletion
                                    // What is deleted is not affected by endCharacters
                                    deleteSegment = line.slice(0, affectedLineIdx);

                                    deletionPreviewLineJSX.push(<span className="line" key={`${line.length}-delete`}>
                                        <span className="line-text" style={{ background: "red" }}><b>{deleteSegment}</b></span>
                                    </span>);

                                    // Keep the endCharacters normal inside deletion/addition preview, we do not want to delete them
                                    deletionPreviewLineJSX.push(<span className="line" key={`${line.length}-keep`}>
                                        <span className="line-text">{endCharacters}</span>
                                    </span>);

                                    additionPreviewLineJSX.push(<span className="line" key={line.length}>
                                        <span className="line-text">{endCharacters}</span>
                                    </span>);

                                    // slice the line, so we get closer to escaping the loop
                                    line = line.slice(affectedLineIdx + endCharacters.length);
                                    // Are there more pairs?
                                    charToSearch = startCharacters;
                                } else if (deleteJSXtoggle === true) {
                                    // we are now beginning a string of deletions

                                    affectedLineIdx = line.indexOf(charToSearch);

                                    // The first line segment is not affected by deletion
                                    keepSegment = line.slice(0, affectedLineIdx + startCharacters.length)

                                    deletionPreviewLineJSX.push(<span className="line" key={line.length}>
                                        <span className="line-text">{keepSegment}</span>
                                    </span>);

                                    additionPreviewLineJSX.push(<span className="line" key={line.length}>
                                        <span className="line-text">{keepSegment}</span>
                                    </span>);

                                    // slice the line, so we get closer to escaping the loop

                                    line = line.slice(affectedLineIdx + startCharacters.length);
                                    // We are now hunting for the endCharacters, so that we can end this string of deletions
                                    charToSearch = endCharacters;
                                }
                            }

                            // We are out of the while loop, but we may still have a segment to tack on
                            // if there are no more pairs left, we want to push a REGULAR SEGMENT
                            if (deleteJSXtoggle === false || pairCount === 0) {
                                deletionPreviewLineJSX.push(<span className="line" key={line.length}>
                                    <span className="line-text">{line}</span>
                                </span>);
                                additionPreviewLineJSX.push(<span className="line" key={line.length}>
                                    <span className="line-text">{line}</span>
                                </span>);
                            } else if (deleteJSXtoggle === true) {
                                deletionPreviewLineJSX.push(<span className="line" key={line.length}>
                                    <span className="line-text" style={{ background: "red" }}><b>{line}</b></span>
                                </span>);
                            }
                        }

                        createSingleDeletionPreview.push(
                            <div className="line" key={deleteIdx}>
                                {[...deletionPreviewLineJSX]}
                            </div>
                        );

                        // if there is only one item inside of the additionPreviewLineJSX array, that means the line isn't added - we only added the JSX for the index
                        // Therefore, do not push this line into the additions preview array
                        // Also: for the case of blank lines, the addIdx does NOT get incremented
                        if (additionPreviewLineJSX.length <= 1 && line !== "") {
                            // put the addIdx back to its original index number
                            addIdx--;
                        } else {
                            createSingleAdditionPreview.push(
                                <div className="line" key={addIdx}>
                                    {[...additionPreviewLineJSX]}
                                </div>
                            );
                        }
                        break;
                    case false:
                        // Our analysis tells us that this line is not affected
                        if (line === "") {
                            addIdx++;
                            deleteIdx++;
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number">[{addIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">&#x200B;</p>
                            </div>);
                        } else {
                            addIdx++;
                            deleteIdx++;
                            createSingleAdditionPreview.push(<div className="line" key={addIdx}>
                                <span className="line-number">[{addIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);

                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number">[{deleteIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>);
                        }
                        break;
                    default:
                        console.log("inRange doesn't exist")
                }

            }
            additionPreviews.push(createSingleAdditionPreview);
            deletionPreviews.push(createSingleDeletionPreview);
        }

        updateDeletionsPreview(deletionPreviews); // replace this an array of ALL deletion previews
        updateAdditionsPreview(additionPreviews); // replace this an array of ALL addition previews

        previewToggle === true ? togglePreviewOff() : togglePreviewOn();

        if (previewToggle === true) {
            toggleOutputTextOn();
            toggleSavedTextOff();
        }
    }

    render() {
        const { previewToggle } = this.props;
        const { endCharacters, startCharacters } = this.state;
        return (
            <div className="delete-between-characters-function">
                <div className="delete-between-characters-card card white">
                    <div className="delete-between-characters-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Delete Everything Between Two Phrases</span>
                    </div>
                    <div className="row">
                        <div className="delete-between-characters-delete col s12">
                            <span>Delete between the characters: </span>
                            <div className="delete-between-characters-user-input input-field inline">
                                <input
                                    type="text"
                                    id="delete-input-start"
                                    onChange={this.handleDeleteBetweenCharacters}
                                    value={startCharacters}
                                    disabled={previewToggle}
                                />
                                <label htmlFor="delete-input-start"></label>
                            </div>
                            <br />
                            <span>And the characters: </span>
                            <div className="delete-between-characters-user-input input-field inline">
                                <input
                                    type="text"
                                    id="delete-input-end"
                                    onChange={this.handleInsertCharacter}
                                    disabled={previewToggle}
                                    value={endCharacters}
                                />
                                <label htmlFor="delete-input-end"></label>
                            </div>
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

export default connect(mapStateToProps, actions)(DeleteBetweenCharactersModule);