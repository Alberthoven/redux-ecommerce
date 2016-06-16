import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as routeActions from '../modules/route';
import * as cartActions from '../modules/cart';

import Catalog from './catalog';
import Cart from './cart';
import Checkout from './checkout';
import ThankYou from './thankyou';
import NotFound from './notfound';

class Shop extends Component {
    constructor(props) {
        super(props);
        //estado inicial de la aplicación
        this.state = {
            // datos del pedido
            orderDetails: {},
            // errores de pedido
            orderErrors: {}
        }

        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
    }

    // Cambia la página actual en funcion del action que recibe
    handleNavigate(action) {
        // Los cambios en el estado se hacen mediante actions que los ejecuta un reducer al que esta suscrito el store.
        this.props.dispatch(action);
    }

    // Añade un producto al carrito
    handleAddToCart({product}) {
        this.props.dispatch(cartActions.addToCart());
        this.props.dispatch(routeActions.goToCart());
    }

    // Modifica la cantidad de un producto en el carrito
    handleQuantityChange({product, qty}) {
        let cartItems = this.state.cart.map(item => {
            if (item.id === product.id) {
                item.qty = qty;
            }
            return item;
        });
        //filter out items with 0 qty
        let remainingItems = cartItems.filter(p => p.qty > 0);
        this.setState({cart: remainingItems}); //aki
    }

    // Recibe los datos personales del pedido y lo valida,
    // navegando a la página final si es correcto
    handleCheckout({order}) {
        let errors = {};
        if (order.firstName.trim() === '') {
            errors.firstName = 'El nombre es obligatorio';
        }
        if (order.lastName.trim() === '') {
            errors.lastName = 'El apellido es obligatorio';
        }
        if (order.email.trim() === '') {
            errors.email = 'Debe introducir un email';
        }
        if (order.address.trim() === '') {
            errors.address = 'Debe introducir una dirección de entrega';
        }
        if (Object.keys(errors).length === 0) {
            //everything ok! empty cart and navigate to thankyou page
            this.setState({ //aki
                // cart: [],
                orderDetails: order,
                orderErrors: {}
                // page: 'thankyou'
            });
            this.handleNavigate(routeActions.goToThankYou());
        }
        else {
            //stay on the same page, display errors
            this.setState({orderErrors: errors}); //aki
        }
    }

    // Devuelve el componente apropiado para la página actual
    getComponentForPage(page) {
        switch (page) {
            case 'catalog':
                return (
                    <Catalog
                        onAddToCart={ this.handleAddToCart }/>
                );
            case 'cart':
                return (
                    <Cart
                        onNavigate={ this.handleNavigate }
                        onCartQuantityChange={ this.handleQuantityChange }/>
                );
            case 'checkout':
                return (
                    <Checkout
                        errors={ this.state.orderErrors }
                        onProcessOrder={ this.handleCheckout }
                        onBackToCart={ () => this.handleNavigate(routeActions.goToCart()) }/>
                );
            case 'thankyou':
                return (
                    <ThankYou
                        orderDetails={ this.state.orderDetails }
                        onBackToShopping={ () => this.handleNavigate(routeActions.goToCatalog()) }/>
                );
            default:
                return (
                    <NotFound
                        onBackToCatalog={ () => this.handleNavigate(routeActions.goToCatalog()) }/>
                );
        }
    }

    render() {
        const component = this.getComponentForPage(this.props.page);
        return (
            <div className='shopping-cart'>
                { component }
            </div>
        )
    }
}

Shop.PropTypes = {
    page: PropTypes.string.isRequired,
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    page: state.route
    //¿dispatch?
})

export default connect(mapStateToProps)(Shop);