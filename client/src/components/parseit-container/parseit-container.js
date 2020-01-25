import React, { Component } from 'react';

import './parseit-container.css';
import Header from '../header/header'

class ParseItContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: '',
        };
    }

    render() {
        return (
            <div className="parseit-container">
                <Header />
            </div>
        );
    };
};

export default ParseItContainer;