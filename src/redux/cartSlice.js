import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  showCartDropdown: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        item => item.id === newItem.id && item.name === newItem.name && item.img === newItem.img
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * Number(existingItem.price || 0);
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: Number(newItem.price || 0),
        });
      }

      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },

    // removeFromCart(state, action) {
    //   const id = action.payload;
    //   state.cartItems = state.cartItems.filter(item => item.id !== id);

    //   state.totalQuantity = state.cartItems.reduce(
    //     (total, item) => total + item.quantity,
    //     0
    //   );

    //   state.totalPrice = state.cartItems.reduce(
    //     (total, item) => total + item.totalPrice,
    //     0
    //   );
    // },
      removeFromCart(state, action) {
  const id = action.payload;
  const itemToRemove = state.cartItems.find(item => item.id === id);
  
  if (itemToRemove) {
    state.cartItems = state.cartItems.filter(item => item.id !== id);
  }

  state.totalQuantity = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  state.totalPrice = state.cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
},


    toggleDropdown(state, action) {
      state.showCartDropdown = action.payload;
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.showCartDropdown = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  toggleDropdown,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
