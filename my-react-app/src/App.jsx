import ProductList from "./components/productList";
import { Outlet , Link } from "@tanstack/react-router";



function App() {
  return (
    <>
    <header className="bg-black text-white p-4 flex flex-col justify-between items-center">
        <h1 className="text-4xl font-bold mb-4">Online Shop</h1>
        <nav className="flex flex-row gap-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
    </header>
    <main>
        <Outlet/>
    </main>
    </>
    
  );


}

export default App;

