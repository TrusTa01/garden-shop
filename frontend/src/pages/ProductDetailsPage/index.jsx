import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice'; 
import { addItemToCart } from '../../store/slices/cartSlice'; 
import styles from './ProductDetailsPage.module.css';

// showNotification передается как пропс из App.js
const ProductDetailsPage = ({ showNotification }) => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.list);
    const productsStatus = useSelector(state => state.products.status);
    const productsError = useSelector(state => state.products.error);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, productsStatus]);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find(p => p.id === parseInt(id));
            setProduct(foundProduct);
        }
    }, [products, id]);

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                dispatch(addItemToCart(product));
            }
            showNotification(`${quantity} x ${product.title} добавлен${quantity > 1 ? 'ы' : ''} в корзину!`, 'success'); 
            setQuantity(1); 
        }
    };

    if (productsStatus === 'loading') {
        return <div className={styles.loadingMessage}>Loading product details...</div>;
    }

    if (productsError) {
        return <div className={styles.errorMessage}>Error: {productsError}</div>;
    }

    if (!product) {
        return <div className={styles.notFoundMessage}>Product not found.</div>;
    }

    const finalPrice = product.discont_price !== null && product.discont_price !== undefined
        ? product.discont_price
        : product.price;
    const showDiscount = product.discont_price !== null && product.discont_price !== undefined;
    const discountPercentage = showDiscount
        ? Math.round(((product.price - product.discont_price) / product.price) * 100)
        : 0;

    return (
        <div className={styles.productDetailsPage}>
            
            <div className={styles.contentWrapper}> {/* Общая обертка для изображения и деталей */}
                <img src={`http://localhost:3333${product.image}`} alt={product.title} className={styles.productImage} />
                
                <div className={styles.detailsInfo}> {/* Обертка для правой части (заголовок, цены, кнопки, описания) */}
                    <h1 className={styles.productTitle}>{product.title}</h1> 

                    <div className={styles.priceSection}>
                        <p className={styles.finalPrice}>${finalPrice.toFixed(2)}</p>
                        {showDiscount && (
                            <>
                                <p className={styles.originalPrice}>${product.price.toFixed(2)}</p>
                                <span className={styles.discountPercentage}>-{discountPercentage}%</span>
                            </>
                        )}
                    </div>
                    
                    {/* Обертка для счетчика и кнопки "Add to cart" */}
                    <div className={styles.quantityAndCartWrapper}>
                        {/* Секция выбора количества */}
                        <div className={styles.quantityControl}> 
                            <button onClick={handleDecreaseQuantity} className={styles.quantityButton}>-</button>
                            <span className={styles.productQuantity}>{quantity}</span>
                            <button onClick={handleIncreaseQuantity} className={styles.quantityButton}>+</button>
                        </div>
                        
                        {/* Кнопка добавления в корзину */}
                        <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to cart</button>
                    </div>
                    
                    <div className={styles.descriptionSection}>
                        <h3 className={styles.descriptionTitle}>Description</h3>
                        <p className={styles.descriptionText}>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;