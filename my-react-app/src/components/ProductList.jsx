import ProductCard from './productCard.jsx';

function ProductList({ products, onAdd, onRemove }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <productCard
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
