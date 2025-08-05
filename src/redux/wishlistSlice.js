// redux/wishlistSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
// };

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     setWishlist: (state, action) => {
//       state.items = action.payload;
//     },
//     addToWishlist: (state, action) => {
//       const existing = state.items.find(item => item.id === action.payload.id);
//       if (!existing) {
//         state.items.push(action.payload);
//       }
//     },
//     removeFromWishlist: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
// export const selectWishlistItems = (state) => state.wishlist.items;
// export default wishlistSlice.reducer;


// redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

// Utility to persist to localStorage
const updateLocalStorage = (items) => {
  localStorage.setItem('wishlist', JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (!existing) {
        state.items.push(action.payload);
        updateLocalStorage(state.items); // 🟢 persist here
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      updateLocalStorage(state.items); // 🟢 persist here
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state) => state.wishlist.items;
export default wishlistSlice.reducer;
