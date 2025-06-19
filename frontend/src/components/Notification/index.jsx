import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose(); // Вызываем колбэк после скрытия уведомления
        }
      }, duration);

      return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }
  }, [message, duration, onClose]);

  if (!isVisible) {
    return null;
  }

  // Определяем класс CSS для типа уведомления (success, error, info)
  const notificationClass = `${styles.notification} ${styles[type]}`;

  return (
    <div className={notificationClass}>
      {message}
      <button onClick={() => setIsVisible(false)} className={styles.closeButton}>×</button>
    </div>
  );
};

export default Notification;