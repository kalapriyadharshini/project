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
  addToCart: (state, action) => {
  const existingIndex = state.cartItems.findIndex(
    item => item.id === action.payload.id
  );

  if (existingIndex !== -1) {

    const existingItem = state.cartItems[existingIndex];
    existingItem.quantity += 1;
    existingItem.totalPrice = existingItem.quantity * Number(existingItem.price || 0);

    state.cartItems.splice(existingIndex, 1); 
    state.cartItems.unshift(existingItem);    
  } else {

    const newItem = {
      ...action.payload,
      quantity: 1,
      totalPrice: Number(action.payload.price || 0),
    };
    state.cartItems.unshift(newItem);
  }
  state.totalQuantity = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  state.totalPrice = state.cartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  console.log(" Cart Updated (Redux):", state.cartItems);
},
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
updateQuantity(state, action) {
  const { id, quantity } = action.payload;

  const item = state.cartItems.find(item => item.id === id);
  if (item && quantity >= 1) {
    item.quantity = quantity;
    item.totalPrice = item.quantity * Number(item.price || 0);
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
increaseQty(state, action) {
  const item = state.cartItems.find(item => item.id === action.payload);
  if (item) {
    item.quantity += 1;
    item.totalPrice = item.quantity * Number(item.price || 0);
  }
  state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
  state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
},
decreaseQty(state, action) {
  const item = state.cartItems.find(item => item.id === action.payload);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    item.totalPrice = item.quantity * Number(item.price || 0);
  }
  state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
  state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
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
  updateQuantity,
  toggleDropdown,
  decreaseQty,
  increaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

