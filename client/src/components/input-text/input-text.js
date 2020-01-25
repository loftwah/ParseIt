import React, { Component } from 'react';

import './input-text.css';

class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        };
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    async handleTextareaChange (e) {
        await this.setState({
            inputText: e.target.value
        }, () => {
            this.props.handleInputText(this.state.inputText);
        })
    }

    render() {
        // Text area: value={this.state.value} onChange={this.handleChange}
        // Form: <form onSubmit={this.handleSubmit}>
        // do I need a submit button?
        return (
            <div className="input-text-container">
                <h1 className="black-text"><b>INPUT TEXT</b></h1>
                <form onSubmit={this.handleSubmit}>
                    <textarea className="input-text"
                        onChange = {this.handleTextareaChange}
                        value={this.state.inputText}
                        disabled={false}>
                    </textarea>
                    {/* <button className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-form-button">Start Parsing</button> */}
                </form>
            </div>
        );
    };
};

export default InputText;