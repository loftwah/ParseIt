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
        for (let i = 0; i < outputText.length; i++) {

            // begin by splitting lines into array items
            const textLines = outputText[i].text.split('\n');
            let newText = [];
            let found = false;
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
                inputContainer: outputText[i].inputContainer,
                text: finalTextContainer,
                name: outputText[i].name
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
        const { id } = this.props;
        return (
            <div className="delete-beginning-function">
                <h4 className="black-character"><b>DELETE TEXT</b></h4>
                <div className="delete-beginning-card card white">
                    <div className="delete-beginning-card-content card-content black-character">
                        <button
                            className="waves-effect waves-light btn #42a5f5 red lighten-1 submit-form-button"
                            onClick={this.handleDelete}
                        >Delete</button>
                        <span className="card-title center">Module: Delete Beginning Until Set of Characters</span>
                    </div>
                    <div className="row">
                        <div className="delete-beginning-delete col s12">
                            <span>Delete beginning until the characters: </span>
                            <div className="delete-beginning-user-input input-field inline">
                                <input
                                    type="text"
                                    id={`replace-delete-input ${id}`}
                                    value={stoppingCharacters}
                                    disabled={true}
                                />
                                <label htmlFor="replace-delete-input"></label>
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
        additionsPreview: state.textRed.additionsPreview
    };
};

export default connect(mapStateToProps, actions)(DeleteBeginningModuleComplete);