import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';

import './parseit-code.css';
import * as actions from '../../../actions';

class ParseItCode extends Component {
    constructor(props) {
        super(props);
    }

    handleCodeChange = e => {
        const { updateCodeText } = this.props;
        updateCodeText(e.target.value);
    }

    render() {
        // debugger;
        const { codeText } = this.props;
        console.log('codeText Reducer', codeText);

        return (
            <div className="parseit-code-component">
                <h5>ParseIt Code</h5>
                <div className="parseit-code-text" style={{ fontFamily: 'Courier' }}>
                    <TextareaAutosize
                        onChange={this.handleCodeChange}
                        value={codeText}
                    />
                </div>
                <button
                    className="waves-effect waves-light btn blue lighten-1 submit-parseit-code-button"
                >Submit ParseIt Code</button>
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