import React, { Component } from 'react';
import { connect } from 'react-redux';

import './preview-additions.css';
import * as actions from '../../../actions';

class PreviewAdditions extends Component {
    constructor(props) {
        super(props);
    }

    // When component updates, turn output text into input text?
    componentDidUpdate() {
        const { updateInputText, outputText } = this.props
        // updateInputText(outputText)
    }

    render() {
        // may get rid of "outputText " variable?
        const { inputContainerDisplay, additionsPreview } = this.props;

        return (
            <div className="preview-additions-text-container">
                <h4 className="black-text"><b>PREVIEW MODE: ADDITIONS TEXT</b></h4>
                <div className="preview-additions-text-box"
                    style={{ fontFamily: 'Courier' }}> 
                    <div className="preview-additions-text">
                        {additionsPreview[inputContainerDisplay]}
                        {/* <p>More <span style={{background: "red"}}>input</span> hi</p>
                        <p>More <span style={{background: "rgb(74, 255, 83)"}}>input</span> hi</p> */}
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