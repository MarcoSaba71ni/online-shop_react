import React, { useState, // used to store and update the list of products, current page, loading state, and whether there are more products to load
   useEffect, // used for side effects when the component mount changes
    useRef // 
   } from "react";
import ProductList from "../components/productList";


const allProducts = Array.from({ length: 30 }, (_, i) => ({ // it creates an array of 30 p
// for each index, it creates an object with id, title, and price properties
  id: i + 1,
  title: "Product " + (i + 1),
  price: (i + 1) * 10,
}));

function fetchProducts(page, limit) { // simulates an API call to fetch products with pagination
  return new Promise((resolve) => { // fetch returns a promise
    setTimeout(() => {
      const start = (page - 1) * limit; // calculates the starting index based on page and limit
      const end = start + limit; // calculates the ending index based on starting index and limit

      resolve({
        data: allProducts.slice(start, end), // returns a slice of allProducts based on the calculated start and end indices
        hasMore: end < allProducts.length, // checks if still more items
      });
    }, 500); // Simulate network delay
  });
}

export function HomePage() {
  const [items, setItems] = useState([]); // stores and updates list of items
  const [currentPage, setCurrentPage] = useState(1); // stores and updates the current page number for pagination
  const [isLoading, setIsLoading] = useState(false); // store and updates the loading state to indicate when products are being fetched
  const [hasMore, setHasMore] = useState(true); // stores and updates whether there are more items to show

  const LIMIT = 6; // defines the number of products to fetch per page

  // prevents duplicate fetch in StrictMode
  const isFetchingRef = useRef(false);

  useEffect(() => { // // handles side effects related to fetch data when the mount changes or currentPage changes
    loadProducts(currentPage);
  }, [currentPage]);

  async function loadProducts(page) { // handles products fetching
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true); //sets loading state to true before starting the fetch operation, indicating that products are being loaded

    const response = await fetchProducts(page, LIMIT); // fetches products for the given page and limit, and waits for the response

    setItems((prev) => { // updates items state when new items are fetched
      // prevent duplicate items
      const existingIds = new Set(prev.map((p) => p.id)); //  creates a set of proudcts id from current item
      const newItems = response.data.filter( // filters new items based on id existing in the current items, to prevent duplicates
        (p) => !existingIds.has(p.id)
      );
      return [...prev, ...newItems]; // returns a new array combiniing new with old items
    });

    setHasMore(response.hasMore); // update hasMore state based on response
    setIsLoading(false); // update loading state to false after fetch is complete
    isFetchingRef.current = false; // reset loading state to false
  }

  function addProduct(title, price) {
    const newProduct = {
      id: Date.now(),
      title,
      price,
    };

    setItems((prev) => [newProduct, ...prev]);
  }

  function removeProduct(id) { // based on id, it filters out the product from the items state and updates the state with the new list of products that does not include the removed product
    setItems((prev) => prev.filter((product) => product.id !== id)); // updates items state by filtering out the product with the specified id, effectively removing it from the list of products displayed on the home page.
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

      {!isLoading && hasMore && ( // if npt loading and no more items to load, it renders a button that allows the user to load more products by incrementing the current page number, which triggers the useEffect to fetch the next set of products.
        <button onClick={() => setCurrentPage((prev) => prev + 1)}> 
          Load More
        </button>
      )}

      {!hasMore && <p>No more products to load.</p>} 
    </div>
  );
}
