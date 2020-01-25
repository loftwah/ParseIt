import React, { Component } from 'react';

import './output-text.css';

class OutputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outputText: '',
        };
    }

    render() {
        const { outputText } = this.props;

        const outputSplitNewLine = outputText.split('\n');
        const createOutput = outputSplitNewLine.map( (line, idx) => {
            if (line === "") {
                return <p key={idx}>&#160;</p>
            } else {
                return <p key={idx}>{line}</p>
            }
            
        })
        return (
            <div className="input-text-container">
                <h1 className="black-text"><b>OUTPUT TEXT</b></h1>
                <div className="output-text-box"
                    style={{ fontFamily: 'Courier' }}> 
                    <div className="output-text">
                        {createOutput}
                    </div>   
                </div>
            </div>
        );
    };
};

export default OutputText;