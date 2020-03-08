import React, { Component } from 'react';
import { connect } from 'react-redux';

import './output-text.css';
import * as actions from '../../actions';

class OutputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineNumbersVisible: true
        }
    }

    handleToggleLineNumbers = e => {
        e.preventDefault();
        const { lineNumbersVisible } = this.state;

        // toggle lineNumberVisibility
        this.setState({
            lineNumbersVisible: !lineNumbersVisible
        });
    }

    render() {
        const { outputText, inputContainerDisplay } = this.props;
        const { lineNumbersVisible } = this.state;

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
                    {lineNumbersVisible === true ? (
                        <span className="line-number">[{idx}]&#160;</span>
                    ) : (
                            <span className="empty"></span>
                        )}
                    <p className="line-text">&#x200B;</p>
                </div>)
            } else {
                return (<div className="line" key={idx}>
                    {lineNumbersVisible === true ? (
                        <span className="line-number">[{idx}]&#160;</span>
                    ) : (
                            <span className="empty"></span>
                        )}
                    <p className="line-text">{line}</p>
                </div>)
            }
        })

        // Button functionality
        const buttonText = lineNumbersVisible === true ? "On" : "Off";
        const iconImg = lineNumbersVisible === true ? "visibility" : "visibility_off";

        return (
            // Display all possible inputContainers
            <div className="input-text-container">
                <h4 className="grey-text text-darken-1">Output Text</h4>
                <div className="output-text-box">
                    <div className="output-text">
                        {createOutput}
                    </div>
                </div>
                <br />

                <a className={`waves-effect waves-light btn toggle-line-numbers ${buttonText}`}
                    onClick={this.handleToggleLineNumbers}
                >
                    <i className="material-icons line-number-visible-img">{iconImg}</i>
                    Line Numbers Visible: {buttonText}
                </a>
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