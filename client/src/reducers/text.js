import {
    UPDATE_INPUT_TEXT,
    UPDATE_OUTPUT_TEXT,
    UPDATE_SAVED_TEXT,
    UPDATE_CODE_TEXT,
    UPDATE_CONTAINER_DISPLAY,
    UPDATE_SAVED_TEXT_CONTAINER_DISPLAY,
    TOGGLE_PREVIEW_ON,
    TOGGLE_PREVIEW_OFF,
    TOGGLE_OUTPUT_TEXT_ON,
    TOGGLE_OUTPUT_TEXT_OFF,
    TOGGLE_SAVED_TEXT_ON,
    TOGGLE_SAVED_TEXT_OFF,
    TOGGLE_MODULE_ACTIVE_ON,
    TOGGLE_MODULE_ACTIVE_OFF,
    UPDATE_DELETIONS_PREVIEW,
    UPDATE_ADDITIONS_PREVIEW
} from '../actions/types'

// Input text: keeps the text from the input text area throughout the entire lifetime
// Output text: the latest parsed text

const initState = {


    // Development: Dummy text with spaces
    inputText: [{ inputContainer: 0, text: 'hello  world, inputContainer 0\n good   stuff right      now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 1" },
    { inputContainer: 1, text: 'hello world, THIS IS inputContainer 1\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 2" }],

    outputText: [{ inputContainer: 0, text: 'hello  world, inputContainer 0\n good   stuff right      now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 1" },
    { inputContainer: 1, text: 'hello world, THIS IS inputContainer 1\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 2" }],

    // Development: Dummy text
    // inputText: [{ inputContainer: 0, text: ' hello  world, inputContainer 0', name: "Textbox 1" },
    // { inputContainer: 1, text: 'hello world, THIS IS inputContainer 1', name: "Textbox 2" }],

    // outputText: [{ inputContainer: 0, text: ' hello  world, inputContainer 0', name: "Textbox 1" },
    // { inputContainer: 1, text: 'hello world, THIS IS inputContainer 1', name: "Textbox 2" }],

    /*
    savedText: [
        {
            inputContainers: [{ inputContainer: 0, text: '0:1saved text 0 hello world, inputContainer 0\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 1" },
            { inputContainer: 1, text: '0:2saved text 0 hello world, THIS IS inputContainer 1\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 2" }],

            name: "Saved Text 1"
        },
        {
            inputContainers: [{ inputContainer: 0, text: '1:1but better saved text 1 hello world, inputContainer 0\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 1" },
            { inputContainer: 1, text: '1:2yooo saved text 1 hello world, THIS IS inputContainer 1\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 2" }],

            name: "Saved Text 8"

        },

        {
            inputContainers: [{ inputContainer: 0, text: '2:1yeet but better saved text 2 hello world, inputContainer 0\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 1" },
            { inputContainer: 1, text: '2:2yeet yooo saved text 2 hello world, THIS IS inputContainer 1\ngood stuff right now\n\n    It is very good\n\nIt is good good good and stuff', name: "Textbox 2" }],

            name: "Saved Text 33"

        }

    ],
    */
    
    // Development: 2 Empty textboxes
    // inputText: [{ inputContainer: 0, text: '', name: "Textbox 1" }, { inputContainer: 1, text: '', name: "Textbox 2" }],
    // outputText: [{ inputContainer: 0, text: '', name: "Textbox 1" }, { inputContainer: 1, text: '', name: "Textbox 2" }],

    // Initial state: Production
    // inputText: [],
    // outputText: [],
    savedText: [],
    codeText: '',
    previewToggle: false,
    moduleActiveToggle: false,
    toggleOutputText: true,
    toggleSavedText: false,
    deletionsPreview: '',
    additionsPreview: '',
    inputContainerDisplay: 0, // back to 0 when complete - controls the radio button for "Display Input"
    savedTextContainerDisplay: 0, // controls radio button for "Display Saved Text" - in the beginning, there will not be any containers to display
    // both of the 2 above dispays may cause some issues in the future... Keep that in mind
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
        case UPDATE_CODE_TEXT:
            // console.log('[TextReducer] got a UPDATE_OUTPUT_TEXT action');
            return { ...state, codeText: action.payload };
        case UPDATE_CONTAINER_DISPLAY:
            // console.log('[TextReducer] got a UPDATE_OUTPUT_TEXT action');
            return { ...state, inputContainerDisplay: action.payload };
        case UPDATE_SAVED_TEXT_CONTAINER_DISPLAY:
            // console.log('[TextReducer] got a UPDATE_OUTPUT_TEXT action');
            return { ...state, savedTextContainerDisplay: action.payload };
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