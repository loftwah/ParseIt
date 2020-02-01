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
            previewDeletions: true,
            previewAdditions: false
        }
    }

    render() {
        const { previewToggle } = this.props;
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
                                Toggle between deletions and additions
                        <PreviewDeletions />
                                <PreviewAdditions />
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