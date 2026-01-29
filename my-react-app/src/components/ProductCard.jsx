function productCard({product , onAdd , onRemove}) {
    return (
        <div>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>

            <button onClick ={onAdd(product)}> 
            Add to Cart</button>

            <button onClick ={onRemove(product)}>
            Remove</button>

        </div>
    );
}

export default productCard;