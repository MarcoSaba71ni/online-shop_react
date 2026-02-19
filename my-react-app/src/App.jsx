import ProductList from "./components/productList";
import { Outlet , Link } from "@tanstack/react-router";
import { Navbar } from "./components/Navbar";


function App() {
  return (
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    </>
    
  );


}

export default App;

