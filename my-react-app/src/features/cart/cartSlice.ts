import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../interfaces/interfaces";

interface CartState {
    items: CartItem[]
}

const initialState: CartState = { 
    items: [],
};
    
 const cartSlice = createSlice({ 
    name: "cart", 
    initialState, 
    reducers: { 
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
                item => item.id === action.payload 
            );
            if (!existingItem) return;
        
            if (existingItem.quantity > 1) { 
                existingItem.quantity -= 1;
            } else {
                state.items = state.items.filter(
                item => item.id !== action.payload
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