import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// configureStore sets up the Redux store, which is the central place 
// where all our application state is held.
const store = configureStore({
  reducer: {
    // We register our authSlice here. Now we can access it in components 
    auth: authSlice,
  },
});

export default store;
