import React, { Component } from 'react';
import { connect } from 'react-redux';

import './saved-text-module.css';
import * as actions from '../../../actions';
import { savedTextValidation } from './saved-text-module-validation';

class SavedTextModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedTextName: '',
            errorMsg: '',
        };
    }

    handleSavedTextName = e => {
        this.setState({
            savedTextName: e.target.value,
            errorMsg: ''
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

        const moduleCode = "SaveText" + " \"(" + savedTextName + ")\"";

        const validationTest = savedTextValidation(savedTextName);
        if (validationTest.valid === false) {
            // create error message and return out
            this.setState({
                errorMsg: validationTest.error
            });
            return;
        }

        handleModuleCode({
            code: moduleCode,
            id: id
        });

        completeModule(id, savedTextName);
        moduleActiveOff();
    }

    render() {
        const { savedTextName } = this.state;
        let { errorMsg } = this.state;
        let errorMsgJSX;
        if (errorMsg !== "") {
            errorMsg = errorMsg.split('\n');
            errorMsgJSX = errorMsg.map((errLine, idx) => {
                return <p key={idx}>{errLine}</p>
            });
        }
        return (
            <div className="saved-text-function">
                <div className="saved-text-card card white">
                    <div className="saved-text-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <span className="card-title center">Module: Save Text and Get Original Text</span>
                    </div>
                    <div className="row">
                        <div className="saved-text-delete col s12">
                            <p>This module will combine all of your current "Inputs" into a "Saved Text" input.</p>
                            <p>This module will also update the "Inputs" to the original input, if you wish to keep parsing.</p>
                            <br />
                            <div className="save-text-name">
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
                                {errorMsg === "" ? (
                                    <div className="no-error-msg">
                                    </div>
                                ) : (
                                        <div className="error-msg">
                                            {errorMsgJSX}
                                        </div>
                                    )}
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