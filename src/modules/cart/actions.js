/*
 * Acciones
 */
import * as types from './actionTypes';

export function addToCart(product) {
    return {
        type: types.ADD_TO_CART,
        product
    }
}

export function changeQuantity(productId, quantity) {
    return {
        type: types.CHANGE_QUANTITY,
        productId,
        quantity
    }
}

export function emptyCart() {
    return {
        type: types.EMPTY_CART
    }
}
