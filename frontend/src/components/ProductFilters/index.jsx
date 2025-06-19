import React from 'react';
import styles from './ProductFilters.module.css';

const ProductFilters = ({
  priceFrom,
  priceTo,
  onPriceFromChange,
  onPriceToChange,
  discountedOnly,
  onDiscountedChange,
  sortOption,
  onSortOptionChange,
  hideDiscountedCheckbox = false 
}) => {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="priceFrom">Price</label>
        <input
          type="number"
          id="priceFrom"
          placeholder="from"
          value={priceFrom}
          onChange={(e) => onPriceFromChange(e.target.value)}
          className={styles.priceInput}
        />
        <input
          type="number"
          id="priceTo"
          placeholder="to"
          value={priceTo}
          onChange={(e) => onPriceToChange(e.target.value)}
          className={styles.priceInput}
        />
      </div>

      {/* Условный рендеринг чекбокса */}
      {!hideDiscountedCheckbox && ( // <-- Рендерим только если hideDiscountedCheckbox не true
        <div className={styles.filterGroup}>
          <label htmlFor="discountedItems">Discounted items</label>
          <input
            type="checkbox"
            id="discountedItems"
            checked={discountedOnly}
            onChange={(e) => onDiscountedChange(e.target.checked)}
            className={styles.checkbox}
          />
        </div>
      )}

      <div className={styles.filterGroup}>
        <label htmlFor="sortBy">Sorted</label>
        <select
          id="sortBy"
          value={sortOption}
          onChange={(e) => onSortOptionChange(e.target.value)}
          className={styles.select}
        >
          <option value="default">by default</option>
          <option value="newest">Newest</option>
          <option value="price_high_to_low">Price: High to Low</option>
          <option value="price_low_to_high">Price: Low to High</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;