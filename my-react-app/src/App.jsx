import ProductList from "./components/productList";
import { Outlet , Link } from "@tanstack/react-router";



function App() {
  return (
    <>
    <header>
        <h1>Online Shop</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
    </header>
    <main>
        <p>Layout is rendering</p>
        <Outlet/>
    </main>
    </>
    
  );


}

export default App;

