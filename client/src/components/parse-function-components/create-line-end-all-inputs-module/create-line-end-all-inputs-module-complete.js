import React, { Component } from 'react';
import { connect } from 'react-redux';

import './create-line-end-all-inputs-module.css';
import * as actions from '../../../actions';

class CreateLineEndAllInputsComplete extends Component {
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

        console.log('create-line-end-all-inputs-module-complete component mounted');

        const finalText = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {
            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            // Add the new line to the end of the containerSplitNewLine array for every input container
            containerSplitNewLine.push(charsToAdd);

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
            <div className="create-line-end-all-inputs-function">
                <div className="create-line-end-all-inputs-card card white">
                    <div className="create-line-end-all-inputs-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Create a line at the end of all inputs</p>
                    </div>
                    <div className="row">
                        <div className="create-line-end-all-inputs-description-complete col s12">
                            <div className="user-input-chars">
                                <p>For every input, a new line will be created at the end with the following characters: <b>"{charsToAdd}"</b>.</p>
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

export default connect(mapStateToProps, actions)(CreateLineEndAllInputsComplete);