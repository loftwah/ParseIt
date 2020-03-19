import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './input-PDF.css';
import * as actions from '../../actions';

class InputPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            selectedFileNames: [],
            errorMsg: '',
            uploadProgress: '',
            uploadBusy: false
        };
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }

    validatePDF = (file) => {
        if (file.type !== "application/pdf") {
            return false;
        }
        return true;
    }

    fileSelectedHandler = e => {
        const files = e.target.files;

        let validate;
        let fileNames = [];
        for (let i = 0; i < files.length; i++) {
            validate = this.validatePDF(files[i]);
            if (validate === false) {
                this.setState({
                    errorMsg: 'ParseIt found a file that was not a PDF. Make sure that all files are PDFs.',
                    selectedFiles: [],
                    selectedFileNames: [],
                })
                break;
            }
            fileNames.push(files[i].name)
        }

        if (validate === true) {
            this.setState({
                selectedFiles: files,
                selectedFileNames: fileNames,
                errorMsg: ''
            })
        }
    }

    async uploadFiles(dataForm, inputName, idx) {
        return new Promise((resolve, reject) => {
            axios.post('/read-pdf', dataForm)
                .then(res => {
                    const textArrRes = res.data.PDFtext;
                    const singleInput = {
                        inputContainer: idx,
                        text: textArrRes[0],
                        name: inputName
                    };
                    resolve(singleInput);

                })
                .catch(err => console.log(err));
        })
    }

    async fileUploadHandler() {
        const { selectedFiles, selectedFileNames } = this.state;
        const { updateInputText, updateOutputText, initializeCodeToggle, codeText } = this.props;

        if (selectedFiles.length === 0) {
            this.setState({
                errorMsg: 'Please browse for a PDF.'
            })
            return;
        }

        // uploading is now in progress
        this.setState({
            uploadBusy: true,
            uploadProgress: `Progress: uploaded 0 out of ${selectedFiles.length} PDFs`
        })

        let initInputPDF = [];
        // upload each PDF, one by one
        for (let i = 0; i < selectedFiles.length; i++) {
            let inputName = selectedFileNames[i];
            let dataForm = new FormData();
            dataForm.append('file', selectedFiles[i]);
            let singlePDF = await this.uploadFiles(dataForm, inputName, i);
            initInputPDF.push(singlePDF);
            this.setState({
                uploadProgress: `Progress: uploaded ${i + 1} out of ${selectedFiles.length} PDFs`
            });
        }

        this.setState({
            uploadBusy: false,
            uploadProgress: `${selectedFiles.length} out of ${selectedFiles.length} PDFs have been uploaded`
        });

        // Before submitting, clean up all "odd" double-spaces inside text and name
        let cleanedLocalInput = [];
        for (let containerIdx = 0; containerIdx < initInputPDF.length; containerIdx++) {
            let container = initInputPDF[containerIdx];
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
            cleanedLocalInput.push(container);
        }

        updateInputText(cleanedLocalInput);
        updateOutputText(cleanedLocalInput);

        // If there is ParseIt code, fire it up
        if (codeText !== "") {
            initializeCodeToggle(true);
        }

    }

    render() {
        const { errorMsg, uploadBusy, uploadProgress } = this.state;

        return (
            <div className="input-PDF-component">
                <form action="#">
                    <div className="file-field input-field">
                        <div className="btn browse-pdf-button blue-grey">
                            <span>Browse</span>
                            <input type="file" multiple onChange={this.fileSelectedHandler} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload one or more PDF files" />
                        </div>
                    </div>
                    {errorMsg === "" ? (
                        <div className="no-error-msg">
                        </div>
                    ) : (
                            <div className="pdf-error-msg">
                                <p>{errorMsg}</p>
                            </div>
                        )}
                </form>

                <div className="button-pdf-selector">
                    <button
                        className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-pdf-button"
                        onClick={this.fileUploadHandler}>
                        <i className="material-icons file_upload-img">file_upload</i>
                        Upload Selected PDF Files
                    </button>
                </div>

                <div className="progress-line">
                    {uploadBusy === true ? (
                        <div className="pdf-upload-progress-circle">
                            <div className="preloader-wrapper active ">
                                <div className="spinner-layer spinner-blue-only">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div><div className="gap-patch">
                                        <div className="circle"></div>
                                    </div><div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="inactive-progress-circle"></div>
                        )}

                    {uploadProgress !== "" ? (
                        <div className={`upload-progress-${uploadBusy}`}>
                            <h5>{uploadProgress}</h5>
                        </div>
                    ) : (
                            <div className="upload-not-in-progress"></div>
                        )}
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

export default connect(mapStateToProps, actions)(InputPDF);