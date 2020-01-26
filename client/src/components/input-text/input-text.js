import React, { Component } from 'react';
import { connect } from 'react-redux';

import './input-text.css';
import * as actions from '../../actions';

class InputText extends Component {
    constructor(props) {
        super(props);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    // don't need async at the moment
    async handleTextareaChange(e) {
        this.props.updateInputText(e.target.value)
        this.props.updateOutputText(e.target.value)
    }

    handleInputSubmit = e => {
        e.preventDefault();
        // Future: lock the textarea?
        // Why? If we start writing here, it will most likely overwrite the parsing modules
        // Therefore: we can have this button load up the parsing modules
    }

    render() {
        return (
            <div className="input-text-container">
                <h4 className="black-text"><b>INPUT TEXT</b></h4>
                <form onSubmit={this.handleSubmit}>
                    <textarea className="input-text"
                        onChange={this.handleTextareaChange}
                        disabled={false}>
                    </textarea>
                    <button
                        className="waves-effect waves-light btn #42a5f5 blue lighten-1 submit-form-button"
                        onClick={this.handleInputSubmit}
                    >Start Parsing</button>
                </form>
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

export default connect(mapStateToProps, actions)(InputText);