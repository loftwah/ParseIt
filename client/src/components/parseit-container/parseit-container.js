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
            outputText: '',
        };
    }

    handleInputText = text => {
        this.setState({
            inputText: text
        })
    }

    handleOutputText = text => {
        this.setState({
            inputText: text
        })
    }

    render() {

        const { outputText, inputText } = this.state

        // const hardCodedInputText = "hello\nthere\nit is me\n\n\nGeorge Washington (February 22, 1732[b] – December 14, 1799) was an American political leader, military general, statesman, and Founding Father who served as the first president of the United States from 1789 to 1797.\n\n\nScattered showers, mainly before 11am. \nMostly cloudy, with a high near 48. \nLight northwest wind increasing to 6 to 11 mph in the afternoon. Winds could gust as high as 18 mph. Chance of precipitation is 30%.";

        return (
            <div className="parseit-container">
                <Header />
                <InputText 
                    handleInputText = {this.handleInputText}
                    handleOutputText = {this.handleOutputText}
                />
                <ParseFunctionContainer 
                    /* inputText = {hardCodedInputText} */
                    inputText = {inputText}
                    handleOutputText = {this.handleOutputText}/>
                <OutputText
                    outputText={inputText}
                />
            </div>
        );
    };
};

export default ParseItContainer;