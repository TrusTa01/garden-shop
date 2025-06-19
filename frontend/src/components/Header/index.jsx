import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.css';

const Header = () => {
  // Получаем totalCartQuantity из Redux store
  const totalCartQuantity = useSelector(state => state.cart.totalQuantity); 

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* 1. Блок для логотипа */}
        <Link to="/" className={styles.headerLeft}>
          <img src="/assets/icons/logo.png" alt="Garden Shop Logo" className={styles.logoImage} />
        </Link>

        {/* 2. Блок для НАВИГАЦИИ (по центру) */}
        <nav className={styles.headerCenter}>
          <ul className={styles.navList}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Main Page</NavLink></li>
            <li><NavLink to="/categories" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Categories</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>All products</NavLink></li>
            <li><NavLink to="/discounted-items" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>All sales</NavLink></li>
          </ul>
        </nav>

        {/* 3. Блок для КОРЗИНЫ */}
        {/* ВАЖНО: ЗДЕСЬ НУЖНО ДОБАВИТЬ ЭЛЕМЕНТ СЧЕТЧИКА */}
        <Link to="/cart" className={`${styles.headerRight} ${styles.cartIconWrapper}`}> {/* Добавлен cartIconWrapper для стилизации */}
          <img src="/assets/icons/basket-empty.png" alt="Cart" className={styles.cartIcon} />
          {totalCartQuantity > 0 && ( 
            <span className={styles.cartCount}>{totalCartQuantity}</span> 
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;