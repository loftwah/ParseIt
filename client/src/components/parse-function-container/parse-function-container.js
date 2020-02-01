import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import './parse-function-container.css';
import ReplaceCharacterModule from '../parse-function-components/replace-character-module/replace-character-module';
import ReplaceCharacterModuleComplete from '../parse-function-components/replace-character-module/replace-character-module-complete';
import * as actions from '../../actions';

class ParseFunctionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            moduleCode: []
        };
        this.handleDeleteModule = this.handleDeleteModule.bind(this);
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

    async handleDeleteModule(e, id) {
        console.log('id to be deleted: ', id);
        // debugger;

        // At this moment, "delete module will create a "ReplaceCharacterModule" using the following characters:

        const newModuleCode = this.state.moduleCode.filter(moduleCode => {
            if (moduleCode.id !== id) {
                return moduleCode;
            }
        })
        const newState = { ...this.state, modules: [], moduleCode: newModuleCode };

        await this.setStateAsync(newState);

        // With the module code we will "start over"
        // Bring back the output text
        this.props.updateOutputText(this.props.inputText);

        // Begin executing module code
        // console.log(newModuleCode);
        let insertCharacter;
        let replaceCharacter;
        for (let i = 0; i < newModuleCode.length; i++) {
            let singleModule = newModuleCode[i].moduleCode.split(' ')
            if (singleModule[0] === "ReplaceCharacterModule") {
                id = newModuleCode[i].id;
                replaceCharacter = singleModule[1];
                insertCharacter = singleModule[2];
                await this.handleCreateReplaceCharacterModuleComplete(id, replaceCharacter, insertCharacter);
            }
        }
    }

    handleModuleCode = moduleCodeText => {
        // Example of how the "Module Code" will work:
        // Template: ReplaceCharacterModule "text" "other text"
        // the above means "create a character module and submit a replacement of "text" with "other text"

        let moduleCode = [...this.state.moduleCode, moduleCodeText];

        this.setState({
            moduleCode: moduleCode
        }, () => console.log(this.state.moduleCode));
    }

    parseItCode = (codeArr) => {
        // ReplaceCharacterModule "text" "other text"
        // the above means "create a character module and submit a replacement of "text" with "other text"
    }

    handleCreateReplaceCharacterModule = (e) => {
        e.preventDefault();
        console.log('create a "replace character" module!')

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

    render() {
        let { modules, moduleCode } = this.state;

        // console.log('modules: ', modules);
        // console.log('moduleCode: ', moduleCode);

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
                {moduleList}
                <div className="common-module-dropdown">
                    <a className='dropdown-trigger-common-module btn'
                        href='!#'
                        data-target='common-module-dropdown'>Common Modules</a>
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
                        data-target='replace-module-dropdown'>Replace Modules</a>
                    <ul id='replace-module-dropdown' className='dropdown-content'>
                        <li><a href="!#" onClick={this.handleCreateReplaceCharacterModule}>Replace Characters</a></li>
                        <li><a href="!#">Replace Words</a></li>
                    </ul>
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
        additionsPreview: state.textRed.additionsPreview
    };
};

export default connect(mapStateToProps, actions)(ParseFunctionContainer);