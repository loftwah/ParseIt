import React, { Component } from 'react';
import { connect } from 'react-redux';

import './multiple-delete-line-module.css';
import * as actions from '../../../actions';

class MultipleAddTextToBeginningComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineNumBegin: '',
            lineMultiple: '',
        };
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, updateOutputText } = this.props;
        const { lineMultiple } = this.props;
        let { lineNumBegin } = this.props;
        this.setState({
            lineNumBegin,
            lineMultiple,
        })
        console.log('multiple-delete-line-module-complete component mounted');

        // convert lineNumBegin into a number
        lineNumBegin = Number(lineNumBegin);

        const finalText = [];

        for (let inputContainer = 0; inputContainer < outputText.length; inputContainer++) {

            let newText = [];

            let containerSplitNewLine = outputText[inputContainer].text.split('\n');

            for (let i = 0; i < containerSplitNewLine.length; i++) {

                let line = containerSplitNewLine[i];
                let isAMultiple = false;

                if (lineNumBegin > i + 1) {
                    isAMultiple = false;
                } else if (lineNumBegin === i + 1) {
                    isAMultiple = true;
                } else if (lineNumBegin < i + 1) {
                    isAMultiple = (i - lineNumBegin + 1) % lineMultiple === 0 ? true : false;
                }

                if (line === "") {
                    // WE HAVE A SIMPLE BLANK LINE
                    switch (isAMultiple) {
                        case true:
                            // Do nothing
                            break;
                        case false:
                            newText.push('');
                            break;
                        default:
                            console.log("isAMultiple is not defined");
                    }

                } else {
                    switch (isAMultiple) {
                        case true:
                            // Do nothing
                            break;
                        case false:
                            // Return the original line
                            newText.push(line);
                            break;
                        default:
                            console.log('isAMultiple is not defined');
                    }
                }
            }

            const finalTextContainer = newText.join('\n');

            finalText.push({
                inputContainer: outputText[inputContainer].inputContainer,
                text: finalTextContainer,
                name: outputText[inputContainer].name
            })
        }

        updateOutputText(finalText);
    }


    handleDelete = (e) => {
        e.preventDefault();
        const { handleDeleteModule, id } = this.props;
        handleDeleteModule(id);
    }

    render() {
        const { lineNumBegin, lineMultiple } = this.props;

        return (
            <div className="multiple-delete-line-function">
                <div className="multiple-delete-line-card card white">
                    <div className="multiple-delete-line-card-content card-content black-character">
                        <i className="module-delete-button material-icons" onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Delete a Line Multiple</p>
                    </div>
                    <div className="row">
                        <div className="multiple-delete-line-description-complete col s12">
                            <p>Starting at line number <b>"{lineNumBegin}"</b>, delete each line multiple of <b>"{lineMultiple}"</b>.</p>
                        </div>
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
        previewToggle: state.textRed.previewToggle,
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview,
        savedText: state.textRed.savedText
    };
};

export default connect(mapStateToProps, actions)(MultipleAddTextToBeginningComplete);