import ProductCard from "./ProductCard";
import {  ProductListProp, Product } from "../features/interfaces/interfaces";


// Option 2: Importing interfaces
function ProductList({ products, onAdd, onRemove }: ProductListProp) {
  return (
    <div className="product-list gap-6">
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
