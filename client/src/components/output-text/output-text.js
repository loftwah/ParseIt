import React, { Component } from 'react';
import { connect } from 'react-redux';

import './output-text.css';
import * as actions from '../../actions';

class OutputText extends Component {
    constructor(props) {
        super(props);
    }

    // When component updates, turn output text into input text?
    componentDidUpdate() {
        const { updateInputText, outputText } = this.props
        // updateInputText(outputText)
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
                        {/* <p>More <span style={{background: "red"}}>input</span> hi</p>
                        <p>More <span style={{background: "rgb(74, 255, 83)"}}>input</span> hi</p> */}
                    </div>   
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        inputText: state.textRed.inputText,
        outputText: state.textRed.outputText,
    };
};

export default connect(mapStateToProps, actions)(OutputText);