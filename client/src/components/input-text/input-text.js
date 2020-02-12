import React, { Component } from 'react';
import { connect } from 'react-redux';

import './input-text.css';
import * as actions from '../../actions';
import InputPDF from '../input-PDF/input-PDF';

class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleTextbox: true,
            togglePDF: false,
            textboxNumber: 0, // Development: 2
        };
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    // don't need async at the moment
    async handleTextareaChange(e) {
        const { inputText } = this.props;

        let textboxNum = Number(e.target.className.replace('input-text ', ''));
        let name = "Textbox " + (textboxNum + 1); // The user would rather index at 1

        // Create a new inputText state

        // create a new container
        const newContainer = {
            inputContainer: textboxNum,
            text: e.target.value,
            name: name
        }

        // find the inputContainer that is being changed and replace it with a new container
        const newInputContainerList = [];
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i].inputContainer !== newContainer.inputContainer) {
                newInputContainerList.push(inputText[i]);
            } else {
                newInputContainerList.push(newContainer);
            }
        }
        this.props.updateInputText(newInputContainerList);
        this.props.updateOutputText(newInputContainerList);
    }

    handleInputSubmit = e => {
        e.preventDefault();
        // Future: lock the textarea?
        // Why? If we start writing here, it will most likely overwrite the parsing modules
        // Therefore: we can have this button load up the parsing modules
    }

    handleToggleTextboxOn = e => {
        this.setState({
            toggleTextbox: true,
            togglePDF: false,
        })
    }

    handleTogglePDFOn = e => {
        this.setState({
            toggleTextbox: false,
            togglePDF: true,
        })
    }

    handleTextboxNumChange = e => {
        // input display will default to 0

        const { updateContainerDisplay, updateInputText, updateOutputText } = this.props;
        updateContainerDisplay(0);

        const numTextboxes = Number(e.target.value.split(' ')[0]);
        this.setState({
            textboxNumber: numTextboxes
        })

        // create initial inputText
        let initInputText = [];
        for (let i = 0; i < numTextboxes; i++) {
            initInputText.push({
                inputContainer: i,
                text: '',
                name: `Textbox ${i + 1}` // initialize the textboxes indexing at 0 for the user
            })
        }
        updateInputText(initInputText);
        updateOutputText(initInputText);
    }

    render() {
        let { toggleTextbox, togglePDF, textboxNumber } = this.state;
        const { inputText } = this.props;

        // Dev: Instantly view the PDF input
        // toggleTextbox = false;
        // togglePDF = true;

        let textboxNumberSelect = [];
        const minNumber = 1;
        const maxNumber = 5;
        for (let i = minNumber; i <= maxNumber; i++) {
            if (i === 1) {
                textboxNumberSelect.push(`${i} Textbox`)
            } else {
                textboxNumberSelect.push(`${i} Textboxes`)
            }
        }
        const sizeList = textboxNumberSelect.map(number => {
            return (
                <option className="canvas-size-dropdown-options"
                    value={number}
                    key={number}>
                    {number}
                </option>
            );
        });

        const textBoxList = [];

        for (let i = 0; i < textboxNumber; i++) {
            textBoxList.push(
                <div className={`textbox-${i}`} key={i}>
                    <form onSubmit={this.handleSubmit}>
                        <textarea className={`input-text ${i}`}
                            onChange={this.handleTextareaChange}
                            disabled={false}
                            value={inputText[i].text}>
                        </textarea>
                    </form>
                </div>
            )
        }

        return (
            <div className="input-text-container">
                <div className="input-type">
                    <br />
                    <button
                        className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-form-button input-text-select"
                        onClick={this.handleToggleTextboxOn}
                    >Textbox</button>
                    <button
                        className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-form-button pdf-text-select"
                        onClick={this.handleTogglePDFOn}
                    >PDF</button>
                </div>

                {toggleTextbox === true && togglePDF === false ? (
                    <div className="textbox-input">
                        <h4 className="black-text"><b>INPUT TEXT</b></h4>

                        <select className="browser-default textbox-number-dropdown-menu"
                            onChange={this.handleTextboxNumChange} defaultValue={1}>
                            <option value=''>-- Choose Number of Textboxes --</option>
                            {sizeList}
                        </select>
                        {[...textBoxList]}
                        <button
                            className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-form-button"
                            onClick={this.handleInputSubmit}
                        >Start Parsing</button>
                    </div>
                ) : (
                        <div className="pdf-input">
                            <InputPDF />
                        </div>
                    )}

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

export default connect(mapStateToProps, actions)(InputText);