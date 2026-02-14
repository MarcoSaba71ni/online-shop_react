import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],
};
    
 const cartSlice = createSlice({ 
    name: "cart", // name of the slice (section of the state)
    initialState, // initial state of the cart
    reducers: { // these are the functions that will modify the state of the cart (actions)
        addToCart: (state, action) => {
        const existingItem = state.items.find(
            item => item.id === action.payload.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.items.push({ ...action.payload, quantity: 1 });
        }
        },
        removeFromCart: (state, action) => {
            const existingItem = state.items.find(
                item => item.id === action.payload
            );

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