import React, { Component } from 'react';
import { connect } from 'react-redux';

import './create-line-beginning-all-inputs-module.css';
import * as actions from '../../../actions';

class CreateLineBeginningAllInputsComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charsToAdd: '',
        };
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, updateOutputText } = this.props;
        const { charsToAdd } = this.props;
        this.setState({
            charsToAdd
        });

        console.log('create-line-beginning-all-inputs-module-complete component mounted');

        const finalText = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            // let newText = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            // Add the new line to the containerSplitNewLine array
            // What characters do we add in this additional line?
            // The user input: charsToAdd, or the name of the input, which is noted as "$$GetName$$"?
            if (charsToAdd === "$$GetName$$") {
                containerSplitNewLine.unshift(outputText[inputContainer].name);
            } else {
                containerSplitNewLine.unshift(charsToAdd);
            }

            const finalTextContainer = containerSplitNewLine.join('\n');

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
        const { charsToAdd } = this.props;
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="create-line-beginning-all-inputs-function">
                <div className="create-line-beginning-all-inputs-card card white">
                    <div className="create-line-beginning-all-inputs-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Create a line at the beginning of all inputs</p>
                    </div>
                    <div className="row">
                        <div className="create-line-beginning-all-inputs-description-complete col s12">
                            {charsToAdd === "$$GetName$$" ? (
                                <div className="input-name">
                                    <p>For every input, a new line will be created at index 1 with the name of each input.
                                    </p>
                                </div>
                            ) : (
                                    <div className="user-input-chars">
                                        <p>For every input, a new line will be created at index 1 with the following characters: <b>"{charsToAdd}"</b>.
                                    </p>
                                    </div>
                                )}

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

export default connect(mapStateToProps, actions)(CreateLineBeginningAllInputsComplete);