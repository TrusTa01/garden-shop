import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  removeItemFromCart,
  decreaseItemQuantity,
  addItemToCart,
  clearCart,
} from "../../store/slices/cartSlice";
import styles from "./CartPage.module.css";

const CartPage = ({ showNotification }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseItemQuantity(productId));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const navigate = useNavigate();
  
  // Функция для обработки клика по изображению товара
  const handleImageClick = (productId) => {
    if (productId) {
      navigate(`/products/${productId}`); // Переходим на страницу товара
    } else {
      console.warn('Product ID is undefined for navigation.');
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    console.log("Форма заказа отправлена (логика пока не подключена)");

    setShowOrderSuccessModal(true);
    setOrderPlaced(true);
    dispatch(clearCart());
  };

  const handleCloseModal = () => {
    setShowOrderSuccessModal(false);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <section className={styles.emptyCartSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.cartTitle}>Shopping cart</h3>
          <div className={styles.divider}></div>
          <button
            className={styles.backButton}
            onClick={() => navigate("/")}
          >
            Back to the store
          </button>
        </div>
        <p className={styles.emptyCartText}>Looks like you have no items in your basket currently.</p>
        <button
          className={styles.continueShoppingButton}
          onClick={() => navigate("/")}
        >
          Continue shopping
        </button>
      </section>
    );
  }

  return (
    <div className={styles.cartPage}>
      {showOrderSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.successModal}>
            <button className={styles.closeModalButton} onClick={handleCloseModal}>&times;</button>
            <h3 className={styles.modalTitle}>Congratulations!</h3>
            <p className={styles.modalText}>Your order has been successfully placed on the website.</p>
            <p className={styles.modalText}>A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}

      <div className={styles.fullCartHeader}>
        <h2 className={styles.cartTitleFull}>Shopping Cart</h2>
        <div className={styles.divider}></div>
        <Link to="/" className={styles.fullCartBackLink}>Back to the store</Link>
      </div>

      <div className={styles.cartContentWrapper}>
        <div className={styles.cartItemsList}>
          {cartItems.map((item) => (
            <div key={item.product.id} className={styles.cartItem}>
              {/* Добавляем onClick передавая ID продукта */}
              <div
                className={styles.itemImageContainer}
                onClick={() => handleImageClick(item.product.id)}
              >
                <img
                  src={`http://localhost:3333${item.product.image}`}
                  alt={item.product.title}
                  className={styles.itemImage}
                />
              </div>

              <div className={styles.itemDetails}>
                <Link to={`/products/${item.product.id}`} className={styles.itemTitleLink}>
                  <h3 className={styles.itemTitle}>{item.product.title}</h3>
                </Link>
                <div className={styles.priceAndQuantityContainer}>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => handleDecreaseQuantity(item.product.id)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.itemQuantity}>{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.product)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.itemPriceSection}>
                    {item.product.discont_price ? (
                      <>
                        <p className={styles.itemDiscountPrice}>${item.product.discont_price.toFixed(2)}</p>
                        <p className={styles.itemOriginalPriceStrikethrough}>${item.product.price.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className={styles.itemPrice}>${item.product.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.product.id)}
                className={styles.removeButton}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className={styles.orderDetailsContainer}>
          <h2 className={styles.orderDetailsTitle}>Order details</h2>

          <div className={styles.orderDetailsSummary}>
            <p className={styles.summaryText}>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
            </p>
            <p className={styles.summaryTotalPrice}>
                <span className={styles.summaryTextTotal}> Total </span>
                <span className={styles.summaryTotalValue}>${totalAmount.toFixed(2)}</span>
            </p>
          </div>

          <form onSubmit={handleOrderSubmit} className={styles.orderForm}>
            <input type="text" name="name" placeholder="Name" className={styles.orderFormInput} required />
            <input type="tel" name="phone" placeholder="Phone number" className={styles.orderFormInput} required />
            <input type="email" name="email" placeholder="Email" className={styles.orderFormInput} required />
            <button
              type="submit"
              className={`${styles.orderSubmitButton} ${orderPlaced ? styles.orderPlacedButton : ''}`}
              disabled={orderPlaced}
            >
              {orderPlaced ? 'The Order Is Placed' : 'Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;