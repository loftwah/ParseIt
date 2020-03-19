import {
    UPDATE_INPUT_TEXT,
    UPDATE_OUTPUT_TEXT,
    UPDATE_SAVED_TEXT,
    INITIALIZE_CODE_TOGGLE,
    UPDATE_CODE_TEXT,
    UPDATE_CONTAINER_DISPLAY,
    UPDATE_SAVED_TEXT_CONTAINER_DISPLAY,
    UPDATE_LOCAL_INPUT_TEXT,
    UPDATE_FROM_NAVBAR_ITEM,
    TOGGLE_PREVIEW_ON,
    TOGGLE_PREVIEW_OFF,
    TOGGLE_OUTPUT_TEXT_ON,
    TOGGLE_OUTPUT_TEXT_OFF,
    TOGGLE_SAVED_TEXT_ON,
    TOGGLE_SAVED_TEXT_OFF,
    TOGGLE_MODULE_ACTIVE_ON,
    TOGGLE_MODULE_ACTIVE_OFF,
    TOGGLE_TEXTBOX_ON,
    TOGGLE_TEXTBOX_OFF,
    TOGGLE_PDF_ON,
    TOGGLE_PDF_OFF,
    UPDATE_DELETIONS_PREVIEW,
    UPDATE_ADDITIONS_PREVIEW
} from '../actions/types'

const initState = {
    inputText: [], // Keeps the text from when the user submits via "Parse The Above Text" throughout the entire lifetime
    localInputText: [], // The text BEFORE the user submits via "Parse The Above Text"
    outputText: [], // The latest parsed text
    savedText: [],
    codeText: '',
    previewToggle: false,
    moduleActiveToggle: false,
    toggleOutputText: true,
    toggleSavedText: false,
    initializeCode: false,
    toggleTextbox: true,
    togglePDF: false,
    toggleFromNavbarItem: false,
    deletionsPreview: '',
    additionsPreview: '',
    inputContainerDisplay: 0, // Controls the radio button for "Display Input"
    savedTextContainerDisplay: 0, // Controls radio button for "Display Saved Text" - in the beginning, there will not be any containers to display
};

function textReducer(state = initState, action) {
    switch (action.type) {
        case UPDATE_INPUT_TEXT:
            // console.log('[TextReducer] got a UPDATE_INPUT_TEXT action');
            return { ...state, inputText: action.payload };
        case UPDATE_OUTPUT_TEXT:
            // console.log('[TextReducer] got a UPDATE_OUTPUT_TEXT action');
            return { ...state, outputText: action.payload };
        case UPDATE_SAVED_TEXT:
            // console.log('[TextReducer] got a UPDATE_SAVED_TEXT action');
            return { ...state, savedText: action.payload };
        case INITIALIZE_CODE_TOGGLE:
            // console.log('[TextReducer] got a INITIALIZE_CODE action');
            return { ...state, initializeCode: action.payload };
        case UPDATE_CODE_TEXT:
            // console.log('[TextReducer] got a UPDATE_CODE_TEXT action');
            return { ...state, codeText: action.payload };
        case UPDATE_CONTAINER_DISPLAY:
            // console.log('[TextReducer] got a UPDATE_CONTAINER_DISPLAY action');
            return { ...state, inputContainerDisplay: action.payload };
        case UPDATE_SAVED_TEXT_CONTAINER_DISPLAY:
            // console.log('[TextReducer] got a UPDATE_SAVED_TEXT_CONTAINER_DISPLAY action');
            return { ...state, savedTextContainerDisplay: action.payload };
        case UPDATE_LOCAL_INPUT_TEXT:
            // console.log('[TextReducer] got a UPDATE_LOCAL_INPUT_TEXT action');
            return { ...state, localInputText: action.payload };
        case UPDATE_FROM_NAVBAR_ITEM:
            // console.log('[TextReducer] got a UPDATE_FROM_NAVBAR_ITEM action');
            return { ...state, toggleFromNavbarItem: action.payload };
        case TOGGLE_PREVIEW_ON:
            // console.log('[TextReducer] got a TOGGLE_PREVIEW_ON action');
            return { ...state, previewToggle: action.payload };
        case TOGGLE_PREVIEW_OFF:
            // console.log('[TextReducer] got a TOGGLE_PREVIEW_OFF action');
            return { ...state, previewToggle: action.payload };
        case TOGGLE_OUTPUT_TEXT_ON:
            // console.log('[TextReducer] got a TOGGLE_OUTPUT_TEXT_ON action');
            return { ...state, toggleOutputText: action.payload };
        case TOGGLE_OUTPUT_TEXT_OFF:
            // console.log('[TextReducer] got a TOGGLE_OUTPUT_TEXT_OFF action');
            return { ...state, toggleOutputText: action.payload };
        case TOGGLE_SAVED_TEXT_ON:
            // console.log('[TextReducer] got a TOGGLE_SAVED_TEXT_ON action');
            return { ...state, toggleSavedText: action.payload };
        case TOGGLE_SAVED_TEXT_OFF:
            // console.log('[TextReducer] got a TOGGLE_SAVED_TEXT_ON action');
            return { ...state, toggleSavedText: action.payload };
        case TOGGLE_MODULE_ACTIVE_ON:
            // console.log('[TextReducer] got a TOGGLE_MODULE_ACTIVE_ON action');
            return { ...state, moduleActiveToggle: action.payload };
        case TOGGLE_MODULE_ACTIVE_OFF:
            // console.log('[TextReducer] got a TOGGLE_MODULE_ACTIVE_OFF action');
            return { ...state, moduleActiveToggle: action.payload };
        case TOGGLE_TEXTBOX_ON:
            // console.log('[TextReducer] got a TOGGLE_TEXTBOX_ON action');
            return { ...state, toggleTextbox: action.payload };
        case TOGGLE_TEXTBOX_OFF:
            // console.log('[TextReducer] got a TOGGLE_TEXTBOX_OFF action');
            return { ...state, toggleTextbox: action.payload };
        case TOGGLE_PDF_ON:
            // console.log('[TextReducer] got a TOGGLE_PDF_ON action');
            return { ...state, togglePDF: action.payload };
        case TOGGLE_PDF_OFF:
            // console.log('[TextReducer] got a TOGGLE_PDF_OFF action');
            return { ...state, togglePDF: action.payload };
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