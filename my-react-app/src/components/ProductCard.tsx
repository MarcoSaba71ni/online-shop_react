import { Link } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { ProductCardProp } from "../features/interfaces/interfaces";
import { useState } from "react";
import { RootState } from "../app/store";

function ProductCard({product}: ProductCardProp) {

    const dispatch = useDispatch();
    const [ added , setAdded ] = useState(false);

    const cartItems = useSelector((state: RootState) => state.cart.items)
    const isInCart = cartItems.some((item) => item.id === product.id)

    return (
        <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
            <Link
                to="/products/$productId"
                params={{ productId: product.id }}
                className="flex flex-col flex-1"
            >
            <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                    src={product.image.url}
                    alt={product.title}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-105"            />
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-black transition-colors">
                    {product.title}
                </h3>
                <div className="mt-auto space-y-2">
                    <p className="text-xl font-bold text-black">${product.price}</p>                
                    <p className="line-through">${product.discountedPrice}</p>
                    <p className="text-yellow-500 text-sm font-medium">
                    ⭐ {product.rating}
                    </p>
                </div>
            </div>
            </Link>
                <div className="p-5 pt-0 overflow-hidden">
                    <button
                        onClick={() => {
                        setAdded(true);
                        dispatch(addToCart(product));
                        setTimeout(() => setAdded(false), 1500);
                        }}
                        className={`w-full cursor-pointer py-2.5 rounded-xl active:scale-95 transition-all duration-300
                        ${added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-gray-800"}
                        opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4 sm:group-hover:translate-y-0 sm:group-hover:opacity-100
                        `}
                        >
                        {added ? "Added ✓" : "Add to Cart"}
                    </button>
                </div>
        </div>
    );
}

export default ProductCard;