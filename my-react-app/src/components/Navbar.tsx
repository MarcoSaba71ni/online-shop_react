import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { CartItem, Product } from "../features/interfaces/interfaces";
import { RootState } from "../app/store";
import { useState , useRef , useEffect  } from "react";

export function Navbar() {
    const cartItems:CartItem[] = useSelector((state: RootState) => state.cart.items);
    const totalQuantity: number = cartItems.reduce((total, item) => total + item.quantity, 0);
    const [menuOpen , setMenuOpen ] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setMenuOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };

    }, []);

    return (
    <header className="relative bg-black text-white p-4 flex flex-row justify-between px-6 sm:px-0 sm:justify-evenly items-center ">
        <div
        className="flex sm:hidden">
          <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer transition-transform duration-200 hover:scale-110">
            <i className="fa-solid text-white text-2xl fa-bars"></i>
          </button>
        </div>
        <div>
          <Link to="/">
          <h1 className="text-2xl font-bold mb-4 mt-2 cursor-pointer transition-transform duration-200 hover:scale-110">OnShp</h1>
          </Link>  
        </div>
        <nav className="hidden flex-row gap-6 sm:flex">
          <Link
          className="hover:border-b-2 mb-2"
           to="/">Home</Link>
          <Link
          className="hover:border-b-2 mb-2"
          to="/about">About</Link>
          <Link
          className="hover:border-b-2 mb-2"
          to="/contact">Contact</Link>
        </nav>
        <div className="cursor-pointer transition-transform duration-200 hover:scale-110">
          <Link to="/cart" className="relative ">
            <i className="fa-solid text-xl text-white fa-cart-arrow-down"></i>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {totalQuantity}
            </span>
          </Link>
        </div>
        <nav
        ref={menuRef}
        className={`
          sm:hidden
          absolute
          top-20
          left-0
          w-32
          bg-black
          text-white
          rounded
          flex flex-col
          z-50
          transition-all duration-200
          ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <Link
          className="hover:bg-white hover:text-black p-2"
          onClick={() => setMenuOpen(false)}
          to="/"
        >
          Home
        </Link>

        <Link
          className="hover:bg-white hover:text-black p-2"
          onClick={() => setMenuOpen(false)}
          to="/about"
        >
          About
        </Link>

        <Link
          className="hover:bg-white hover:text-black mb-1 p-2 pb-1"
          onClick={() => setMenuOpen(false)}
          to="/contact"
        >
          Contact
        </Link>
      </nav>
    </header>
    )};

export default Navbar;