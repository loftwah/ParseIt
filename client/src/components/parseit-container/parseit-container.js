import React, { Component } from 'react';

import './parseit-container.css';
import Header from '../header/header';
import InputText from '../input-text/input-text';
import ParseFunctionContainer from '../parse-function-container/parse-function-container'
import OutputText from '../output-text/output-text';

class ParseItContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="parseit-container">
                <Header />
                <InputText />
                <ParseFunctionContainer/>
                <OutputText/>
            </div>
        );
    };
};

export default ParseItContainer;