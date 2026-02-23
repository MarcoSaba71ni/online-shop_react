import React, { useState, useEffect, useRef } from "react";
import ProductList from "../components/productList";
import { useQuery } from '@tanstack/react-query';

export const API_URL_PRODUCTS = "https://v2.api.noroff.dev/online-shop";

export function HomePage() {

  // From here 
  const [items, setItems] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 
  const [error, setError] = useState(null);
  // To here will be deleted
  const [ searchTerm , setSearchTerm ] = useState('');

  const LIMIT = 6; 

  const isFetchingRef = useRef(false);

  async function loadProducts(page) {
    setError(null); // error state to be null 
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
 
    try {
        setIsLoading(true); 
        const response = await fetch(`${API_URL_PRODUCTS}?page=${page}&limit=${LIMIT}`);
        if (!response.ok) {
        let message = "Something went wrong.";

        if (response.status === 400) {
          message = "Bad request. Please try again.";
        } 
        else if (response.status === 401) {
          message = "You must log in to continue.";
        } 
        else if (response.status === 403) {
          message = "You do not have permission.";
        }
        else if (response.status === 404) {
          message = "Products not found.";
        }
        else if (response.status >= 500) {
          message = "Server error. Please try again later.";
        }

        throw {
          status: response.status,
          message
        };
      }
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

    }  catch (error) {
    console.error("Error fetching products:", error);

    if (error.status) {
      setError(error);
    } else {
      setError({
        status: null,
        message: "Network error. Please check your internet connection."
      });
    }
  
    } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
    }
}
  // We create the useQuery here for data (items), currentPage, isLoading, hasMore and error - maybe searchTerm as well
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

      // WHERE TO PLACE THE FILTERED CONSTANT?
      const filteredProducts = items.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
      
  return (
    <div className="flex flex-col gap-6 ml-24 mt-6">
      <input 
        className="border border-gray-300 rounded-xl mx-24 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}>
          
      </input>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <ProductList
        products={filteredProducts}
        onAdd={addProduct}
        onRemove={removeProduct}
      />

      {isLoading && <p>Loading...</p>}

      {!isLoading && hasMore && !error && ( // if is loading, has more and no error we display btn
        <button onClick={() => setCurrentPage((prev) => prev + 1)}> 
          Load More
        </button>
      )}

      {!hasMore && <p>No more products to load.</p>} 

      {error && // if error is present
      <p>{error.status}: {error.message}</p>}

      {filteredProducts < 1 &&
      <p 
      className="mx-auto flex justify-center font-bold text-3xl"
      >NO MATCHING PRODUCTS</p>}
    </div>
  );
}
