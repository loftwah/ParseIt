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
            disablePDFbtn: false,
            // localInputText: [], // Production
            localInputText: [{ inputContainer: 0, text: 'hello  world, inputContainer 0\n good   stuff right      now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 1" }, { inputContainer: 1, text: 'hello world, THIS IS inputContainer 1\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 2" }] // Development
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
        const { localInputText } = this.state;

        let textboxNum = Number(e.target.className.replace('input-text ', ''));
        let name = localInputText[textboxNum].name;

        // Create a new localInputText state

        // create a new container
        const newContainer = {
            inputContainer: textboxNum,
            text: e.target.value,
            name: name
        }

        // find the inputContainer that is being changed and replace it with a new container
        const newInputContainerList = [];
        for (let i = 0; i < localInputText.length; i++) {
            if (localInputText[i].inputContainer !== newContainer.inputContainer) {
                newInputContainerList.push(localInputText[i]);
            } else {
                newInputContainerList.push(newContainer);
            }
        }
        this.setState({
            localInputText: newInputContainerList
        })
    }

    handleInputSubmit = e => {
        e.preventDefault();

        // This Submit will also submit anything in our ParseIt code reducer (in case we want to update the text)
        const { initializeCodeToggle, updateInputText, updateOutputText, codeText } = this.props;
        const { localInputText } = this.state;


        updateInputText(localInputText);
        updateOutputText(localInputText);

        // If there is no codeText, don't initialize code
        if (codeText !== "") {
            initializeCodeToggle(true);
        }
    }

    handleTextboxTitle = e => {
        const { localInputText } = this.state;

        // className structure: "input #"
        const inputContainer = Number(e.target.className.slice(6));
        const name = e.target.value;

        // update the container
        const updateContainer = {
            inputContainer: inputContainer,
            text: localInputText[inputContainer].text,
            name: name
        };

        // find the inputContainer that is being changed and replace it with a new container
        const newInputContainerList = [];
        for (let i = 0; i < localInputText.length; i++) {
            if (localInputText[i].inputContainer !== updateContainer.inputContainer) {
                newInputContainerList.push(localInputText[i]);
            } else {
                newInputContainerList.push(updateContainer);
            }
        }
        this.setState({
            localInputText: newInputContainerList
        })
    }

    handleToggleTextboxOn = e => {
        this.setState({
            toggleTextbox: true,
            togglePDF: false,
            textboxNumber: 0,
            disableTextBtn: true,
            disablePDFbtn: false,
            localInputText: []
        })

        // Clear everything
        this.props.updateInputText([]);
        this.props.updateOutputText([]);
        this.props.updateCodeText('');
        this.props.updateSavedTextContainerDisplay("combine-saves");
        this.props.updateContainerDisplay(0);
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
            disablePDFbtn: true,
            localInputText: []
        })

        // Clear everything
        this.props.updateInputText([]);
        this.props.updateOutputText([]);
        this.props.updateCodeText('');
        this.props.updateSavedTextContainerDisplay("combine-saves");
        this.props.updateContainerDisplay(0);
        this.props.updateSavedText([]);
        this.props.toggleOutputTextOn()
        this.props.toggleSavedTextOff();
    }

    handleTextboxNumChange = e => {
        const { localInputText } = this.state;
        const { updateContainerDisplay, updateInputText, updateOutputText, updateCodeText } = this.props;

        // input display will default to 0
        updateContainerDisplay(0);

        const numTextboxes = Number(e.target.value.split(' ')[0]);
        this.setState({
            textboxNumber: numTextboxes
        })

        // if num textboxes is 0, delete the codeText
        // Why? 0 hides ParseIt code, when it reappears, it makes sense for everything to be deleted
        if (numTextboxes === 0) {
            updateCodeText("");
        }

        // create initial inputText
        let initInputText = [];
        let text;
        let name;
        for (let i = 0; i < numTextboxes; i++) {
            // if there was previously localInputText in use, use it
            if (localInputText[i] !== undefined) {
                text = localInputText[i].text;
                name = localInputText[i].name;
            } else {
                // If not, we will make a name and text for the user
                text = '';
                name = `Textbox ${i + 1}`; // initialize the textboxes indexing at 1 for the user
            }

            initInputText.push({
                inputContainer: i,
                text: text,
                name: name
            });
        }
        this.setState({
            localInputText: initInputText
        })
    }

    render() {
        let { toggleTextbox, togglePDF, textboxNumber, disableTextBtn, disablePDFbtn, localInputText } = this.state;
        const { inputText } = this.props;

        // Dev: Instantly view the PDF input
        // toggleTextbox = false;
        // togglePDF = true;

        let textboxNumberSelect = [];
        const minNumber = 1;
        const maxNumber = 25;
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
                    <div className={`textbox-title-input ${i}`}>
                        <input
                            className={`input ${i}`}
                            type="text"
                            id={`textbox-title-input ${i}`}
                            onChange={this.handleTextboxTitle}
                            placeholder={`Title: Textbox ${i + 1}`}
                        />
                        <label htmlFor={`textbox-title-input ${i}`}></label>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <textarea className={`input-text ${i}`}
                            onChange={this.handleTextareaChange}
                            disabled={false}
                            value={localInputText[i].text}>
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
        const titleScreen = toggleTextbox === true && togglePDF === false ? 'Parse: Plain Text' : 'Parse: PDF';

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
                        disabled={disablePDFbtn}>
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
                            onChange={this.handleTextboxNumChange}
                            defaultValue={1}>
                            <option value=''>-- Choose Number of Textboxes --</option>
                            {sizeList}
                        </select>
                        {[...textBoxList]}
                        <button
                            className="waves-effect waves-light btn #42a5f5 blue lighten-1 parse-text submit-form-button"
                            onClick={this.handleInputSubmit}>
                            <i className="material-icons left">build</i>
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
        codeText: state.textRed.codeText,
    };
};

export default connect(mapStateToProps, actions)(InputText);