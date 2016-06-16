/*
 * Reducer para la redireccion
 */
import {CHANGE_PAGE} from './actionTypes';
export * from './actions';

export default function route(state='catalog', action) {
    switch (action.type) {
        case CHANGE_PAGE:
            return action.page;
        default:
            return state;
    }
}