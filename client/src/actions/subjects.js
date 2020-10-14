import axios from 'axios';


import {
    GET_SUBJECT,
    GET_SUBJECTS,
    SUBJECT_ERROR
} from './types';

// Get specific subject
export const getSpecificSubject = () => async dispatch => {
    try {
        
    const res = await axios.get('/api/subjects');

    dispatch({
        type: GET_SUBJECT,
        payload: res.data
    })
    } catch (err) {
        dispatch({
            type: SUBJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
        
    }
}

export const getAllSubjects = (user) => async dispatch => {
    try {
        const res = await axios.get('/api/subjects');

        dispatch({
            type: GET_SUBJECTS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: SUBJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })       
    }
}