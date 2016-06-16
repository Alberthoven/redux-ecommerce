/*
 * Reducer para la redireccion
 */
import * as types from './actionTypes';
import {createSelector} from 'reselect';
export * from './actions';

const getCartProducts = (state) => state;
const getCartTotal = createSelector(getCartProducts, function (products) {
    return products.reduce(
        (acc, product) => {
            acc + (product.qty * product.price)
        }, 0
    ).toFixed(2); // number -> string con 2 decimales
});
export const getCartData = createSelector(getCartProducts, getCartTotal, function (products, total) {
    return {
        items: products,
        total
    }
});

export default function cart(state = [], action) {
    switch (action.type) {
        case types.ADD_TO_CART:
            return addToCart(state, action.product);
        case types.CHANGE_QUANTITY:
            return changeQuantity(state, action.product, 0);
        default: // types.EMPTY_CART
            return [];
    }
}

const addToCart = (cartProducts, product) => {
    //is the same product already in cart?
    let existingProduct = cartProducts.find(item => item.id === product.id);

    if (existingProduct) {
        return changeQuantity(
            cartProducts,
            existingProduct.id,
            existingProduct.qty + 1);
    }

    return cartProducts.concat({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        qty: 1
    })
}

const changeQuantity = (cartProducts, productId, quantity) => {
    return cartProducts.map(p => {
        if (p.id === productId) {
            return {
                ...p,
                qty: quantity
            }
        }
        return p;
    });
}