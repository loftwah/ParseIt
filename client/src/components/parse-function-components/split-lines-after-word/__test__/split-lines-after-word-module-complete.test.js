import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import SplitLinesAfterWordModuleComplete from '../split-lines-after-word-module-complete'
import rootReducer from '../../../../reducers';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test("renders without crashing", () => {
    const mockStore = createStore(rootReducer, {}, applyMiddleware(reduxThunk));
    const div = document.createElement("div");
    const charToSplit = "hello";
    ReactDOM.render(<Provider store={mockStore}><SplitLinesAfterWordModuleComplete
        charToSplit={charToSplit}
    /></Provider>, div);
})


test("Can manipulate simple inputs", () => {
    const mockStore = createStore(rootReducer, {
        textRed: {
            outputText: [{
                inputContainer: 0,
                text: 'hello hi world',
                name: 'textbox 1'
            },
            {
                inputContainer: 1,
                text: 'cool hi everyone',
                name: 'textbox 2'
            }]
        }
    }, applyMiddleware(reduxThunk));

    const div = document.createElement("div");
    const charToSplit = "hi";
    ReactDOM.render(<Provider store={mockStore}><SplitLinesAfterWordModuleComplete
        charToSplit={charToSplit}
    /></Provider>, div);

    const outputText = mockStore.getState().textRed.outputText;
    const expectedResult = [{ "inputContainer": 0, "text": "hello hi\nworld", "name": "textbox 1" }, { "inputContainer": 1, "text": "cool hi\neveryone", "name": "textbox 2" }];
    expect(outputText).toEqual(expectedResult);
})

test("No splits lead to no changes", () => {
    const text_1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
    const text_2 = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
    const mockStore = createStore(rootReducer, {
        textRed: {
            outputText: [{
                inputContainer: 0,
                text: text_1,
                name: 'textbox 1'
            },
            {
                inputContainer: 1,
                text: text_2,
                name: 'textbox 2'
            }]
        }
    }, applyMiddleware(reduxThunk));

    const div = document.createElement("div");
    const charToSplit = "$//.";
    ReactDOM.render(<Provider store={mockStore}><SplitLinesAfterWordModuleComplete
        charToSplit={charToSplit}
    /></Provider>, div);

    const outputText = mockStore.getState().textRed.outputText;

    const resText_1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
    const resText_2 = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
    const expectedResult = [{ "inputContainer": 0, "text": resText_1, "name": "textbox 1" }, { "inputContainer": 1, "text": resText_2, "name": "textbox 2" }];
    expect(outputText).toEqual(expectedResult);
})

test("Can manipulate difficult inputs #1", () => {
    const text_1 = "hello\nhello \nhello  \n hello\n hello \n hello  \nhi hello hi\nhey hello hi hello";
    const text_2 = "hello everyone";
    const mockStore = createStore(rootReducer, {
        textRed: {
            outputText: [{
                inputContainer: 0,
                text: text_1,
                name: 'textbox 1'
            },
            {
                inputContainer: 1,
                text: text_2,
                name: 'textbox 2'
            }]
        }
    }, applyMiddleware(reduxThunk));

    const div = document.createElement("div");
    const charToSplit = "hello";
    ReactDOM.render(<Provider store={mockStore}><SplitLinesAfterWordModuleComplete
        charToSplit={charToSplit}
    /></Provider>, div);

    const outputText = mockStore.getState().textRed.outputText;

    const resText_1 = "hello\nhello\nhello\n \n hello\n hello\n hello\n \nhi hello\nhi\nhey hello\nhi hello";
    const resText_2 = "hello\neveryone";
    // Output
    // If "hello" => "hello" (nothing happens)
    // If "hello " => "hello" (deleted space at the end)
    // If "hello  " => "hello \n" (deleted space at end of hello + added new line as a space)
    const expectedResult = [{ "inputContainer": 0, "text": resText_1, "name": "textbox 1" }, { "inputContainer": 1, "text": resText_2, "name": "textbox 2" }];
    expect(outputText).toEqual(expectedResult);
})

test("Invoice Example #1 - split on Dollar Sign", () => {
    const text_1 = "Item B 3 $23.56 $70.68 Item D 4 $29.99 $119.96 Item J 7 $45.68 $319.76 Product F 11 $7.90 $86.90 Product G 58 $23.23 $1,347.34 Product I 3 $45.00 $135.00 Service F 1 $123.00 $123.00 Widget F 4000 $89.46 $357,840.00 Widget G 2 $23.45 $46.90 Widget H 3 $4.12 $12.36";
    const mockStore = createStore(rootReducer, {
        textRed: {
            outputText: [{
                inputContainer: 0,
                text: text_1,
                name: 'textbox 1'
            }]
        }
    }, applyMiddleware(reduxThunk));

    const div = document.createElement("div");
    const charToSplit = "$";
    ReactDOM.render(<Provider store={mockStore}><SplitLinesAfterWordModuleComplete
        charToSplit={charToSplit}
    /></Provider>, div);

    const outputText = mockStore.getState().textRed.outputText;

    const resText_1 = "Item B 3 $23.56\n$70.68\nItem D 4 $29.99\n$119.96\nItem J 7 $45.68\n$319.76\nProduct F 11 $7.90\n$86.90\nProduct G 58 $23.23\n$1,347.34\nProduct I 3 $45.00\n$135.00\nService F 1 $123.00\n$123.00\nWidget F 4000 $89.46\n$357,840.00\nWidget G 2 $23.45\n$46.90\nWidget H 3 $4.12\n$12.36";

    const expectedResult = [{ "inputContainer": 0, "text": resText_1, "name": "textbox 1" }];
    expect(outputText).toEqual(expectedResult);
})

test("3/22/20 bug #1 - adding line segments when needed", () => {
    const text_1 = "$1,225.12 Item F 117\n$1,051.83 Item G 56";
    const mockStore = createStore(rootReducer, {
        textRed: {
            outputText: [{
                inputContainer: 0,
                text: text_1,
                name: 'textbox 1'
            }]
        }
    }, applyMiddleware(reduxThunk));

    const div = document.createElement("div");
    const charToSplit = "$";
    ReactDOM.render(<Provider store={mockStore}><SplitLinesAfterWordModuleComplete
        charToSplit={charToSplit}
    /></Provider>, div);

    const outputText = mockStore.getState().textRed.outputText;

    const resText_1 = "$1,225.12\nItem F 117\n$1,051.83\nItem G 56";

    const expectedResult = [{ "inputContainer": 0, "text": resText_1, "name": "textbox 1" }];
    expect(outputText).toEqual(expectedResult);
})