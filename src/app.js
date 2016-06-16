// Importaciones de React
import React from 'react';
import ReactDOM from 'react-dom';

// Importaciones de Redux
import {Provider} from 'react-redux';

// Importaciones de usuario
import Shop from './components';
import {configureStore} from './configureStore'

window.store = configureStore();

// ReactDOM.render(<Shop store={store}/>, document.getElementById('app'));
ReactDOM.render(
    <Provider store={store}>
        <Shop/>
    </Provider>,
    document.getElementById('app'));
