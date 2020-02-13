import React, { Component } from 'react';
import { connect } from 'react-redux';

import './saved-text-module.css';
import * as actions from '../../../actions';

class SavedTextModuleComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedTextName: '',
        };
    }

    componentDidMount() {
        // update the savedText in here
        const { outputText, savedTextName, updateOutputText, updateSavedText, savedText, inputText } = this.props;
        this.setState({
            savedTextName: savedTextName,
        })

        const savedTextItem = {
            inputContainers: outputText,
            name: savedTextName
        }

        const newSavedTextState = [...savedText, savedTextItem]

        // put the saved text inside the savedText reducer state
        updateSavedText(newSavedTextState)

        // update the outputText to the original text for further parsing
        updateOutputText(inputText);
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id } = this.props;
        handleDeleteModule(id);
    }

    render() {
        const { savedTextName } = this.state;
        return (
            <div className="saved-text-function">
                <h4 className="black-character"><b>SAVED TEXT</b></h4>
                <div className="saved-text-card card white">
                    <div className="saved-text-card-content card-content black-character">
                        <button
                            className="waves-effect waves-light btn #42a5f5 red lighten-1 submit-form-button"
                            onClick={this.handleDelete}
                        >Delete</button>
                        <span className="card-title center">Module: Save Text and Get Original Text</span>
                    </div>
                    <div className="row">
                        <div className="saved-text-delete col s12">
                            <p>This module will combine all of your current "Inputs" into a "Saved Text" input.</p>
                            <p>This module will also update the "Inputs" to the original input, if you wish to keep parsing.</p>
                            <br />
                            <div className="saved-text-name-complete col s12">
                                <p>Saved Text Name: "{savedTextName}"</p>
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

export default connect(mapStateToProps, actions)(SavedTextModuleComplete);