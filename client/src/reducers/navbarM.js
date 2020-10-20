import { SHOW_NAVBAR_M, HIDE_NAVBAR_M } from '../actions/types.js';

const initialState = {
    show: false,
}

export default function (state = initialState, actions) {
    const { type, payload } = actions;

    switch(type){
        case SHOW_NAVBAR_M:
        case HIDE_NAVBAR_M:
            return {
                show: payload
            }

        default:
            return state
    }
}