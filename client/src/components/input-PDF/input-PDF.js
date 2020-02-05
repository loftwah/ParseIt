import React, { Component } from 'react';
import axios from 'axios';

import './input-PDF.css';
// import Header from '../header/header'

class InputPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: '',
        };
    }

    fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
    fileUploadHandler = e => {
        const { selectedFile } = this.state;
        console.log('selectedFile', selectedFile);

        const dataForm = new FormData();
        dataForm.append('file', selectedFile);

        axios.post('/read-pdf', dataForm)
            .then(res => {
                console.log('backend response: ', res);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="input-PDF-component">
                <p>My PDF component</p>
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
                </form>
                <button
                    className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-pdf-button"
                    onClick={this.fileUploadHandler}
                >Upload the PDF</button>

            </div>
        );
    };
};

export default InputPDF;