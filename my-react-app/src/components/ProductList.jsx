import ProductCard from './productCard.jsx';

function ProductList({ products, onAdd, onRemove }) {
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
