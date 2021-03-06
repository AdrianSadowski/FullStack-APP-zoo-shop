import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import styles from './Products.module.scss';
import {getAll, fetchAllProducts} from '../../../redux/productsRedux';
import ProductBox from '../../features/ProductBox/ProductBox';
import Loader from '../../common/Loader/Loader';
import SectionHeader from '../../features/SectionHeader/SectionHeader';

const Component = ({products, fetchProducts}) => {
  fetchProducts();
  if (products === undefined) {
    setTimeout(function () {
      window.location.reload(false);
    }, 1000);
    return <Loader />;
  }
  return (
    <div>
      <SectionHeader name="Products List" />
      <div className={styles.container}>
        {products.length && (
          <div className={styles.product}>
            {products.map(product => (
              <ProductBox key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchAllProducts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Products,
  Container as Products,
  Component as ProductsComponent,
};
