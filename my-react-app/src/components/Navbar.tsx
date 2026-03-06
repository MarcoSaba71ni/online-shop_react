import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { CartItem, Product } from "../features/interfaces/interfaces";
import { RootState } from "../app/store";


export function Navbar() {
    const cartItems:CartItem[] = useSelector((state: RootState) => state.cart.items);
    const totalQuantity: number = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
    <header className="bg-black text-white p-4 flex flex-row justify-evenly items-center">
        <div>
          <Link to="/">
          <h1 className="text-2xl font-bold mb-4 mt-2 cursor-pointer">OnShp</h1>
          </Link>  
        </div>
        <nav className="flex flex-row gap-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div>
          <Link to="/cart">
            <h3 className="bg-white text-black px-1 rounded-md">Cart: {totalQuantity}</h3>
          </Link>
        </div>
    </header>
    );  
    };

export default Navbar;