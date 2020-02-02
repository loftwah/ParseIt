import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import './parse-function-container.css';
import ParseItCode from '../parse-function-components/parseit-code/parseit-code';
import ReplaceCharacterModule from '../parse-function-components/replace-character-module/replace-character-module';
import ReplaceCharacterModuleComplete from '../parse-function-components/replace-character-module/replace-character-module-complete';
import * as actions from '../../actions';

class ParseFunctionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: [], // JSX for modules
            moduleCode: [], // moduleCode will be converted into codeText for reducer
        };
        this.handleDeleteModule = this.handleDeleteModule.bind(this);
        this.ouptutModulesFromModuleCodeState = this.ouptutModulesFromModuleCodeState.bind(this);
        this.parseItCode = this.parseItCode.bind(this);
    }

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger-common-module');
        M.Dropdown.init(elems, { coverTrigger: false });

        let replaceDropdown = document.querySelectorAll('.dropdown-trigger-replace-module');
        M.Dropdown.init(replaceDropdown, { coverTrigger: false });
    }

    setStateAsync = (state) => {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async handleDeleteModule(id) {
        console.log('id to be deleted: ', id);

        const { updateOutputText, updateCodeText } = this.props;

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

    async parseItCode (codeStr) {
        const { updateCodeText, updateOutputText } = this.props

        // We will create modules based on the ParseIt Code
        // We will begin by deleting everything

        // Bring back the input text
        updateOutputText(this.props.inputText);

        // create moduleCode using the codeStr made inside the parse-it-code component's textarea
        const pureCodeArr = codeStr.split('\n');

        let newModuleCode = [];
        let id;
        // run through the pureCodeArr to fill newModuleCode with code and id properties
        for (let i = 0; i < pureCodeArr.length; i++ ) {
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
        updateOutputText(this.props.inputText);

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

        let newModules = this.state.modules.filter(mod => {
            return mod.id !== id
        })

        let replaceCharModule = {
            moduleJSX: (<div className="replace-character-module" key={id}>
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

    convertCodeArrayToText = (moduleCode) => {
        if (moduleCode.length === 0) {
            return '';
        } else {
            let textCode = ''
            for (let i = 0; i < moduleCode.length; i++) {
                if(moduleCode[i].code === "") {
                    continue;
                }
                textCode += moduleCode[i].code + '\n';
            }
            return textCode;
        }
    }

    async ouptutModulesFromModuleCodeState (moduleCodeArr) {
        let insertCharacter;
        let replaceCharacter;
        let id;
        for (let i = 0; i < moduleCodeArr.length; i++) {
            let moduleType = moduleCodeArr[i].code.split(' ')[0]
            // the slice takes off the 2 ending quotations and ending parenthesis off of the 2nd param
            let moduleParams = moduleCodeArr[i].code.slice(0, moduleCodeArr[i].code.length - 2)
                .replace(moduleType + ' \"(','').split(")\" \"(")
            if (moduleType === "ReplaceCharacterModule") {
                id = moduleCodeArr[i].id;
                // slice off the double quotes - found at the beginning and the end
                replaceCharacter = moduleParams[0]
                insertCharacter = moduleParams[1]
                await this.handleCreateReplaceCharacterModuleComplete(id, replaceCharacter, insertCharacter);
            }
        }
    }

    render() {
        let { modules } = this.state;
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
                />
                <br />
                <br />
                <br />
                {moduleList}
                
                    <div className="module-dropdown-list">
                    <div className="common-module-dropdown">
                        <a className='dropdown-trigger-common-module btn'
                            href='!#'
                            data-target='common-module-dropdown'
                            disabled={moduleActiveToggle}>Common Modules</a>
                        <ul id='common-module-dropdown' className='dropdown-content'>
                            <li><a href="!#">To Uppercase</a></li>
                            <li><a href="!#">To Lowercase</a></li>
                            <li><a href="!#">Remove Blank Lines</a></li>
                            <li><a href="!#">Single Spaces</a></li>
                        </ul>
                    </div>

                    <div className="replace-module-dropdown">
                        <a className='dropdown-trigger-replace-module btn'
                            href='!#'
                            data-target='replace-module-dropdown'
                            disabled={moduleActiveToggle}>Replace Modules</a>
                        <ul id='replace-module-dropdown' className='dropdown-content'>
                            <li><a href="!#" onClick={this.handleCreateReplaceCharacterModule}>Replace Characters</a></li>
                            <li><a href="!#">Replace Words</a></li>
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