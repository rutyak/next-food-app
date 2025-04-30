import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addCart: (state: any, action: any) => {
      const index = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );

      console.log("index:",index);
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCart: (state: any, action: any) => {
      state.cartItems = state.cartItems.filter(
        (item: any) => item.id !== action.payload
      );
    },
    increaseQuantity: (state: any, action: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state: any, action: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
    clearAllCart: (state: any, action: any) => {
      state.cartItems = [];
    },
  },
});

export const { addCart, removeCart, clearAllCart, decreaseQuantity, increaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;
