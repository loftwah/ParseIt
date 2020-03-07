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
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="saved-text-function">
                <div className="saved-text-card card white">
                    <div className="saved-text-card-content card-content black-character">
                        <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Save Text and Get Original Text</span>
                    </div>
                    <div className="row">
                        <div className="saved-text-delete col s12">
                            <p>Combine all "Inputs" into a "Saved Text" input.</p>
                            <p>Update the "Inputs" to the original input.</p>
                            <br />
                            <div className="saved-text-name-complete">
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
        moduleActiveToggle: state.textRed.moduleActiveToggle,
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview,
        savedText: state.textRed.savedText
    };
};

export default connect(mapStateToProps, actions)(SavedTextModuleComplete);