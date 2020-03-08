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
        const onBtn = "green lighten-1";
        const offBtn = "green darken-3";
        const unifiedBtn = previewUnified === true ? onBtn : offBtn;
        const deletionsBtn = previewDeletions === true ? onBtn : offBtn;
        const additionsBtn = previewAdditions === true ? onBtn : offBtn;
        return (
            <div className="preview-main-container">
                <div className="preview-text">
                    <div className="button-layout row">
                        <button
                            className={`waves-effect waves-light btn ${unifiedBtn} submit-form-button col s12 m3 l2 offset-l3 offset-m1`}
                            onClick={this.handlePreviewUnified}>
                            <i className="material-icons unified-img">merge_type</i>
                            Unified
                        </button>
                        <button
                            className={`waves-effect waves-light btn ${deletionsBtn} submit-form-button col s12 m3 l2`}
                            onClick={this.handlePreviewDeletions}>
                            <i className="material-icons deletions-img">remove_circle_outline</i>
                            Deletions
                        </button>
                        <button
                            className={`waves-effect waves-light btn ${additionsBtn} submit-form-button col s12 m3 l2`}
                            onClick={this.handlePreviewAdditions}>
                            <i className="material-icons additions-img">add_circle_outline</i>
                            Additions
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