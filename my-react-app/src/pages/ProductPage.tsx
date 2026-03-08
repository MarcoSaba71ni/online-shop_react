import { productRoute } from "../router/Router";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "@tanstack/react-router";
import { API_URL_PRODUCTS } from "./HomePage";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchProductById = async (id:string) => {
  const response = await fetch(`${API_URL_PRODUCTS}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const result = await response.json();
  return result.data; 
};



export function ProductPage() {
  const { productId } = productRoute.useParams();
  const dispatch = useDispatch();

  const [ added , setAdded ] = useState(false)

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });

  if (isLoading) {
    return (
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
      </div>
    )
    
    ;
  }

  if (isError) {
    return(
      <>
        <p>Error: {error.message}</p>;
        <button
        onChange={()=> refetch()}>
          Try Again  
        </button>        
      </>
    )

  }
  return (
  <>
  {isFetching && ! isLoading && (
  <p>Updating Page...</p>)}

  <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full overflow-hidden">

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="flex justify-center items-center">
            <img
              src={product.image.url}
              alt={product.title}
              className="w-full max-h-[500px] object-contain rounded-2xl"
            />
          </div>
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-semibold text-black">
                  ${product.price}
                </p>
                <p className="line-through">${product.discountedPrice}</p>                
              </div>
              <p className="text-yellow-500 font-medium">
                ⭐ {product.rating} / 5
              </p>
              <p className="text-sm text-gray-400">
                Product ID: {product.id}
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  setAdded(true);
                  dispatch(addToCart(product));
                  setTimeout(() => setAdded(false), 1500);
                }}
                className={`flex-1 cursor-pointer py-3 rounded-xl active:scale-95 transition-all duration-300
                ${added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-gray-800"}`}
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>

              <Link
                to="/"
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 text-center"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}