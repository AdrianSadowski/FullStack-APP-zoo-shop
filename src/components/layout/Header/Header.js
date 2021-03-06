import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faBasketShopping} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import {useSelector} from 'react-redux';
import {getAllCart} from '../../../redux/productsRedux';

const Header = () => {
  const [toogleMenu, setToogleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const cart = useSelector(state => getAllCart(state));

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.amount;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  let cartInfo;
  if (cartCount) {
    cartInfo = <p>{cartCount}</p>;
  } else {
    cartInfo = null;
  }

  const toogleNav = () => {
    setToogleMenu(!toogleMenu);
  };
  const toogleNavFalse = () => {
    setToogleMenu(false);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <Link onClick={toogleNavFalse} to="/">
          <img src="../assets/logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className={styles.root}>
        {(toogleMenu || screenWidth > 576) && (
          <ul className={styles.list}>
            <Link to="/products" className={styles.items} onClick={toogleNav}>
              <li>Products</li>
            </Link>
            <Link to="/contact" onClick={toogleNav} className={styles.items}>
              <li>Contact</li>
            </Link>
          </ul>
        )}
        <div className={styles.mobile_menu}>
          <FontAwesomeIcon onClick={toogleNav} className={styles.menuButton} icon={faBars} />
          <Link to="/shoopingcart" className={styles.cartButton}>
            <FontAwesomeIcon icon={faBasketShopping} />
            
            {cartInfo}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
