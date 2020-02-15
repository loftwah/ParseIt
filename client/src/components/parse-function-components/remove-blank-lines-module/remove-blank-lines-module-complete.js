import React, { Component } from 'react';
import { connect } from 'react-redux';

import './remove-blank-lines-module.css';
import * as actions from '../../../actions';

class RemoveBlankLinesComplete extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { outputText, updateOutputText } = this.props;
        let removeBlankLinesOutput = [];
        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let inputTextArr = outputText[inputContainer].text.split('\n');
            let newInputText = [];

            for (let i = 0; i < inputTextArr.length; i++) {
                let line = inputTextArr[i];
                // If a line contains only spaces, we will delete the line
                let lineHasOnlySpaces = true;
                for (let i = 0; i < line.length; i++) {
                    if (line[i] !== " ") {
                        lineHasOnlySpaces = false;
                        break;
                    }
                }

                if (line !== "" && lineHasOnlySpaces === false) {
                    newInputText.push(line);
                }
            }

            newInputText = newInputText.join('\n');

            let newInputContainer = {
                inputContainer: outputText[inputContainer].inputContainer,
                text: newInputText,
                name: outputText[inputContainer].name
            };

            removeBlankLinesOutput.push(newInputContainer);
        }

        updateOutputText(removeBlankLinesOutput);
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id } = this.props;
        handleDeleteModule(id);
    }

    render() {
        return (
            <div className="remove-blank-lines-function">
                <div className="remove-blank-lines-card card white">
                    <div className="remove-blank-lines-card-content card-content black-character">
                        <button
                            className="waves-effect waves-light btn #42a5f5 red lighten-1 submit-form-button"
                            onClick={this.handleDelete}
                        >Delete</button>
                        <span className="card-title center">Module: Remove Blank Lines</span>
                    </div>
                    <div className="row">
                        <div className="remove-blank-lines-description-complete col s12">
                            <p>This module will remove all blank lines.</p>
                            <p>Lines only containing spaces will be removed as well.</p>
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

export default connect(mapStateToProps, actions)(RemoveBlankLinesComplete);