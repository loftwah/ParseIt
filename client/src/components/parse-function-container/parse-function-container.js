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
import SplitMultipleBeforeWordModule from '../parse-function-components/multiple-split-lines-before-word/multiple-split-lines-before-word-module';
import SplitMultipleBeforeWordModuleComplete from '../parse-function-components/multiple-split-lines-before-word/multiple-split-lines-before-word-module-complete';
import SplitMultipleAfterWordModule from '../parse-function-components/multiple-split-lines-after-word/multiple-split-lines-after-word-module';
import SplitMultipleAfterWordModuleComplete from '../parse-function-components/multiple-split-lines-after-word/multiple-split-lines-after-word-module-complete';
import MultipleAddTextToBeginning from '../parse-function-components/multiple-add-text-to-beginning/multiple-add-text-to-beginning-module';
import MultipleAddTextToBeginningComplete from '../parse-function-components/multiple-add-text-to-beginning/multiple-add-text-to-beginning-module-complete';
import MultipleDeleteLine from '../parse-function-components/multiple-delete-line/multiple-delete-line-module';
import MultipleDeleteLineComplete from '../parse-function-components/multiple-delete-line/multiple-delete-line-module-complete';
import DeleteSpecifiedLinesModule from '../parse-function-components/delete-specified-lines-module/delete-specified-lines-module';
import DeleteSpecifiedLinesModuleComplete from '../parse-function-components/delete-specified-lines-module/delete-specified-lines-module-complete';
import DeleteBetweenCharactersModule from '../parse-function-components/delete-between-characters-module/delete-between-characters-module';
import DeleteBetweenCharactersModuleComplete from '../parse-function-components/delete-between-characters-module/delete-between-characters-module-complete';
import DeleteLineIfHasCharacters from '../parse-function-components/delete-line-if-has-characters-module/delete-line-if-has-characters-module';
import DeleteLineIfHasCharactersComplete from '../parse-function-components/delete-line-if-has-characters-module/delete-line-if-has-characters-module-complete';
import DeleteLineIfDoesntHaveCharacters from '../parse-function-components/delete-line-if-doesnt-have-characters-module/delete-line-if-doesnt-have-characters-module';
import DeleteLineIfDoesntHaveCharactersComplete from '../parse-function-components/delete-line-if-doesnt-have-characters-module/delete-line-if-doesnt-have-characters-module-complete';
import CreateLineBeginningAllInputs from '../parse-function-components/create-line-beginning-all-inputs-module/create-line-beginning-all-inputs-module';
import CreateLineBeginningAllInputsComplete from '../parse-function-components/create-line-beginning-all-inputs-module/create-line-beginning-all-inputs-module-complete';
import CreateLineBeginningFirstInput from '../parse-function-components/create-line-beginning-first-input-module/create-line-beginning-first-input-module';
import CreateLineBeginningFirstInputComplete from '../parse-function-components/create-line-beginning-first-input-module/create-line-beginning-first-input-module-complete';
import CreateLineEndAllInputs from '../parse-function-components/create-line-end-all-inputs-module/create-line-end-all-inputs-module';
import CreateLineEndAllInputsComplete from '../parse-function-components/create-line-end-all-inputs-module/create-line-end-all-inputs-module-complete';
import CreateLineAtLastInput from '../parse-function-components/create-line-end-last-input-module/create-line-end-last-input-module';
import CreateLineAtLastInputComplete from '../parse-function-components/create-line-end-last-input-module/create-line-end-last-input-module-complete';
import ProgressLoader from '../navbar-components/progress-loader/progress-loader';

import * as actions from '../../actions';

class ParseFunctionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: [], // JSX for modules
            moduleCode: [], // moduleCode will be converted into codeText for reducer
            codeErrorMsg: '',
            isProgressLoaderBusy: false, // used when coming from navbar
        };
        this.handleDeleteModule = this.handleDeleteModule.bind(this);
        this.ouptutModulesFromModuleCodeState = this.ouptutModulesFromModuleCodeState.bind(this);
        this.parseItCode = this.parseItCode.bind(this);
    }

    componentDidMount() {
        const { codeText, updateOutputText, inputText, toggleFromNavbarItem } = this.props;

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

        // If we mounted this component via toggling navbar items - we need to build the modules from scratch, rather than store the JSX inside the redux state (for the case where a user wants to delete a module)
        // If we came from navbar item, run the following
        if (toggleFromNavbarItem === true) {
            // Bring back the input text
            updateOutputText(inputText);

            // create moduleCode structured like the state
            let moduleCode = [];
            const codeArr = codeText.split('\n');

            let randId;
            for (let i = 0; i < codeArr.length; i++) {
                randId = Math.random();
                moduleCode.push({
                    code: codeArr[i],
                    id: randId
                })
            }

            // update the state with moduleCode
            // Also turn on the ProgressLoader component if we have a lot of modules that we need to load
            if (moduleCode.length > 15) {
                this.setState({
                    moduleCode,
                    isProgressLoaderBusy: true
                });
            } else {
                this.setState({
                    moduleCode
                });
            }

            // build all modules found in the moduleCode state inside getSnapshotBeforeUpdate
        }
    }

    async getSnapshotBeforeUpdate(prevProps, prevState) {
        const { moduleCode } = this.state;
        const { updateOutputText, initializeCodeToggle, initializeCode,
            togglePreviewOff, toggleSavedTextOff, toggleOutputTextOn,
            toggleFromNavbarItem, updateFromNavbarItem } = this.props;

        if (initializeCode === true) {
            // A component told this component to initialize all code inside ParseIt code container
            // The "text-input" container has this power - it is used if a user wants to update their text inside the textbox
            // When a user updates their text, they probably want to fire off their code as well - this code does that for them
            console.log("initialize the code");

            // Turn off initializeCodeToggle so that we can use it again if we want to
            initializeCodeToggle(false);

            // Direct user to correct view
            toggleSavedTextOff();
            toggleOutputTextOn();

            // in the case where the application was in "preview mode" we will turn the preview off
            togglePreviewOff();

            // delete all module JSX and start fresh
            const newState = { ...this.state, modules: [] };

            await this.setStateAsync(newState);

            // With the module code we will "start over"
            // Bring back the input text
            updateOutputText(this.props.inputText);

            // build all modules found in the moduleCode state

            // doing a setTimeout like the "else if":
            // Pro: Will load parseit container and all the text
            // Con: Will be "glitchy" if there are very few modules involve (very quick load)
            this.ouptutModulesFromModuleCodeState(moduleCode);
        }
        else if (toggleFromNavbarItem === true) {
            // We have came from a navbar item

            // When the user toggles from navbar back to ParseIt home - we will need to re-render everything back
            // The state was updated during component mount (from snapshot) - now we will build all modules found in the moduleCode state we have brought back

            // Go back to default view state
            this.props.updateSavedTextContainerDisplay("combine-saves");
            this.props.updateContainerDisplay(0);
            this.props.toggleSavedTextOff();
            this.props.moduleActiveOff();
            this.props.togglePreviewOff();

            // We only need a small amount of time to load the page before outputting modules
            // Note: returning a new Promise inside the ouptutModulesFromModuleCodeState function and resolving it after the codeErrorMsg setState did not work as planned - there might be a better way
            setTimeout(() => this.ouptutModulesFromModuleCodeState(moduleCode), 1);

            // turn off "from navbar item" action
            updateFromNavbarItem(false);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Works with getSnapshotBeforeUpdate
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
        // This function is activated from submitted modules (from edited-modules)
        // ParseIt code submission does NOT enter here

        // Example of how the "Module Code" will work:
        // Template: ReplaceCharacterModule "text" "other text"
        // the above means "create a character module and submit a replacement of "text" with "other text"

        const { updateCodeText } = this.props;

        // Below handles the case where there is invalid ParseIt code that was submitted and was not corrected, and the user creates more modules via buttons
        // The below code will show all ParseIt code, and stop at the first instance of invalid code

        let { moduleCode } = this.state
        let validCode = [];
        let codeLineObj;
        let codeLine;
        let currLineNum;

        // cycle through all code and until we hit one invalid line of code
        for (let idx = 0; idx < moduleCode.length; idx++) {
            codeLineObj = moduleCode[idx];
            codeLine = codeLineObj.code;
            currLineNum = idx + 1; // indexed at 1
            let isValidCode = validateCode(codeLine, currLineNum);

            // push only valid lines of code as the moduleCode
            // break when a line of code is invalid
            if (isValidCode.valid === false) {
                break;
            } else {
                validCode.push(codeLineObj);
            }
        }

        // push the moduleCodeText received by the submission of the edited module
        validCode.push(moduleCodeText);

        this.setState({
            moduleCode: validCode,
            codeErrorMsg: ''
        }, () => console.log(this.state.moduleCode));

        const codeText = this.convertCodeArrayToText(validCode);
        updateCodeText(codeText);

    }

    async parseItCode(codeStr) {
        const { updateCodeText, updateOutputText, updateContainerDisplay,
            toggleSavedTextOff, toggleOutputTextOn, inputText } = this.props;

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

    handleCreateDeleteBetweenCharactersModule = (e) => {
        e.preventDefault();
        console.log('create a "delete between characters" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();

        let id = Math.random();
        let deleteBetweenCharacters = {
            moduleJSX: (<div className="delete-between-characters-module" key={id}>
                <DeleteBetweenCharactersModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateDeleteBetweenCharactersModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, deleteBetweenCharacters];

        this.setState({
            modules: modules
        })
    }

    handleCreateDeleteBetweenCharactersModuleComplete = (id, startCharacters, endCharacters) => {
        console.log('create a completed "delete between characters" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let deleteBetweenCharacters = {
            moduleJSX: (<div className="delete-between-characters-module" key={id}>
                <DeleteBetweenCharactersModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    startCharacters={startCharacters}
                    endCharacters={endCharacters} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, deleteBetweenCharacters]
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

    handleCreateDeleteLineIfHasCharsModule = (e) => {
        e.preventDefault();
        console.log('create a "delete line if it has chars" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let deleteLineIfCharsModule = {
            moduleJSX: (<div className="delete-line-if-has-chars-module" key={id}>
                <DeleteLineIfHasCharacters
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateDeleteLineIfHasCharsModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, deleteLineIfCharsModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateDeleteLineIfHasCharsModuleComplete = (id, chars) => {
        console.log('create a completed "delete line if it has chars" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let deleteLineIfCharsModule = {
            moduleJSX: (<div className="delete-line-if-has-chars-module-complete" key={id}>
                <DeleteLineIfHasCharactersComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    chars={chars} />
            </div>),
            id: id
        };

        console.log(id);
        this.setState({
            modules: [...newModules, deleteLineIfCharsModule]
        })
    }

    handleCreateDeleteLineIfDoesntHaveCharsModule = (e) => {
        e.preventDefault();
        console.log('create a "delete line if it doesn\'t have chars" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let deleteLineIfDoesntCharsModule = {
            moduleJSX: (<div className="delete-line-if-doesnt-have-chars-module" key={id}>
                <DeleteLineIfDoesntHaveCharacters
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateDeleteLineIfDoesntHaveCharsModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, deleteLineIfDoesntCharsModule];

        this.setState({
            modules: modules
        })
    }

    handleCreateDeleteLineIfDoesntHaveCharsModuleComplete = (id, chars) => {
        console.log('create a completed "delete line if it doesn\'t have chars" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let deleteLineIfDoesntCharsModule = {
            moduleJSX: (<div className="delete-line-if-doesnt-have-chars-module-complete" key={id}>
                <DeleteLineIfDoesntHaveCharactersComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    chars={chars} />
            </div>),
            id: id
        };

        console.log(id);
        this.setState({
            modules: [...newModules, deleteLineIfDoesntCharsModule]
        })
    }

    handleCreateDeleteSpecifiedLinesModule = (e) => {
        e.preventDefault();
        console.log('create a "delete specified lines" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let deleteSpecifiedLines = {
            moduleJSX: (<div className="delete-specified-lines-module" key={id}>
                <DeleteSpecifiedLinesModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateDeleteSpecifiedLinesModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, deleteSpecifiedLines];

        this.setState({
            modules: modules
        })
    }

    handleCreateDeleteSpecifiedLinesModuleComplete = (id, linesToDelete) => {
        console.log('create a completed "delete specified lines" module!')

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let deleteSpecifiedLines = {
            moduleJSX: (<div className="delete-specified-lines-module-complete" key={id}>
                <DeleteSpecifiedLinesModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    linesToDelete={linesToDelete} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, deleteSpecifiedLines]
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

    handleCreate_CreateLineBeginningAllInputsModule = (e) => {
        e.preventDefault();
        console.log('create a "create a line at beginning of all inputs" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let createLineBeginningAllModule = {
            moduleJSX: (<div className="create-line-beginning-all-module" key={id}>
                <CreateLineBeginningAllInputs
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreate_CreateLineBeginningAllInputsModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, createLineBeginningAllModule];

        this.setState({
            modules: modules
        })
    }

    handleCreate_CreateLineBeginningAllInputsModuleComplete = (id, charsToAdd) => {
        console.log('create a completed "create a line at beginning of all inputs" module!');
        const { toggleSavedTextOff, toggleOutputTextOn } = this.props

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let createLineBeginningAllModule = {
            moduleJSX: (<div className="create-line-beginning-all-module" key={id}>
                <CreateLineBeginningAllInputsComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    charsToAdd={charsToAdd} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, createLineBeginningAllModule]
        })
    }

    handleCreate_CreateLineBeginningFirstInputModule = (e) => {
        e.preventDefault();
        console.log('create a "create a line at beginning of first input" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let createLineBeginningFirstModule = {
            moduleJSX: (<div className="create-line-beginning-first-module" key={id}>
                <CreateLineBeginningFirstInput
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreate_CreateLineBeginningFirstInputModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, createLineBeginningFirstModule];

        this.setState({
            modules: modules
        })
    }

    handleCreate_CreateLineBeginningFirstInputModuleComplete = (id, charsToAdd) => {
        console.log('create a completed "create a line at beginning of first input" module!');
        const { toggleSavedTextOff, toggleOutputTextOn } = this.props

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let createLineBeginningFirstModule = {
            moduleJSX: (<div className="create-line-beginning-first-module" key={id}>
                <CreateLineBeginningFirstInputComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    charsToAdd={charsToAdd} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, createLineBeginningFirstModule]
        })
    }

    handleCreate_CreateLineEndAllInputsModule = (e) => {
        e.preventDefault();
        console.log('create a "create a line at end of all inputs" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let createLineEndAllModule = {
            moduleJSX: (<div className="create-line-end-all-module" key={id}>
                <CreateLineEndAllInputs
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreate_CreateLineEndAllInputsModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, createLineEndAllModule];

        this.setState({
            modules: modules
        })
    }

    handleCreate_CreateLineEndAllInputsModuleComplete = (id, charsToAdd) => {
        console.log('create a completed "create a line at end of all inputs" module!');
        const { toggleSavedTextOff, toggleOutputTextOn } = this.props

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let createLineEndAllModule = {
            moduleJSX: (<div className="create-line-end-all-module" key={id}>
                <CreateLineEndAllInputsComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    charsToAdd={charsToAdd} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, createLineEndAllModule]
        })
    }

    handleCreate_CreateLineEndLastInputModule = (e) => {
        e.preventDefault();
        console.log('create a "create a line at end of last input" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let createLineEndLastModule = {
            moduleJSX: (<div className="create-line-end-last-module" key={id}>
                <CreateLineAtLastInput
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreate_CreateLineEndLastInputModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, createLineEndLastModule];

        this.setState({
            modules: modules
        })
    }

    handleCreate_CreateLineEndLastInputModuleComplete = (id, charsToAdd) => {
        console.log('create a completed "create a line at end of last input" module!');
        const { toggleSavedTextOff, toggleOutputTextOn } = this.props

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })
        let createLineEndLastModule = {
            moduleJSX: (<div className="create-end-last-first-module" key={id}>
                <CreateLineAtLastInputComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    charsToAdd={charsToAdd} />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, createLineEndLastModule]
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

    handleCreateSplitMultipleBeforeWordModule = (e) => {
        e.preventDefault();
        console.log('create a "split multiple before word" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let splitMultipleBeforeWord = {
            moduleJSX: (<div className="split-multiple-before-word-module" key={id}>
                <SplitMultipleBeforeWordModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateSplitMultipleBeforeWordModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, splitMultipleBeforeWord];

        this.setState({
            modules: modules
        })
    }

    handleCreateSplitMultipleBeforeWordModuleComplete = (id, lineNumBegin, lineMultiple, charToSplit, direction, instance) => {
        console.log('create a completed "split multiple before word" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let splitMultipleBeforeWord = {
            moduleJSX: (<div className="split-multiple-before-word-module-complete" key={id}>
                <SplitMultipleBeforeWordModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    lineNumBegin={lineNumBegin}
                    lineMultiple={lineMultiple}
                    charToSplit={charToSplit}
                    direction={direction}
                    instance={instance}
                />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, splitMultipleBeforeWord]
        })

    }

    handleCreateSplitMultipleAfterWordModule = (e) => {
        e.preventDefault();
        console.log('create a "split multiple after word" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let splitMultipleAfterWord = {
            moduleJSX: (<div className="split-multiple-after-word-module" key={id}>
                <SplitMultipleAfterWordModule
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateSplitMultipleAfterWordModuleComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, splitMultipleAfterWord];

        this.setState({
            modules: modules
        })
    }

    handleCreateSplitMultipleAfterWordModuleComplete = (id, lineNumBegin, lineMultiple, charToSplit, direction, instance) => {
        console.log('create a completed "split multiple after word" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let splitMultipleAfterWord = {
            moduleJSX: (<div className="split-multiple-after-word-module-complete" key={id}>
                <SplitMultipleAfterWordModuleComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    lineNumBegin={lineNumBegin}
                    lineMultiple={lineMultiple}
                    charToSplit={charToSplit}
                    direction={direction}
                    instance={instance}
                />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, splitMultipleAfterWord]
        })

    }

    handleCreateMultipleAddTextToBeginningModule = (e) => {
        e.preventDefault();
        console.log('create a "multiple add text to beginning" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let multipleAddTextToBeginning = {
            moduleJSX: (<div className="multiple-add-text-to-beginning-module" key={id}>
                <MultipleAddTextToBeginning
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateMultipleAddTextToBeginningComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, multipleAddTextToBeginning];

        this.setState({
            modules: modules
        })
    }

    handleCreateMultipleAddTextToBeginningComplete = (id, lineNumBegin, lineMultiple, charToAdd) => {
        console.log('create a completed "multiple add text to beginning" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let multipleAddTextToBeginning = {
            moduleJSX: (<div className="multiple-add-text-to-beginning-module-complete" key={id}>
                <MultipleAddTextToBeginningComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    lineNumBegin={lineNumBegin}
                    lineMultiple={lineMultiple}
                    charToAdd={charToAdd}
                />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, multipleAddTextToBeginning]
        })

    }

    handleCreateMultipleDeleteLineModule = (e) => {
        e.preventDefault();
        console.log('create a "multiple delete line" module!');
        const { moduleActiveOn } = this.props;
        moduleActiveOn();
        let id = Math.random();
        let multipleDeleteLine = {
            moduleJSX: (<div className="multiple-delete-line-module" key={id}>
                <MultipleDeleteLine
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    handleModuleCode={this.handleModuleCode}
                    completeModule={this.handleCreateMultipleDeleteLineComplete} />
            </div>),
            id: id
        };

        console.log(id);
        let modules = [...this.state.modules, multipleDeleteLine];

        this.setState({
            modules: modules
        })
    }

    handleCreateMultipleDeleteLineComplete = (id, lineNumBegin, lineMultiple) => {
        console.log('create a completed "multiple delete line" module!');

        const { toggleSavedTextOff, toggleOutputTextOn } = this.props;

        toggleSavedTextOff();
        toggleOutputTextOn();

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let multipleDeleteLine = {
            moduleJSX: (<div className="multiple-delete-line-module-complete" key={id}>
                <MultipleDeleteLineComplete
                    id={id}
                    handleDeleteModule={this.handleDeleteModule}
                    lineNumBegin={lineNumBegin}
                    lineMultiple={lineMultiple}
                />
            </div>),
            id: id
        };

        console.log(id);;
        this.setState({
            modules: [...newModules, multipleDeleteLine]
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

        // In every case, line breaks are deleted after parseIt button is clicked
        // If we want to show an error to the user and display the affected line at the correct number, we must count line breaks
        let lineBreakCount = 0;
        for (let i = 0; i < moduleCodeArr.length; i++) {

            // validate the incoming code line
            let moduleCodeLine = moduleCodeArr[i].code;
            // reading lines should be indexed at 1, while line breaks are taken into account
            let currLineNum = (i + 1) - lineBreakCount;
            let isValidCode = validateCode(moduleCodeLine, currLineNum);

            // Is the code valid?
            if (isValidCode.valid === false) {
                // if invalid, log out the error and quit
                this.setState({
                    codeErrorMsg: isValidCode.message,
                });
                // Show the progress loader for an extra 1/2 second
                setTimeout(() => {
                    this.setState({
                        isProgressLoaderBusy: false
                    });
                }, 500)
                return;
            } else if (isValidCode.valid === true && i === moduleCodeArr.length - 1) {
                // if the last module code is valid, display no error messgaes
                this.setState({
                    codeErrorMsg: ""
                });
            }

            // The line of code is valid, create a module 

            let moduleType = moduleCodeLine.split(' ')[0];
            // the slice takes off the 2 ending quotations and ending parenthesis off of the 2nd param
            let moduleParams = moduleCodeLine.slice(0, moduleCodeLine.length - 2)
                .replace(moduleType + ' "(', '').split(")\" \"(");

            let id, stoppingCharacters, charToSplit, lineNumBegin, lineMultiple, direction, instance;
            let charToAdd, linesToDelete, startCharacters, endCharacters, charDeleteLine, charKeepLine;

            switch (moduleType) {
                case "ReplaceCharacters":
                    id = moduleCodeArr[i].id;
                    // slice off the double quotes - found at the beginning and the end
                    let replaceCharacter = moduleParams[0]
                    let insertCharacter = moduleParams[1]
                    await this.handleCreateReplaceCharacterModuleComplete(id, replaceCharacter, insertCharacter);
                    break;
                case "DeleteBeginningUntilPhrase":
                    id = moduleCodeArr[i].id;
                    stoppingCharacters = moduleParams[0];
                    await this.handleCreateDeleteBeginningModuleComplete(id, stoppingCharacters);
                    break;
                case "DeleteLastPhraseUntilEnd":
                    id = moduleCodeArr[i].id;
                    stoppingCharacters = moduleParams[0];
                    await this.handleCreateDeleteEndingModuleComplete(id, stoppingCharacters);
                    break;
                case "SaveText":
                    id = moduleCodeArr[i].id;
                    let saveTextName = moduleParams[0];
                    await this.handleCreateSavedTextModuleComplete(id, saveTextName);
                    break;
                case "Concatenate":
                    id = moduleCodeArr[i].id;
                    await this.handleCreateConcatenateModuleComplete(id);
                    break;
                case "RemoveBlankLines":
                    id = moduleCodeArr[i].id;
                    await this.handleCreateRemoveBlankLinesModuleComplete(id);
                    break;
                case "RemoveExcessSpaces":
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
                case "MultipleSplitLinesBeforeWord":
                    id = moduleCodeArr[i].id;
                    lineNumBegin = moduleParams[0];
                    lineMultiple = moduleParams[1];
                    charToSplit = moduleParams[2];
                    direction = moduleParams[3];
                    instance = moduleParams[4];
                    await this.handleCreateSplitMultipleBeforeWordModuleComplete(id, lineNumBegin, lineMultiple, charToSplit, direction, instance);
                    break;
                case "MultipleSplitLinesAfterWord":
                    id = moduleCodeArr[i].id;
                    lineNumBegin = moduleParams[0];
                    lineMultiple = moduleParams[1];
                    charToSplit = moduleParams[2];
                    direction = moduleParams[3];
                    instance = moduleParams[4];
                    await this.handleCreateSplitMultipleAfterWordModuleComplete(id, lineNumBegin, lineMultiple, charToSplit, direction, instance);
                    break;
                case "MultipleAddTextToBeginning":
                    id = moduleCodeArr[i].id;
                    lineNumBegin = moduleParams[0];
                    lineMultiple = moduleParams[1];
                    charToAdd = moduleParams[2];
                    await this.handleCreateMultipleAddTextToBeginningComplete(id, lineNumBegin, lineMultiple, charToAdd);
                    break;
                case "MultipleDeleteLine":
                    id = moduleCodeArr[i].id;
                    lineNumBegin = moduleParams[0];
                    lineMultiple = moduleParams[1];
                    await this.handleCreateMultipleDeleteLineComplete(id, lineNumBegin, lineMultiple);
                    break;
                case "DeleteCertainLines":
                    id = moduleCodeArr[i].id;
                    linesToDelete = moduleParams[0];
                    await this.handleCreateDeleteSpecifiedLinesModuleComplete(id, linesToDelete);
                    break;
                case "DeleteBetweenPhrases":
                    id = moduleCodeArr[i].id;
                    startCharacters = moduleParams[0];
                    endCharacters = moduleParams[1];
                    await this.handleCreateDeleteBetweenCharactersModuleComplete(id, startCharacters, endCharacters);
                    break;
                case "DeleteLineIfHasPhrase":
                    id = moduleCodeArr[i].id;
                    charDeleteLine = moduleParams[0];
                    await this.handleCreateDeleteLineIfHasCharsModuleComplete(id, charDeleteLine);
                    break;
                case "DeleteLineIfDoesntHavePhrase":
                    id = moduleCodeArr[i].id;
                    charKeepLine = moduleParams[0];
                    await this.handleCreateDeleteLineIfDoesntHaveCharsModuleComplete(id, charKeepLine);
                    break;
                case "CreateLineBeginningAllInputs":
                    id = moduleCodeArr[i].id;
                    charToAdd = moduleParams[0];
                    await this.handleCreate_CreateLineBeginningAllInputsModuleComplete(id, charToAdd);
                    break;
                case "CreateLineBeginningFirstInput":
                    id = moduleCodeArr[i].id;
                    charToAdd = moduleParams[0];
                    await this.handleCreate_CreateLineBeginningFirstInputModuleComplete(id, charToAdd);
                    break;
                case "CreateLineEndAllInputs":
                    id = moduleCodeArr[i].id;
                    charToAdd = moduleParams[0];
                    await this.handleCreate_CreateLineEndAllInputsModuleComplete(id, charToAdd);
                    break;
                case "CreateLineEndLastInput":
                    id = moduleCodeArr[i].id;
                    charToAdd = moduleParams[0];
                    await this.handleCreate_CreateLineEndLastInputModuleComplete(id, charToAdd);
                    break;
                case "":
                    // allow blank lines to pass through
                    lineBreakCount++;
                    break;
                default:
                    console.log('that module is not found');
            }
        }
        this.setState({
            codeErrorMsg: '',
            isModuleLoaderBusy: false
        })

        // Show the progress loader for an extra 1/2 second
        setTimeout(() => {
            this.setState({
                isProgressLoaderBusy: false
            });
        }, 500)
    }

    render() {
        let { modules, codeErrorMsg, isProgressLoaderBusy } = this.state;
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

                {isProgressLoaderBusy === true ? (<ProgressLoader />) : (
                    <div className="progress-loader-not-busy"></div>
                )}

                <ParseItCode
                    parseItCode={this.parseItCode}
                    errorMsg={codeErrorMsg}
                />
                <h2 className="parseit-modules-title red-text text-lighten-3">ParseIt Modules</h2>
                {moduleList}

                <div className="row module-dropdown-list">
                    <div className="module-dropdown replace-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-replace-module btn'
                            href='!#'
                            data-target='replace-module-dropdown'
                            disabled={moduleActiveToggle}>Replace Modules</a>
                        <ul id='replace-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" onClick={this.handleCreateReplaceCharacterModule} className="dropdown-button">Replace Characters</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown delete-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-delete-module btn'
                            href='!#'
                            data-target='delete-module-dropdown'
                            disabled={moduleActiveToggle}>Delete Modules</a>
                        <ul id='delete-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteBeginningModule}>Delete Beginning Until a Phrase</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteEndingModule}>Delete From Last Instance of a Phrase Until End</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteSpecifiedLinesModule}>Delete Certain Lines</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteBetweenCharactersModule}>Delete Everything Between Two Phrases</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteLineIfHasCharsModule}>Delete a Line If It Contains a Phrase</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateDeleteLineIfDoesntHaveCharsModule}>Delete a Line If It Doesn't Contain a Phrase</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown create-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-create-module btn'
                            href='!#'
                            data-target='create-module-dropdown'
                            disabled={moduleActiveToggle}>Create Modules</a>
                        <ul id='create-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreate_CreateLineBeginningAllInputsModule}>Create a Line at the Beginning of All Inputs</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreate_CreateLineBeginningFirstInputModule}>Create a Line at the Beginning of the First Input</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreate_CreateLineEndAllInputsModule}>Create a Line at the End of All Inputs</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreate_CreateLineEndLastInputModule}>Create a Line at the End of the Last Input</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown multi-line-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-multi-line-module btn'
                            href='!#'
                            data-target='multi-line-module-dropdown'
                            disabled={moduleActiveToggle}>Multi-Line Modules</a>
                        <ul id='multi-line-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSplitMultipleBeforeWordModule}>Split a Multiple Into Two Lines If a Word Contains a Phrase: Before Word</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSplitMultipleAfterWordModule}>Split a Multiple Into Two Lines If a Word Contains a Phrase: After Word</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateMultipleAddTextToBeginningModule}>Add Text to the Beginning of a Multiple</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateMultipleDeleteLineModule}>Delete a Line Multiple</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown split-line-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-split-line-module btn'
                            href='!#'
                            data-target='split-line-module-dropdown'
                            disabled={moduleActiveToggle}>Split Line Modules</a>
                        <ul id='split-line-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSplitLinesBeforeWordModule}>Split Into Two Lines If a Word Contains a Phrase: Before Word</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSplitLinesAfterWordModule}>Split Into Two Lines If a Word Contains a Phrase: After Word</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown misc-module-dropdown col s12 m6 l3">
                        <a className='dropdown-trigger-misc-module btn'
                            href='!#'
                            data-target='misc-module-dropdown'
                            disabled={moduleActiveToggle}>Clean Modules</a>
                        <ul id='misc-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateConcatenateModule}>Concatenate On One Line</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateRemoveBlankLinesModule}>Remove Blank Lines</button></li>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateRemoveExcessSpacesModule}>Remove Excess Spaces</button></li>
                        </ul>
                    </div>

                    <div className="module-dropdown save-module-dropdown col s12 m12 l6">
                        <a className='dropdown-trigger-save-module btn'
                            href='!#'
                            data-target='save-module-dropdown'
                            disabled={moduleActiveToggle}>Save Text Modules</a>
                        <ul id='save-module-dropdown' className='dropdown-content'>
                            <li><button href="!#" className="dropdown-button" onClick={this.handleCreateSavedTextModule}>Save Text and Get Original Text</button></li>
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
        additionsPreview: state.textRed.additionsPreview,
        initializeCode: state.textRed.initializeCode,
        toggleFromNavbarItem: state.textRed.toggleFromNavbarItem,
    };
};

export default connect(mapStateToProps, actions)(ParseFunctionContainer);