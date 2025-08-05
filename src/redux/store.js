// redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';
// import userReducer from "./userSlice";
// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     user: userReducer,
//   },
// });
// export default store;



import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
     wishlist: wishlistReducer,
  },
});

export default store;
