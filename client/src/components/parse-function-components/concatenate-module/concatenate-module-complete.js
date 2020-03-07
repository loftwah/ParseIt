import React, { Component } from 'react';
import { connect } from 'react-redux';

import './concatenate-module.css';
import * as actions from '../../../actions';

class ConcatenateModuleComplete extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { outputText, updateOutputText } = this.props;
        let concatenateOutput = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let inputText = outputText[inputContainer].text;

            while (inputText.indexOf('\n') !== -1) {
                inputText = inputText.replace('\n', ' ');
            }


            let newInputContainer = {
                inputContainer: outputText[inputContainer].inputContainer,
                text: inputText,
                name: outputText[inputContainer].name
            };

            concatenateOutput.push(newInputContainer);
        }

        updateOutputText(concatenateOutput);
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id } = this.props;
        handleDeleteModule(id);
    }

    render() {
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="concatenate-function">
                <div className="concatenate-card card white">
                    <div className="concatenate-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Concatenate On One Line</span>
                    </div>
                    <div className="row">
                        <div className="concatenate-description-complete col s12">
                            <p>This module will concatenate all lines of an input into one line.</p>
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

export default connect(mapStateToProps, actions)(ConcatenateModuleComplete);