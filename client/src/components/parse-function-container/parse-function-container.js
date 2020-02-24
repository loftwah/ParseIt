import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import './parse-function-container.css';
import { validateCode } from './validate-module-code';
import ParseItCode from '../parse-function-components/parseit-code/parseit-code';
import ReplaceCharacterModule from '../parse-function-components/replace-character-module/replace-character-module';
import ReplaceCharacterModuleComplete from '../parse-function-components/replace-character-module/replace-character-module-complete';
import DeleteBeginningModule from '../parse-function-components/delete-beginning-module/delete-beginning-module';
import DeleteBeginningModuleComplete from '../parse-function-components/delete-beginning-module/delete-beginning-module-complete';
import SavedTextModule from '../parse-function-components/saved-text-module/saved-text-module';
import SavedTextModuleComplete from '../parse-function-components/saved-text-module/saved-text-module-complete';
import DeleteEndingModule from '../parse-function-components/delete-ending-module/delete-ending-module';
import DeleteEndingModuleComplete from '../parse-function-components/delete-ending-module/delete-ending-module-complete';
import ConcatenateModule from '../parse-function-components/concatenate-module/concatenate-module';
import ConcatenateModuleComplete from '../parse-function-components/concatenate-module/concatenate-module-complete';
import RemoveBlankLinesModule from '../parse-function-components/remove-blank-lines-module/remove-blank-lines-module';
import RemoveBlankLinesModuleComplete from '../parse-function-components/remove-blank-lines-module/remove-blank-lines-module-complete';
import RemoveExcessSpacesModule from '../parse-function-components/remove-excess-spaces-module/remove-excess-spaces-module';
import RemoveExcessSpacesModuleComplete from '../parse-function-components/remove-excess-spaces-module/remove-excess-spaces-module-complete';
import SplitLinesBeforeWordModule from '../parse-function-components/split-lines-before-word/split-lines-before-word-module';
import SplitLinesBeforeWordComplete from '../parse-function-components/split-lines-before-word/split-lines-before-word-module-complete';
import SplitLinesAfterWordModule from '../parse-function-components/split-lines-after-word/split-lines-after-word-module';
import SplitLinesAfterWordComplete from '../parse-function-components/split-lines-after-word/split-lines-after-word-module-complete';

import * as actions from '../../actions';

class ParseFunctionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: [], // JSX for modules
            moduleCode: [], // moduleCode will be converted into codeText for reducer
            codeErrorMsg: '',
        };
        this.handleDeleteModule = this.handleDeleteModule.bind(this);
        this.ouptutModulesFromModuleCodeState = this.ouptutModulesFromModuleCodeState.bind(this);
        this.parseItCode = this.parseItCode.bind(this);
    }

    componentDidMount() {
        let miscDropdown = document.querySelectorAll('.dropdown-trigger-misc-module');
        M.Dropdown.init(miscDropdown, { coverTrigger: false });

        let replaceDropdown = document.querySelectorAll('.dropdown-trigger-replace-module');
        M.Dropdown.init(replaceDropdown, { coverTrigger: false });

        let deleteDropdown = document.querySelectorAll('.dropdown-trigger-delete-module');
        M.Dropdown.init(deleteDropdown, { coverTrigger: false });

        let saveDropdown = document.querySelectorAll('.dropdown-trigger-save-module');
        M.Dropdown.init(saveDropdown, { coverTrigger: false });

        let multiLineDropdown = document.querySelectorAll('.dropdown-trigger-multi-line-module');
        M.Dropdown.init(multiLineDropdown, { coverTrigger: false });

        let splitLineDropdown = document.querySelectorAll('.dropdown-trigger-split-line-module');
        M.Dropdown.init(splitLineDropdown, { coverTrigger: false });

        let createDropdown = document.querySelectorAll('.dropdown-trigger-create-module');
        M.Dropdown.init(createDropdown, { coverTrigger: false });
    }

    setStateAsync = (state) => {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async handleDeleteModule(id) {
        console.log('id to be deleted: ', id);

        const { updateOutputText, updateCodeText,
            togglePreviewOff, toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        // in the case where the application was in "preview mode" we will turn the preview off
        togglePreviewOff();

        // At this moment, "delete module will create a "ReplaceCharacterModule" using the following characters:
        const newModuleCode = this.state.moduleCode.filter(moduleCode => {
            if (moduleCode.id !== id) {
                return moduleCode;
            }
        })
        const newState = { ...this.state, modules: [], moduleCode: newModuleCode };

        await this.setStateAsync(newState);

        // With the module code we will "start over"
        // Bring back the input text
        updateOutputText(this.props.inputText);

        console.log(newModuleCode)
        // build all modules found in the moduleCode state
        this.ouptutModulesFromModuleCodeState(newModuleCode);
        const codeText = this.convertCodeArrayToText(newModuleCode);
        updateCodeText(codeText);
    }

    // for additional modules
    handleModuleCode = moduleCodeText => {
        // Example of how the "Module Code" will work:
        // Template: ReplaceCharacterModule "text" "other text"
        // the above means "create a character module and submit a replacement of "text" with "other text"

        const { updateCodeText } = this.props;

        let moduleCode = [...this.state.moduleCode, moduleCodeText];

        this.setState({
            moduleCode: moduleCode
        }, () => console.log(this.state.moduleCode));

        const codeText = this.convertCodeArrayToText(moduleCode)
        updateCodeText(codeText)

    }

    async parseItCode(codeStr) {
        const { updateCodeText, updateOutputText, updateContainerDisplay,
            toggleSavedTextOff, toggleOutputTextOn, inputText } = this.props

        updateContainerDisplay(0);
        toggleSavedTextOff()
        toggleOutputTextOn()

        // We will create modules based on the ParseIt Code
        // We will begin by deleting everything

        // Bring back the input text
        updateOutputText(inputText);

        // create moduleCode using the codeStr made inside the parse-it-code component's textarea
        const pureCodeArr = codeStr.split('\n');

        let newModuleCode = [];
        let id;
        // run through the pureCodeArr to fill newModuleCode with code and id properties
        for (let i = 0; i < pureCodeArr.length; i++) {
            id = Math.random();
            newModuleCode.push({
                id: id,
                code: pureCodeArr[i]
            })
        }

        const newState = { ...this.state, modules: [], moduleCode: newModuleCode };

        // update the state with the "new module code" list
        await this.setStateAsync(newState);

        // With the module code, we will "start over" and build modules based on the ParseIt Code

        // Bring back the input text
        updateOutputText(this.props.inputText); // I can probably delete this, it's a duplicate

        console.log(newModuleCode)
        // build all modules found in the moduleCode state list
        this.ouptutModulesFromModuleCodeState(newModuleCode)
        const codeText = this.convertCodeArrayToText(newModuleCode);
        updateCodeText(codeText);
    }

    handleCreateReplaceCharacterModule = (e) => {
        e.preventDefault();
        console.log('create a "replace character" module!')
        const { moduleActiveOn } = this.props;
        moduleActiveOn();

        let id = Math.random();
        let replaceCharModule = {
            moduleJSX: (<div className="replace-character-module" key={id}>
                <ReplaceCharacterModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateReplaceCharacterModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, replaceCharModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateReplaceCharacterModuleComplete = (id, replaceCharacter, insertCharacter) => {
        console.log('create a completed "replace character" module!')

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let replaceCharModule = {
            moduleJSX: (<div className="replace-character-module-complete" key={id}>
                <ReplaceCharacterModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    insertCharacter={insertCharacter}
                    replaceCharacter={replaceCharacter} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, replaceCharModule]
        })
    }

    handleCreateDeleteBeginningModule = (e) => {
        e.preventDefault();
        console.log('create a "delete beginning" module!')
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let replaceCharModule = {
            moduleJSX: (<div className="delete-beginning-module" key={id}>
                <DeleteBeginningModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateDeleteBeginningModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, replaceCharModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateDeleteBeginningModuleComplete = (id, stoppingCharacters) => {
        console.log('create a completed "delete beginning" module!')

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let replaceCharModule = {
            moduleJSX: (<div className="delete-beginning-module-complete" key={id}>
                <DeleteBeginningModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    stoppingCharacters={stoppingCharacters} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, replaceCharModule]
        })
    }

    handleCreateDeleteEndingModule = (e) => {
        e.preventDefault();
        console.log('create a "delete ending" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let replaceCharModule = {
            moduleJSX: (<div className="delete-ending-module" key={id}>
                <DeleteEndingModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateDeleteEndingModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, replaceCharModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateDeleteEndingModuleComplete = (id, stoppingCharacters) => {
        console.log('create a completed "delete ending" module!')
        const { toggleSavedTextOff, toggleOutputTextOn } = this.props

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let deleteEndModule = {
            moduleJSX: (<div className="delete-ending-module-complete" key={id}>
                <DeleteEndingModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    stoppingCharacters={stoppingCharacters} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, deleteEndModule]
        })
    }

    handleCreateSavedTextModule = (e) => {
        e.preventDefault();
        console.log('create a "saved text" module!')
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let savedTextModule = {
            moduleJSX: (<div className="saved-text-module" key={id}>
                <SavedTextModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateSavedTextModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, savedTextModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateSavedTextModuleComplete = (id, savedTextName) => {
        console.log('create a completed "saved text complete" module!')

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let saveTextModule = {
            moduleJSX: (<div className="saved-text-module-complete" key={id}>
                <SavedTextModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    savedTextName={savedTextName} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, saveTextModule]
        })
    }

    handleCreateConcatenateModule = (e) => {
        e.preventDefault();
        console.log('create a "concatenate" module!')
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let concatenateModule = {
            moduleJSX: (<div className="concatenate-module" key={id}>
                <ConcatenateModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateConcatenateModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, concatenateModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateConcatenateModuleComplete = (id) => {
        console.log('create a completed "concatenate complete" module!')

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let concatenateModule = {
            moduleJSX: (<div className="concatenate-module-complete" key={id}>
                <ConcatenateModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, concatenateModule]
        })

    }

    handleCreateRemoveBlankLinesModule = (e) => {
        e.preventDefault();
        console.log('create a "remove blank lines" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let removeBlankLinesModule = {
            moduleJSX: (<div className="remove-blank-lines-module" key={id}>
                <RemoveBlankLinesModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateRemoveBlankLinesModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, removeBlankLinesModule];

        this.setState({
            modules: modules
        })
    }


    handleCreateRemoveBlankLinesModuleComplete = (id) => {
        console.log('create a completed "remove blank lines" module!')

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let removeBlankLinesModule = {
            moduleJSX: (<div className="remove-blank-lines-module-complete" key={id}>
                <RemoveBlankLinesModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, removeBlankLinesModule]
        })

    }

    handleCreateRemoveExcessSpacesModule = (e) => {
        e.preventDefault();
        console.log('create a "remove excess spaces" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let removeExcessSpacesModule = {
            moduleJSX: (<div className="remove-excess-spaces-module" key={id}>
                <RemoveExcessSpacesModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateRemoveExcessSpacesModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, removeExcessSpacesModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateRemoveExcessSpacesModuleComplete = (id) => {
        console.log('create a completed "remove excess spaces" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let removeExcessSpacesModule = {
            moduleJSX: (<div className="remove-excess-spaces-module-complete" key={id}>
                <RemoveExcessSpacesModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, removeExcessSpacesModule]
        })

    }


    handleCreateSplitLinesBeforeWordModule = (e) => {
        e.preventDefault();
        console.log('create a "split lines before word" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let splitLinesBeforeWord = {
            moduleJSX: (<div className="split-lines-before-word-module" key={id}>
                <SplitLinesBeforeWordModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateSplitLinesBeforeWordModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, splitLinesBeforeWord];

        this.setState({
            modules: modules
        })
    }

    handleCreateSplitLinesBeforeWordModuleComplete = (id, charToSplit) => {
        console.log('create a completed "split lines before word" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let splitLinesBeforeWord = {
            moduleJSX: (<div className="split-lines-before-word-module-complete" key={id}>
                <SplitLinesBeforeWordComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    charToSplit={charToSplit}
                />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, splitLinesBeforeWord]
        })

    }

    handleCreateSplitLinesAfterWordModule = (e) => {
        e.preventDefault();
        console.log('create a "split lines after word" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let splitLinesAfterWord = {
            moduleJSX: (<div className="split-lines-after-word-module" key={id}>
                <SplitLinesAfterWordModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateSplitLinesAfterWordModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, splitLinesAfterWord];

        this.setState({
            modules: modules
        })
    }

    handleCreateSplitLinesAfterWordModuleComplete = (id, charToSplit) => {
        console.log('create a completed "split lines after word" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let splitLinesAfterWord = {
            moduleJSX: (<div className="split-lines-after-word-module-complete" key={id}>
                <SplitLinesAfterWordComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    charToSplit={charToSplit}
                />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, splitLinesAfterWord]
        })

    }

    convertCodeArrayToText = (moduleCode) => {
        if (moduleCode.length === 0) {
            return '';
        } else {
            let textCode = '';
            for (let i = 0; i < moduleCode.length; i++) {
                if (moduleCode[i].code === "") {
                    continue;
                }
                textCode += moduleCode[i].code + '\n';
            }
            return textCode;
        }
    }

    async ouptutModulesFromModuleCodeState(moduleCodeArr) {
        // begin by deleting all savedText
        this.props.updateSavedText([]);
        for (let i = 0; i < moduleCodeArr.length; i++) {
            let moduleType = moduleCodeArr[i].code.split(' ')[0];
            // the slice takes off the 2 ending quotations and ending parenthesis off of the 2nd param
            let moduleParams = moduleCodeArr[i].code.slice(0, moduleCodeArr[i].code.length - 2)
                .replace(moduleType + ' \"(', '').split(")\" \"(");

            let id;
            let stoppingCharacters;
            let charToSplit;

            // validate the incoming code line
            let isValidCode = validateCode(moduleType, moduleParams);

            if (isValidCode.valid === false) {
                // if invalid, log out the error and quit
                this.setState({
                    codeErrorMsg: isValidCode.message
                });
                return;
            } else if (isValidCode.valid === true && i === moduleCodeArr.length - 1) {
                // if the last module code is valid, display no error messgaes
                this.setState({
                    codeErrorMsg: ""
                });
            }

            switch (moduleType) {
                case "ReplaceCharacterModule":
                    id = moduleCodeArr[i].id;
                    // slice off the double quotes - found at the beginning and the end
                    let replaceCharacter = moduleParams[0]
                    let insertCharacter = moduleParams[1]
                    await this.handleCreateReplaceCharacterModuleComplete(id, replaceCharacter, insertCharacter);
                    break;
                case "DeleteBeginningModule":
                    id = moduleCodeArr[i].id;
                    stoppingCharacters = moduleParams[0];
                    await this.handleCreateDeleteBeginningModuleComplete(id, stoppingCharacters);
                    break;
                case "DeleteEndingModule":
                    id = moduleCodeArr[i].id;
                    stoppingCharacters = moduleParams[0];
                    await this.handleCreateDeleteEndingModuleComplete(id, stoppingCharacters);
                    break;
                case "SaveTextModule":
                    id = moduleCodeArr[i].id;
                    let saveTextName = moduleParams[0];
                    await this.handleCreateSavedTextModuleComplete(id, saveTextName);
                    break;
                case "ConcatenateModule":
                    id = moduleCodeArr[i].id;
                    await this.handleCreateConcatenateModuleComplete(id);
                    break;
                case "RemoveBlankLinesModule":
                    id = moduleCodeArr[i].id;
                    await this.handleCreateRemoveBlankLinesModuleComplete(id);
                    break;
                case "RemoveExcessSpacesModule":
                    id = moduleCodeArr[i].id;
                    await this.handleCreateRemoveExcessSpacesModuleComplete(id);
                    break;
                case "SplitLinesBeforeWord":
                    id = moduleCodeArr[i].id;
                    charToSplit = moduleParams[0];
                    await this.handleCreateSplitLinesBeforeWordModuleComplete(id, charToSplit);
                    break;
                case "SplitLinesAfterWord":
                    id = moduleCodeArr[i].id;
                    charToSplit = moduleParams[0];
                    await this.handleCreateSplitLinesAfterWordModuleComplete(id, charToSplit);
                    break;
                default:
                    console.log('that module is not found')
            }
        }
    }

    render() {
        let { modules, codeErrorMsg } = this.state;
        const { moduleActiveToggle } = this.props;

        let key = 0;
        const moduleList = modules.map(module => {
            key++
            return (<div className="single-module" key={key}>
                {module.moduleJSX}
            </div>
            )
        })

        return (
            <div className="parse-function-container">
                <h4 className="black-text"><b>PARSE FUNCTION CONTAINER</b></h4>
                <ParseItCode
                    parseItCode={this.parseItCode}
                    errorMsg={codeErrorMsg}
                />
                <br />
                <br />
                <br />
                {moduleList}

                <div className="row module-dropdown-list">

                    <div className="module-dropdown replace-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-replace-module btn'
                            href='!#'
                            data-target='replace-module-dropdown'
                            disabled={moduleActiveToggle}>Replace Modules</a>
                        <ul id='replace-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" onClick={this.handleCreateReplaceCharacterModule} className="dropdown-button">Replace Characters</button></li>
                            <li><button href="!#" style={{ background: "lightgrey" }} className="dropdown-button">Replace Words (will be done in future)</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown delete-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-delete-module btn'
                            href='!#'
                            data-target='delete-module-dropdown'
                            disabled={moduleActiveToggle}>Delete Modules</a>
                        <ul id='delete-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteBeginningModule}>Delete beginning until a set of characters</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteEndingModule}>Delete everything from the end to a set of characters</button></li>
                            <li><button href="!#" className="dropdown-button" style={{ background: "lightgrey" }} onClick={this.handleCreateDeleteEndingModule}>Delete everything between two sets of characters</button></li>
                            <li><button href="!#" className="dropdown-button" style={{ background: "lightgrey" }} onClick={this.handleCreateDeleteEndingModule}>Delete a line if it contains a set of characters</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown create-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-create-module btn'
                            href='!#'
                            data-target='create-module-dropdown'
                            disabled={moduleActiveToggle}>Create Modules</a>
                        <ul id='create-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" style={{ background: "lightgrey" }}>Create a line at the beginning of all inputs</button></li>
                            <li><button href="!#" className="dropdown-button" style={{ background: "lightgrey" }}>Create a line at the end of all inputs</button></li>
                            <li><button href="!#" className="dropdown-button" style={{ background: "lightgrey" }}>Create a line at the beginning of the first input</button></li>
                            <li><button href="!#" className="dropdown-button" style={{ background: "lightgrey" }}>Create a line at the end of the last input</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown multi-line-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-multi-line-module btn'
                            href='!#'
                            data-target='multi-line-module-dropdown'
                            disabled={moduleActiveToggle}>Multi-Line Modules</a>
                        <ul id='multi-line-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" style={{ background: "lightgrey" }} className="dropdown-button" >Add Text to the Beginning of a Multiple</button></li>
                            <li><button href="!#" style={{ background: "lightgrey" }} className="dropdown-button" >Split a Multiple Into Two Lines if a Word Contains a Phrase: Before Word</button></li>
                            <li><button href="!#" style={{ background: "lightgrey" }} className="dropdown-button" >Split a Multiple Into Two Lines if a Word Contains a Phrase: After Word</button></li>
                            <li><button href="!#" style={{ background: "grey" }} className="dropdown-button" >Concatenate a Multiple??? (Don't think this is too helpful)</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown split-line-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-split-line-module btn'
                            href='!#'
                            data-target='split-line-module-dropdown'
                            disabled={moduleActiveToggle}>Split Line Modules</a>
                        <ul id='split-line-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSplitLinesBeforeWordModule}>Split Into Two Lines if a Word Contains a Phrase: Before Word</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSplitLinesAfterWordModule}>Split Into Two Lines if a Word Contains a Phrase: After Word</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown misc-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-misc-module btn'
                            href='!#'
                            data-target='misc-module-dropdown'
                            disabled={moduleActiveToggle}>Misc Modules</a>
                        <ul id='misc-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateConcatenateModule}>Concatenate On One Line</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateRemoveBlankLinesModule}>Remove Blank Lines</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateRemoveExcessSpacesModule}>Remove Excess Spaces</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown save-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-save-module btn'
                            href='!#'
                            data-target='save-module-dropdown'
                            disabled={moduleActiveToggle}>Save Text Modules</a>
                        <ul id='save-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSavedTextModule}>Save Text and then Get Original Text</button></li>
                        </ul>
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
        codeText: state.textRed.codeText,
        previewToggle: state.textRed.previewToggle,
        moduleActiveToggle: state.textRed.moduleActiveToggle,
        deletionsPreview: state.textRed.deletionsPreview,
        additionsPreview: state.textRed.additionsPreview
    };
};

export default connect(mapStateToProps, actions)(ParseFunctionContainer);