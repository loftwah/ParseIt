import React, { Component } from 'react';
import { connect } from 'react-redux';

import './delete-line-if-doesnt-have-characters-module.css';
import * as actions from '../../../actions';

class DeleteLineIfDoesntHaveCharactersComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chars: '',
        };
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, updateOutputText } = this.props;
        const { chars } = this.props;
        this.setState({
            chars
        });
        console.log('delete-line-if-doesnt-have-characters-module-complete component mounted');

        let found;
        const finalText = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let newText = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {
                let line = containerSplitNewLine[i];

                // Does the line contain the user input of "chars"?
                found = line.indexOf(chars) !== -1 ? true : false;

                if (found === true) {
                    newText.push(line);
                }
            }

            const finalTextContainer = newText.join('\n');

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
        const { chars } = this.props;

        return (
            <div className="delete-line-if-doesnt-have-characters-function">
                <div className="delete-line-if-doesnt-have-characters-card card white">
                    <div className="delete-line-if-doesnt-have-characters-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Delete Line if it Doesn't Contains a Set of Characters</p>
                    </div>
                    <div className="row">
                        <div className="delete-line-if-doesnt-have-characters-description-complete col s12">
                            <p>Delete all lines that contain the characters: <b>"{chars}"</b>.</p>
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

export default connect(mapStateToProps, actions)(DeleteLineIfDoesntHaveCharactersComplete);