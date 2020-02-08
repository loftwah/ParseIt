import React from 'react';
import ReactDOM from 'react-dom';
// import { InputText } from '../input-text'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import InputText from '../input-text'
import rootReducer from '../../../reducers';

it("renders without crashing", () => {
    const mockStore = createStore(rootReducer);
    const div = document.createElement("div");
    ReactDOM.render(<Provider store={mockStore}><InputText/></Provider>, div)
})