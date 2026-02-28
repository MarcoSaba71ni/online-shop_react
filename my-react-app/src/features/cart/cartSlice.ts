import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../interfaces/interfaces";

interface CartState {
    items: CartItem[]
}

const initialState: CartState = { 
    items: [],
};
    
 const cartSlice = createSlice({ 
    name: "cart", // name of the slice (section of the state)
    initialState, // initial state of the cart
    reducers: { // these are the functions that will modify the state of the cart (actions)
        addToCart: (state, action: PayloadAction<Product>) => {
        const existingItem = state.items.find(
            item => item.id === action.payload.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.items.push({ ...action.payload, quantity: 1 });
        }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(
                item => item.id === action.payload // find the item with the given id
            );

            if (!existingItem) return;
            
            if (existingItem.quantity > 1) { // if the quantity is greater than 1, decrease it by 1
                existingItem.quantity -= 1; // if the quantity is 1, remove the item from the cart
            } else {
                state.items = state.items.filter( // filter out the item with the given id
                item => item.id !== action.payload // keep all items except the one with the given id
                );
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
})

export const { addToCart , removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;