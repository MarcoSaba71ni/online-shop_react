import { useSelector , useDispatch } from "react-redux";
import { addToCart , removeFromCart , clearCart } from "../features/cart/cartSlice";
import { RootState , AppDispatch} from "../app/store";
import { Link } from "@tanstack/react-router";

export function CartPage() {
    const cartItems = useSelector((state: RootState)=> state.cart.items);
    const dispatch = useDispatch<AppDispatch>();

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );
    const shipmentFee = 15;
    const total = subTotal + shipmentFee;

    if (cartItems.length === 0) {
        return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">
            Looks like you haven’t added anything yet.
            </p>
        </div>
        );
    }
    return (
        <div className="max-w-7xl flex flex-col mx-auto px-6 mt-10">
            <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 flex flex-col gap-6">
                    {cartItems.map((item) => (
                        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col gap-4"
                        key={item.id}>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
                                <div className="flex gap-2">
                                    <img 
                                    src={item.image.url} 
                                    alt={item.image.alt}
                                    className="w-full max-w-[160px] h-40 object-cover rounded-xl"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-3xl">{item.title}</h3>
                                        <p className="font-bold">Price: ${item.price} </p>
                                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                                        <button
                                        className="mt-3 text-red-500 text-sm hover:underline cursor-pointer"
                                            onClick = {() => dispatch(removeFromCart(item.id))}>
                                                Remove from Cart
                                        </button>
                                    </div>                            
                                </div>
                                <div className="flex flex-col md:items-end gap-4">
                                    <div>
                                    <span className="text-sm text-gray-500">Quantity</span>
                                    <div className="flex gap-3 mt-2 items-center">
                                        <button
                                        onClick={() => dispatch(addToCart(item))}
                                        className="w-8 h-8 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 font-bold"
                                        >
                                        +
                                        </button>
                                        <span className="font-semibold">
                                        {item.quantity}
                                        </span>

                                        <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="w-8 h-8 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 font-bold"
                                        >
                                        -
                                        </button>
                                    </div>
                                    </div>

                                    {/* ✅ UPDATED ITEM TOTAL */}
                                    <p className="text-lg font-semibold mt-4">
                                    ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    ))}                    
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg w-full lg:w-80 transition-shadow duration-300 flex flex-col p-6 gap-6 lg:sticky lg:top-10">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg border-b pb-3">Cart Total</h3>                        
                        <div className="flex justify-between">
                            <p>Subtotal:</p>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipment Fee:</p>
                            <p>${shipmentFee.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between border-t pt-4 text-lg font-bold">
                            <p>Total</p>
                            <p>${total.toFixed(2)}</p>
                        </div>                        
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                        {/* Primary Button */}
                        <Link
                        to="/checkout"
                        className="w-full bg-black text-white py-3 text-center cursor-pointer rounded-xl hover:bg-gray-800 transition">
                        Checkout
                        </Link>

                        {/* Secondary Button */}
                        <button
                        onClick={() => dispatch(clearCart())}
                        className="w-full border border-red-500 text-red-500 py-3 cursor-pointer rounded-xl hover:bg-red-50 transition"
                        >
                        Clear Cart
                        </button>
                    </div>
                </div>     

            </div>
        </div>
    );
};

export default CartPage;