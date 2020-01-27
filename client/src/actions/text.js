import {
    UPDATE_INPUT_TEXT,
    UPDATE_OUTPUT_TEXT,
    TOGGLE_PREVIEW_ON,
    TOGGLE_PREVIEW_OFF,
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
