import React, { Component } from 'react';
import { connect } from 'react-redux';

import './parseit-container.css';
import * as actions from '../../actions';
import Header from '../header/header';
import InputText from '../input-text/input-text';
import ParseFunctionContainer from '../parse-function-container/parse-function-container'
import OutputText from '../output-text/output-text';
import PreviewDeletions from '../previews/preview-deletions/preview-deletions';

class ParseItContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { previewToggle } = this.props;
        return (
            <div className="parseit-container">
                <Header />
                <InputText />
                <ParseFunctionContainer/>
                
                { previewToggle === false ? (
                    <OutputText/>    
                ) : (
                    <div className="preview-text">
                        <PreviewDeletions />
                    </div>
                )}
                
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