import React, { Component } from 'react';
import { connect } from 'react-redux';

import './concatenate-module.css';
import * as actions from '../../../actions';

class ConcatenateModule extends Component {
    constructor(props) {
        super(props);
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

        const moduleCode = "ConcatenateModule";
        handleModuleCode({
            code: moduleCode,
            id: id
        });

        completeModule(id);
        moduleActiveOff();
    }

    render() {
        return (
            <div className="concatenate-function">
                <div className="concatenate-card card white">
                    <div className="concatenate-card-content card-content black-character">
                        <button
                            className="waves-effect waves-light btn #42a5f5 red lighten-1 submit-form-button"
                            onClick={this.handleDelete}
                        >Delete</button>
                        <span className="card-title center">Module: Concatenate On One Line</span>
                    </div>
                    <div className="row">
                        <div className="concatenate-description col s12">
                            <p>This module will concatenate all lines of an input into one line.</p>
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

export default connect(mapStateToProps, actions)(ConcatenateModule);