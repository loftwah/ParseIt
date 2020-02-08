import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import ReplaceCharacterModuleComplete from '../replace-character-module-complete'
import rootReducer from '../../../../reducers';

Enzyme.configure({ adapter: new EnzymeAdapter() });


test("renders without crashing", () => {
    const mockStore = createStore(rootReducer, {}, applyMiddleware(reduxThunk));
    const div = document.createElement("div");
    const replaceCharacter = "hi"
    const insertCharacter = "hello"
    ReactDOM.render(<Provider store={mockStore}><ReplaceCharacterModuleComplete
        replaceCharacter={replaceCharacter}
        insertCharacter={insertCharacter}
    /></Provider>, div)
})

test("Can manipulate simple inputs", () => {
    // I need to update the component state so that it has a "replace" and "insert" character to work with
    const mockStore = createStore(rootReducer, {
        textRed: {
            outputText: [{
                inputContainer: 0,
                text: 'hi world',
                name: 'textbox 1'
            },
            {
                inputContainer: 1,
                text: 'hi',
                name: 'textbox 2'
            }]
        }
    }, applyMiddleware(reduxThunk));

    const div = document.createElement("div");
    const replaceCharacter = "hi"
    const insertCharacter = "hello"
    ReactDOM.render(<Provider store={mockStore}><ReplaceCharacterModuleComplete
        replaceCharacter={replaceCharacter}
        insertCharacter={insertCharacter}
    /></Provider>, div)

    const outputText = mockStore.getState().textRed.outputText;
    const expectedResult = [{ "inputContainer": 0, "text": "hello world", "name": "textbox 1" }, { "inputContainer": 1, "text": "hello", "name": "textbox 2" }]
    expect(outputText).toEqual(expectedResult)
})

test("Should be able to deal with special symbols", () => {

    var sInsert = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    var sReplace = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ';
    // var sInsert = "abcd"
    // var sReplace = "befg"
    for (let i = 0; i < sInsert.length; i++) {
        const mockStore = createStore(rootReducer, {
            textRed: { outputText: [{ inputContainer: 0, text: sInsert[i], name: 'textbox 1' }] }
        }, applyMiddleware(reduxThunk));

        const div = document.createElement("div");
        const replaceCharacter = sInsert[i];
        const insertCharacter = sReplace[i];
        ReactDOM.render(<Provider store={mockStore}><ReplaceCharacterModuleComplete
            replaceCharacter={replaceCharacter}
            insertCharacter={insertCharacter}
        /></Provider>, div);

        const outputText = mockStore.getState().textRed.outputText;
        const expectedResult = [{ "inputContainer": 0, "text": sReplace[i], "name": "textbox 1" }];
        expect(outputText).toEqual(expectedResult);
    }
})