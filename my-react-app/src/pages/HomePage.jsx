import React, { useState, useEffect, useRef } from "react";
import ProductList from "../components/productList";

const API_URL_PRODUCTS = "https://v2.api.noroff.dev/online-shop";

export function HomePage() {

  const [items, setItems] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 

  const LIMIT = 6; 

  const isFetchingRef = useRef(false);

  async function loadProducts(page) { 
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
 
    try {
        setIsLoading(true); 
        setHasMore(true);
        const response = await fetch(`${API_URL_PRODUCTS}?page=${page}&limit=${LIMIT}`);
        if (!response.ok) {
          console.error("Failed to fetch products:", response.statusText);
          return;
        };
        const result = await response.json();
        console.log("Fetched products:", result.data);

        setItems((prev) => { 

        const existingIds = new Set(prev.map((p) => p.id));
        const newItems = result.data.filter(
        (p) => !existingIds.has(p.id)
      );
      return [...prev, ...newItems]; 
    });

    if(result.meta) {
      setHasMore(!result.meta.isLastPage);
    }

    } catch (error) {
        console.error("Error fetching products:", error);
    } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
    }
}

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  function addProduct(title, price) {
    const newProduct = {
      id: Date.now(),
      title,
      price,
    };

    setItems((prev) => [newProduct, ...prev]);
  }

  function removeProduct(id) { 
    setItems((prev) => prev.filter((product) => product.id !== id)); 
  }

  return (
    <div className="flex flex-col gap-6 ml-24 mt-6">
      <input className="border border-gray-300 rounded-xl mx-24 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition" placeholder="Search products..."></input>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <ProductList
        products={items}
        onAdd={addProduct}
        onRemove={removeProduct}
      />

      {isLoading && <p>Loading...</p>}

      {!isLoading && hasMore && (
        <button onClick={() => setCurrentPage((prev) => prev + 1)}> 
          Load More
        </button>
      )}

      {!hasMore && <p>No more products to load.</p>} 
    </div>
  );
}
