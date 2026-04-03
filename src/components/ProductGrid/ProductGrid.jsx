import React, { useState, useMemo } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
];

export default function ProductGrid({
  products,
  loading,
  total,
  sort,
  onSortChange,
  priceRange,
  minRating,
  onFilterOpen,
  page,
  onPageChange,
  itemsPerPage,
}) {
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // Client-side filter by price & rating
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const inPrice =
        p.price >= (priceRange?.min || 0) &&
        p.price <= (priceRange?.max || Infinity);
      const inRating = p.rating >= (minRating || 0);
      return inPrice && inRating;
    });
  }, [products, priceRange, minRating]);

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button className={styles.filterToggle} onClick={onFilterOpen}>
            <FilterIcon />
            <span>Filters</span>
          </button>

          <p className={styles.resultCount}>
            {loading ? "Loading..." : `${filtered.length} products`}
          </p>
        </div>

        <div className={styles.toolbarRight}>
          <div className={styles.sortWrapper}>
            <label htmlFor="sort-select" className={styles.sortLabel}>
              Sort:
            </label>
            <select
              id="sort-select"
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === "grid" ? styles.activeView : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <GridIcon />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === "list" ? styles.activeView : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div
          className={`${styles.grid} ${viewMode === "list" ? styles.listMode : ""}`}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className={`${styles.grid} ${viewMode === "list" ? styles.listMode : ""}`}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <Pagination page={page} total={totalPages} onChange={onPageChange} />
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`${styles.skeletonImage} skeleton`} />
      <div className={styles.skeletonBody}>
        <div
          className={`${styles.skeletonLine} skeleton`}
          style={{ width: "40%", height: 10 }}
        />
        <div
          className={`${styles.skeletonLine} skeleton`}
          style={{ width: "85%", height: 14 }}
        />
        <div
          className={`${styles.skeletonLine} skeleton`}
          style={{ width: "65%", height: 14 }}
        />
        <div
          className={`${styles.skeletonLine} skeleton`}
          style={{ width: "50%", height: 20 }}
        />
        <div
          className={`${styles.skeletonLine} skeleton`}
          style={{ height: 36 }}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <span className={styles.emptyIcon}>🔍</span>
      <h3>No products found</h3>
      <p>Try adjusting your filters or search query.</p>
    </div>
  );
}

function Pagination({ page, total, onChange }) {
  const pages = [];
  const delta = 2;

  for (
    let i = Math.max(1, page - delta);
    i <= Math.min(total, page + delta);
    i++
  ) {
    pages.push(i);
  }

  return (
    <nav className={styles.pagination} aria-label="Product pagination">
      <button
        className={styles.pageBtn}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages[0] > 1 && (
        <>
          <button className={styles.pageBtn} onClick={() => onChange(1)}>
            1
          </button>
          {pages[0] > 2 && <span className={styles.pageEllipsis}>…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageBtn} ${p === page ? styles.activePage : ""}`}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && (
            <span className={styles.pageEllipsis}>…</span>
          )}
          <button className={styles.pageBtn} onClick={() => onChange(total)}>
            {total}
          </button>
        </>
      )}

      <button
        className={styles.pageBtn}
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}

function FilterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
