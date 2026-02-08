import { Link } from "@tanstack/react-router";

function ProductCard({product , onAdd , onRemove}) {
    return (
        <div>
            <Link
            to= "/products/$productId"
            params={{productId: product.id}}>
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
            </Link>
                <button onClick = {() => onAdd(product.title, product.price)}>
                    Add to Cart
                </button>
                <button onClick = {() => onRemove(product.id) }>
                    Remove
                </button>


        </div>
    );
}

export default ProductCard;