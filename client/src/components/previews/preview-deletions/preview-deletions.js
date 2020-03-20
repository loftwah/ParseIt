import React, { Component } from 'react';
import { connect } from 'react-redux';

import './preview-deletions.css';
import * as actions from '../../../actions';

class PreviewDeletions extends Component {

    render() {
        const { inputContainerDisplay, deletionsPreview } = this.props;

        return (
            <div className="preview-deletions-text-container">
                <h4 className="grey-text text-darken-1">Preview: Deletions</h4>
                <div className="preview-deletions-text-box"
                    style={{ fontFamily: 'Courier' }}>
                    <div className="preview-deletions-text">
                        {deletionsPreview[inputContainerDisplay]}
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
        deletionsPreview: state.textRed.deletionsPreview,
        inputContainerDisplay: state.textRed.inputContainerDisplay
    };
};

export default connect(mapStateToProps, actions)(PreviewDeletions);