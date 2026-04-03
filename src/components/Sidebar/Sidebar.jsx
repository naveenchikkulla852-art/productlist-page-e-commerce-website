import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

const RATINGS = [4, 3, 2, 1];

export default function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onRatingChange,
  isOpen,
  onClose,
}) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
  });

  const toggle = (key) =>
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const formatCategory = (cat) =>
    cat === "all"
      ? "All Products"
      : cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Filters</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close filters"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.section}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggle("categories")}
            aria-expanded={expandedSections.categories}
          >
            <span>Categories</span>
            <ChevronIcon rotated={expandedSections.categories} />
          </button>
          {expandedSections.categories && (
            <ul className={styles.categoryList}>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`${styles.categoryItem} ${selectedCategory === cat ? styles.active : ""}`}
                    onClick={() => {
                      onCategoryChange(cat);
                      onClose();
                    }}
                  >
                    {formatCategory(cat)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.section}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggle("price")}
            aria-expanded={expandedSections.price}
          >
            <span>Price Range</span>
            <ChevronIcon rotated={expandedSections.price} />
          </button>
          {expandedSections.price && (
            <ul className={styles.filterList}>
              {PRICE_RANGES.map((range) => {
                const isSelected =
                  priceRange?.min === range.min &&
                  priceRange?.max === range.max;
                return (
                  <li key={range.label}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="price"
                        className={styles.radio}
                        checked={isSelected}
                        onChange={() => onPriceRangeChange(range)}
                      />
                      <span className={styles.radioCustom} />
                      {range.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={styles.section}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggle("rating")}
            aria-expanded={expandedSections.rating}
          >
            <span>Min Rating</span>
            <ChevronIcon rotated={expandedSections.rating} />
          </button>
          {expandedSections.rating && (
            <ul className={styles.filterList}>
              <li>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rating"
                    className={styles.radio}
                    checked={!minRating}
                    onChange={() => onRatingChange(0)}
                  />
                  <span className={styles.radioCustom} />
                  All Ratings
                </label>
              </li>
              {RATINGS.map((r) => (
                <li key={r}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="rating"
                      className={styles.radio}
                      checked={minRating === r}
                      onChange={() => onRatingChange(r)}
                    />
                    <span className={styles.radioCustom} />
                    <Stars count={r} /> & above
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className={styles.resetBtn}
          onClick={() => {
            onCategoryChange("all");
            onPriceRangeChange(PRICE_RANGES[0]);
            onRatingChange(0);
          }}
        >
          Reset All Filters
        </button>
      </aside>
    </>
  );
}

function Stars({ count }) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= count ? "#f59e0b" : "#d1d5db" }}>
          ★
        </span>
      ))}
    </span>
  );
}

function ChevronIcon({ rotated }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: rotated ? "rotate(180deg)" : "none",
        transition: "transform 0.2s",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
