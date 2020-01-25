import React, { Component } from 'react';

import './parseit-container.css';
import Header from '../header/header';
import InputText from '../input-text/input-text';
import ParseFunctionContainer from '../parse-function-container/parse-function-container'
import OutputText from '../output-text/output-text';

class ParseItContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        };
    }

    handleInputText = text => {
        this.setState({
            inputText: text
        })
    }

    render() {

        // we will be adding functions in later...
        const outputText = this.state.inputText
        return (
            <div className="parseit-container">
                <Header />
                <InputText 
                    handleInputText = {this.handleInputText}
                />
                <ParseFunctionContainer />
                <OutputText
                    outputText={outputText}
                />
            </div>
        );
    };
};

export default ParseItContainer;