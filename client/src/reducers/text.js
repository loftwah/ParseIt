import {
    UPDATE_INPUT_TEXT,
    UPDATE_OUTPUT_TEXT,
    TOGGLE_PREVIEW_ON,
    TOGGLE_PREVIEW_OFF,
    UPDATE_DELETIONS_PREVIEW,
    UPDATE_ADDITIONS_PREVIEW
} from '../actions/types'

// Input text: keeps the text from the input text area throughout the entire lifetime
// Output text: the latest parsed text

const initState = {
    inputText: 'good stuff right now\n\n    It is very good\n\nIt is good good good and stuff',
    // inputText: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    outputText: 'good stuff right now\n\n    It is very good\n\nIt is good good good and stuff',
    // outputText: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    previewToggle: false,
    deletionsPreview: '',
    additionsPreview: ''
};

function textReducer(state = initState, action) {
    switch (action.type) {
        case UPDATE_INPUT_TEXT:
            // console.log('[TextReducer] got a UPDATE_INPUT_TEXT action');
            return { ...state, inputText: action.payload };
        case UPDATE_OUTPUT_TEXT:
            // console.log('[TextReducer] got a UPDATE_OUTPUT_TEXT action');
            return { ...state, outputText: action.payload };
        case TOGGLE_PREVIEW_ON:
            // console.log('[TextReducer] got a TOGGLE_PREVIEW_ON action');
            return { ...state, previewToggle: action.payload };
        case TOGGLE_PREVIEW_OFF:
            // console.log('[TextReducer] got a TOGGLE_PREVIEW_OFF action');
            return { ...state, previewToggle: action.payload };
        case UPDATE_DELETIONS_PREVIEW:
            // console.log('[TextReducer] got a UPDATE_DELETIONS_PREVIEW action');
            return { ...state, deletionsPreview: action.payload };
        case UPDATE_ADDITIONS_PREVIEW:
            // console.log('[TextReducer] got a UPDATE_DELETIONS_PREVIEW action');
            return { ...state, additionsPreview: action.payload };
        default:
            return state;
    };
};

export default textReducer;