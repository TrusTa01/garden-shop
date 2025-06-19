import React, { useEffect, useState, useMemo } from 'react'; 
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters'; 
import styles from './CategoryProductsPage.module.css';

const CategoryProductsPage = ({ showNotification }) => {
  const { id } = useParams(); // ID текущей категории из URL

  const dispatch = useDispatch();
  const { list: products, status: productsStatus, error: productsError } = useSelector((state) => state.products);
  const { list: categories, status: categoriesStatus, error: categoriesError } = useSelector((state) => state.categories);

  // Состояния для фильтров 
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortOption, setSortOption] = useState('default'); 

  useEffect(() => {
    if (productsStatus === 'idle' || productsStatus === 'failed') {
      dispatch(fetchProducts());
    }
    if (categoriesStatus === 'idle' || categoriesStatus === 'failed') {
      dispatch(fetchCategories());
    }
  }, [dispatch, productsStatus, categoriesStatus]);

  const currentCategory = categories.find(cat => cat.id === parseInt(id));
  const categoryTitle = currentCategory ? currentCategory.title : 'Products';

  // Логика фильтрации и сортировки с использованием useMemo
  const filteredAndSortedProducts = useMemo(() => {
    // 1. Фильтрация по категории 
    let result = products.filter(product => product.categoryId === parseInt(id));

    // 2. Фильтрация по цене
    if (priceFrom !== '') {
      result = result.filter(product => product.price >= parseFloat(priceFrom));
    }
    if (priceTo !== '') {
      result = result.filter(product => product.price <= parseFloat(priceTo));
    }

    // 3. Фильтрация по товарам со скидкой
    if (discountedOnly) {
      result = result.filter(product => product.discont_price !== null && product.discont_price > 0);
    }

    // 4. Сортировка
    if (sortOption !== 'default') {
      result = [...result].sort((a, b) => { // Создаем копию массива, чтобы не ломать исходный
        switch (sortOption) {
          case 'newest':
            // Предполагаем, что у вас есть поле createdAt или подобное
            // Если нет, используйте ID или другой критерий
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'price_high_to_low':
            // Учитываем descont_price, если он есть, иначе price
            const priceA_high = a.discont_price !== null ? a.discont_price : a.price;
            const priceB_high = b.discont_price !== null ? b.discont_price : b.price;
            return priceB_high - priceA_high;
          case 'price_low_to_high':
            const priceA_low = a.discont_price !== null ? a.discont_price : a.price;
            const priceB_low = b.discont_price !== null ? b.discont_price : b.price;
            return priceA_low - priceB_low;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, id, priceFrom, priceTo, discountedOnly, sortOption]); // Перечисляем все зависимости

  if (productsStatus === 'loading' || categoriesStatus === 'loading') {
    return <p className={styles.loadingMessage}>Loading products...</p>;
  }

  if (productsError || categoriesError) {
    return <p className={styles.errorMessage}>Error loading data: {productsError || categoriesError}</p>;
  }

  return (
    <div className={styles.categoryProductsPage}>
      <h1>{categoryTitle}</h1>
      
      {/* --- Компонент фильтров --- */}
      <ProductFilters
        priceFrom={priceFrom}
        priceTo={priceTo}
        onPriceFromChange={setPriceFrom}
        onPriceToChange={setPriceTo}
        discountedOnly={discountedOnly}
        onDiscountedChange={setDiscountedOnly}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <p className={styles.noProductsMessage}>No products found with these filters.</p>
      ) : (
        <div className={styles.productsGrid}>
          {filteredAndSortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showNotification={showNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;