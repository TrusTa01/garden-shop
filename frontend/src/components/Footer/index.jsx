import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.contactInfoWrapper}>
                    <h2 className={styles.footerTitle}>Contact</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.contactItem}>
                            <h3 className={styles.contactItemTitle}>Phone</h3>
                            <p className={styles.contactItemText}>+7 (499) 350-66-04</p>
                        </div>
                        <div className={styles.contactItem}>
                            <h3 className={styles.contactItemTitle}>Socials</h3>
                            <div className={styles.socialIcons}>
                                {/* Instagram Icon */}
                                <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                                    <img src="/assets/icons/ic-instagram.png" alt="иконка инстаграма" />
                                </a>
                                {/* WhatsApp Icon */}
                                <a href="#" aria-label="WhatsApp" className={styles.socialIcon}>
                                    <img src="/assets/icons/ic-whatsapp.png" alt="иконка ватсапа" />
                                </a>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <h3 className={styles.contactItemTitle}>Address</h3>
                            <p className={styles.contactItemText}>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
                        </div>
                        <div className={styles.contactItem}>
                            <h3 className={styles.contactItemTitle}>Working Hours</h3>
                            <p className={styles.contactItemText}>24 hours a day</p>
                        </div>
                    </div>
                </div>

                {/* Карта */}
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.382092576326!2d37.625807415840515!3d55.70014288053723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b032d1e0d37%3A0xc0c8e3e4f3a3d5f!2sDubininskaya%20Ulitsa%2C%2096%2C%20Moscow%2C%20Russia%2C%20115093!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus" /* ЗАМЕНИТЕ ЭТОТ SRC НА ВАШ РЕАЛЬНЫЙ */
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Our Location"
                    ></iframe>
                </div>
            </div>
        </footer>
    );
};

export default Footer;