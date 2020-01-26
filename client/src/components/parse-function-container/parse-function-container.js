import React, { Component } from 'react';
import M from 'materialize-css';

import './parse-function-container.css';
import ReplaceCharacterModule from '../parse-function-components/replace-character-module/replace-character-module'

class ParseFunctionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.inputText,
            outputText: ''
        };
    }

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger-common-module');
        M.Dropdown.init(elems, { coverTrigger: false });
        
        let replaceDropdown = document.querySelectorAll('.dropdown-trigger-replace-module');
        M.Dropdown.init(replaceDropdown, { coverTrigger: false });
    }

    // handleSelectedModule

    handleReplaceText = text => {
        // change to inputText instead? To keep making modifications?
        this.setState({
            outputText: text
        })
        // send text to output
        this.props.handleOutputText(text);
    }

    render() {
        const { inputText } = this.props;
        // Before and during the text goes through the filters, text will be called "parsedText"
        const parsedText = inputText;

        return (
            <div className="parse-function-container">
                <h4 className="black-text"><b>PARSE FUNCTION CONTAINER</b></h4>
                
                <div className="common-module-dropdown">
                    <a className='dropdown-trigger-common-module btn'
                        href='!#'
                        data-target='common-module-dropdown'>Common Modules</a>
                    <ul id='common-module-dropdown' className='dropdown-content'>
                        <li><a href="!#">To Uppercase</a></li>
                        <li><a href="!#">To Lowercase</a></li>
                        <li><a href="!#">Remove Blank Lines</a></li>
                        <li><a href="!#">Single Spaces</a></li>
                    </ul>
                </div>

                <div className="replace-module-dropdown">
                    <a className='dropdown-trigger-replace-module btn'
                        href='!#'
                        data-target='replace-module-dropdown'>Replace Modules</a>
                    <ul id='replace-module-dropdown' className='dropdown-content'>
                        <li><a href="!#">Replace Characters</a></li>
                        <li><a href="!#">Replace Words</a></li>
                    </ul>
                </div>

                <ReplaceCharacterModule
                    parsedText={parsedText}
                    handleReplaceText={this.handleReplaceText}
                />
            </div>
        );
    };
};

export default ParseFunctionContainer;