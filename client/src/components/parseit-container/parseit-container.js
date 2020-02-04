import React, { Component } from 'react';
import { connect } from 'react-redux';

import './parseit-container.css';
import * as actions from '../../actions';
import Header from '../header/header';
import Navbar from '../navbar/navbar';
import InputText from '../input-text/input-text';
import ParseFunctionContainer from '../parse-function-container/parse-function-container'
import OutputText from '../output-text/output-text';
import InputContainerRadio from '../input-container-radio/input-container-radio';
import PreviewsMain from '../previews/previews-main/previews-main';

class ParseItContainer extends Component {
    constructor(props) {
        super(props);
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
                    <InputContainerRadio />
                    {previewToggle === false ? (<OutputText />) : (<PreviewsMain />)}
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