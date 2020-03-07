import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-specified-lines-module.css';
import * as actions from '../../../actions';

class DeleteSpecifiedLines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linesToDelete: '',
            errorMsg: ''
        };
    }

    charactersToStopAt = e => {
        this.setState({
            linesToDelete: e.target.value,
            errorMsg: ''
        })
    }


    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id, moduleActiveOff } = this.props;
        handleDeleteModule(id);
        moduleActiveOff();
    }

    validateUserInput = (linesToDelete) => {

        const sendRangeErrorMessage = () => {
            this.setState({
                errorMsg: 'Invalid Number Range, use e.g. 1-5, 8, 11-13'
            })
        }

        function Interval(left, right) {
            this.left = left;
            this.right = right
        }

        // Check if input is empty
        if (linesToDelete.length === 0) {
            this.setState({
                errorMsg: 'Please fill the Delete The Following Lines input'
            });
            return false;
        }

        // Check to see if user input correct symbols
        // analyze the linesToDelete for numbers, spaces, commas and dashes
        // Everything else: throw an error
        const validSymbolHash = {
            '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            '-': 10, ' ': 11, ',': 12
        };

        for (let idx = 0; idx < linesToDelete.length; idx++) {
            let checkChar = linesToDelete[idx]
            if (validSymbolHash[checkChar] === undefined) {
                sendRangeErrorMessage();
                return false;
            }
        }

        // Check to see if all ranges are valid

        const splitOnCommaArr = linesToDelete.split(',');

        // If user input passes all range tests, the below array will be filled with user ranges
        let userRanges = [];

        for (let j = 0; j < splitOnCommaArr.length; j++) {
            let range = splitOnCommaArr[j];

            // test to see if a user input a number, then a space, then a number = BAD
            let splitOnHyphenValidation = range.split('-');
            for (let k = 0; k < splitOnHyphenValidation.length; k++) {
                let param = splitOnHyphenValidation[k]
                // remove all spaces in the beginning
                while (param[0] === ' ') {
                    param = param.slice(1);
                }

                // remove all spaces in the end
                while (param[param.length - 1] === ' ') {
                    param = param.slice(0, param.length - 1);
                }

                // Check to see if spaces still exist
                // If spaces still exist, the user input a number, a space, and a number = error
                if (param.indexOf(' ') !== -1) {
                    sendRangeErrorMessage();
                    return false;
                }
            }

            // Remove all spaces entirely
            while (linesToDelete.indexOf(' ') !== -1) {
                linesToDelete = linesToDelete.replace(' ', '')
            }

            if (range.length === 0) {
                // No input between 2 commas
                sendRangeErrorMessage();
                return false;
            }

            let rangeSplitOnHyphen = range.split('-');
            let firstNum = rangeSplitOnHyphen[0];
            let lastNum;
            if (rangeSplitOnHyphen.length === 2) {
                // If there are hyphens, enter in the last Num
                lastNum = rangeSplitOnHyphen[1];

            } else {
                // otherwise lastNum will be the firstNum
                lastNum = firstNum;
            }

            if (rangeSplitOnHyphen.length >= 3) {
                // too many hyphens
                sendRangeErrorMessage();
                return false;
            }
            if (isNaN(firstNum) === true || isNaN(lastNum) === true) {
                // the beginning or ending characters must only be numbers
                sendRangeErrorMessage();
                return false;
            }

            // It is safe to convert the firstNum and lastNum into actual numbers
            firstNum = Number(firstNum);
            lastNum = Number(lastNum);

            if (firstNum > lastNum) {
                // first character should not be greater than the last 
                sendRangeErrorMessage();
                return false;
            }

            // This particular interval passes the test
            if (rangeSplitOnHyphen.length === 1) {
                // The user did not add a hyphen for this range
                let interval = new Interval(Number(rangeSplitOnHyphen[0]), Number(rangeSplitOnHyphen[0]))
                userRanges.push(interval)
            } else if (rangeSplitOnHyphen.length === 2) {
                // The user DID add a hyphen for this range
                let interval = new Interval(Number(rangeSplitOnHyphen[0]), Number(rangeSplitOnHyphen[1]))
                userRanges.push(interval)
            }
        }

        return userRanges;
    }

    handleSubmit = e => {
        e.preventDefault();
        // Future: be able to delete a certain number of instances?
        const { handleModuleCode,
            togglePreviewOff, id, moduleActiveOff, completeModule } = this.props;
        const { linesToDelete } = this.state;

        const validate = this.validateUserInput(linesToDelete);
        if (validate === false) {
            return;
        } else if (validate === true) {
            this.setState({
                errorMsg: ""
            });
        }

        // If validate is not false, the function will return a split array
        let userRanges = validate;

        // Output text gets updated on the "complete" module
        // "complete" module is also where ParseIt code updates 
        togglePreviewOff();
        const moduleCode = "DeleteSpecifiedLines" + " \"(" + linesToDelete + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });

        completeModule(id, linesToDelete);
        moduleActiveOff();
    }

    handlePreview = e => {
        e.preventDefault();
        const { previewToggle, togglePreviewOn, togglePreviewOff,
            outputText, updateDeletionsPreview, updateAdditionsPreview,
            toggleOutputTextOn, toggleSavedTextOff } = this.props;
        const { linesToDelete } = this.state;

        const validate = this.validateUserInput(linesToDelete);
        if (validate === false) {
            return;
        } else if (validate === true) {
            this.setState({
                errorMsg: ""
            });
        }

        // If validate is not false, the function will return an array of random intervals
        let userRanges = validate;

        // Merge the intervals given by the user
        function Interval(left, right) {
            this.left = left;
            this.right = right
        }

        // First, sort all ranges, where the left is from smallest to largest
        let userRangesSorted = userRanges.sort((a, b) => {
            return a.left - b.left;
        })

        let newRanges = [];
        let prevMin = userRangesSorted[0].left;
        let prevMax = userRangesSorted[0].right;
        let currMin, currMax, interval;

        for (let rangeIdx = 1; rangeIdx < userRangesSorted.length; rangeIdx++) {
            let range = userRangesSorted[rangeIdx];
            currMin = range.left;
            currMax = range.right;
            // analyze this sorted range

            if (prevMax + 1 >= currMin) {
                // This interval overlaps or it is trailing the previous range
                // therefore, we will continue finding ranges
                prevMax = Math.max(prevMax, currMax);
            } else {
                // There is no overlapping with this range, push it to the newRanges array
                // The range will be exact to the user's output display: indexed at 1
                interval = new Interval(prevMin - 1, prevMax - 1);
                newRanges.push(interval);
                // update prevMin and prevMax
                prevMin = currMin;
                prevMax = currMax;
            }

        }

        // push the last interval into array
        // The range will be exact to the user's output display: indexed at 1
        interval = new Interval(prevMin - 1, prevMax - 1);
        newRanges.push(interval);

        let additionPreviews = [];
        let deletionPreviews = [];

        let inputContainerText;
        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let addIdx = 0;
            let deleteIdx = 0;
            let rangeIdx = 0;

            let createSingleAdditionPreview = [];
            let createSingleDeletionPreview = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {

                // Is the line index inside our range?
                let inRange;

                // bump up the rangeIdx if we find that the current max (right) is smaller than the current 'i', if it exists
                if (newRanges[rangeIdx + 1] !== undefined && newRanges[rangeIdx].right < i) {
                    rangeIdx++;
                }

                // check to see if we are currently in range
                inRange = newRanges[rangeIdx].left <= i && newRanges[rangeIdx].right >= i ? true : false

                let line = containerSplitNewLine[i];

                if (line === "") {
                    switch (inRange) {
                        case true:
                            deleteIdx++;
                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number" style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                                <p className="line-text" style={{ background: "red" }}>&#x200B;</p>
                            </div>);
                            break;
                        case false:
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
                            break;
                        default:
                            console.log("inRange doesn't exist");
                    }

                } else {
                    switch (inRange) {
                        case true:
                            deleteIdx++;
                            createSingleDeletionPreview.push(<div className="line" key={deleteIdx}>
                                <span className="line-number" style={{ background: "rgb(255, 210, 217)" }}>[{deleteIdx}]&#160;</span>
                                <p className="line-text" style={{ background: "red" }}><b>{line}</b></p>
                            </div>);
                            break;
                        case false:
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
                            break;
                        default:
                            console.log("inRange doesn't exist");
                    }

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
        const { linesToDelete, errorMsg } = this.state;
        return (
            <div className="delete-specified-lines-function">
                <div className="delete-specified-lines-card card white">
                    <div className="delete-specified-lines-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Delete Certain Lines</span>
                    </div>
                    <div className="row">
                        <div className="delete-specified-lines-delete col s12">
                            <span>Delete The Following Lines: </span>
                            <div className="delete-specified-lines-user-input input-field inline">
                                <input
                                    type="text"
                                    id="delete-specified-input"
                                    onChange={this.charactersToStopAt}
                                    value={linesToDelete}
                                    disabled={previewToggle}
                                    placeholder="e.g. 1-5, 8, 11-13"
                                />
                                <label htmlFor="delete-specified-input"></label>
                            </div>
                            <br />
                        </div>
                        <p className="error-msg">{errorMsg}</p>
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

export default connect(mapStateToProps, actions)(DeleteSpecifiedLines);