import React, { Component } from 'react';
import { connect } from 'react-redux';

import './replace-character-module.css';
import * as actions from '../../../actions';

class ReplaceCharacterModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replaceCharacter: '',
            insertCharacter: ''
        };
    }

    handleReplaceCharacter = e => {
        this.setState({
            replaceCharacter: e.target.value
        })
    }

    handleInsertCharacter = e => {
        this.setState({
            insertCharacter: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('submitted character!');
        // Future: be able to delete a certain number of instances?
        const { inputText, updateOutputText } = this.props;
        const { replaceCharacter, insertCharacter } = this.state;
        
        function escapeRegExp(stringToGoIntoTheRegex) {
            // escape character: \/ is NOT a useless escape
            return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        
        var stringToGoIntoTheRegex = escapeRegExp(replaceCharacter);
        var regex = new RegExp(stringToGoIntoTheRegex, "g");
        // 2nd param is a function to handle the "$$" case for character insert
        var finalText = inputText.replace(regex, () => { return insertCharacter });

        updateOutputText(finalText)
    }

    render() {
        return (
            <div className="replace-character-function">
                <h4 className="black-character"><b>REPLACE TEXT</b></h4>
                <div className="replace-character-card card white">
                    <div className="replace-character-card-content card-content black-character">
                        <span className="card-title center">Module: Replace Characters</span>
                    </div>
                    <div className="row">
                        <div className="replace-character-delete col s12">
                            <span>Replace the characters: </span>
                            <div className="replace-character-user-input input-field inline">
                                <input
                                    type="text"
                                    id="replace-delete-input"
                                    onChange={this.handleReplaceCharacter}
                                />
                                <label htmlFor="replace-delete-input"></label>
                            </div>
                            <span>With the characters: </span>
                            <div className="replace-character-user-input input-field inline">
                                <input
                                    type="text"
                                    id="replace-insert-input"
                                    onChange={this.handleInsertCharacter}
                                />
                                <label htmlFor="replace-insert-input"></label>
                            </div>
                        </div>
                    </div>

                    {/* <div className="card-action instances">
                        <span>Instances: </span>
                        <span>Every Instance</span>
                    </div> */}
                    <div className="card-action preview-submit">
                        <a href="!#">Preview changes</a>
                        <a
                            href="!#"
                            onClick={this.handleSubmit}
                        >Submit</a>
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

export default connect(mapStateToProps, actions)(ReplaceCharacterModule);