import { createSlice } from "@reduxjs/toolkit";

const cartItems = createSlice({
  name: "Cart",
  initialState: JSON.parse(localStorage.getItem("CartItem")) || [],
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...newItem, quantity: 1 });
      }
      localStorage.setItem("CartItem", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const updatedCart = state.filter(item => item.id !== action.payload);
      localStorage.setItem("CartItem", JSON.stringify(updatedCart));
      return updatedCart; 
    }
  }
});

export const { addToCart, removeFromCart } = cartItems.actions;
export default cartItems.reducer;
