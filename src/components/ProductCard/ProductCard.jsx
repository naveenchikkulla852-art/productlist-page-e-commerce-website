import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    addToast(`"${product.title.slice(0, 30)}..." added to cart`, "success");
    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((v) => !v);
    addToast(
      wishlist ? "Removed from wishlist" : "Added to wishlist",
      "default",
    );
  };

  const formatPrice = (p) => `$${p.toFixed(2)}`;

  return (
    <article className={styles.card}>
      {/* Image area */}
      <div className={styles.imageWrapper}>
        <img
          src={imgError ? "/placeholder.png" : product.thumbnail}
          alt={product.title}
          className={styles.image}
          onError={() => setImgError(true)}
          loading="lazy"
        />

        <div className={styles.badges}>
          {product.discountPercentage && (
            <span className={styles.badgeDiscount}>
              -{product.discountPercentage}%
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className={styles.badgeLow}>Low Stock</span>
          )}
          {product.stock === 0 && (
            <span className={styles.badgeOut}>Out of Stock</span>
          )}
        </div>

        <button
          className={`${styles.wishlistBtn} ${wishlist ? styles.wishlisted : ""}`}
          onClick={handleWishlist}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon filled={wishlist} />
        </button>

        <div className={styles.overlay}>
          <button
            className={styles.quickAdd}
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            {adding ? "Adding..." : "Quick Add"}
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>

        <div className={styles.rating}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={styles.star}
                style={{
                  color:
                    i <= Math.round(product.rating)
                      ? "#f59e0b"
                      : "var(--color-border)",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <span className={styles.ratingValue}>
            {product.rating.toFixed(1)}
          </span>
          <span className={styles.reviewCount}>({product.reviewCount})</span>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          className={styles.addBtn}
          onClick={handleAddToCart}
          disabled={adding || product.stock === 0}
        >
          {product.stock === 0
            ? "Out of Stock"
            : adding
              ? "Adding..."
              : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
