import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Определяем, должны ли кнопки Предыдущая и Следующая быть активными
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={`${styles.pageButton} ${!canGoPrev ? styles.disabled : ''}`}
      >
        Previous
      </button>

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.pageButton} ${number === currentPage ? styles.active : ''}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`${styles.pageButton} ${!canGoNext ? styles.disabled : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;