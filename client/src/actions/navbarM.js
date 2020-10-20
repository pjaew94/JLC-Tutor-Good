import { SHOW_NAVBAR_M, HIDE_NAVBAR_M } from './types';

export const showNavbarM = () => async dispatch =>  {
    try{
        dispatch({
            type: SHOW_NAVBAR_M,
            payload: true
        })
    } catch(err){
        console.log(err.message);
    }
}

export const hideNavbarM = () => async dispatch => {
    try {
        dispatch({
            type: HIDE_NAVBAR_M,
            payload: false
        })
    } catch (err) {
        console.log(err.message);
    }
}