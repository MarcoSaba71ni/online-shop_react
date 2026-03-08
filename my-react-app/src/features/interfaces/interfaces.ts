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

export interface ProductCardProp {
    product: Product,
    onAdd: (product: Product) => void,
    onRemove: (id: string) => void
}

export interface ProductListProp {
    products:Product[],
    onAdd: (product: Product) => void,
    onRemove: (id:string) => void
}

export interface ApiError {
    status: number | null,
    message: string
}

