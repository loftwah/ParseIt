import {
    UPDATE_INPUT_TEXT,
    UPDATE_OUTPUT_TEXT,
} from '../actions/types'

const initState = {
    inputText: '',
    outputText: '',
};

function textReducer(state = initState, action) {
    switch (action.type) {
        case UPDATE_INPUT_TEXT:
            // console.log('[TextReducer] got a UPDATE_INPUT_TEXT action');
            return { ...state, inputText: action.payload };
        case UPDATE_OUTPUT_TEXT:
            // console.log('[TextReducer] got a UPDATE_OUTPUT_TEXT action');
            return { ...state, outputText: action.payload };
        default:
            return state;
    };
};

export default textReducer;