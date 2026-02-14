import React from "react";
import { useSelector , useDispatch } from "react-redux";
import { removeFromCart , clearCart } from "../features/cart/cartSlice";

export function CartPage() {
    const cartItems = useSelector((state)=> state.cart.items);
    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return <h2 className="text-center text-2xl font-bold text-gray-800">No Items in Cart</h2>
}
    return (
        <div className="flex flex-col gap-2 ml-24 mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            {cartItems.map((item) => (
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
                 key={item.id}>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button className="bg-red-500 text-white py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                    onClick = {() => dispatch(removeFromCart(item.id))}>
                        Remove from Cart
                    </button>
                </div>
            ))};
            <div className="mt-6">
                <button 
                className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default CartPage;