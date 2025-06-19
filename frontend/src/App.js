import React, { useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import DiscountedItemsPage from './pages/DiscountedItemsPage';
import NotFoundPage from './pages/NotFoundPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CartPage from './pages/CartPage';

import Notification from './components/Notification';
import './styles/PageTransitions.css';
import './App.css';

const App = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success', duration = 3000) => {
    setNotification({ message, type, duration });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  // Компонент для управления переходами между страницами
  function LocationWrapper() {
    const location = useLocation();
    const nodeRef = useRef(null); // useRef необходим для CSSTransition

    return (
      <TransitionGroup className="transition-group-wrapper">
        <CSSTransition
          key={location.key}
          nodeRef={nodeRef}
          classNames="fade" // Префикс для CSS классов анимации (fade-enter, fade-enter-active и т.д.)
          // Конфигурация длительности анимации для CSSTransition:
          // exit: 1ms - старая страница исчезает мгновенно (согласно CSS).
          // enter: 1000ms - достаточно для завершения анимации появления новой страницы (400ms длительность + 300ms задержка в CSS).
          timeout={{ enter: 1000, exit: 1 }}
        >
          <div ref={nodeRef} className="route-section">
            <Routes location={location}> {/* Передаем объект location в Routes для корректных переходов */}
              <Route path="/" element={<HomePage showNotification={showNotification} />} />
              <Route path="/categories" element={<CategoriesPage showNotification={showNotification} />} />
              <Route path="/categories/:id" element={<CategoryProductsPage showNotification={showNotification} />} />
              <Route path="/products" element={<AllProductsPage showNotification={showNotification} />} />
              <Route path="/products/:id" element={<ProductDetailsPage showNotification={showNotification} />} />
              <Route path="/cart" element={<CartPage showNotification={showNotification} />} />
              <Route path="/discounted-items" element={<DiscountedItemsPage showNotification={showNotification} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }

  return (
    <div className="App">
      {/* Хедер будет отображаться на всех страницах */}
      <Header />  
      <main className="main-content"> 
        <LocationWrapper />
      </main>
      {/* Футер будет отображаться на всех страницах */}
      <Footer />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
    </div>
  );
};

export default App;