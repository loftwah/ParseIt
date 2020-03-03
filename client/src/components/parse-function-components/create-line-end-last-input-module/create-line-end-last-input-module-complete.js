import React, { Component } from 'react';
import { connect } from 'react-redux';

import './create-line-end-last-input-module.css';
import * as actions from '../../../actions';

class CreateLineEndLastInputComplete extends Component {
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

        console.log('create-line-end-last-input-module-complete component mounted');

        const finalText = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {
            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            // Add the new line to the containerSplitNewLine array, if we are on the last input container
            if (inputContainer === outputText.length - 1) {
                containerSplitNewLine.push(charsToAdd);
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

        return (
            <div className="create-line-end-last-input-function">
                <div className="create-line-end-last-input-card card white">
                    <div className="create-line-end-last-input-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Create a line at the end of the last input</p>
                    </div>
                    <div className="row">
                        <div className="create-line-end-last-input-description-complete col s12">
                            <div className="user-input-chars">
                                <p>For the last input, a new line will be created at the last index with the following characters: <b>"{charsToAdd}"</b>.</p>
                            </div>
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

export default connect(mapStateToProps, actions)(CreateLineEndLastInputComplete);