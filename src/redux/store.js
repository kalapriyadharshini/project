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
import searchReducer from './searchSlice';
import paymentReducer from './paymentSlice';   
import addressReducer from './addressSlice'; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    payment: paymentReducer,
    address: addressReducer,
  },
});

export default store;
