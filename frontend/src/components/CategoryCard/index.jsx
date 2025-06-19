import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category, isHomePage }) => {
  if (!category) {
    return null;
  }
  return (
    <Link
      to={`/categories/${category.id}`}
      className={styles.categoryCard}
    >
      <div
        className={`${styles.imageWrapper} ${isHomePage ? styles.homePageImageWrapper : ''}`}
      >
        <img
          src={`http://localhost:3333${category.image}`}
          alt={category.title}
          className={styles.categoryImage}
        />
      </div>
      <h3 className={styles.categoryTitle}>{category.title}</h3>
    </Link>
  );
};

export default CategoryCard;