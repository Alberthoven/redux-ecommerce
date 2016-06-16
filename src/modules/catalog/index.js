/*
 * Reducer para la redireccion
 */
import {SAVE_ACTIONS} from './actionTypes';
export * from './actions';

export default function catalog(state=[], action) {
    switch (action.type) {
        case SAVE_ACTIONS:
            return [...action.payload];
        default:
            return state;
    }
}