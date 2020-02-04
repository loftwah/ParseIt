import React, { Component } from 'react';
import { connect } from 'react-redux';

import './previews-main.css';
import * as actions from '../../../actions';
import PreviewDeletions from '../preview-deletions/preview-deletions';
import PreviewAdditions from '../preview-additions/preview-additions';

class PreviewsMain extends Component {
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
        const { previewUnified, previewDeletions, previewAdditions } = this.state;
        return (
            <div className="preview-main-container">
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
            </div>
        );
    };
};


const mapStateToProps = (state) => {
    return {
        previewToggle: state.textRed.previewToggle,
    };
};

export default connect(mapStateToProps, actions)(PreviewsMain);