import {
    UPDATE_INPUT_TEXT,
    UPDATE_OUTPUT_TEXT,
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
