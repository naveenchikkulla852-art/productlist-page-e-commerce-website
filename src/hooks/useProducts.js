import { useState, useEffect, useCallback } from "react";
import { fetchProducts, fetchCategories } from "../services/api";

export function useProducts({
  category = "all",
  search = "",
  sort = "default",
  page = 1,
  limit = 20,
} = {}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories(["all"]));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * limit;
      const data = await fetchProducts({ limit, skip, category, search });
      let sorted = [...data.products];

      if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
      if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
      if (sort === "name")
        sorted.sort((a, b) => a.title.localeCompare(b.title));

      setProducts(sorted);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, search, sort, page, limit]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, categories, total, loading, error, refetch: load };
}
