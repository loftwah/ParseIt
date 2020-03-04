import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './input-PDF.css';
import * as actions from '../../actions';
// import Header from '../header/header'

class InputPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            selectedFileNames: [],
            errorMsg: '',
        };
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
    fileUploadHandler = e => {
        const { selectedFiles, selectedFileNames } = this.state;
        const { updateInputText, updateOutputText } = this.props;
        if (selectedFiles.length === 0) {
            this.setState({
                errorMsg: 'Please upload a PDF.'
            })
            return;
        }

        const dataForm = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            dataForm.append('file', selectedFiles[i]);
        }

        axios.post('/read-pdf', dataForm)
            .then(res => {
                const textArrRes = res.data.PDFtext
                let initInputPDF = [];
                for (let i = 0; i < textArrRes.length; i++) {
                    initInputPDF.push({
                        inputContainer: i,
                        text: textArrRes[i],
                        name: selectedFileNames[i]
                    })
                }
                // console.log('initInputPDF', initInputPDF[0].text)
                updateInputText(initInputPDF);
                updateOutputText(initInputPDF);
            })
            .catch(err => console.log(err));
    }

    render() {
        const { errorMsg } = this.state;
        return (
            <div className="input-PDF-component">
                <p>Upload a PDF to Parse</p>
                <form action="#">
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" multiple onChange={this.fileSelectedHandler} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                        </div>
                    </div>
                    <div className="pdf-error-msg">
                        <p>{errorMsg}</p>
                    </div>
                </form>
                <button
                    className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-pdf-button"
                    onClick={this.fileUploadHandler}
                >Upload the PDF</button>

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