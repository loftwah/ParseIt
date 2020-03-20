import React, { Component } from 'react';
import { connect } from 'react-redux';

import './parseit-container.css';
import * as actions from '../../actions';
import Navbar from '../navbar/navbar';
import InputText from '../input-text/input-text';
import ParseFunctionContainer from '../parse-function-container/parse-function-container'
import OutputText from '../output-text/output-text';
import InputContainerRadio from '../input-container-radio/input-container-radio';
import PreviewsMain from '../previews/previews-main/previews-main';
import OutputSavedText from '../output-saved-text/output-saved-text';

class ParseItContainer extends Component {

    render() {
        const { previewToggle, toggleOutputText, toggleSavedText, outputText } = this.props;
        return (
            <div className="parseit-container">
                <Navbar />
                <div className="parseit-content">
                    <InputText />
                    {outputText.length !== 0 ? (
                        <div className="app-has-output">
                            <ParseFunctionContainer />
                            <InputContainerRadio />
                            {previewToggle === false ? (<div className="no-previews"></div>) : (<PreviewsMain />)}
                            {previewToggle === false && toggleOutputText === true ? (<OutputText />) : (<div className="no-output-text"></div>)}
                            {previewToggle === false && toggleSavedText === true ? (<OutputSavedText />) : (<div className="no-saved-text"></div>)}
                        </div>
                    ) : (
                            <div className="app-does-not-have-output"></div>
                        )}
                </div>
            </div>
        );
    };
};


const mapStateToProps = (state) => {
    return {
        previewToggle: state.textRed.previewToggle,
        toggleOutputText: state.textRed.toggleOutputText,
        toggleSavedText: state.textRed.toggleSavedText,
        outputText: state.textRed.outputText,
    };
};

export default connect(mapStateToProps, actions)(ParseItContainer);