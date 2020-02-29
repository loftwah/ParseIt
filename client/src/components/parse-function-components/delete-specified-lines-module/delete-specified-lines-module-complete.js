import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-specified-lines-module.css';
import * as actions from '../../../actions';

class DeleteBeginningModuleComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linesToDelete: '',
        };
    }

    cleanUserInput = (linesToDelete) => {

        function Interval(left, right) {
            this.left = left;
            this.right = right
        }

        const splitOnCommaArr = linesToDelete.split(',');

        // Below array will be filled with user ranges
        let userRanges = [];

        for (let j = 0; j < splitOnCommaArr.length; j++) {
            let range = splitOnCommaArr[j];

            // Remove all spaces entirely
            while (linesToDelete.indexOf(' ') !== -1) {
                linesToDelete = linesToDelete.replace(' ', '')
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

            // It is safe to convert the firstNum and lastNum into actual numbers
            firstNum = Number(firstNum);
            lastNum = Number(lastNum);

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

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, linesToDelete, updateOutputText } = this.props;
        this.setState({
            linesToDelete: linesToDelete,
        })
        console.log('delete-specified-lines-module component mounted');

        let userRanges = this.cleanUserInput(linesToDelete)

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
        const finalText = [];

        for (let inputContainerNum = 0; inputContainerNum < outputText.length; inputContainerNum++) {

            let rangeIdx = 0;
            // begin by splitting lines into array items
            const textLines = outputText[inputContainerNum].text.split('\n');
            let newText = [];

            for (let i = 0; i < textLines.length; i++) {

                // Is the line index inside our range?
                let inRange;

                // bump up the rangeIdx if we find that the current max (right) is smaller than the current 'i', if it exists
                if (newRanges[rangeIdx + 1] !== undefined && newRanges[rangeIdx].right < i) {
                    rangeIdx++;
                }

                // check to see if we are currently in range
                inRange = newRanges[rangeIdx].left <= i && newRanges[rangeIdx].right >= i ? true : false

                let line = textLines[i];

                if (line === "") {
                    switch (inRange) {
                        case true:
                            // Do not add anything to outputText
                            break;
                        case false:
                            newText.push('');
                            break;
                        default:
                            console.log("inRange doesn't exist");
                    }

                } else {
                    switch (inRange) {
                        case true:
                            // Do not add anything to outputText 
                            break;
                        case false:
                            newText.push(line);
                            break;
                        default:
                            console.log("inRange doesn't exist");
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
        const { linesToDelete } = this.props;
        return (
            <div className="delete-specified-lines-function">
                <div className="delete-specified-lines-card card white">
                    <div className="delete-specified-lines-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Delete Specified Lines</span>
                    </div>
                    <div className="row">
                        <div className="delete-specified-lines-complete col s12">
                            <p>Delete the following lines: <b>"{linesToDelete}"</b></p>
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
        additionsPreview: state.textRed.additionsPreview
    };
};

export default connect(mapStateToProps, actions)(DeleteBeginningModuleComplete);