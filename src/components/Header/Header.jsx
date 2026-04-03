import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../Cart/CartDrawer";
import styles from "./Header.module.css";

export default function Header({ onSearch, searchValue }) {
  const { user, signOut } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue || "");
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(localSearch);
  };

  const handleSearchInput = (e) => {
    setLocalSearch(e.target.value);
    if (e.target.value === "") onSearch?.("");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>◈</span>
            <span className={styles.logoText}>ShopVault</span>
          </Link>

          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            <Link to="/products" className={styles.navLink}>
              Products
            </Link>
            <a href="#" className={styles.navLink}>
              About
            </a>
            <a href="#" className={styles.navLink}>
              Contact
            </a>
          </nav>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={handleSearchInput}
              className={styles.searchInput}
              aria-label="Search products"
            />
            <button
              type="submit"
              className={styles.searchBtn}
              aria-label="Submit search"
            >
              <SearchIcon />
            </button>
          </form>

          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart – ${totalCount} items`}
            >
              <CartIcon />
              {totalCount > 0 && (
                <span className={styles.badge}>
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </button>

            {user ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.avatar}
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  {user.avatar}
                </button>
                {userMenuOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authLinks}>
                <Link to="/signin" className={styles.signInBtn}>
                  Sign In
                </Link>
                <Link to="/signup" className={styles.signUpBtn}>
                  Sign Up
                </Link>
              </div>
            )}

            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            <form className={styles.mobileSearch} onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={handleSearchInput}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn}>
                <SearchIcon />
              </button>
            </form>
            <nav className={styles.mobileNav}>
              <Link
                to="/"
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              {user ? (
                <button
                  className={styles.mobileNavLink}
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                >
                  Sign Out ({user.name})
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function SearchIcon() {
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
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
