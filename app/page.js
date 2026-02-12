"use client";

import ProductCard from "../app/components/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../app/utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const [visible, setVisible] = useState(8);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Filter
  let filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  // Sorting
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* 🔍 + 🎛 ALL FILTERS IN ONE LINE */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 p-3 border rounded text-black"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded text-black"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="p-3 border rounded text-black"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <h2 className="text-center text-xl">No products found 😢</h2>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, visible).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Load More */}
          {visible < filteredProducts.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisible(visible + 4)}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
}
