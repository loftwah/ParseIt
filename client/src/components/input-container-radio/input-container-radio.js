import React, { Component } from 'react';
import { connect } from 'react-redux';

import './input-container-radio.css';
import * as actions from '../../actions';

class InputContainerRadio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayContainer: 0 // may delete in the future
        }
        this.handleRadioButtonOnChange = this.handleRadioButtonOnChange.bind(this);
    }

    updateAndAnimateRadio = (containerNumber) => {
        const RADIO_BUTTON_ANIMATION_TIME = 200
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.props.updateContainerDisplay(containerNumber);
                resolve();
            }, RADIO_BUTTON_ANIMATION_TIME)
        })
    }

    async handleRadioButtonOnChange(e) {
        const containerNumber = Number(e.target.className);
        await this.updateAndAnimateRadio(containerNumber);
    }

    render() {
        const { outputText, inputContainerDisplay } = this.props;
        let { displayContainer } = this.state;

        // Toggle between inputContainers
        let inputContainerButtons = outputText.map(containerOutput => {
            let key = Math.random();
            if (containerOutput.inputContainer === inputContainerDisplay) {
                return (
                    <div className="container" key={key}>
                        <p>
                            <label>
                                <input name="input-container-group" type="radio" defaultChecked={true} onChange={this.handleRadioButtonOnChange}
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
                                <input name="input-container-group" type="radio" defaultChecked={false} onChange={this.handleRadioButtonOnChange}
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
            outputSplitNewLine = outputText[displayContainer].text.split('\n');
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
        inputContainerDisplay: state.textRed.inputContainerDisplay
    };
};

export default connect(mapStateToProps, actions)(InputContainerRadio);