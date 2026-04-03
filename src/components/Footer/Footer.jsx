import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>◈</span>
              <span className={styles.logoText}>ShopVault</span>
            </div>
            <p className={styles.tagline}>
              Discover quality products at unbeatable prices. Your one-stop shop
              for everything.
            </p>
            <div className={styles.socials}>
              {["Twitter", "Instagram", "Facebook"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className={styles.socialLink}
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.colLinks}>
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <a href="#">Best Sellers</a>
              </li>
              <li>
                <a href="#">Sale</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.colLinks}>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Account</h4>
            <ul className={styles.colLinks}>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
              <li>
                <a href="#">Orders</a>
              </li>
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h4 className={styles.colTitle}>Newsletter</h4>
            <p className={styles.newsletterText}>
              Get deals and updates straight to your inbox.
            </p>
            <form
              className={styles.newsletterForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className={styles.newsletterInput}
                aria-label="Email for newsletter"
              />
              <button type="submit" className={styles.newsletterBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} ShopVault. All rights reserved.</p>
          <div className={styles.legal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
