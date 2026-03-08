import ProductList from "./components/ProductList";
import { Outlet , Link } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

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

