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
        this.handleRadioButtonInputDisplayOnChange = this.handleRadioButtonInputDisplayOnChange.bind(this);
        this.handleRadioButtonSavedDisplayOnChange = this.handleRadioButtonSavedDisplayOnChange.bind(this);
    }

    updateAndAnimateRadio = (containerNumber) => {
        const RADIO_BUTTON_ANIMATION_TIME = 200
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.props.updateContainerDisplay(containerNumber);
                this.props.toggleOutputTextOn();
                this.props.toggleSavedTextOff();
                resolve();
            }, RADIO_BUTTON_ANIMATION_TIME)
        })
    }

    // Buttons tied to below function: all "Display Inputs" buttons
    async handleRadioButtonInputDisplayOnChange(e) {
        const containerNumber = Number(e.target.className);
        await this.updateAndAnimateRadio(containerNumber);
    }

    // Buttons tied to below function: all "Display Saved Text" buttons
    async handleRadioButtonSavedDisplayOnChange(e) {
        const container = e.target.className;
        console.log(container)
        if (container.indexOf("saved-text") === 0) {
            // If the user chooses a "saved text" that they have created, show the saved text to them
            const outputSavedTextNum = Number(container.replace("saved-text-", ""));
            this.props.updateSavedTextContainerDisplay(outputSavedTextNum);
        } else if (container === "combine-saves") {
            this.props.updateSavedTextContainerDisplay(container);
        } else if (container === "combine-input-then-saves") {
            this.props.updateSavedTextContainerDisplay(container);
        }
        // await this.updateAndAnimateRadio(containerNumber);
        this.props.toggleOutputTextOff();
        this.props.toggleSavedTextOn();
    }

    render() {
        const { outputText, inputContainerDisplay, savedText, previewToggle } = this.props;
        let { displayContainer } = this.state;

        // Toggle between inputContainers
        let inputContainerButtons = outputText.map(containerOutput => {
            let key = Math.random();
            if (containerOutput.inputContainer === inputContainerDisplay) {
                return (
                    <div className="radio-button-container" key={key}>
                        <p>
                            <label>
                                <input name="input-container-group" type="radio" defaultChecked={true} onChange={this.handleRadioButtonInputDisplayOnChange}
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
                    <div className="radio-button-container" key={key}>
                        <p>
                            <label>
                                <input name="input-container-group" type="radio" defaultChecked={false} onChange={this.handleRadioButtonInputDisplayOnChange}
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


        let savedTextContainerButtons
        if (savedText.length === 0) {
            savedTextContainerButtons = (
                <div className="no-saved-text">
                    No Saved Text to Display
                </div>
            )
        } else {
            // Toggle between savedText
            savedTextContainerButtons = savedText.map((savedContainerOutput, idx) => {
                let key = Math.random();
                return (
                    <div className="radio-button-container" key={key}>
                        <p>
                            <label>
                                <input name="input-container-group"
                                    type="radio"
                                    defaultChecked={false}
                                    onClick={this.handleRadioButtonSavedDisplayOnChange}
                                    className={`saved-text-${idx}`}
                                    value={key} />
                                <span>{savedText[idx].name}</span>
                            </label>
                        </p>
                    </div>
                )
            })

            savedTextContainerButtons = [...savedTextContainerButtons, (
                <div className="saved-text-functions" key="saved-text-functions">
                    <p>
                        <label>
                            <input name="input-container-group" type="radio" onClick={this.handleRadioButtonSavedDisplayOnChange}
                                className='combine-saves'
                                value={"some key"} />
                            <span>Combined Saves</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="input-container-group" type="radio" onClick={this.handleRadioButtonSavedDisplayOnChange}
                                className='combine-input-then-saves'
                                value={"some key"} />
                            <span>Combined by Input, and Then Combined Saves</span>
                        </label>
                    </p>
                </div>
            )]

        }

        // Saved Text - last two buttons for combining
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
                <div className="toggle-container">
                    <div className="row toggle-container card-panel white">

                        <form action="#" className="radio-button-form col s12 m12 l12">
                            <div className="input-container-toggle col s12 m12 l5 offset-l1">
                                <h5>Display Inputs</h5>
                                {inputContainerButtons.length !== 0 ? (
                                    <div className="container-buttons">
                                        {inputContainerButtons}
                                    </div>
                                ) : (
                                        <div className="no-container-buttons">
                                            No Inputs to Display
                                    </div>
                                    )}
                            </div>

                            {previewToggle === true ? (
                                <div className="display-saved-text-hidden"></div>
                            ) : (
                                    <div className="saved-container-toggle col s12 m12 l5 offset-l1">
                                        <h5>Display Saved Text</h5>
                                        {savedTextContainerButtons}
                                    </div>
                                )}

                        </form>
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
        inputContainerDisplay: state.textRed.inputContainerDisplay,
        savedText: state.textRed.savedText,
        previewToggle: state.textRed.previewToggle,
    };
};

export default connect(mapStateToProps, actions)(InputContainerRadio);