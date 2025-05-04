import { createSlice } from "@reduxjs/toolkit";

// interface CartItem{
//   id: string | number;
//   quantity: number;
//   [key: string]: any;
// }

interface CartState{
  cartItems: any[];
}

const initialState: CartState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: ({state, action}: any) => {
      const index = state.cartItems?.findIndex(
        (item: any) => item.id === action.payload.id
      );

      console.log("index:",index);
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: any) => item.id !== action.payload
      );
    },
    increaseQuantity: ({state, action}: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: ({state, action}: any) => {
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
    clearAllCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { addCart, removeCart, clearAllCart, decreaseQuantity, increaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;