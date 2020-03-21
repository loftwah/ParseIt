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
            textboxNumber: 0,
            disableTextBtn: true,
            disablePDFbtn: false,
            localInputText: []
        };
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.toggleTextbox === false && prevState.togglePDF === true
            && this.state.toggleTextbox === true && this.state.togglePDF === false) {

            // When toggling between Text and PDF, the Dummy Text modal will disappear
            // If toggling back, we want to initialize the Dummy Text modal again
            let modalDummyTextConf = document.querySelectorAll('.modal-dummy-text');
            M.Modal.init(modalDummyTextConf);
        }
    }

    componentDidMount() {
        const { moduleActiveOff, togglePreviewOff, inputText,
            toggleTextboxReducer, localInputTextReducer } = this.props;

        let modalTextConf = document.querySelectorAll('.modal-textbox');
        M.Modal.init(modalTextConf);

        let modalPdfConf = document.querySelectorAll('.modal-pdf');
        M.Modal.init(modalPdfConf);

        let modalDummyTextConf = document.querySelectorAll('.modal-dummy-text');
        M.Modal.init(modalDummyTextConf);

        // Case: user goes to navbar, and then back to the home page
        // We need to update the visual states of this component and parse-it code component

        // Show either PDF or Plain text page - whatever the user was working on previously
        switch (toggleTextboxReducer) {
            case (true):
                this.setState({
                    toggleTextbox: true,
                    togglePDF: false,
                    disableTextBtn: true,
                    disablePDFbtn: false,
                });
                break;
            case (false):
                this.setState({
                    toggleTextbox: false,
                    togglePDF: true,
                    disableTextBtn: false,
                    disablePDFbtn: true,
                });
                break;
            default:
                console.log("toggleTextboxReducer is not defined")
        }

        // If there is input text found inside the reducer, set the state here to match the text
        if (inputText.length !== 0) {
            this.setState({
                textboxNumber: inputText.length,
                localInputText: inputText
            });
            moduleActiveOff();
            togglePreviewOff();
        } else if (localInputTextReducer.length !== 0) {
            // otherwise, insert the reducer's localInputText
            this.setState({
                textboxNumber: localInputTextReducer.length,
                localInputText: localInputTextReducer
            });
        } else {
            // Development dummy text - delete if production
            // this.setState({
            //     localInputText: [{ inputContainer: 0, text: 'hello  world, inputContainer 0\n good   stuff right      now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 1" }, { inputContainer: 1, text: 'hello world, THIS IS inputContainer 1\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 2" }],
            //     textboxNumber: 2
            // })

            this.setState({
                localInputText: [{ inputContainer: 0, text: '', name: "Textbox 1" }],
                textboxNumber: 1
            })
        }

    }

    // don't need async at the moment
    async handleTextareaChange(e) {
        const { localInputText } = this.state;
        const { updateLocalText } = this.props;

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
        updateLocalText(newInputContainerList);
    }

    handleInputSubmit = e => {
        e.preventDefault();

        // This Submit will also submit anything in our ParseIt code reducer (in case we want to update the text)
        const { initializeCodeToggle, moduleActiveOff, updateInputText, updateOutputText, updateLocalText,
            togglePreviewOff, codeText } = this.props;
        const { localInputText } = this.state;

        // Before submitting, clean up all "odd" double-spaces inside text and name
        let cleanedLocalInput = [];
        for (let containerIdx = 0; containerIdx < localInputText.length; containerIdx++) {
            let container = localInputText[containerIdx];
            let containerText = container.text;
            let containerName = container.name;
            while (containerText.indexOf("”") !== -1) {
                containerText = containerText.replace("”", "\"");
            }

            while (containerText.indexOf("“") !== -1) {
                containerText = containerText.replace("“", "\"");
            }

            while (containerName.indexOf("”") !== -1) {
                containerName = containerName.replace("”", "\"");
            }

            while (containerName.indexOf("“") !== -1) {
                containerName = containerName.replace("“", "\"");
            }

            container.text = containerText;
            container.name = containerName;
            cleanedLocalInput.push(container)
        }

        this.setState({
            cleanedLocalInput
        });

        updateInputText(cleanedLocalInput);
        updateOutputText(cleanedLocalInput);
        updateLocalText(cleanedLocalInput);

        moduleActiveOff();
        togglePreviewOff();

        // If there is no codeText, don't initialize code
        // Only initialize if there's codeText
        if (codeText !== "") {
            initializeCodeToggle(true);
        }
    }

    handleTextboxTitle = e => {
        const { localInputText } = this.state;
        const { updateLocalText } = this.props;

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
        updateLocalText(newInputContainerList);
    }

    handleToggleTextboxOn = e => {
        const { updateInputText, updateOutputText, updateCodeText, updateSavedTextContainerDisplay,
            updateContainerDisplay, updateSavedText, toggleOutputTextOn, toggleSavedTextOff,
            moduleActiveOff, togglePreviewOff, toggleTextboxOn, togglePdfOff } = this.props
        this.setState({
            toggleTextbox: true,
            togglePDF: false,
            textboxNumber: 0,
            disableTextBtn: true,
            disablePDFbtn: false,
            localInputText: []
        })

        // Clear everything
        updateInputText([]);
        updateOutputText([]);
        updateCodeText('');
        updateSavedTextContainerDisplay("combine-saves");
        updateContainerDisplay(0);
        updateSavedText([]);
        toggleOutputTextOn();
        toggleSavedTextOff();
        moduleActiveOff();
        togglePreviewOff();

        // Let the reducer know that we are working inside the Plain Text component
        toggleTextboxOn();
        togglePdfOff();

        this.setState({
            localInputText: [{ inputContainer: 0, text: '', name: "Textbox 1" }],
            textboxNumber: 1
        })
    }

    handleTogglePDFOn = e => {
        const { updateInputText, updateOutputText, updateCodeText, updateSavedTextContainerDisplay,
            updateContainerDisplay, updateSavedText, toggleOutputTextOn, toggleSavedTextOff,
            moduleActiveOff, togglePreviewOff, togglePdfOn, toggleTextboxOff } = this.props
        this.setState({
            toggleTextbox: false,
            togglePDF: true,
            textboxNumber: 0,
            disableTextBtn: false,
            disablePDFbtn: true,
            localInputText: []
        })

        // Clear everything
        updateInputText([]);
        updateOutputText([]);
        updateCodeText('');
        updateSavedTextContainerDisplay("combine-saves");
        updateContainerDisplay(0);
        updateSavedText([]);
        toggleOutputTextOn()
        toggleSavedTextOff();
        moduleActiveOff();
        togglePreviewOff();

        // Let the reducer know we are using the PDF component
        togglePdfOn();
        toggleTextboxOff();
    }

    handleTextboxNumChange = e => {
        const { localInputText } = this.state;
        const { updateContainerDisplay, updateCodeText, updateLocalText } = this.props;

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

        updateLocalText(initInputText);
    }

    handleDummyText = e => {
        e.preventDefault();
        const { updateContainerDisplay, updateLocalText, inputText, initializeCodeToggle,
            updateInputText, updateOutputText, moduleActiveOff, togglePreviewOff } = this.props;

        const text1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker   including versions of Lorem Ipsum.";

        const text2 = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\nThe point of using Lorem Ipsum    is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.\nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.\nVarious versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

        const text3 = "Contrary to popular belief, Lorem Ipsum is not simply random text.\nIt has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.\nRichard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,       from a Lorem   Ipsum           passage, and going through the cites of the word in classical literature, discovered the undoubtable source.\n\n\nLorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.\nThis book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n '0123456789😀abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;?@[\\]^_`{|}~'";

        let initInputText = [];

        initInputText.push({ inputContainer: 0, text: text1, name: "Lorem Ipsum Text #1" });
        initInputText.push({ inputContainer: 1, text: text2, name: "Lorem Ipsum Text #2" });
        initInputText.push({ inputContainer: 2, text: text3, name: "Lorem Ipsum Text #3" });

        this.setState({
            textboxNumber: 3,
            localInputText: initInputText
        });

        updateLocalText(initInputText);
        updateContainerDisplay(0);

        // If the user was working with text previously, let's fire up the dummy text
        // When it comes to user-experience, firing up the code seems to be the most natural step at this time
        if (inputText.length !== 0) {
            updateInputText(initInputText);
            updateOutputText(initInputText);

            moduleActiveOff();
            togglePreviewOff();
            initializeCodeToggle(true);
        }

    }

    render() {
        let { toggleTextbox, togglePDF, textboxNumber, disableTextBtn, disablePDFbtn, localInputText } = this.state;
        const { inputText } = this.props;

        // Dev: Instantly view the PDF input
        // toggleTextbox = false;
        // togglePDF = true;

        let textBoxVal = textboxNumber === 1 ? (`${textboxNumber} Textbox`) : (`${textboxNumber} Textboxes`);
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
                            value={localInputText[i].name}
                        />
                        <label htmlFor={`textbox-title-input ${i}`}></label>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <textarea className={`input-text ${i}`}
                            onChange={this.handleTextareaChange}
                            disabled={false}
                            placeholder="Write some text here"
                            value={localInputText[i].text}>
                        </textarea>
                    </form>
                </div>
            )
        }

        // only allow the user to toggle textbox from the button IF the input text is empty
        // otherwise, toggle textbox during the modal
        const textBtnCanToggle = inputText.length === 0 ? this.handleToggleTextboxOn : undefined;
        const dummyTextBtnCanReplaceInput = inputText.length === 0 ? this.handleDummyText : undefined;
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
                            <button className="modal-close waves-effect waves-red btn-flat right">No</button>
                            <button className="modal-close waves-effect waves-green btn-flat left"
                                onClick={this.handleToggleTextboxOn}>Yes</button>
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
                            <button className="modal-close waves-effect waves-red btn-flat right">No</button>
                            <button className="modal-close waves-effect waves-green btn-flat left"
                                onClick={this.handleTogglePDFOn}>Yes</button>
                        </div>
                    </div>
                </div>

                {toggleTextbox === true && togglePDF === false ? (
                    <div className="textbox-input">

                        <button className={`waves-effect waves-light btn ${canTriggerModal} dummy-text-button deep-purple darken-1`}
                            onClick={dummyTextBtnCanReplaceInput}
                            href="#modal-dummy-text-id">
                            Click for dummy text
                        </button>

                        <div id="modal-dummy-text-id" className="modal modal-dummy-text">
                            <div className="modal-content">
                                <h4>You Are Currently Working With Text</h4>
                                <p>The "Dummy Text" option will give you 3 Textboxes of content to parse. It will require you to discard all current Textbox input and output data.</p>
                                <p>Would you like to discard your Textbox data and use Dummy Text instead?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="modal-close waves-effect waves-red btn-flat right">No</button>
                                <button className="modal-close waves-effect waves-green btn-flat left"
                                    onClick={this.handleDummyText}>Yes</button>
                            </div>
                        </div>

                        <select className="browser-default textbox-number-dropdown-menu"
                            value={textBoxVal}
                            onChange={this.handleTextboxNumChange}>
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
        toggleTextboxReducer: state.textRed.toggleTextbox,
        togglePdfReducer: state.textRed.togglePDF,
        localInputTextReducer: state.textRed.localInputText
    };
};

export default connect(mapStateToProps, actions)(InputText);