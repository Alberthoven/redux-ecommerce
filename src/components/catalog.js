import React, {Component, PropTypes} from 'react';
import Header from './header';
import {connect} from 'react-redux';

import {saveProducts} from '../modules/catalog'
import {products as catalogProducts} from '../data/catalog';

import CatalogItem from './catalog_item';

// Listado de productos de la tienda
class Catalog extends Component {

    componentDidMount() {
        this.props.dispatch(saveProducts(catalogProducts));
    }

    render() {
        const items = this.props.items.map(item =>
            <CatalogItem key={ item.id } product={ item } onAddToCart={ this.props.onAddToCart }/>);

        return (
            <div className='catalog'>
                <Header text='Products'/>
                <div className='catalog-list'>
                    { items }
                </div>
            </div>
        )
    }
}
Catalog.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    items: state.catalog
})

export default connect(mapStateToProps)(Catalog);
