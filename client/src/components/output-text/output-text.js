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
            idx = idx + 1
            if (line === "") {
                return (<div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className = "line-text">&#160;</p>
                </div>)
            } else {
                return ( <div className="line" key={idx}>
                    <span className="line-number">[{idx}]&#160;</span>
                    <p className = "line-text">{line}</p>
                </div>)
            }
            
        })
        return (
            <div className="input-text-container">
                <h4 className="black-text"><b>OUTPUT TEXT</b></h4>
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