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
} from './types';

export const updateInputText = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_INPUT_TEXT,
            payload: data,
        });
    }
}

export const updateOutputText = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_OUTPUT_TEXT,
            payload: data,
        });
    }
}

export const updateSavedText = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_SAVED_TEXT,
            payload: data,
        });
    }
}

export const updateCodeText = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_CODE_TEXT,
            payload: data,
        });
    }
}

export const updateContainerDisplay = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_CONTAINER_DISPLAY,
            payload: data,
        });
    }
}

export const updateSavedTextContainerDisplay = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_SAVED_TEXT_CONTAINER_DISPLAY,
            payload: data,
        });
    }
}

export const togglePreviewOn = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_PREVIEW_ON,
            payload: true,
        });
    }
}

export const togglePreviewOff = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_PREVIEW_OFF,
            payload: false,
        });
    }
}

export const toggleOutputTextOn = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_OUTPUT_TEXT_ON,
            payload: true,
        });
    }
}

export const toggleOutputTextOff = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_OUTPUT_TEXT_OFF,
            payload: false,
        });
    }
}

export const toggleSavedTextOn = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_SAVED_TEXT_ON,
            payload: true,
        });
    }
}

export const toggleSavedTextOff = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_SAVED_TEXT_OFF,
            payload: false,
        });
    }
}

export const moduleActiveOn = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_MODULE_ACTIVE_ON,
            payload: true,
        });
    }
}

export const moduleActiveOff = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_MODULE_ACTIVE_OFF,
            payload: false,
        });
    }
}

export const updateDeletionsPreview = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_DELETIONS_PREVIEW,
            payload: data,
        });
    }
}

export const updateAdditionsPreview = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_ADDITIONS_PREVIEW,
            payload: data,
        });
    }
}
