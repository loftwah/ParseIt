import React, { Component } from 'react';
import { connect } from 'react-redux';

import './input-container-radio.css';
import * as actions from '../../actions';

class InputContainerRadio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputContainerDisplay: 0
        }
    }

    handleRadioButtonOnChange = e => {
        const containerNumber = Number(e.target.className);
        this.setState({
            inputContainerDisplay: containerNumber
        });
        this.props.updateContainerDisplay(containerNumber);
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

export default connect(mapStateToProps, actions)(InputContainerRadio);