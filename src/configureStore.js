import {createStore} from 'redux';

import appReducer from './modules';

export function configureStore() {
    return createStore(appReducer, window.devToolsExtension ? window.devToolsExtension() : f => f);
}