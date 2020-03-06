import React, { Component } from 'react';
import { connect } from 'react-redux';

import './output-saved-text.css';
import * as actions from '../../actions';

class OutputSavedText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            combinedSaves: ""
        }
    }

    handleCombineSavesCopyToClipboard = () => {
        const { combinedSaves } = this.state
        const el = document.createElement('textarea');
        el.value = combinedSaves;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    handleUserSavedText = (savedText, savedTextContainerDisplay) => {
        // loop through all individual containers in the chosen saved container
        let createOutput = [];
        const savedTextContainer = savedText[savedTextContainerDisplay].inputContainers;
        const savedTextInputName = savedText[savedTextContainerDisplay].name;
        const convertTextToJSX = []

        for (let i = 0; i < savedTextContainer.length; i++) {
            let createSingleOutput = []
            let outputSplitNewLine;
            if (savedText.length === 0) {
                outputSplitNewLine = [];
            } else {
                outputSplitNewLine = savedTextContainer[i].text.split('\n');
            }
            createSingleOutput.push(outputSplitNewLine.map((line, idx) => {
                idx = idx + 1
                if (line === "") {
                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">&#160;</p>
                    </div>)
                } else {
                    return (<div className="line" key={idx}>
                        <span className="line-number">[{idx}]&#160;</span>
                        <p className="line-text">{line}</p>
                    </div>)
                }
            }))
            convertTextToJSX.push(createSingleOutput)
        }

        createOutput = convertTextToJSX.map((textJSX, idx) => {
            return (
                <div className="output-saved-text-box" key={idx}>
                    <h5>Input: {savedTextContainer[idx].name}</h5>
                    <div className="output-saved-text">
                        {textJSX}
                    </div>
                </div>
            )
        })
        return createOutput
    }

    handleCombineSaves = (savedText) => {
        let createOutput = [];
        let combineSavesText = [];

        let globalIdx = 0
        // loop through all containers in each save
        for (let savedTextIdx = 0; savedTextIdx < savedText.length; savedTextIdx++) {
            let savedTextContainer = savedText[savedTextIdx].inputContainers;
            // loop through all inputs for all containers
            for (let inputIdx = 0; inputIdx < savedTextContainer.length; inputIdx++) {
                // loop through all lines in all inputs
                let outputSplitNewLine;
                if (savedText.length === 0) {
                    outputSplitNewLine = [];
                } else if (savedTextContainer[inputIdx].text === "") {
                    // If the text inside of a "saved text" container input is nothing, we will not display anything
                    continue;
                } else {
                    outputSplitNewLine = savedTextContainer[inputIdx].text.split('\n');

                    createOutput.push(outputSplitNewLine.map(line => {
                        combineSavesText.push(line)
                        globalIdx = globalIdx + 1
                        if (line === "") {
                            return (<div className="line" key={globalIdx}>
                                <span className="line-number">[{globalIdx}]&#160;</span>
                                <p className="line-text">&#160;</p>
                            </div>)
                        } else {
                            return (<div className="line" key={globalIdx}>
                                <span className="line-number">[{globalIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>)
                        }
                    }))
                }
            }
        }

        // text that the user can copy to their clipboard
        const copyText = combineSavesText.join('\n');

        // Keeping everything similar - createOutput will not be an array, but a variable to store JSX
        return { createOutput: [...createOutput], copyText: copyText }
    }

    handleCombineInputThenSaves = (savedText) => {
        let createOutput = [];
        let combineSavesText = [];

        let globalIdx = 0

        // loop through every first input on each container
        // loop through every 2nd input on each container
        // etc.
        for (let inputIdx = 0; inputIdx < savedText[0].inputContainers.length; inputIdx++) {
            for (let savedTextContainerIdx = 0; savedTextContainerIdx < savedText.length; savedTextContainerIdx++) {

                // loop through all lines in all inputs
                let savedTextContainer = savedText[savedTextContainerIdx].inputContainers;
                let outputSplitNewLine;
                if (savedText.length === 0) {
                    outputSplitNewLine = [];
                } else if (savedTextContainer[inputIdx].text === "") {
                    // If the text inside of a "saved text" container input is nothing, we will not display anything
                    continue;
                } else {
                    outputSplitNewLine = savedTextContainer[inputIdx].text.split('\n');

                    createOutput.push(outputSplitNewLine.map(line => {
                        combineSavesText.push(line)
                        globalIdx = globalIdx + 1
                        if (line === "") {
                            return (<div className="line" key={globalIdx}>
                                <span className="line-number">[{globalIdx}]&#160;</span>
                                <p className="line-text">&#160;</p>
                            </div>)
                        } else {
                            return (<div className="line" key={globalIdx}>
                                <span className="line-number">[{globalIdx}]&#160;</span>
                                <p className="line-text">{line}</p>
                            </div>)
                        }
                    }))
                }

            }
        }

        // text that the user can copy to their clipboard
        const copyText = combineSavesText.join('\n');

        // Keeping everything similar - createOutput will not be an array, but a variable to store JSX
        return { createOutput: [...createOutput], copyText: copyText }
    }

    render() {
        const { savedText, savedTextContainerDisplay } = this.props;

        let createOutput;
        let copyText;
        let savedTextName;

        // If the saved text to display is a number - we are calling for a particular "save text" the user has done
        if (typeof (savedTextContainerDisplay) === "number") {
            createOutput = this.handleUserSavedText(savedText, savedTextContainerDisplay)
            savedTextName = savedText[savedTextContainerDisplay].name

        } else if (savedTextContainerDisplay === "combine-saves") {
            let combinedSavesOutput = this.handleCombineSaves(savedText)
            createOutput = combinedSavesOutput.createOutput
            copyText = combinedSavesOutput.copyText

        } else if (savedTextContainerDisplay === "combine-input-then-saves") {
            let combinedInputThenSavesOutput = this.handleCombineInputThenSaves(savedText)
            createOutput = combinedInputThenSavesOutput.createOutput
            copyText = combinedInputThenSavesOutput.copyText
        }

        return (
            // Display all possible inputContainers
            <div className="input-text-container">

                {typeof (savedTextContainerDisplay) === "number" ? (
                    <div className="display-user-saved-text">
                        <h4 className="grey-text text-darken-1">Saved Text: {savedTextName}</h4>
                        {createOutput}
                    </div>) : (
                        <div className="display-no-user-saved-text"></div>
                    )}

                {savedTextContainerDisplay === "combine-saves" ? (
                    <div className="display-combine-saves">
                        <h4 className="grey-text text-darken-1">Combined Saves</h4>
                        <div className="output-saved-text">
                            {createOutput}
                        </div>

                        <button
                            className="waves-effect waves-light btn #42a5f5 blue lighten-1"
                            onClick={() => { navigator.clipboard.writeText(copyText) }}
                        >Copy Text</button>

                    </div>) : (
                        <div className="display-no-combined-saves"></div>
                    )}

                {savedTextContainerDisplay === "combine-input-then-saves" ? (
                    <div className="display-combine-input-then-saves">
                        <h4 className="grey-text text-darken-1">Combined by Input, And Then Combined Saves</h4>
                        <div className="output-saved-text">
                            {createOutput}
                        </div>
                    </div>) : (
                        <div className="display-no-combine-input-then-saves"></div>
                    )}

            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        inputText: state.textRed.inputText,
        savedTextContainerDisplay: state.textRed.savedTextContainerDisplay,
        savedText: state.textRed.savedText
    };
};

export default connect(mapStateToProps, actions)(OutputSavedText);