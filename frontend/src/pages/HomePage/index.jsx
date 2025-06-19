import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

import { fetchCategories } from "../../store/slices/categoriesSlice";
import { fetchProducts } from "../../store/slices/productsSlice";

import CategoryCard from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    list: categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);
  const {
    list: products,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, categoriesStatus, productsStatus]);

  const discountedProducts = products.filter(
    (product) =>
      product.discont_price !== null && product.discont_price !== undefined
  );
  const featuredDiscountedProducts = discountedProducts.slice(0, 4);

  const featuredCategories = categories.slice(0, 4);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [formStatus, setFormStatus] = useState("initial");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("http://localhost:3333/order/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      setFormStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className={styles.homePage}>
      {/* Hero Секция  */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Amazing Discounts on Garden Products!</h1>
          <Link to="/products" className={styles.checkOutButton}>
            <span className={styles.buttonText}>Check out</span>{" "}
          </Link>
        </div>
      </section>

      {/* Секция Categories */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.categoriesTitle}>Categories</h3>
          <div className={styles.divider}></div>
          <button
            className={styles.categoriesButton}
            onClick={() => navigate("/categories")}
          >
            All categories
          </button>
        </div>

        {categoriesStatus === "loading" && <p>Loading categories...</p>}
        {categoriesError && <p>Error loading categories: {categoriesError}</p>}
        <div className={styles.categoriesGrid}>
          {featuredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isHomePage={true}
            />
          ))}
        </div>
      </section>

      {/* Секция формы  */}

      <section className={styles.discountFormSection}>
        <form className={styles.discountForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.discountInput}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className={styles.discountInput}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.discountInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formStatus === "success" ? (
            <p className={styles.requestSubmitted}>Request Submitted</p>
          ) : (
            <button
              type="submit"
              className={styles.discountSubmitButton}
              disabled={formStatus === "submitting"}
            >
              {formStatus === "submitting" ? "Submitting..." : "Get a discount"}
            </button>
          )}
        </form>
      </section>

      {/* Секция Sales */}
      <section className={styles.salesSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.salesTitle}>Sales</h3>
          <div className={styles.divider}></div>
          <Link to="/discounted-items" className={styles.salesButton}>
            All sales
          </Link>
        </div>

        {productsStatus === "loading" && <p>Loading sales...</p>}
        {productsError && <p>Error loading sales: {productsError}</p>}
        <div className={styles.productsGrid}>
          {featuredDiscountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
