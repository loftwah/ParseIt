import React, { Component } from 'react';
import { connect } from 'react-redux';

import './output-text.css';
import * as actions from '../../actions';

class OutputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputContainerDisplay: 0
        }
    }

    handleRadioButtonOnChange = e => {
        const containerNumber = Number(e.target.className)
        this.setState({
            inputContainerDisplay: containerNumber
        })
    }

    render() {
        const { outputText } = this.props;
        const { inputContainerDisplay } = this.state
        // Toggle between inputContainers

        let inputContainerButtons = outputText.map(containerOutput => {
            let key = Math.random();
            if (containerOutput.inputContainer === inputContainerDisplay) {
                return (
                    <div className="container" key={key}>
                        <p>
                            <label>
                                <input name="input-container-group" type="radio" required defaultChecked={true} onClick={this.handleRadioButtonOnChange}
                                    className={containerOutput.inputContainer}
                                    /* value={containerOutput.inputContainer}*/
                                    value={key} />
                                <span>{containerOutput.name}</span>
                            </label>
                        </p>
                    </div>
                )
            } else {
                return (
                    <div className="container" key={key}>
                        <p>
                            <label>
                                <input name="input-container-group" type="radio" defaultChecked={false} onClick={this.handleRadioButtonOnChange}
                                    className={containerOutput.inputContainer}
                                    /* value={containerOutput.inputContainer*/
                                    value={key} />
                                <span>{containerOutput.name}</span>
                            </label>
                        </p>
                    </div>
                )
            }
        })

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
                    <p className="line-text">&#160;</p>
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
                <br />

                <div className="card-panel white">
                    <p>Display inputContainers</p>
                    <form action="#">
                        {inputContainerButtons}
                    </form>
                </div>

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
    };
};

export default connect(mapStateToProps, actions)(OutputText);