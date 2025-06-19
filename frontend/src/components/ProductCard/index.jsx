import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/slices/cartSlice';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, showNotification }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    // Добавляем диспатч
    dispatch(addItemToCart(product)); 
    console.log('Добавлено в корзину:', product.title); // Этот лог можно оставить для отладки
    
    if (showNotification) {
      showNotification(`${product.title} added to cart!`, 'success');
    }
  };

  // Вычисляем цену, учитывая скидку
  const displayPrice = product.discont_price !== null && product.discont_price > 0
    ? product.discont_price
    : product.price;

  const oldPrice = product.discont_price !== null && product.discont_price > 0
    ? product.price
    : null;

  const discountPercentage = product.discont_price !== null && product.discont_price > 0
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : null;

  return (
    <Link
      to={`/products/${product.id}`} // Предполагаем маршрут для деталей продукта
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)} // Обновляем состояние при наведении
      onMouseLeave={() => setIsHovered(false)} // Обновляем состояние при уходе курсора
    >
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
          className={styles.productImage}
        />
        {discountPercentage && (
          <div className={styles.discountBadge}>
            -{discountPercentage}%
          </div>
        )}
        {/* Кнопка Add to cart появляется только при наведении */}
        {isHovered && (
          <button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        )}
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>${displayPrice}</span>
          {oldPrice && <span className={styles.oldPrice}>${oldPrice}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;