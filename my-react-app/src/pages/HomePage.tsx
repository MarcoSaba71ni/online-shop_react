import { useState, useEffect, useRef } from "react";
import ProductList from "../components/ProductList";
import { ProductListProp , Product , ApiError } from "../features/interfaces/interfaces";


export const API_URL_PRODUCTS = "https://v2.api.noroff.dev/online-shop";

export function HomePage() {

  // From here 
  const [items, setItems] = useState<Product[]>([]); 
  const [ allProducts , setAllProducts ] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 
  const [error, setError] = useState<ApiError | null >(null);
  // To here will be deleted
  const [ searchTerm , setSearchTerm ] = useState('');

  const LIMIT = 6; 

  const isFetchingRef = useRef(false);


  async function loadProducts(page:number): Promise<void> { // page has no type
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

        setItems((prev) => {  // prev has no type

        const existingIds = new Set(prev.map((p) => p.id));  // id has no type
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
        status: null,  // status has no type
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

useEffect(() => {
  async function fetchAllProducts() {
    try {
      const response = await fetch(API_URL_PRODUCTS);
      if(!response.ok) throw new Error("Failed to fetch all products");
      const data = await response.json();
      setAllProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  fetchAllProducts(); // <— call it here
}, []); // empty dependency → runs only once




  function addProduct(product: Product) {  // title and price has no type
    setItems((prev) => [product, ...prev]);  // prev has no type
  }

  function removeProduct(id:string) {  // id has no type
    setItems((prev) => prev.filter((product) => product.id !== id)); 
  }

      // WHERE TO PLACE THE FILTERED CONSTANT?
      const paginatedProducts: Product[] = items.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())  // title has no type
    );

      const filteredProducts: Product[] = allProducts.filter((product) => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  return (
    <div className="flex flex-col gap-6 mt-6">
      <input 
        className="border border-gray-300 rounded-xl mx-24 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}>
          
      </input>
      <h2 className="text-3xl font-bold text-gray-800 pl-6">Products</h2>

      <ProductList
        products={searchTerm ? filteredProducts : paginatedProducts}
        onAdd={addProduct}  // onAdd has no type
        onRemove={removeProduct}
      />

      {isLoading && isLoading &&

        <div className="min-h-screen flex justify-center items-center p-6">
          <div className="animate-pulse max-w-5xl w-full grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-2xl" />
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 w-3/4 rounded" />
              <div className="bg-gray-200 h-6 w-full rounded" />
              <div className="bg-gray-200 h-6 w-2/3 rounded" />
              <div className="bg-gray-200 h-10 w-1/3 rounded" />
            </div>
          </div>
        </div>}

      {!isLoading && hasMore && !error && ( // if is loading, has more and no error we display btn
        <div className="flex justify-center mb-6">
          <button 
          className="px-6 py-2 bg-black cursor-pointer text-white rounded-lg hover:opacity-80 transition"
          onClick={() => setCurrentPage((prev) => prev + 1)}> 
            Load More
          </button>          
        </div>
      )}

      {!hasMore && <p>No more products to load.</p>} 

      {error && // if error is present
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
            <p className="text-red-600 font-semibold">
              Something went wrong 😢
            </p>
            <p className="text-gray-500">{error.message}</p>  // message has no type
          </div>}
          
      {paginatedProducts.length < 1 &&  // paginatedProducts has no type
      <p 
      className="mx-auto flex justify-center font-bold text-3xl"
      >NO MATCHING PRODUCTS</p>}
    </div>
  );
  };
