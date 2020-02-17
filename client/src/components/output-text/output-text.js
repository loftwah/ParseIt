import React, { Component } from 'react';
import { connect } from 'react-redux';

import './output-text.css';
import * as actions from '../../actions';

class OutputText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { outputText, inputContainerDisplay } = this.props;
        // Toggle between inputContainers

        let outputSplitNewLine;
        if (outputText.length === 0) {
            outputSplitNewLine = [];
        } else {
            outputSplitNewLine = outputText[inputContainerDisplay].text.split('\n');
        }

        const createOutput = outputSplitNewLine.map((line, idx) => {
            idx = idx + 1
            if (line === "") {
                return (<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">&#x200B;</p>
                </div>)
            } else {
                return (<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className="line-text">{line}</p>
                </div>)
            }
        })
        return (
            // Display all possible inputContainers
            <div className="input-text-container">

                <h4 className="black-text"><b>OUTPUT TEXT</b></h4>
                <div className="output-text-box">
                    <div className="output-text">
                        {createOutput}
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
        inputContainerDisplay: state.textRed.inputContainerDisplay
    };
};

export default connect(mapStateToProps, actions)(OutputText);