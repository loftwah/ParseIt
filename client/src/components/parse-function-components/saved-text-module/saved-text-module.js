import React, { Component } from 'react';
import { connect } from 'react-redux';

import './saved-text-module.css';
import * as actions from '../../../actions';

class SavedTextModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedTextName: '',
        };
    }

    handleSavedTextName = e => {
        this.setState({
            savedTextName: e.target.value
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id, moduleActiveOff } = this.props;
        handleDeleteModule(id);
        moduleActiveOff();
    }

    handleSubmit = e => {
        e.preventDefault();
        const { handleModuleCode, id, moduleActiveOff, completeModule } = this.props;
        const { savedTextName } = this.state;

        const moduleCode = "SaveTextModule" + " \"(" + savedTextName + ")\"";
        handleModuleCode({
            code: moduleCode,
            id: id
        });

        completeModule(id, savedTextName);
        moduleActiveOff();
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
                            <div className="save-text-name col s12">
                                <span>Saved Text Name: </span>
                                <div className="save-text-name-user-input replace input-field inline">
                                    <input
                                        type="text"
                                        id="save-text-name-input"
                                        onChange={this.handleSavedTextName}
                                        value={savedTextName}
                                    />
                                    <label htmlFor="save-text-name-input"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-action preview-submit">
                        <a
                            href="!#"
                            onClick={this.handleSubmit}
                        >Submit</a>
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

export default connect(mapStateToProps, actions)(SavedTextModule);