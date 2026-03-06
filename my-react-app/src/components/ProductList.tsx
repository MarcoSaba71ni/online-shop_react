import ProductCard from "./ProductCard";
import {  ProductListProp, Product } from "../features/interfaces/interfaces";


// Option 2: Importing interfaces
function ProductList({ products, onAdd, onRemove }: ProductListProp) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto p-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default ProductList;
