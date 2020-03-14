import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './preview-additions.css';
import * as actions from '../../../actions';

class PreviewAdditions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { inputContainerDisplay, additionsPreview } = this.props;

        const isPreviewEmpty = _.isEmpty(additionsPreview[inputContainerDisplay]);

        return (
            <div className="preview-additions-text-container">
                <h4 className="grey-text text-darken-1">Preview: Additions</h4>
                <div className="preview-additions-text-box"
                    style={{ fontFamily: 'Courier' }}>
                    <div className="preview-additions-text">
                        {isPreviewEmpty === true ? (
                            <div className="additions-preview-empty">
                                <span>[1] [every line is deleted]</span>

                            </div>
                        ) : (
                                <div className="additions-preview-not-empty">
                                    {additionsPreview[inputContainerDisplay]}
                                </div>

                            )}
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
        additionsPreview: state.textRed.additionsPreview,
        inputContainerDisplay: state.textRed.inputContainerDisplay
    };
};

export default connect(mapStateToProps, actions)(PreviewAdditions);