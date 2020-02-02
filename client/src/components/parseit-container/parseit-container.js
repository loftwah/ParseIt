import React, { Component } from 'react';
import { connect } from 'react-redux';

import './parseit-container.css';
import * as actions from '../../actions';
import Header from '../header/header';
import Navbar from '../navbar/navbar';
import InputText from '../input-text/input-text';
import ParseFunctionContainer from '../parse-function-container/parse-function-container'
import OutputText from '../output-text/output-text';
import PreviewDeletions from '../previews/preview-deletions/preview-deletions';
import PreviewAdditions from '../previews/preview-additions/preview-additions';

class ParseItContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewUnified: true,
            previewDeletions: false,
            previewAdditions: false
        }
    }

    handlePreviewUnified = e => {
        this.setState({
            previewUnified: true,
            previewDeletions: false,
            previewAdditions: false
        });
    }

    handlePreviewDeletions = e => {
        this.setState({
            previewUnified: false,
            previewDeletions: true,
            previewAdditions: false
        });
    }

    handlePreviewAdditions = e => {
        this.setState({
            previewUnified: false,
            previewDeletions: false,
            previewAdditions: true
        });
    }

    render() {
        const { previewToggle } = this.props;
        const { previewUnified, previewDeletions, previewAdditions } = this.state;
        return (
            <div className="parseit-container">
                <Navbar />
                <div className="parseit-content">
                    {/* <Header /> */}
                    <InputText />
                    <ParseFunctionContainer />

                    {previewToggle === false ? (
                        <OutputText />
                    ) : (
                        <div className="preview-text">
                            <div className="button-layout center">
                                <button
                                    className="waves-effect waves-light btn #42a5f5 green lighten-1 submit-form-button"
                                    onClick={this.handlePreviewUnified}
                                >Unified
                                </button>
                                <button
                                    className="waves-effect waves-light btn #42a5f5 green lighten-1 submit-form-button"
                                    onClick={this.handlePreviewDeletions}
                                >Deletions
                                </button>
                                <button
                                    className="waves-effect waves-light btn #42a5f5 green lighten-1 submit-form-button"
                                    onClick={this.handlePreviewAdditions}
                                >Additions
                                </button>
                            </div>
                            {previewUnified === true || previewDeletions === true ? (<PreviewDeletions />) : (<div className="preview-deletion-off"></div>)}
                            {previewUnified === true || previewAdditions === true ? (<PreviewAdditions />) : (<div className="preview-addition-off"></div>)}
                        </div>
                        )}
                </div>
            </div>
        );
    };
};


const mapStateToProps = (state) => {
    return {
        previewToggle: state.textRed.previewToggle,
    };
};

export default connect(mapStateToProps, actions)(ParseItContainer);