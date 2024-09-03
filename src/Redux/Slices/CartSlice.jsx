import { createSlice } from "@reduxjs/toolkit";

// Function to get the cart from localStorage
const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

const CartSlice = createSlice({
    name: "cart",
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addCart: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.push({ ...action.payload, quantity });
            }
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeCart: (state, action) => {
            const updatedCart = state.filter((item) => item.id !== action.payload);
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
});

export const { addCart, removeCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
