export interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    discountedPrice: number, 
    image: ProductImage,
    rating: number,
    tags: string[],
    reviews: ProductReview
}

export interface CartItem extends Product {
    quantity: number
}

export interface ProductImage {
    url: string,
    alt: string
}

export interface ProductReview {
    id: string,
    username: string,
    rating: number,
    decription: string
}
// Interface for Product Card Prop
export interface ProductCardProp {
    product: Product,
    onAdd: (product: Product) => void,
    onRemove: (id: string) => void
}
// Interface for Product List Prop
export interface ProductListProp {
    products:Product[],
    onAdd: (product: Product) => void,
    onRemove: (id:string) => void
}
// Interface for API Error
export interface ApiError {
    status: number | null,
    message: string
}

