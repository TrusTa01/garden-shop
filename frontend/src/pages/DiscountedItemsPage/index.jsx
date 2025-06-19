import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters';
import Pagination from '../../components/Pagination'; 
import styles from './DiscountedItemsPage.module.css';

const ITEMS_PER_PAGE = 12; // Определяем количество товаров на странице

const DiscountedItemsPage = ({ showNotification }) => {
  const dispatch = useDispatch();
  const { list: products, status: productsStatus, error: productsError } = useSelector((state) => state.products);

  // Состояния для фильтров 
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Состояние для пагинации 
  const [currentPage, setCurrentPage] = useState(1); // <--- Текущая страница
  // 

  useEffect(() => {
    if (productsStatus === 'idle' || productsStatus === 'failed') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  // Сбрасываем страницу на 1 при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [priceFrom, priceTo, sortOption]);

  // Логика фильтрации и сортировки с использованием useMemo
  const filteredAndSortedProducts = useMemo(() => {
    // Начинаем со всех продуктов и сразу применяем фильтр по скидке
    let result = products.filter(product => product.discont_price !== null && product.discont_price > 0);

    // 1. Фильтрация по цене
    if (priceFrom !== '') {
      result = result.filter(product => {
        const productPrice = product.discont_price !== null && product.discont_price > 0 ? product.discont_price : product.price;
        return productPrice >= parseFloat(priceFrom);
      });
    }
    if (priceTo !== '') {
      result = result.filter(product => {
        const productPrice = product.discont_price !== null && product.discont_price > 0 ? product.discont_price : product.price;
        return productPrice <= parseFloat(priceTo);
      });
    }

    // 2. Сортировка
    if (sortOption !== 'default') {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'price_high_to_low':
            const priceA_high = a.discont_price !== null && a.discont_price > 0 ? a.discont_price : a.price;
            const priceB_high = b.discont_price !== null && b.discont_price > 0 ? b.discont_price : b.price;
            return priceB_high - priceA_high;
          case 'price_low_to_high':
            const priceA_low = a.discont_price !== null && a.discont_price > 0 ? a.discont_price : a.price;
            const priceB_low = b.discont_price !== null && b.discont_price > 0 ? b.discont_price : b.price;
            return priceA_low - priceB_low;
          default:
            return 0;
        }
      });
    }
    return result;
  }, [products, priceFrom, priceTo, sortOption]); 

  // Логика пагинации
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (productsStatus === 'loading') {
    return <p className={styles.loadingMessage}>Loading discounted products...</p>;
  }

  if (productsError) {
    return <p className={styles.errorMessage}>Error loading products: {productsError}</p>;
  }

  return (
    <div className={styles.discountedItemsPage}>
      <h1>Discounted Items</h1>

      <ProductFilters
        priceFrom={priceFrom}
        priceTo={priceTo}
        onPriceFromChange={setPriceFrom}
        onPriceToChange={setPriceTo}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
        hideDiscountedCheckbox={true} // <--- Скрываем чекбокс
      />

      {currentItems.length === 0 ? (
        <p className={styles.noProductsMessage}>No discounted products found with these filters.</p>
      ) : (
        <>
          <div className={styles.productsGrid}>
            {currentItems.map(product => ( 
              <ProductCard
                key={product.id}
                product={product}
                showNotification={showNotification}
              />
            ))}
          </div>
          {totalPages > 1 && ( // Рендерим пагинацию только если страниц больше одной
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DiscountedItemsPage;