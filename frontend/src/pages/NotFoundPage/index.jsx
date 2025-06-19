import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.statusCodeImageContainer}></div> 
      
      <h2 className={styles.message}>Page Not Found</h2>
      <p className={styles.description}>
        We're sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </p>
      <Link to="/" className={styles.homeButton}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;