import React, { Component } from 'react';
import { connect } from 'react-redux';

import './multiple-add-text-to-beginning-module.css';
import * as actions from '../../../actions';

class MultipleAddTextToBeginningComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineNumBegin: '',
            lineMultiple: '',
            charToAdd: '',
        };
    }

    componentDidMount() {
        // handle official output text and convert it in here
        const { outputText, updateOutputText } = this.props;
        const { lineMultiple, charToAdd } = this.props;
        let { lineNumBegin } = this.props;
        this.setState({
            lineNumBegin,
            lineMultiple,
            charToAdd,
        })
        console.log('multiple-add-text-to-beginning-module-complete component mounted');

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
                            newText.push(charToAdd);
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
                            // Return charToAdd + the original line
                            newText.push(`${charToAdd}${line}`)
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
        const { lineNumBegin, lineMultiple, charToAdd } = this.props;
        const { moduleActiveToggle } = this.props;
        const deleteBtnVisible = moduleActiveToggle === true ? "hidden" : "visible";

        return (
            <div className="multiple-add-text-to-beginning-function">
                <div className="multiple-add-text-to-beginning-card card white">
                    <div className="multiple-add-text-to-beginning-card-content card-content black-character">
                    <i className={`module-delete-button-${deleteBtnVisible} material-icons `} onClick={this.handleDelete}>delete</i>
                        <p className="card-title center">Module: Add Text to the Beginning of a Multiple</p>
                    </div>
                    <div className="row">
                        <div className="multiple-add-text-to-beginning-description-complete col s12">
                            <p>Starting at line number <b>"{lineNumBegin}"</b>, at each line multiple of <b>"{lineMultiple}"</b>, add the characters <b>"{charToAdd}"</b> at the beginning of the specified lines.</p>
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
        moduleActiveToggle: state.textRed.moduleActiveToggle,
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview,
        savedText: state.textRed.savedText
    };
};

export default connect(mapStateToProps, actions)(MultipleAddTextToBeginningComplete);