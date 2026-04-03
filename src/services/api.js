const BASE_URL = "https://dummyjson.com";

function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title,
    price: parseFloat(p.price),
    originalPrice: p.discountPercentage
      ? parseFloat((p.price / (1 - p.discountPercentage / 100)).toFixed(2))
      : null,
    discountPercentage: p.discountPercentage
      ? Math.round(p.discountPercentage)
      : null,
    rating: p.rating,
    reviewCount: p.stock,
    category: p.category,
    thumbnail: p.thumbnail,
    images: p.images || [p.thumbnail],
    brand: p.brand || p.category,
    stock: p.stock,
    description: p.description,
    tags: p.tags || [],
  };
}

export async function fetchProducts({
  limit = 30,
  skip = 0,
  category = "",
  search = "",
} = {}) {
  let url;

  if (search) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== "all") {
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return {
    products: (data.products || []).map(normalizeProduct),
    total: data.total || 0,
    skip: data.skip || 0,
    limit: data.limit || limit,
  };
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return ["all", ...data];
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return normalizeProduct(data);
}
