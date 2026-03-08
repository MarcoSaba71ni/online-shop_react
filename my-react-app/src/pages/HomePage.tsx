import { useState, useEffect, useRef } from "react";
import ProductList from "../components/ProductList";
import { ProductListProp , Product , ApiError } from "../features/interfaces/interfaces";


export const API_URL_PRODUCTS = "https://v2.api.noroff.dev/online-shop";

export function HomePage() {

  const [items, setItems] = useState<Product[]>([]); 
  const [ allProducts , setAllProducts ] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 
  const [error, setError] = useState<ApiError | null >(null);

  const [ searchTerm , setSearchTerm ] = useState('');

  const LIMIT = 6; 

  const isFetchingRef = useRef(false);


  async function loadProducts(page:number): Promise<void> {
    setError(null);
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
        (p:Product) => !existingIds.has(p.id)
      );
      return [...prev, ...newItems]; 
    });

    if(result.meta) {
      setHasMore(!result.meta.isLastPage);
    }

    }  catch (error:unknown) {
    console.error("Error fetching products:", error);
    if (typeof error === "object" && error !== null && "status" in error )
      setError( error as ApiError)
     else {
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
  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

useEffect(() => {
  async function fetchAllProducts() {
    try {
      const response = await fetch(API_URL_PRODUCTS);
      if(!response.ok) throw new Error("Failed to fetch all products");
      const data = await response.json();
      setAllProducts(data.data);
    } catch (error) {
      throw new Error
    }
  }

  fetchAllProducts(); 
}, []);

  function addProduct(product: Product) {
    setItems((prev) => [product, ...prev]);
  }

  function removeProduct(id:string) {
    setItems((prev) => prev.filter((product) => product.id !== id)); 
  }
      const paginatedProducts: Product[] = items.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

      const filteredProducts: Product[] = allProducts.filter((product) => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  return (
    <div className="flex flex-col gap-6 mt-6">
      <input 
        className="border border-gray-300 rounded-xl mx-6 sm:mx-24 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}>
          
      </input>
      <h2 className="text-3xl font-bold text-gray-800 pl-6">Products</h2>

      <ProductList
        products={searchTerm ? filteredProducts : paginatedProducts}
        onAdd={addProduct}
        onRemove={removeProduct}
      />

      {isLoading && isLoading &&
        <div className="bg-gray-100 min-h-screen py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4 gap-6 animate-pulse">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-5 flex flex-col flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-auto space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                </div>
              </div>
              <div className="p-5 pt-0">
                <div className="h-10 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-5 flex flex-col flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-auto space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                </div>
              </div>
              <div className="p-5 pt-0">
                <div className="h-10 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-5 flex flex-col flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-auto space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                </div>
              </div>
              <div className="p-5 pt-0">
                <div className="h-10 bg-gray-200 rounded-xl"></div>
              </div>
            </div>

          </div>
        </div>
        }

      {!isLoading && hasMore && !error && (
        <div className="flex justify-center mb-6">
          <button 
          className="px-6 py-2 bg-black cursor-pointer text-white rounded-lg hover:opacity-80 transition"
          onClick={() => setCurrentPage((prev) => prev + 1)}> 
            Load More
          </button>          
        </div>
      )}

      {!hasMore && <p>No more products to load.</p>} 

      {error && 
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
            <p className="text-red-600 font-semibold">
              Something went wrong 😢
            </p>
            <p className="text-gray-500">{error.message}</p>  // message has no type
          </div>}
          
      {paginatedProducts.length < 1 &&
      <p 
      className="mx-12 flex justify-center font-bold text-3xl"
      >NO MATCHING PRODUCTS</p>}
    </div>
  );
  };
