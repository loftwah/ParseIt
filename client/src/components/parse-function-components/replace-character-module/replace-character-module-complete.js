import React, { Component } from 'react';
import { connect } from 'react-redux';

import './replace-character-module.css';
import * as actions from '../../../actions';
import { replaceAndInsertChar } from './replace-character-module-functions';

class ReplaceCharacterModuleComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replaceCharacter: '',
            insertCharacter: '',
        };
    }

    componentDidMount() {
        // handle output text and convert it in here
        const { outputText, replaceCharacter, insertCharacter, updateOutputText } = this.props;
        this.setState({
            replaceCharacter: replaceCharacter,
            insertCharacter: insertCharacter
        })

        const finalText = []
        let finalTextContainer
        for (let i = 0; i < outputText.length; i++) {
            finalTextContainer = replaceAndInsertChar(outputText[i].text, replaceCharacter, insertCharacter);
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
        const { insertCharacter, replaceCharacter } = this.state;
        const { id, moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="replace-character-function">
                <div className="replace-character-card card white">
                    <div className="replace-character-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Replace Characters</span>
                    </div>
                    <div className="row">
                        <div className="replace-character-complete col s12">
                            <p>Replace the characters: "{replaceCharacter}"</p>
                            <p>With the characters: "{insertCharacter}"</p>
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

export default connect(mapStateToProps, actions)(ReplaceCharacterModuleComplete);