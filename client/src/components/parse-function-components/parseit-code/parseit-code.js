import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';

import './parseit-code.css';
import * as actions from '../../../actions';
import { cleanDoubleQuotes } from '../universal-functions-for-modules/universal-functions-for-modules';

class ParseItCode extends Component {
    constructor(props) {
        super(props);
    }

    handleCodeChange = e => {
        const { updateCodeText } = this.props;
        updateCodeText(e.target.value);
    }

    handleSubmitCode = e => {
        // notify the container that we would like to update:
        // 1: The list of modules
        // 2: The output text
        let { codeText } = this.props; // reducer state
        const { moduleActiveOff, togglePreviewOff } = this.props; // actions
        const { parseItCode } = this.props; // passed in props

        // clean quotes
        codeText = cleanDoubleQuotes(codeText);

        parseItCode(codeText);
        moduleActiveOff();
        togglePreviewOff();
    }

    render() {
        // debugger;
        const { codeText } = this.props;
        let { errorMsg } = this.props;

        // convert errorMsg to JSX
        errorMsg = errorMsg.split('\n');
        const errorMsgJSX = errorMsg.map((line, idx) => {
            return <p key={idx}>{line}</p>
        })

        return (
            <div className="parseit-code-component">
                <h2 className="parseit-code-title red-text text-lighten-3">ParseIt Code</h2>
                <div className="parseit-code-text" style={{ fontFamily: 'Courier' }}>
                    <TextareaAutosize
                        onChange={this.handleCodeChange}
                        value={codeText}
                    />
                </div>
                <div className="error-msg">{errorMsgJSX}</div>
                <button
                    className="waves-effect waves-light btn blue lighten-1 submit-parseit-code-button"
                    onClick={this.handleSubmitCode}>
                    <i className="material-icons left">code</i>
                    <i className="material-icons right">send</i>
                    Submit ParseIt Code
                </button>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        inputText: state.textRed.inputText,
        outputText: state.textRed.outputText,
        codeText: state.textRed.codeText,
        previewToggle: state.textRed.previewToggle,
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview
    };
};

export default connect(mapStateToProps, actions)(ParseItCode);