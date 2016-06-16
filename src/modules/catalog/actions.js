/*
 * Acciones
 */
import {SAVE_ACTIONS} from './actionTypes';

export function saveProducts(products) {
    return {
        type: SAVE_ACTIONS,
        payload: products
    }
}