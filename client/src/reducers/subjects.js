import {
    GET_SUBJECT,
    GET_SUBJECTS,
    SUBJECT_ERROR
} from '../actions/types'



const initialState = {
    subject: null,
    subjects: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_SUBJECT:
            return {
                ...state,
                subject: payload,
                loading: false
            };
        case GET_SUBJECTS:
            return {
                ...state,
                subjects: payload,
                loading: false
            }
        case SUBJECT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}