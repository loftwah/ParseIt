import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-beginning-module.css';
import * as actions from '../../../actions';

class DeleteBeginningModuleComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stoppingCharacters: '',
        };
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, stoppingCharacters, updateOutputText } = this.props;
        this.setState({
            stoppingCharacters: stoppingCharacters,
        })
        console.log('delete-beginning-module component mounted');

        const finalText = [];
        for (let inputContainerNum = 0; inputContainerNum < outputText.length; inputContainerNum++) {

            // begin by splitting lines into array items
            const textLines = outputText[inputContainerNum].text.split('\n');
            let newText = [];
            let found = false;

            // will a deletion ever be found?
            if (outputText[inputContainerNum].text.indexOf(stoppingCharacters) == -1) {
                // We will never find stopping characters - output the original text
                finalText.push({
                    inputContainer: outputText[inputContainerNum].inputContainer,
                    text: outputText[inputContainerNum].text,
                    name: outputText[inputContainerNum].name
                })
                continue;
            }

            for (let i = 0; i < textLines.length; i++) {

                let stoppingCharIdx = textLines[i].indexOf(stoppingCharacters);

                if (found === false && textLines[i] === stoppingCharacters && stoppingCharacters == "") {
                    found = true;
                } else if (found === false && stoppingCharIdx !== -1) {
                    found = true;
                    newText.push(textLines[i].slice(stoppingCharIdx));
                } else if (found === true) {
                    newText.push(textLines[i]);
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
        const { stoppingCharacters } = this.props;
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="delete-beginning-function">
                <div className="delete-beginning-card card white">
                    <div className="delete-beginning-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Delete Beginning Until a Phrase</span>
                    </div>
                    <div className="row">
                        <div className="delete-beginning-complete col s12">
                            <p>Delete beginning until the characters: <b>"{stoppingCharacters}"</b></p>
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

export default connect(mapStateToProps, actions)(DeleteBeginningModuleComplete);