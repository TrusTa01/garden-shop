import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice'; // Импорт thunk
import CategoryCard from '../../components/CategoryCard'; // Импорт компонента карточки
import styles from './CategoriesPage.module.css';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { list: categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories()); // Загружаем все категории
    }
  }, [dispatch, status]);

  return (
    <div className={styles.categoriesPage}>
      <h1>Categories</h1>
      {status === 'loading' && <p>Loading categories...</p>}
      {error && <p>Error loading categories: {error}</p>}
      {status === 'succeeded' && categories.length === 0 && <p>No categories found.</p>}
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;