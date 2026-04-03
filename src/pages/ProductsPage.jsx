import React, { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import styles from "./ProductsPage.module.css";

const ITEMS_PER_PAGE = 20;

export default function ProductsPage({ searchQuery }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { products, categories, total, loading, error } = useProducts({
    category,
    search: searchQuery,
    sort,
    page,
    limit: ITEMS_PER_PAGE,
  });

  const handleCategoryChange = useCallback((cat) => {
    setCategory(cat);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((s) => {
    setSort(s);
    setPage(1);
  }, []);

  if (error) {
    return (
      <div className={styles.errorState}>
        <span>⚠️</span>
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>Discover Our Products</h1>
          <p className={styles.bannerSub}>
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Explore thousands of quality products across every category"}
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        <Sidebar
          categories={categories}
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          minRating={minRating}
          onRatingChange={setMinRating}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className={styles.main}>
          <ProductGrid
            products={products}
            loading={loading}
            total={total}
            sort={sort}
            onSortChange={handleSortChange}
            priceRange={priceRange}
            minRating={minRating}
            onFilterOpen={() => setSidebarOpen(true)}
            page={page}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </main>
      </div>
    </div>
  );
}
