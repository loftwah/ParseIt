import React, { Component } from 'react';

import './parse-function-container.css';

class ParseFunctionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: '',
        };
    }

    render() {
        return (
            <div className="parse-function-container">
                <h1 className="black-text"><b>PARSE FUNCTION CONTAINER</b></h1>
            </div>
        );
    };
};

export default ParseFunctionContainer;