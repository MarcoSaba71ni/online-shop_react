import React from "react";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";


export function Navbar() {
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

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
          <Link to="/cart">Contact</Link>
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