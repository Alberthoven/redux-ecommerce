/*
 * Acciones
 */
import {CHANGE_PAGE} from './actionTypes';

function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page
    }
}

export const goToCart = () => changePage('cart');

export const goToCatalog = () => changePage('catalog');

export const goToCheckout = () => changePage('checkout');

export const goToThankYou = () => changePage('thankyou');