import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import './input-text.css';
import * as actions from '../../actions';
import InputPDF from '../input-PDF/input-PDF';

class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleTextbox: true,
            togglePDF: false,
            textboxNumber: 2, // Development: 2, Production: 0
            disableTextBtn: true,
            dsiablePDFbtn: false,
        };
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    componentDidMount() {
        let modalTextConf = document.querySelectorAll('.modal-textbox');
        M.Modal.init(modalTextConf);

        let modalPdfConf = document.querySelectorAll('.modal-pdf');
        M.Modal.init(modalPdfConf);
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
            disableTextBtn: true,
            dsiablePDFbtn: false
        })

        // Clear everything
        this.props.updateInputText([]);
        this.props.updateOutputText([]);
        this.props.updateCodeText('');
        this.props.updateSavedTextContainerDisplay("combine-saves")
        this.props.updateSavedText([]);
        this.props.toggleOutputTextOn();
        this.props.toggleSavedTextOff();
    }

    handleTogglePDFOn = e => {
        this.setState({
            toggleTextbox: false,
            togglePDF: true,
            textboxNumber: 0,
            disableTextBtn: false,
            dsiablePDFbtn: true
        })

        // Clear everything
        this.props.updateInputText([]);
        this.props.updateOutputText([]);
        this.props.updateCodeText('');
        this.props.updateSavedTextContainerDisplay("combine-saves")
        this.props.updateSavedText([]);
        this.props.toggleOutputTextOn()
        this.props.toggleSavedTextOff();
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
        let { toggleTextbox, togglePDF, textboxNumber, disableTextBtn, dsiablePDFbtn } = this.state;
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

        // only allow the user to toggle textbox from the button IF the input text is empty
        // otherwise, toggle textbox during the modal
        const textBtnCanToggle = inputText.length === 0 ? this.handleToggleTextboxOn : undefined;
        const PDFbtnCanToggle = inputText.length === 0 ? this.handleTogglePDFOn : undefined;
        const canTriggerModal = inputText.length === 0 ? 'no-trigger' : 'modal-trigger';
        const titleScreen = toggleTextbox === true && togglePDF === false ? 'Parse: Plain Text' : 'Parse: PDF Text';

        return (
            <div className="input-text-container">
                <div className="input-type">
                    <br />
                    <h2 className="title-screen red-text text-lighten-3">{titleScreen}</h2>
                    <button
                        className={`waves-effect waves-light btn ${canTriggerModal} submit-form-button input-text-select`}
                        onClick={textBtnCanToggle}
                        href="#modal-text-id"
                        disabled={disableTextBtn}>
                        <i className="material-icons text-field-img">text_fields</i>
                        Textbox
                    </button>

                    <div id="modal-text-id" className="modal modal-textbox">
                        <div className="modal-content">
                            <h4>You Are Currently Working With Text</h4>
                            <p>Changing to the "Textbox" option will require you to discard all PDF input and output data.</p>
                            <p>Would you like to discard your PDF text data?</p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-red btn-flat right">No</a>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat left"
                                onClick={this.handleToggleTextboxOn}>Yes</a>
                        </div>
                    </div>

                    <button
                        className={`waves-effect waves-light btn ${canTriggerModal} #42a5f5 indigo darken-1 submit-form-button input-pdf-text-select`}
                        onClick={PDFbtnCanToggle}
                        href="#modal-pdf-id"
                        disabled={dsiablePDFbtn}>
                        <i className="material-icons pdf-field-img">picture_as_pdf</i>
                        PDF
                    </button>

                    <div id="modal-pdf-id" className="modal modal-pdf">
                        <div className="modal-content">
                            <h4>You Are Currently Working With Text</h4>
                            <p>Changing to the "PDF" option will require you to discard all Textbox input and output data.</p>
                            <p>Would you like to discard your Textbox data?</p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-red btn-flat right">No</a>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat left"
                                onClick={this.handleTogglePDFOn}>Yes</a>
                        </div>
                    </div>
                </div>

                {toggleTextbox === true && togglePDF === false ? (
                    <div className="textbox-input">

                        <select className="browser-default textbox-number-dropdown-menu"
                            onChange={this.handleTextboxNumChange} defaultValue={1}>
                            <option value=''>-- Choose Number of Textboxes --</option>
                            {sizeList}
                        </select>
                        {[...textBoxList]}
                        <button
                            className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-form-button"
                            onClick={this.handleInputSubmit}>
                            <i className="material-icons right">send</i>
                            Parse The Above Text</button>
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