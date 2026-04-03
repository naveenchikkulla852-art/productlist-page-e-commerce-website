import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard/ProductCard";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { products, loading } = useProducts({ limit: 8, sort: "rating" });

  const CATEGORIES_FEATURED = [
    { name: "smartphones", emoji: "📱", label: "Smartphones" },
    { name: "laptops", emoji: "💻", label: "Laptops" },
    { name: "fragrances", emoji: "🌸", label: "Fragrances" },
    { name: "groceries", emoji: "🛒", label: "Groceries" },
    { name: "home-decoration", emoji: "🏠", label: "Home Decor" },
    { name: "womens-bags", emoji: "👜", label: "Bags" },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>New Arrivals 2025</span>
          <h1 className={styles.heroTitle}>
            Shop Smarter,
            <br />
            <em>Live Better</em>
          </h1>
          <p className={styles.heroSub}>
            Discover thousands of quality products at unbeatable prices. From
            electronics to fashion, we have everything you need.
          </p>
          <div className={styles.heroActions}>
            <Link to="/products" className={styles.heroCta}>
              Shop Now
            </Link>
            <a href="#featured" className={styles.heroSecondary}>
              View Featured ↓
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>
            <span className={styles.heroCardEmoji}>✨</span>
            <strong>50K+</strong>
            <span>Products</span>
          </div>
          <div className={styles.heroCard}>
            <span className={styles.heroCardEmoji}>⭐</span>
            <strong>4.8</strong>
            <span>Avg Rating</span>
          </div>
          <div className={styles.heroCard}>
            <span className={styles.heroCardEmoji}>🚚</span>
            <strong>Free</strong>
            <span>Shipping</span>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoryGrid}>
            {CATEGORIES_FEATURED.map((c) => (
              <Link
                key={c.name}
                to={`/products`}
                state={{ category: c.name }}
                className={styles.categoryChip}
              >
                <span className={styles.categoryEmoji}>{c.emoji}</span>
                <span className={styles.categoryLabel}>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.featured} id="featured">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Rated Products</h2>
            <Link to="/products" className={styles.viewAll}>
              View all →
            </Link>
          </div>

          {loading ? (
            <div className={styles.skeletonRow}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div
                    className={`skeleton`}
                    style={{ paddingTop: "75%", borderRadius: 8 }}
                  />
                  <div
                    style={{
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      className="skeleton"
                      style={{ height: 12, width: "40%", borderRadius: 4 }}
                    />
                    <div
                      className="skeleton"
                      style={{ height: 14, width: "80%", borderRadius: 4 }}
                    />
                    <div
                      className="skeleton"
                      style={{ height: 36, borderRadius: 6, marginTop: 4 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {products.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to start shopping?</h2>
          <p className={styles.ctaSub}>
            Join thousands of happy customers today.
          </p>
          <Link to="/signup" className={styles.ctaBtn}>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
