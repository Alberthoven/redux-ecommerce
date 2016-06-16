/*
 * Combinacion de reducers
 */
import {combineReducers} from 'redux';

import route from './route';
import catalog from './catalog';
import cart from './cart';

const appReducer = combineReducers({
    route,
    catalog,
    cart
})

export default appReducer;